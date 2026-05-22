import { useState, useCallback } from "react";
import { CloudUpload, AlertCircle } from "lucide-react";
import DropZone from "../components/uploads/DropZone";
import UploadQueue from "../components/uploads/UploadQueue";
import UploadSummary from "../components/uploads/UploadSummary";
import DuplicateWarningModal from "../components/uploads/DuplicateWarningModal";
import { checkForDuplicate, simulateUpload } from "../services/uploadService";

// ─── Upload item factory ───────────────────────────────────────────────────────
function makeItem(file) {
  return { file, status: "pending", recordId: null, error: null };
}

// ─── Upload pipeline states ────────────────────────────────────────────────────
// idle → queued → uploading → done

export default function Uploads() {
  const [phase,       setPhase]       = useState("idle");   // idle | queued | uploading | done
  const [queueItems,  setQueueItems]  = useState([]);
  const [duplicates,  setDuplicates]  = useState([]);       // files needing overwrite confirmation
  const [pendingFiles, setPendingFiles] = useState([]);     // files waiting past the modal

  // ── Update a single item in the queue ─────────────────────────────────────
  function updateItem(filename, patch) {
    setQueueItems((prev) =>
      prev.map((item) =>
        item.file.name === filename ? { ...item, ...patch } : item
      )
    );
  }

  // ── Run upload for a set of files ─────────────────────────────────────────
  const runUploads = useCallback(async (files, overwriteNames = []) => {
    setPhase("uploading");

    await Promise.all(
      files.map(async (file) => {
        const isOverwrite = overwriteNames.includes(file.name);
        updateItem(file.name, { status: "uploading" });
        try {
          const result = await simulateUpload(file, isOverwrite);
          updateItem(file.name, {
            status:   isOverwrite ? "overwritten" : "complete",
            recordId: result.recordId,
          });
        } catch (err) {
          updateItem(file.name, {
            status: "error",
            error:  err.message,
          });
        }
      })
    );

    setPhase("done");
  }, []);

  // ── Triggered when user clicks Upload in DropZone ─────────────────────────
  async function handleFilesAccepted(files) {
    // Build queue items
    const items = files.map(makeItem);
    setQueueItems(items);
    setPhase("queued");

    // Check each file for duplicates
    const dupFiles = [];
    for (const item of items) {
      updateItem(item.file.name, { status: "checking" });
      await new Promise((res) => setTimeout(res, 300)); // stagger checks visually
      const check = checkForDuplicate(item.file);
      if (check.isDuplicate) {
        dupFiles.push({ file: item.file, ...check });
        updateItem(item.file.name, { status: "duplicate" });
      } else {
        updateItem(item.file.name, { status: "pending" });
      }
    }

    if (dupFiles.length > 0) {
      // Surface modal — hold remaining files until user decides
      setDuplicates(dupFiles);
      setPendingFiles(files);
    } else {
      // No duplicates — proceed immediately
      await runUploads(files, []);
    }
  }

  // ── User chose to overwrite ────────────────────────────────────────────────
  async function handleOverwrite() {
    const overwriteNames = duplicates.map((d) => d.file.name);
    setDuplicates([]);
    await runUploads(pendingFiles, overwriteNames);
  }

  // ── User chose to cancel ───────────────────────────────────────────────────
  function handleCancelOverwrite() {
    // Remove duplicate files from the queue, upload the rest
    const dupNames     = duplicates.map((d) => d.file.name);
    const safeFiles    = pendingFiles.filter((f) => !dupNames.includes(f.name));
    setDuplicates([]);

    // Mark cancelled files as error
    dupNames.forEach((name) =>
      updateItem(name, { status: "error", error: "Upload cancelled by user." })
    );

    if (safeFiles.length > 0) {
      runUploads(safeFiles, []);
    } else {
      setPhase("done");
    }
  }

  // ── Reset back to idle ─────────────────────────────────────────────────────
  function handleUploadMore() {
    setPhase("idle");
    setQueueItems([]);
    setDuplicates([]);
    setPendingFiles([]);
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">

      {/* Page header */}
      <div>
        <h2 className="text-slate-800 dark:text-slate-100 text-lg font-semibold">Uploads</h2>
        <p className="text-slate-500 dark:text-slate-500 text-sm mt-0.5">
          Upload calibration record PDFs. Files are stored in SharePoint and
          matched to existing records automatically.
        </p>
      </div>

      {/* SharePoint notice */}
      <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-3">
        <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          <span className="font-semibold">SharePoint connection pending — </span>
          Files are currently processed locally. Once connected, uploads will
          be stored in SharePoint and processed by Azure Document Intelligence.
        </p>
      </div>

      {/* Naming convention guide */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <CloudUpload className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <h3 className="text-slate-700 dark:text-slate-200 font-semibold text-sm">
            PDF Naming Convention
          </h3>
        </div>
        <p className="text-slate-500 dark:text-slate-500 text-xs mb-3">
          For automatic record matching, name your PDFs using this format:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 font-mono text-xs text-slate-600 dark:text-slate-500">
          ADAS-2024-03847_Honda_CRV_2023.pdf
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-500">
          <div>
            <span className="font-semibold text-slate-600 dark:text-slate-500">Record ID</span>
            {" "}— ADAS-YYYY-NNNNN
          </div>
          <div>
            <span className="font-semibold text-slate-600 dark:text-slate-500">VIN</span>
            {" "}— 17-char alphanumeric
          </div>
        </div>
      </div>

      {/* Drop zone — only shown in idle phase */}
      {phase === "idle" && (
        <DropZone onFilesAccepted={handleFilesAccepted} />
      )}

      {/* Upload queue — shown during and after upload */}
      {queueItems.length > 0 && (
        <UploadQueue items={queueItems} />
      )}

      {/* Summary — shown when all done */}
      {phase === "done" && (
        <UploadSummary items={queueItems} onUploadMore={handleUploadMore} />
      )}

      {/* Duplicate warning modal */}
      <DuplicateWarningModal
        duplicates={duplicates}
        onOverwrite={handleOverwrite}
        onCancel={handleCancelOverwrite}
      />

    </div>
  );
}