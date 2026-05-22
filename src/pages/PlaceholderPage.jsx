import { Construction } from "lucide-react";

export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Construction className="w-7 h-7 text-slate-400 dark:text-slate-500" />
      </div>
      <h2 className="text-slate-700 dark:text-slate-200 font-semibold text-lg mb-2">{title}</h2>
      <p className="text-slate-400 dark:text-slate-500 text-sm max-w-xs">
        This section is under construction. Check back soon.
      </p>
    </div>
  );
}