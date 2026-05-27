import { cn } from "../../lib/cn";

// ─── Card ──────────────────────────────────────────────────────────────────────
// Base card container using .card from components.css.

export function Card({ children, className }) {
  return (
    <div className={cn("card", className)}>
      {children}
    </div>
  );
}

// ─── CardHeader ────────────────────────────────────────────────────────────────
export function CardHeader({ children, className }) {
  return (
    <div className={cn("card-header", className)}>
      {children}
    </div>
  );
}

// ─── CardBody ──────────────────────────────────────────────────────────────────
export function CardBody({ children, className }) {
  return (
    <div className={cn("card-body", className)}>
      {children}
    </div>
  );
}

// ─── CardFooter ────────────────────────────────────────────────────────────────
export function CardFooter({ children, className }) {
  return (
    <div className={cn("card-footer", className)}>
      {children}
    </div>
  );
}

// ─── SectionCard ───────────────────────────────────────────────────────────────
// Card with icon + title header row — used in detail pages.
export function SectionCard({ title, icon: Icon, children, className }) {
  return (
    <div className={cn("card overflow-hidden", className)}>
      <div className="card-header">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-7 h-7 rounded-lg bg-inset flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-muted" />
            </div>
          )}
          <h3 className="text-sm font-semibold text-secondary">{title}</h3>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}