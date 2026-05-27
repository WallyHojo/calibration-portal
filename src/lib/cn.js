// ─── cn — class name composition utility ──────────────────────────────────────
// Joins class strings, filtering out falsy values.
// Lightweight alternative to clsx/classnames — no extra dependency needed.
//
// Usage:
//   cn("base-class", condition && "conditional-class", "always-on")
//   cn("foo", undefined, false, null, "bar") → "foo bar"

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}