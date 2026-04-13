import React, { useEffect, useState, useRef } from "react";
import API from "./api/axios";
// ── Mock API shim (replace with your real API import) ──────────────────────
const Avatar = ({ name, dark }) => {
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "SY";
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: dark ? "#1e3a5f" : "#dbeafe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: 1,
        color: dark ? "#93c5fd" : "#1d4ed8",
        fontFamily: "'DM Serif Display', serif",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
};

const Toast = ({ msg, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, []);
  const bg = type === "success" ? "#166534" : "#991b1b";
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        background: bg,
        color: "#fff",
        padding: "10px 22px",
        borderRadius: 40,
        fontSize: 14,
        fontWeight: 500,
        zIndex: 9999,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        animation: "fadeUp .25s ease",
      }}
    >
      {msg}
    </div>
  );
};

const Field = ({
  label,
  value,
  editing,
  onChange,
  onToggle,
  type = "text",
  dark,
}) => {
  const inputBg = dark ? "#0f172a" : "#f8fafc";
  const borderColor = dark ? "#334155" : "#cbd5e1";
  const mutedText = dark ? "#94a3b8" : "#64748b";
  const mainText = dark ? "#f1f5f9" : "#0f172a";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "14px 0",
        borderBottom: `1px solid ${dark ? "#1e293b" : "#f1f5f9"}`,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: mutedText,
            marginBottom: 4,
          }}
        >
          {label}
        </p>
        {editing ? (
          <input
            autoFocus
            type={type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{
              background: inputBg,
              border: `1.5px solid #3b82f6`,
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 15,
              fontWeight: 500,
              color: mainText,
              width: "100%",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        ) : (
          <p
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 500,
              color: mainText,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value || (
              <span style={{ color: mutedText, fontStyle: "italic" }}>
                Not set
              </span>
            )}
          </p>
        )}
      </div>
      <button
        onClick={onToggle}
        title={editing ? "Done" : "Edit"}
        style={{
          background: editing ? (dark ? "#1e3a5f" : "#dbeafe") : "transparent",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          padding: "7px 10px",
          color: editing ? "#3b82f6" : mutedText,
          flexShrink: 0,
          transition: "all .15s",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {editing ? (
          "Done"
        ) : (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        )}
      </button>
    </div>
  );
};

// const ContactCard = ({ contact, index, onChange, onDelete, dark }) => {
//   const bg = dark ? "#0f172a" : "#f8fafc";
//   const border = dark ? "#1e293b" : "#e2e8f0";
//   const mutedText = dark ? "#94a3b8" : "#64748b";
//   const mainText = dark ? "#f1f5f9" : "#0f172a";
//   const inputStyle = {
//     background: "transparent",
//     border: "none",
//     borderBottom: `1px solid ${border}`,
//     padding: "4px 0",
//     fontSize: 14,
//     color: mainText,
//     width: "100%",
//     outline: "none",
//   };

//   return (
//     <div
//       style={{
//         background: bg,
//         border: `1px solid ${border}`,
//         borderRadius: 12,
//         padding: "16px",
//         display: "flex",
//         gap: 12,
//         alignItems: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           width: 38,
//           height: 38,
//           borderRadius: "50%",
//           background: dark ? "#1e3a5f" : "#dbeafe",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 15,
//           fontWeight: 700,
//           color: dark ? "#93c5fd" : "#1d4ed8",
//           flexShrink: 0,
//           fontFamily: "'DM Serif Display', serif",
//         }}
//       >
//         {contact.name ? contact.name[0].toUpperCase() : "#"}
//       </div>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <input
//           value={contact.name}
//           onChange={(e) => onChange(index, "name", e.target.value)}
//           placeholder="Full name"
//           style={{
//             ...inputStyle,
//             fontSize: 15,
//             fontWeight: 600,
//             marginBottom: 6,
//           }}
//         />
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={contact.relation}
//             onChange={(e) => onChange(index, "relation", e.target.value)}
//             placeholder="Relation"
//             style={{
//               ...inputStyle,
//               flex: 1,
//               minWidth: 80,
//               fontSize: 13,
//               color: mutedText,
//             }}
//           />
//           <input
//             value={contact.phone}
//             onChange={(e) => onChange(index, "phone", e.target.value)}
//             placeholder="Phone number"
//             style={{ ...inputStyle, flex: 2, minWidth: 110, fontSize: 13 }}
//             type="tel"
//           />
//         </div>
//       </div>
//       <button
//         onClick={() => onDelete(index)}
//         style={{
//           background: "transparent",
//           border: "none",
//           cursor: "pointer",
//           color: dark ? "#475569" : "#cbd5e1",
//           padding: 4,
//           borderRadius: 6,
//           transition: "color .15s",
//           flexShrink: 0,
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.color = dark ? "#475569" : "#cbd5e1")
//         }
//       >
//         <svg
//           width="16"
//           height="16"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <polyline points="3 6 5 6 21 6" />
//           <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//           <path d="M10 11v6M14 11v6" />
//           <path d="M9 6V4h6v2" />
//         </svg>
//       </button>
//     </div>
//   );
// };
const ContactCard = ({ contact, index, onChange, onDelete, dark }) => {
  const bg = dark ? "#0f172a" : "#f8fafc";
  const border = dark ? "#1e293b" : "#e2e8f0";
  const mutedText = dark ? "#94a3b8" : "#64748b";
  const mainText = dark ? "#f1f5f9" : "#0f172a";

  const inputStyle = {
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${border}`,
    padding: "4px 0",
    fontSize: 14,
    color: mainText,
    width: "100%",
    outline: "none",
  };

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 12,
        padding: "16px",
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: dark ? "#1e3a5f" : "#dbeafe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontWeight: 700,
          color: dark ? "#93c5fd" : "#1d4ed8",
          flexShrink: 0,
          fontFamily: "'DM Serif Display', serif",
        }}
      >
        {contact.name ? contact.name[0].toUpperCase() : "#"}
      </div>

      {/* Inputs */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <input
          value={contact.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          placeholder="Full name"
          style={{
            ...inputStyle,
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 6,
          }}
        />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={contact.relation}
            onChange={(e) => onChange(index, "relation", e.target.value)}
            placeholder="Relation"
            style={{
              ...inputStyle,
              flex: 1,
              minWidth: 80,
              fontSize: 13,
              color: mutedText,
            }}
          />
          <input
            value={contact.phone}
            onChange={(e) => onChange(index, "phone", e.target.value)}
            placeholder="Phone number"
            style={{ ...inputStyle, flex: 2, minWidth: 110, fontSize: 13 }}
            type="tel"
          />
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(index)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: dark ? "#475569" : "#cbd5e1",
          padding: 4,
          borderRadius: 6,
          transition: "color .15s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = dark ? "#475569" : "#cbd5e1")
        }
      >
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  );
};

export default function ProfilePage() {
  const [dark, setDark] = useState(true);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [editing, setEditing] = useState({
    username: false,
    email: false,
    phone: false,
  });
  const [contacts, setContacts] = useState([
    { name: "", relation: "", phone: "" }, // ❌ empty name → gets filtered out
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [toast, setToast] = useState(null);
  const [savedLocations, setSavedLocations] = useState([
    { label: "", address: "" },
  ]);
  const [savingLocations, setSavingLocations] = useState(false);

  const bg = dark ? "#0b1220" : "#f8fafc";
  const cardBg = dark ? "#111827" : "#ffffff";
  const cardBorder = dark ? "#1e293b" : "#e2e8f0";
  const mainText = dark ? "#f1f5f9" : "#0f172a";
  const mutedText = dark ? "#64748b" : "#94a3b8";

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/api/auth/getuser");
        if (res.data.success) {
          setProfile(res.data.user);
        }
        if (res.data.user.emergencyContacts?.length) {
          setContacts(res.data.user.emergencyContacts);
        }
        if (res.data.user.savedLocations?.length)
          setSavedLocations(res.data.user.savedLocations);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      await API.put("/api/auth/updateuser", profile);
      setEditing({ username: false, email: false, phone: false });
      setToast({ msg: "Profile updated", type: "success" });
    } catch {
      setToast({ msg: "Failed to save profile", type: "error" });
    } finally {
      setSavingProfile(false);
    }
  };

  const saveContacts = async () => {
    const filled = contacts.filter((c) => c.name.trim());
    if (!filled.length) {
      setToast({ msg: "Add at least one contact", type: "error" });
      return;
    }
    setSaving(true);
    try {
      await API.put("/api/auth/emergency-contacts", { contacts: filled });
      setToast({ msg: "Emergency contacts saved", type: "success" });
    } catch {
      setToast({ msg: "Failed to save contacts", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const saveLocations = async () => {
    const filled = savedLocations.filter((l) => l.label.trim());
    if (!filled.length) {
      setToast({ msg: "Add at least one location", type: "error" });
      return;
    }
    setSavingLocations(true);
    try {
      await API.put("/api/auth/saved-locations", { savedLocations: filled });
      setToast({ msg: "Saved locations updated", type: "success" });
    } catch {
      setToast({ msg: "Failed to save locations", type: "error" });
    } finally {
      setSavingLocations(false);
    }
  };

  const anyEditing = Object.values(editing).some(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .sy-btn-primary { transition: background .15s, transform .1s; }
        .sy-btn-primary:hover { filter: brightness(1.1); }
        .sy-btn-primary:active { transform: scale(0.98); }
        .sy-btn-ghost:hover { background: ${dark ? "#1e293b" : "#f1f5f9"} !important; }
        .sy-toggle { transition: background .2s; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: bg,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: mainText,
          transition: "background .2s, color .2s",
        }}
      >
        {/* Top bar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 24px",
            borderBottom: `1px solid ${cardBorder}`,
            position: "sticky",
            top: 0,
            background: bg,
            zIndex: 100,
          }}
        >
          <a
            href="/LandingPage2"
            style={{
              fontWeight: 800,
              fontSize: 20,
              color: "#f1f5f9",
              textDecoration: "none",
              letterSpacing: "-.5px",
            }}
          >
            Safe<span style={{ color: "#10b981" }}>Yatra</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: mutedText }}>
              {dark ? "Dark" : "Light"}
            </span>
            <button
              className="sy-toggle"
              onClick={() => setDark(!dark)}
              style={{
                width: 48,
                height: 26,
                borderRadius: 40,
                border: "none",
                cursor: "pointer",
                padding: 3,
                background: dark ? "#3b82f6" : "#cbd5e1",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#fff",
                  position: "absolute",
                  left: dark ? 24 : 3,
                  transition: "left .2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                }}
              >
                {dark ? "🌙" : "☀️"}
              </span>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main
          style={{ maxWidth: 600, margin: "0 auto", padding: "28px 16px 60px" }}
        >
          {loading ? (
            <div
              style={{ display: "flex", justifyContent: "center", padding: 80 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  border: `3px solid ${cardBorder}`,
                  borderTop: "3px solid #3b82f6",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Profile hero */}
              <div
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 16,
                  padding: "24px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <Avatar name={profile.username} dark={dark} />
                <div style={{ flex: 1, minWidth: 140 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: "'DM Serif Display', serif",
                      letterSpacing: "-.3px",
                    }}
                  >
                    {profile.username || "Your Name"}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 13,
                      color: mutedText,
                    }}
                  >
                    {profile.email || "your@email.com"}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 0 3px rgba(34,197,94,.2)",
                    }}
                  />
                  <span
                    style={{ fontSize: 12, color: "#22c55e", fontWeight: 600 }}
                  >
                    Active
                  </span>
                </div>
              </div>

              {/* Personal info card */}
              <div
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: `1px solid ${cardBorder}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                    Personal Information
                  </h2>
                  {anyEditing && (
                    <button
                      className="sy-btn-primary"
                      onClick={saveProfile}
                      disabled={savingProfile}
                      style={{
                        background: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "7px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {savingProfile ? "Saving…" : "Save changes"}
                    </button>
                  )}
                </div>
                <div style={{ padding: "4px 20px 8px" }}>
                  <Field
                    label="Full name"
                    value={profile.username}
                    editing={editing.username}
                    onChange={(v) => handleProfileChange("username", v)}
                    onToggle={() => toggleEdit("username")}
                    dark={dark}
                  />
                  <Field
                    label="Email address"
                    value={profile.email}
                    editing={editing.email}
                    onChange={(v) => handleProfileChange("email", v)}
                    onToggle={() => toggleEdit("email")}
                    type="email"
                    dark={dark}
                  />
                  <Field
                    label="Phone number"
                    value={profile.phone}
                    editing={editing.phone}
                    onChange={(v) => handleProfileChange("phone", v)}
                    onToggle={() => toggleEdit("phone")}
                    type="tel"
                    dark={dark}
                  />
                </div>
              </div>

              {/* Emergency contacts */}
              <div
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: `1px solid ${cardBorder}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                      Emergency Contacts
                    </h2>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 12,
                        color: mutedText,
                      }}
                    >
                      Notified during an SOS alert
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setContacts([
                        ...contacts,
                        { name: "", relation: "", phone: "" },
                      ])
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: dark ? "#1e293b" : "#f1f5f9",
                      border: `1px solid ${cardBorder}`,
                      borderRadius: 8,
                      padding: "7px 13px",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      color: mainText,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 4v16M4 12h16" />
                    </svg>
                    Add
                  </button>
                </div>

                <div
                  style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {contacts.length === 0 && (
                    <p
                      style={{
                        textAlign: "center",
                        color: mutedText,
                        fontSize: 13,
                        padding: "20px 0",
                      }}
                    >
                      No contacts added yet
                    </p>
                  )}
                  {contacts.map((c, i) => (
                    <ContactCard
                      key={i}
                      contact={c}
                      index={i}
                      onChange={(idx, f, v) => {
                        const updated = [...contacts];
                        updated[idx][f] = v;
                        setContacts(updated);
                      }}
                      onDelete={(idx) =>
                        setContacts(contacts.filter((_, ii) => ii !== idx))
                      }
                      dark={dark}
                    />
                  ))}
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    borderTop: `1px solid ${cardBorder}`,
                  }}
                >
                  <button
                    className="sy-btn-primary"
                    onClick={saveContacts}
                    disabled={saving}
                    style={{
                      width: "100%",
                      background: "#3b82f6",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    {saving ? (
                      <>
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            border: "2px solid rgba(255,255,255,.4)",
                            borderTop: "2px solid #fff",
                            borderRadius: "50%",
                            animation: "spin .7s linear infinite",
                          }}
                        />
                        Saving…
                      </>
                    ) : (
                      <>
                        <svg
                          width="15"
                          height="15"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" />
                          <polyline points="7 3 7 8 15 8" />
                        </svg>
                        Save Emergency Contacts
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/*saved locations */}
              {/* Saved Locations */}
              <div
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: `1px solid ${cardBorder}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                      Saved Locations
                    </h2>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 12,
                        color: mutedText,
                      }}
                    >
                      Appear in the Map sidebar
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSavedLocations([
                        ...savedLocations,
                        { label: "", address: "" },
                      ])
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: dark ? "#1e293b" : "#f1f5f9",
                      border: `1px solid ${cardBorder}`,
                      borderRadius: 8,
                      padding: "7px 13px",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      color: mainText,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 4v16M4 12h16" />
                    </svg>
                    Add
                  </button>
                </div>

                <div
                  style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {savedLocations.length === 0 && (
                    <p
                      style={{
                        textAlign: "center",
                        color: mutedText,
                        fontSize: 13,
                        padding: "20px 0",
                      }}
                    >
                      No locations saved yet
                    </p>
                  )}
                  {savedLocations.map((loc, i) => (
                    <div
                      key={i}
                      style={{
                        background: dark ? "#0f172a" : "#f8fafc",
                        border: `1px solid ${cardBorder}`,
                        borderRadius: 12,
                        padding: "14px 16px",
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          background: dark ? "#1e3a5f" : "#dbeafe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        📍
                      </div>
                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                        }}
                      >
                        <input
                          value={loc.label}
                          onChange={(e) => {
                            const u = [...savedLocations];
                            u[i].label = e.target.value;
                            setSavedLocations(u);
                          }}
                          placeholder="Label (e.g. Home, Work)"
                          style={{
                            background: "transparent",
                            border: "none",
                            borderBottom: `1px solid ${cardBorder}`,
                            padding: "4px 0",
                            fontSize: 14,
                            fontWeight: 600,
                            color: mainText,
                            width: "100%",
                            outline: "none",
                          }}
                        />
                        <input
                          value={loc.address}
                          onChange={(e) => {
                            const u = [...savedLocations];
                            u[i].address = e.target.value;
                            setSavedLocations(u);
                          }}
                          placeholder="Full address or lat,lng"
                          style={{
                            background: "transparent",
                            border: "none",
                            borderBottom: `1px solid ${cardBorder}`,
                            padding: "4px 0",
                            fontSize: 13,
                            color: mutedText,
                            width: "100%",
                            outline: "none",
                          }}
                        />
                      </div>
                      <button
                        onClick={() =>
                          setSavedLocations(
                            savedLocations.filter((_, ii) => ii !== i),
                          )
                        }
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: dark ? "#475569" : "#cbd5e1",
                          padding: 4,
                          borderRadius: 6,
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#ef4444")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = dark
                            ? "#475569"
                            : "#cbd5e1")
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    borderTop: `1px solid ${cardBorder}`,
                  }}
                >
                  <button
                    className="sy-btn-primary"
                    onClick={saveLocations}
                    disabled={savingLocations}
                    style={{
                      width: "100%",
                      background: "#3b82f6",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    {savingLocations ? (
                      "Saving…"
                    ) : (
                      <>
                        <svg
                          width="15"
                          height="15"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" />
                          <polyline points="7 3 7 8 15 8" />
                        </svg>
                        Save Locations
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Previous Reports */}
              <div
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: `1px solid ${cardBorder}`,
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                    Previous Reports
                  </h2>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 12,
                      color: mutedText,
                    }}
                  >
                    Incidents and safety logs
                  </p>
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <a
                    href="/report"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: dark ? "#0f172a" : "#f8fafc",
                      border: `1px solid ${cardBorder}`,
                      textDecoration: "none",
                      color: "#3b82f6",
                      fontSize: 14,
                      fontWeight: 500,
                      transition: "background .15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = dark
                        ? "#1e293b"
                        : "#f1f5f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = dark
                        ? "#0f172a"
                        : "#f8fafc")
                    }
                  >
                    View all reports
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </>
  );
}
