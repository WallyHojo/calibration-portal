import { CheckCircle2, RefreshCcw, XCircle, AlertTriangle } from "lucide-react";

export default function UploadSummary({ items, onUploadMore }) {
  const complete    = items.filter((i) => i.status === "complete");
  const overwritten = items.filter((i) => i.status === "overwritten");
  const failed      = items.filter((i) => i.status === "error");
  const total       = items.length;

  const allDone = complete.length + overwritten.length + failed.length === total;
  if (!allDone) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">Upload Complete</h3>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
          Batch of {total} file{total !== 1 ? "s" : ""} processed
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-center gap-1 py-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <p className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-300">
            {complete.length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">New Records</p>
        </div>
        <div className="flex flex-col items-center gap-1 py-5">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <p className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-300">
            {overwritten.length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">Overwritten</p>
        </div>
        <div className="flex flex-col items-center gap-1 py-5">
          <XCircle className="w-5 h-5 text-red-500" />
          <p className="text-2xl font-bold font-mono text-red-700 dark:text-red-300">
            {failed.length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">Failed</p>
        </div>
      </div>

      {/* Failed list */}
      {failed.length > 0 && (
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-2">
            Failed Files
          </p>
          <ul className="space-y-1.5">
            {failed.map((item) => (
              <li key={item.file.name} className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-600 dark:text-slate-500 text-xs font-medium">{item.file.name}</p>
                  {item.error && (
                    <p className="text-red-500 text-xs">{item.error}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action */}
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/50">
        <button
          onClick={onUploadMore}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-500 text-sm font-medium transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Upload Another Batch
        </button>
      </div>
    </div>
  );
}