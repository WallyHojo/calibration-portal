import { useNavigate } from "react-router-dom";
import { ShieldOff, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { account, logout } = useAuth();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "var(--surface-page)" }}
    >
      <div className="w-full max-w-md text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "var(--danger-bg)" }}
        >
          <ShieldOff className="w-8 h-8" style={{ color: "var(--danger-icon)" }} />
        </div>

        <h1 className="text-xl font-bold text-primary mb-2">Access Denied</h1>
        <p className="text-sm text-muted mb-1">
          Your account does not have permission to view this page.
        </p>
        {account && (
          <p className="text-xs text-muted mb-7">
            Signed in as <span className="font-medium text-tertiary">{account.username}</span>
          </p>
        )}

        <div className="flex items-center justify-center gap-3 mt-6">
          <Button variant="secondary" size="md" icon={ArrowLeft} onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button variant="primary" size="md" icon={LogOut} onClick={logout}>
            Sign Out
          </Button>
        </div>

        <p className="text-xs text-muted mt-8">
          If you believe this is an error, contact your administrator.
        </p>
      </div>
    </div>
  );
}