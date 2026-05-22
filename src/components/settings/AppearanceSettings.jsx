import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContextInstance";
import { THEMES } from "../../services/themeConstants";

const options = [
  {
    key:   THEMES.LIGHT,
    label: "Light",
    desc:  "Always use the light theme",
    icon:  Sun,
    preview: (
      <div className="w-full h-16 rounded-lg bg-white border border-slate-200 overflow-hidden flex">
        <div className="w-8 bg-slate-900" />
        <div className="flex-1 p-2 space-y-1.5">
          <div className="h-2 w-3/4 bg-slate-200 rounded" />
          <div className="h-2 w-1/2 bg-slate-100 rounded" />
        </div>
      </div>
    ),
  },
  {
    key:   THEMES.DARK,
    label: "Dark",
    desc:  "Always use the dark theme",
    icon:  Moon,
    preview: (
      <div className="w-full h-16 rounded-lg bg-slate-950 border border-slate-700 overflow-hidden flex">
        <div className="w-8 bg-slate-800" />
        <div className="flex-1 p-2 space-y-1.5">
          <div className="h-2 w-3/4 bg-slate-700 rounded" />
          <div className="h-2 w-1/2 bg-slate-800 rounded" />
        </div>
      </div>
    ),
  },
  {
    key:   THEMES.SYSTEM,
    label: "System",
    desc:  "Follow your OS preference",
    icon:  Monitor,
    preview: (
      <div className="w-full h-16 rounded-lg border border-slate-200 overflow-hidden flex">
        <div className="w-1/2 bg-white flex">
          <div className="w-6 bg-slate-900" />
          <div className="flex-1 p-1.5 space-y-1">
            <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
            <div className="h-1.5 w-1/2 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="w-1/2 bg-slate-950 flex">
          <div className="w-6 bg-slate-800" />
          <div className="flex-1 p-1.5 space-y-1">
            <div className="h-1.5 w-3/4 bg-slate-700 rounded" />
            <div className="h-1.5 w-1/2 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
          Theme
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
          Choose how the portal looks. Your preference is saved locally.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((opt) => {
          const Icon     = opt.icon;
          const selected = theme === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => setTheme(opt.key)}
              className={[
                "relative flex flex-col gap-3 p-4 rounded-xl border-2 text-left transition-all",
                selected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-slate-900",
              ].join(" ")}
            >
              {/* Selected checkmark */}
              {selected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Preview */}
              {opt.preview}

              {/* Label */}
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${selected ? "text-blue-600" : "text-slate-400"}`} />
                <div>
                  <p className={`text-sm font-semibold ${selected ? "text-blue-700 dark:text-blue-400" : "text-slate-700 dark:text-slate-200"}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{opt.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}