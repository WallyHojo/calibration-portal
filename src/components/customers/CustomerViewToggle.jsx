import { LayoutGrid, List } from "lucide-react";

export default function CustomerViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-0.5 shadow-sm">
      <button
        onClick={() => onChange("grid")}
        className={[
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          view === "grid"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
        ].join(" ")}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        Grid
      </button>
      <button
        onClick={() => onChange("list")}
        className={[
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          view === "list"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
        ].join(" ")}
      >
        <List className="w-3.5 h-3.5" />
        List
      </button>
    </div>
  );
}