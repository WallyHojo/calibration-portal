import { useNavigate } from "react-router-dom";
import { ShieldOff, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { account, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 mx-auto mb-5">
          <ShieldOff className="w-8 h-8 text-red-500" />
        </div>

        <h1 className="text-slate-800 dark:text-slate-100 text-xl font-bold mb-2">Access Denied</h1>
        <p className="text-slate-500 dark:text-slate-500 text-sm mb-1">
          Your account does not have permission to view this page.
        </p>
        {account && (
          <p className="text-slate-400 dark:text-slate-500 text-xs mb-7">
            Signed in as{" "}
            <span className="font-medium text-slate-500 dark:text-slate-500">{account.username}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <p className="text-slate-400 dark:text-slate-500 text-xs mt-8">
          If you believe this is an error, contact your administrator.
        </p>
      </div>
    </div>
  );
}