import { useState, useCallback } from "react";
import { CloudUpload, AlertCircle } from "lucide-react";
import DropZone             from "../components/uploads/DropZone";
import UploadQueue          from "../components/uploads/UploadQueue";
import UploadSummary        from "../components/uploads/UploadSummary";
import DuplicateWarningModal from "../components/uploads/DuplicateWarningModal";
import { checkForDuplicate, simulateUpload } from "../services/uploadService";

function makeItem(file) {
  return { file, status: "pending", recordId: null, error: null };
}

export default function Uploads() {
  const [phase,        setPhase]        = useState("idle");
  const [queueItems,   setQueueItems]   = useState([]);
  const [duplicates,   setDuplicates]   = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);

  function updateItem(filename, patch) {
    setQueueItems((prev) =>
      prev.map((item) => item.file.name === filename ? { ...item, ...patch } : item)
    );
  }

  const runUploads = useCallback(async (files, overwriteNames = []) => {
    setPhase("uploading");
    await Promise.all(files.map(async (file) => {
      const isOverwrite = overwriteNames.includes(file.name);
      updateItem(file.name, { status: "uploading" });
      try {
        const result = await simulateUpload(file, isOverwrite);
        updateItem(file.name, {
          status:   isOverwrite ? "overwritten" : "complete",
          recordId: result.recordId,
        });
      } catch (err) {
        updateItem(file.name, { status: "error", error: err.message });
      }
    }));
    setPhase("done");
  }, []);

  async function handleFilesAccepted(files) {
    const items = files.map(makeItem);
    setQueueItems(items);
    setPhase("queued");

    const dupFiles = [];
    for (const item of items) {
      updateItem(item.file.name, { status: "checking" });
      await new Promise((res) => setTimeout(res, 300));
      const check = checkForDuplicate(item.file);
      if (check.isDuplicate) {
        dupFiles.push({ file: item.file, ...check });
        updateItem(item.file.name, { status: "duplicate" });
      } else {
        updateItem(item.file.name, { status: "pending" });
      }
    }

    if (dupFiles.length > 0) {
      setDuplicates(dupFiles);
      setPendingFiles(files);
    } else {
      await runUploads(files, []);
    }
  }

  async function handleOverwrite() {
    const overwriteNames = duplicates.map((d) => d.file.name);
    setDuplicates([]);
    await runUploads(pendingFiles, overwriteNames);
  }

  function handleCancelOverwrite() {
    const dupNames  = duplicates.map((d) => d.file.name);
    const safeFiles = pendingFiles.filter((f) => !dupNames.includes(f.name));
    setDuplicates([]);
    dupNames.forEach((name) =>
      updateItem(name, { status: "error", error: "Upload cancelled by user." })
    );
    if (safeFiles.length > 0) runUploads(safeFiles, []);
    else setPhase("done");
  }

  function handleUploadMore() {
    setPhase("idle");
    setQueueItems([]);
    setDuplicates([]);
    setPendingFiles([]);
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">

      {/* Header */}
      <div>
        <h2 className="page-title">Uploads</h2>
        <p className="page-description">
          Upload calibration record PDFs. Files are stored in SharePoint and matched to records automatically.
        </p>
      </div>

      {/* SharePoint notice */}
      <div className="card bg-info border-info flex items-start gap-3 px-4 py-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--info-icon)" }} />
        <p className="text-sm text-info">
          <span className="font-semibold">SharePoint connection pending — </span>
          Files are currently processed locally. Once connected, uploads will be stored in SharePoint
          and processed by Azure Document Intelligence.
        </p>
      </div>

      {/* Naming guide */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <CloudUpload className="w-4 h-4 text-muted" />
          <h3 className="text-sm font-semibold text-secondary">PDF Naming Convention</h3>
        </div>
        <p className="text-xs text-muted mb-3">
          For automatic record matching, name your PDFs using this format:
        </p>
        <div
          className="rounded-lg px-4 py-2.5 font-mono text-xs text-secondary border"
          style={{ backgroundColor: "var(--surface-inset)", borderColor: "var(--border-base)" }}
        >
          ADAS-2024-03847_Honda_CRV_2023.pdf
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted">
          <div><span className="font-semibold text-tertiary">Record ID</span> — ADAS-YYYY-NNNNN</div>
          <div><span className="font-semibold text-tertiary">VIN</span> — 17-char alphanumeric</div>
        </div>
      </div>

      {phase === "idle" && <DropZone onFilesAccepted={handleFilesAccepted} />}
      {queueItems.length > 0 && <UploadQueue items={queueItems} />}
      {phase === "done" && <UploadSummary items={queueItems} onUploadMore={handleUploadMore} />}

      <DuplicateWarningModal
        duplicates={duplicates}
        onOverwrite={handleOverwrite}
        onCancel={handleCancelOverwrite}
      />
    </div>
  );
}