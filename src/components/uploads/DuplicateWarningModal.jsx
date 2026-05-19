import { AlertTriangle, X, Upload, Ban } from "lucide-react";

export default function DuplicateWarningModal({ duplicates, onOverwrite, onCancel }) {
  if (!duplicates?.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-slate-800 font-semibold text-sm">
                Duplicate Records Detected
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                {duplicates.length} file{duplicates.length !== 1 ? "s" : ""} match an existing record
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Duplicate list */}
        <div className="px-6 py-4 space-y-3 max-h-64 overflow-y-auto">
          {duplicates.map((dup) => (
            <div
              key={dup.file.name}
              className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
            >
              <p className="text-slate-700 text-sm font-medium truncate">
                {dup.file.name}
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Matches existing record{" "}
                <span className="font-mono font-semibold text-slate-600">
                  {dup.existingRecord.id}
                </span>
              </p>
              {dup.matchType === "vin" && (
                <p className="text-slate-400 text-xs mt-0.5">
                  Matched by VIN:{" "}
                  <span className="font-mono">{dup.existingRecord.vin}</span>
                </p>
              )}
              {dup.matchType === "filename" && (
                <p className="text-slate-400 text-xs mt-0.5">
                  Matched by filename
                </p>
              )}
              <p className="text-amber-700 text-xs mt-2 font-medium">
                Uploading will overwrite the existing record.
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
          >
            <Ban className="w-4 h-4" />
            Cancel Upload
          </button>
          <button
            onClick={onOverwrite}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4" />
            Overwrite
          </button>
        </div>

      </div>
    </div>
  );
}