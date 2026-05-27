import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Gauge, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";

const SECURITY_FEATURES = [
  { icon: ShieldCheck, text: "Role-based access control" },
  { icon: Lock,        text: "Encrypted session — data never stored locally" },
];

export default function Login() {
  const { login, isAuthenticated, initializing, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from     = location.state?.from?.pathname ?? "/";

  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    if (!initializing && isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, initializing, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();
    setFieldError("");
    if (!email.trim())    return setFieldError("Please enter your email address.");
    if (!password.trim()) return setFieldError("Please enter your password.");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setFieldError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const displayError = fieldError || error;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "var(--surface-page)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-token-lg mb-4">
            <Gauge className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Calibright</h1>
          <p className="text-sm text-muted mt-1">Customer Portal</p>
        </div>

        {/* Card */}
        <div className="card px-8 py-8">
          <h2 className="text-lg font-semibold text-primary text-center mb-1">Sign in to your account</h2>
          <p className="text-sm text-muted text-center mb-7">
            Enter your credentials to access your calibration records.
          </p>

          {displayError && (
            <div className="mb-5 px-4 py-3 rounded-lg border bg-danger border-danger">
              <p className="text-sm text-danger">{displayError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="label-overline block mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="input-base px-4 py-2.5"
              />
            </div>

            <div>
              <label className="label-overline block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="input-base px-4 py-2.5 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={submitting || initializing}
              className="w-full justify-center mt-2"
            >
              Sign In
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-faint)" }} />
            <span className="text-xs text-muted">Secure access</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-faint)" }} />
          </div>

          <ul className="space-y-2.5">
            {SECURITY_FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--success-icon)" }} />
                <span className="text-xs text-muted">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dev hints */}
        {import.meta.env.DEV && (
          <div className="mt-4 card bg-warning border-warning px-4 py-3">
            <p className="text-xs font-semibold text-warning mb-1">Dev credentials</p>
            <p className="text-xs font-mono text-warning">admin@calibright.com / admin1234</p>
            <p className="text-xs font-mono text-warning">b.kowalski@prestigecollision.com / customer1234</p>
          </div>
        )}

        <p className="text-center text-xs text-muted mt-6">
          Having trouble?{" "}
          <a href="mailto:support@calibright.com" className="text-accent hover:opacity-80 underline transition-opacity">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}