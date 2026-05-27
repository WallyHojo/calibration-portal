import { useState, useRef } from "react";
import { Upload, FileText, AlertCircle, X } from "lucide-react";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";

const MAX_FILES      = 10;
const MAX_SIZE_MB    = 25;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPE  = "application/pdf";

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFiles(incoming, existing) {
  const valid  = [];
  const errors = [];
  if (existing.length + incoming.length > MAX_FILES) {
    errors.push(`Maximum ${MAX_FILES} files per batch.`);
    return { valid, errors };
  }
  for (const file of incoming) {
    if (file.type !== ACCEPTED_TYPE) { errors.push(`"${file.name}" is not a PDF and was skipped.`); continue; }
    if (file.size > MAX_SIZE_BYTES)  { errors.push(`"${file.name}" exceeds ${MAX_SIZE_MB}MB.`); continue; }
    if (existing.some((f) => f.name === file.name)) { errors.push(`"${file.name}" is already queued.`); continue; }
    valid.push(file);
  }
  return { valid, errors };
}

export default function DropZone({ onFilesAccepted }) {
  const [dragging, setDragging]   = useState(false);
  const [errors,   setErrors]     = useState([]);
  const [queued,   setQueued]     = useState([]);
  const inputRef = useRef(null);

  function processFiles(fileList) {
    const { valid, errors: errs } = validateFiles(Array.from(fileList), queued);
    setErrors(errs);
    if (valid.length) setQueued((prev) => [...prev, ...valid]);
  }

  const handleDrop       = (e) => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); };
  const handleDragOver   = (e) => { e.preventDefault(); setDragging(true);  };
  const handleDragLeave  = (e) => { e.preventDefault(); setDragging(false); };
  const handleFileChange = (e) => processFiles(e.target.files);

  function removeFile(name) { setQueued((prev) => prev.filter((f) => f.name !== name)); setErrors([]); }
  function clearAll() { setQueued([]); setErrors([]); if (inputRef.current) inputRef.current.value = ""; }

  return (
    <div className="space-y-4">
      {/* Drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 cursor-pointer transition-all",
          dragging ? "border-accent" : "border-base hover:border-accent"
        )}
        style={{ backgroundColor: dragging ? "var(--accent-subtle)" : "var(--surface-subtle)" }}
      >
        <input ref={inputRef} type="file" accept=".pdf,application/pdf" multiple className="hidden" onChange={handleFileChange} />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
          style={{ backgroundColor: dragging ? "var(--accent-subtle)" : "var(--surface-card)", border: "1px solid var(--border-base)" }}
        >
          <Upload className="w-6 h-6" style={{ color: dragging ? "var(--accent)" : "var(--text-muted)" }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-secondary">
            {dragging ? "Release to add files" : "Drag & drop PDFs here"}
          </p>
          <p className="text-xs text-muted mt-1">
            or click to browse — up to {MAX_FILES} files, {MAX_SIZE_MB}MB each
          </p>
        </div>
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="card bg-danger border-danger px-4 py-3 space-y-1">
          {errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-danger shrink-0 mt-0.5" />
              <p className="text-xs text-danger">{err}</p>
            </div>
          ))}
        </div>
      )}

      {/* Queued files */}
      {queued.length > 0 && (
        <div className="card overflow-hidden">
          <div className="card-header">
            <p className="text-sm font-semibold text-primary">{queued.length} file{queued.length !== 1 ? "s" : ""} ready</p>
            <button onClick={clearAll} className="text-xs text-muted hover:text-secondary transition-colors">Clear all</button>
          </div>
          <ul className="divide-y" style={{ borderColor: "var(--border-faint)" }}>
            {queued.map((file) => (
              <li key={file.name} className="flex items-center gap-3 px-5 py-3">
                <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary truncate">{file.name}</p>
                  <p className="text-xs text-muted">{formatBytes(file.size)}</p>
                </div>
                <button onClick={() => removeFile(file.name)} className="p-1 text-muted hover:text-danger transition-colors shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
          <div className="card-footer">
            <Button variant="primary" size="md" icon={Upload} className="w-full justify-center" onClick={() => onFilesAccepted(queued)}>
              Upload {queued.length} File{queued.length !== 1 ? "s" : ""}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}