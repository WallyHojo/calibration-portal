import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Gauge, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const securityFeatures = [
  { icon: ShieldCheck, text: "Role-based access control" },
  { icon: Lock,        text: "Encrypted session — data never stored locally" },
];

export default function Login() {
  const { login, isAuthenticated, initializing, error } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname ?? "/";

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [fieldError,  setFieldError]  = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (!initializing && isAuthenticated) {
      navigate(from, { replace: true });
    }
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg mb-4">
            <Gauge className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-slate-800 dark:text-slate-100 text-2xl font-bold tracking-tight">
            Calibright
          </h1>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
            Customer Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm px-8 py-8">
          <h2 className="text-slate-800 dark:text-slate-100 font-semibold text-lg text-center mb-1">
            Sign in to your account
          </h2>
          <p className="text-slate-500 dark:text-slate-500 text-sm text-center mb-7">
            Enter your credentials to access your calibration records.
          </p>

          {/* Error */}
          {displayError && (
            <div className="mb-5 px-4 py-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">{displayError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-500 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-400 dark:focus:border-blue-600 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-500 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 pr-11 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-400 dark:focus:border-blue-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye    className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || initializing}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm mt-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            <span className="text-slate-400 dark:text-slate-500 text-xs">Secure access</span>
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
          </div>

          {/* Security features */}
          <ul className="space-y-2.5">
            {securityFeatures.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-slate-500 dark:text-slate-500 text-xs">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dev credentials hint — remove before production */}
        {import.meta.env.DEV && (
          <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
            <p className="text-amber-700 dark:text-amber-300 text-xs font-semibold mb-1">
              Dev credentials
            </p>
            <p className="text-amber-600 text-xs font-mono">
              admin@calibright.com / admin1234
            </p>
            <p className="text-amber-600 text-xs font-mono">
              b.kowalski@prestigecollision.com / customer1234
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-6">
          Having trouble?{" "}
          <a
            href="mailto:support@calibright.com"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-300 underline transition-colors"
          >
            Contact support
          </a>
        </p>

      </div>
    </div>
  );
}