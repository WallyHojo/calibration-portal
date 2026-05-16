import { Construction } from "lucide-react";

export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Construction className="w-7 h-7 text-slate-400" />
      </div>
      <h2 className="text-slate-700 font-semibold text-lg mb-2">{title}</h2>
      <p className="text-slate-400 text-sm max-w-xs">
        This section is under construction. Check back soon.
      </p>
    </div>
  );
}