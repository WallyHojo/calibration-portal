import { useState } from "react";
import { Users, UserPlus, Trash2, Shield, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCustomerScope } from "../../hooks/useCustomerScope";
import { customers } from "../../data/mockCustomers";
import { APP_ROLES } from "../../services/msalConfig";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function buildPortalUsers() {
  return customers.map((c) => ({
    id: `${c.id}-001`, name: c.contact.name, email: c.contact.email,
    title: c.contact.title, role: APP_ROLES.CUSTOMER,
    customerId: c.id, customer: c.name, status: "active",
  }));
}

const ALL_USERS = buildPortalUsers();

export default function PortalUsersSettings() {
  const { isAdmin }    = useAuth();
  const { customerId } = useCustomerScope();

  const source = isAdmin ? ALL_USERS : ALL_USERS.filter((u) => u.customerId === customerId);
  const [users,       setUsers]       = useState(source);
  const [showInvite,  setShowInvite]  = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSent,  setInviteSent]  = useState(false);

  function handleRemove(id) { setUsers((p) => p.filter((u) => u.id !== id)); }

  function handleInvite() {
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    setInviteEmail("");
    setTimeout(() => { setInviteSent(false); setShowInvite(false); }, 2500);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-primary">Portal Users</h3>
          <p className="text-xs text-muted mt-1">
            {isAdmin ? "All users with access to the Calibright portal." : "Users at your shop who can access the portal."}
          </p>
        </div>
        <Button variant="primary" size="sm" icon={UserPlus} onClick={() => setShowInvite((v) => !v)}>
          Invite User
        </Button>
      </div>

      {/* Invite form */}
      {showInvite && (
        <div className="card bg-info border-info px-5 py-4 space-y-3">
          <p className="text-sm font-semibold text-info">Invite a new portal user</p>
          <p className="text-xs text-info">Enter their Microsoft work email. They'll receive an invitation to set up access.</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="input-base flex-1 px-3 py-2"
            />
            <Button variant="primary" size="md" onClick={handleInvite}>Send</Button>
          </div>
          {inviteSent && <p className="text-sm font-medium" style={{ color: "var(--success-text)" }}>✓ Invitation sent</p>}
        </div>
      )}

      {/* User list */}
      <div className="card overflow-hidden">
        <div className="card-header bg-subtle">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-muted" />
            <p className="label-overline">{users.length} user{users.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        {users.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-muted">No portal users found.</p>
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--border-faint)" }}>
            {users.map((user) => (
              <li key={user.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--surface-inset)" }}>
                  <span className="text-xs font-semibold text-tertiary">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-secondary">{user.name}</p>
                    <Badge variant={user.role === APP_ROLES.ADMIN ? "info" : "neutral"}>
                      {user.role === APP_ROLES.ADMIN ? <><Shield className="w-3 h-3" /> Admin</> : <><User className="w-3 h-3" /> Customer</>}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted truncate">{user.email}</p>
                  {user.customer && <p className="text-xs text-muted">{user.customer}</p>}
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleRemove(user.id)}
                    className="p-1.5 text-muted hover:text-danger transition-colors shrink-0"
                    title="Remove user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}