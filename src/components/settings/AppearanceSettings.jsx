import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { THEMES } from "../../services/themeConstants";
import { cn } from "../../lib/cn";

const options = [
  {
    key:   THEMES.LIGHT,
    label: "Light",
    desc:  "Always use the light theme",
    icon:  Sun,
    preview: (
      <div className="w-full h-16 rounded-lg overflow-hidden flex border" style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}>
        <div className="w-8" style={{ backgroundColor: "#0f172a" }} />
        <div className="flex-1 p-2 space-y-1.5">
          <div className="h-2 w-3/4 rounded" style={{ backgroundColor: "#e2e8f0" }} />
          <div className="h-2 w-1/2 rounded" style={{ backgroundColor: "#f1f5f9" }} />
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
      <div className="w-full h-16 rounded-lg overflow-hidden flex border" style={{ backgroundColor: "#0f172a", borderColor: "#334155" }}>
        <div className="w-8" style={{ backgroundColor: "#1e293b" }} />
        <div className="flex-1 p-2 space-y-1.5">
          <div className="h-2 w-3/4 rounded" style={{ backgroundColor: "#334155" }} />
          <div className="h-2 w-1/2 rounded" style={{ backgroundColor: "#1e293b" }} />
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
      <div className="w-full h-16 rounded-lg border overflow-hidden flex" style={{ borderColor: "#e2e8f0" }}>
        <div className="w-1/2 flex" style={{ backgroundColor: "#ffffff" }}>
          <div className="w-6" style={{ backgroundColor: "#0f172a" }} />
          <div className="flex-1 p-1.5 space-y-1">
            <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: "#e2e8f0" }} />
            <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: "#f1f5f9" }} />
          </div>
        </div>
        <div className="w-1/2 flex" style={{ backgroundColor: "#0f172a" }}>
          <div className="w-6" style={{ backgroundColor: "#1e293b" }} />
          <div className="flex-1 p-1.5 space-y-1">
            <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: "#334155" }} />
            <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: "#1e293b" }} />
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
        <h3 className="text-sm font-semibold text-primary">Theme</h3>
        <p className="text-xs text-muted mt-1">Choose how the portal looks. Your preference is saved locally.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((opt) => {
          const Icon     = opt.icon;
          const selected = theme === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => setTheme(opt.key)}
              className={cn(
                "relative flex flex-col gap-3 p-4 rounded-xl border-2 text-left transition-all",
                selected ? "border-accent" : "border-base hover:border-accent"
              )}
              style={{ backgroundColor: selected ? "var(--accent-subtle)" : "var(--surface-card)" }}
            >
              {selected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              {opt.preview}
              <div className="flex items-center gap-2">
                <Icon className={cn("w-4 h-4", selected ? "text-accent" : "text-muted")} />
                <div>
                  <p className={cn("text-sm font-semibold", selected ? "text-accent" : "text-secondary")}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-muted">{opt.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}