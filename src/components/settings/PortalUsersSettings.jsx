import { useState } from "react";
import { Users, UserPlus, Trash2, Shield, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCustomerScope } from "../../hooks/useCustomerScope";
import { customers } from "../../data/mockCustomers";
import { APP_ROLES } from "../../services/msalConfig";

// ─── Mock portal users derived from customer contacts ─────────────────────────
function buildPortalUsers() {
  return customers.flatMap((c) => [
    {
      id:         `${c.id}-001`,
      name:       c.contact.name,
      email:      c.contact.email,
      title:      c.contact.title,
      role:       APP_ROLES.CUSTOMER,
      customerId: c.id,
      customer:   c.name,
      status:     "active",
    },
  ]);
}

const ALL_USERS = buildPortalUsers();

function RoleBadge({ role }) {
  const isAdmin = role === APP_ROLES.ADMIN;
  return (
    <span className={[
      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border",
      isAdmin
        ? "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800"
        : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    ].join(" ")}>
      {isAdmin ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
      {isAdmin ? "Admin" : "Customer"}
    </span>
  );
}

function UserRow({ user, onRemove, canRemove }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">{user.name}</p>
          <RoleBadge role={user.role} />
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-xs truncate">{user.email}</p>
        {user.customer && (
          <p className="text-slate-400 dark:text-slate-500 text-xs">{user.customer}</p>
        )}
      </div>
      {canRemove && (
        <button
          onClick={() => onRemove(user.id)}
          className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
          title="Remove user"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default function PortalUsersSettings() {
  const { isAdmin } = useAuth();
  const { customerId } = useCustomerScope();

  const sourceUsers = isAdmin
    ? ALL_USERS
    : ALL_USERS.filter((u) => u.customerId === customerId);

  const [users,     setUsers]     = useState(sourceUsers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSent,  setInviteSent]  = useState(false);

  function handleRemove(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function handleInvite() {
    if (!inviteEmail.trim()) return;
    // In production: POST /api/portal-users/invite
    setInviteSent(true);
    setInviteEmail("");
    setTimeout(() => { setInviteSent(false); setShowInvite(false); }, 2500);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
            Portal Users
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            {isAdmin
              ? "All users with access to the Calibright portal."
              : "Users at your shop who can access the portal."}
          </p>
        </div>
        <button
          onClick={() => setShowInvite((v) => !v)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Invite User
        </button>
      </div>

      {/* Invite form */}
      {showInvite && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl px-5 py-4 space-y-3">
          <p className="text-blue-700 dark:text-blue-300 text-sm font-semibold">
            Invite a new portal user
          </p>
          <p className="text-blue-600 dark:text-blue-400 text-xs">
            Enter their Microsoft work email. They'll receive an invitation to set up access.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-700 rounded-lg text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <button
              onClick={handleInvite}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
          {inviteSent && (
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              ✓ Invitation sent
            </p>
          )}
        </div>
      )}

      {/* User list */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 dark:bg-slate-800/50">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {users.length} user{users.length !== 1 ? "s" : ""}
          </p>
        </div>
        {users.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-slate-400 dark:text-slate-500 text-sm">No portal users found.</p>
          </div>
        ) : (
          users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onRemove={handleRemove}
              canRemove={isAdmin}
            />
          ))
        )}
      </div>
    </div>
  );
}