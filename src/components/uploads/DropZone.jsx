import { useState, useRef, useCallback } from "react";
import { Upload, FileText, AlertCircle, X } from "lucide-react";

const MAX_FILES     = 10;
const MAX_SIZE_MB   = 25;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPE  = "application/pdf";

function formatBytes(bytes) {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Validate a FileList against rules ────────────────────────────────────────
function validateFiles(incoming, existing) {
  const valid   = [];
  const errors  = [];
  const total   = existing.length + incoming.length;

  if (total > MAX_FILES) {
    errors.push(`Maximum ${MAX_FILES} files per batch. You tried to add ${incoming.length} (${existing.length} already queued).`);
    return { valid, errors };
  }

  for (const file of incoming) {
    if (file.type !== ACCEPTED_TYPE) {
      errors.push(`"${file.name}" is not a PDF and was skipped.`);
      continue;
    }
    if (file.size > MAX_SIZE_BYTES) {
      errors.push(`"${file.name}" exceeds the ${MAX_SIZE_MB}MB limit (${formatBytes(file.size)}).`);
      continue;
    }
    // Deduplicate by name
    const alreadyQueued = existing.some((f) => f.name === file.name);
    if (alreadyQueued) {
      errors.push(`"${file.name}" is already in the queue.`);
      continue;
    }
    valid.push(file);
  }

  return { valid, errors };
}

export default function DropZone({ onFilesAccepted }) {
  const [dragging,      setDragging]      = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [queued,        setQueued]        = useState([]);
  const inputRef = useRef(null);

  function processFiles(fileList) {
    const incoming = Array.from(fileList);
    const { valid, errors } = validateFiles(incoming, queued);
    setValidationErrors(errors);
    if (valid.length > 0) {
      const updated = [...queued, ...valid];
      setQueued(updated);
    }
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  }, [queued]);

  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true);  };
  const handleDragLeave = (e) => { e.preventDefault(); setDragging(false); };
  const handleInputChange = (e) => processFiles(e.target.files);

  function removeFile(name) {
    setQueued((prev) => prev.filter((f) => f.name !== name));
    setValidationErrors([]);
  }

  function clearAll() {
    setQueued([]);
    setValidationErrors([]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleUploadClick() {
    if (queued.length > 0) onFilesAccepted(queued);
  }

  return (
    <div className="space-y-4">

      {/* Drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={[
          "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 cursor-pointer transition-all",
          dragging
            ? "border-blue-400 bg-blue-50"
            : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          className="hidden"
          onChange={handleInputChange}
        />
        <div className={[
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
          dragging ? "bg-blue-100" : "bg-white border border-slate-200",
        ].join(" ")}>
          <Upload className={[
            "w-6 h-6 transition-colors",
            dragging ? "text-blue-600" : "text-slate-400",
          ].join(" ")} />
        </div>
        <div className="text-center">
          <p className="text-slate-700 font-semibold text-sm">
            {dragging ? "Release to add files" : "Drag & drop PDFs here"}
          </p>
          <p className="text-slate-400 text-xs mt-1">
            or click to browse — up to {MAX_FILES} files, {MAX_SIZE_MB}MB each
          </p>
        </div>
      </div>

      {/* Validation errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 space-y-1">
          {validationErrors.map((err, i) => (
            <div key={i} className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-xs">{err}</p>
            </div>
          ))}
        </div>
      )}

      {/* Queued files */}
      {queued.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <p className="text-slate-700 text-sm font-semibold">
              {queued.length} file{queued.length !== 1 ? "s" : ""} ready
            </p>
            <button
              onClick={clearAll}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              Clear all
            </button>
          </div>
          <ul className="divide-y divide-slate-100">
            {queued.map((file) => (
              <li key={file.name} className="flex items-center gap-3 px-4 py-3">
                <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-sm font-medium truncate">{file.name}</p>
                  <p className="text-slate-400 text-xs">{formatBytes(file.size)}</p>
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>

          {/* Upload button */}
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
            <button
              onClick={handleUploadClick}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Upload {queued.length} File{queued.length !== 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}