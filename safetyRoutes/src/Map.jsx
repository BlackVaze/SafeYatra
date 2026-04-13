import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import HelpButton from "./HelpButton";
import PoliceStationsPopup from "./PoliceStationsPopup";
import "leaflet/dist/leaflet.css";
import API from "./api/axios";

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT = "#2563eb";
const ACCENT_HOVER = "#1d4ed8";
const ACCENT_GLOW = "rgba(37,99,235,0.2)";
const SUCCESS = "#22c55e";
const DANGER = "#ef4444";

const DARK = {
  bg: "rgba(13,17,23,0.94)",
  surface: "#161b22",
  elevated: "#1c2128",
  border: "rgba(255,255,255,0.08)",
  text: "#e6edf3",
  muted: "#7d8590",
};
const LIGHT = {
  bg: "rgba(255,255,255,0.94)",
  surface: "#ffffff",
  elevated: "#f0f2f5",
  border: "rgba(0,0,0,0.1)",
  text: "#1f2328",
  muted: "#656d76",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function th(dark) {
  return dark ? DARK : LIGHT;
}

// ─── Close button ─────────────────────────────────────────────────────────────
function CloseBtn({ dark, onClick }) {
  const [hov, setHov] = useState(false);
  const t = th(dark);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        background: hov ? t.elevated : "transparent",
        color: t.muted,
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s",
      }}
    >
      ✕
    </button>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ dark, title, onClose, children }) {
  const t = th(dark);
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "min(440px, 92vw)",
          borderRadius: 16,
          overflow: "hidden",
          background: t.surface,
          border: `1px solid ${t.border}`,
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${t.border}`,
            color: t.text,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          <span>{title}</span>
          <CloseBtn dark={dark} onClick={onClose} />
        </div>
        <div
          style={{
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Styled input ─────────────────────────────────────────────────────────────
function Input({
  dark,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
}) {
  const [focused, setFocused] = useState(false);
  const t = th(dark);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: `1px solid ${focused ? ACCENT : t.border}`,
        background: t.elevated,
        color: t.text,
        fontSize: 14,
        outline: "none",
        fontFamily: "inherit",
        boxSizing: "border-box",
        boxShadow: focused ? `0 0 0 3px ${ACCENT_GLOW}` : "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    />
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────
function Label({ dark, children }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color: th(dark).muted,
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  );
}

// ─── Saved Locations ──────────────────────────────────────────────────────────
function SavedPopup({ dark, savedAddresses, onSave, onClose }) {
  return (
    <Modal dark={dark} title="⭐  Saved Locations" onClose={onClose}>
      {savedAddresses.map((addr, i) => (
        <div key={i}>
          <Label dark={dark}>Location {i + 1}</Label>
          <Input
            dark={dark}
            value={addr}
            onChange={(e) => onSave(i, e.target.value)}
            placeholder={`Saved location ${i + 1}`}
          />
        </div>
      ))}
    </Modal>
  );
}

// ─── Recent Locations ─────────────────────────────────────────────────────────
function RecentPopup({ dark, recentAddresses, onSelect, onClose }) {
  const t = th(dark);
  return (
    <Modal dark={dark} title="🕘 Latest Searches" onClose={onClose}>
      {recentAddresses.length === 0 && (
        <p
          style={{
            fontSize: 13,
            color: t.muted,
            textAlign: "center",
            padding: "12px 0",
          }}
        >
          No recent searches yet
        </p>
      )}
      {recentAddresses.map((addr, i) => (
        <button
          key={i}
          onClick={() => {
            onSelect(addr);
            onClose();
          }}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "10px 14px",
            borderRadius: 10,
            background: t.elevated,
            color: t.text,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "inherit",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = dark ? "#1c2128" : "#e2e8f0")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = t.elevated)}
        >
          <span style={{ opacity: 0.4 }}>📍</span> {addr}
        </button>
      ))}
    </Modal>
  );
}
// ─── Emergency Contacts ───────────────────────────────────────────────────────
function PhonePopup({ dark, phoneNumbers, onClose }) {
  const t = th(dark);

  return (
    <Modal dark={dark} title="📞  Emergency Contacts" onClose={onClose}>
      {phoneNumbers.length === 0 && (
        <p
          style={{
            fontSize: 13,
            color: t.muted,
            textAlign: "center",
            padding: "12px 0",
          }}
        >
          No emergency contacts saved. Add them in your Account settings.
        </p>
      )}

      {phoneNumbers.map((num, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderRadius: 10,
            background: t.elevated,
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                flexShrink: 0,
                background: dark ? "#1e3a5f" : "#dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: dark ? "#93c5fd" : "#1d4ed8",
              }}
            >
              {num.name ? num.name[0].toUpperCase() : "#"}
            </div>

            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  color: t.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {num.name || "Contact"}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: t.muted }}>
                {num.phone || "No number"}
              </p>
            </div>
          </div>

          {/* Call button */}
          <a
            href={num.phone?.trim() ? `tel:${num.phone.trim()}` : undefined}
            title={
              num.phone?.trim()
                ? `Call ${num.name || "contact"}`
                : "No phone number"
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 8,
              background: num.phone?.trim()
                ? "rgba(34,197,94,0.15)"
                : "transparent",
              border: `1px solid ${
                num.phone?.trim() ? "rgba(34,197,94,0.3)" : t.border
              }`,
              color: num.phone?.trim() ? "#22c55e" : t.muted,
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 600,
              opacity: num.phone?.trim() ? 1 : 0.4,
              pointerEvents: num.phone?.trim() ? "auto" : "none",
              flexShrink: 0,
              transition: "all .15s",
            }}
            onMouseEnter={(e) => {
              if (num.phone?.trim())
                e.currentTarget.style.background = "rgba(34,197,94,0.28)";
            }}
            onMouseLeave={(e) => {
              if (num.phone?.trim())
                e.currentTarget.style.background = "rgba(34,197,94,0.15)";
            }}
          >
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call
          </a>
        </div>
      ))}
    </Modal>
  );
}

// ─── Route Dialog ─────────────────────────────────────────────────────────────
function RouteDialog({
  dark,
  startLocation,
  endLocation,
  onChangeStart,
  onChangeEnd,
  onSubmit,
  onClose,
  loading,
}) {
  const t = th(dark);
  const [hovCancel, setHovCancel] = useState(false);
  const canSubmit = !loading && endLocation.trim().length > 0;

  return (
    <Modal dark={dark} title="🗺  Plan Your Safe Route" onClose={onClose}>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <Label dark={dark}>Starting point</Label>
          <Input
            dark={dark}
            value={startLocation}
            onChange={(e) => onChangeStart(e.target.value)}
            placeholder="lat,lng — e.g. 41.8781,-87.6298"
            autoFocus
          />
          <div style={{ fontSize: 11, color: t.muted, marginTop: 5 }}>
            Leave empty to use your current GPS location
          </div>
        </div>
        <div>
          <Label dark={dark}>Destination</Label>
          <Input
            dark={dark}
            value={endLocation}
            onChange={(e) => onChangeEnd(e.target.value)}
            placeholder="lat,lng — e.g. 41.9163,-87.6559"
          />
        </div>

        {/* Quick landmarks */}
        <div>
          <Label dark={dark}>Quick destinations</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { name: "Willis Tower", coords: "41.87884,-87.63596" },
              { name: "Navy Pier", coords: "41.89179,-87.60899" },
              { name: "Millennium Park", coords: "41.88275,-87.62327" },
              { name: "O'Hare Airport", coords: "41.97432,-87.90720" },
              { name: "Wrigley Field", coords: "41.94781,-87.65566" },
              { name: "Lincoln Park Zoo", coords: "41.92118,-87.63381" },
            ].map((place) => (
              <button
                key={place.name}
                type="button"
                onClick={() => onChangeEnd(place.coords)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 99,
                  border: `1px solid ${endLocation === place.coords ? ACCENT : t.border}`,
                  background:
                    endLocation === place.coords
                      ? "rgba(37,99,235,0.12)"
                      : t.elevated,
                  color: endLocation === place.coords ? ACCENT : t.text,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (endLocation !== place.coords) {
                    e.currentTarget.style.borderColor = ACCENT;
                    e.currentTarget.style.color = ACCENT;
                  }
                }}
                onMouseLeave={(e) => {
                  if (endLocation !== place.coords) {
                    e.currentTarget.style.borderColor = t.border;
                    e.currentTarget.style.color = t.text;
                  }
                }}
              >
                {place.name}
              </button>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            background: "rgba(37,99,235,0.08)",
            border: "1px solid rgba(37,99,235,0.18)",
            fontSize: 12,
            color: ACCENT,
            lineHeight: 1.55,
          }}
        >
          💡 <strong>Green</strong> = safest route ·{" "}
          <strong>Blue/purple</strong> = alternate routes
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onClose}
            onMouseEnter={() => setHovCancel(true)}
            onMouseLeave={() => setHovCancel(false)}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: `1px solid ${t.border}`,
              background: hovCancel ? t.elevated : "transparent",
              color: t.text,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              border: "none",
              background: canSubmit ? ACCENT : t.elevated,
              color: canSubmit ? "#fff" : t.muted,
              fontSize: 14,
              fontWeight: 600,
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              transition: "background 0.15s, opacity 0.15s",
            }}
          >
            {loading ? "Finding route…" : "Get Safe Route →"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Sidebar nav button ───────────────────────────────────────────────────────
function NavBtn({ dark, icon, label, sidebarOpen, onClick, active }) {
  const [hov, setHov] = useState(false);
  const t = th(dark);
  const bg = active ? "rgba(37,99,235,0.15)" : hov ? t.elevated : "transparent";
  const color = active ? ACCENT : t.text;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        margin: "2px 8px",
        border: "none",
        background: bg,
        color,
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "inherit",
        width: "calc(100% - 16px)",
        textAlign: "left",
        whiteSpace: "nowrap",
        overflow: "hidden",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      <span
        style={{ fontSize: 18, flexShrink: 0, width: 22, textAlign: "center" }}
      >
        {icon}
      </span>
      <span
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: sidebarOpen ? 140 : 0,
          opacity: sidebarOpen ? 1 : 0,
          transition: "max-width 0.25s ease, opacity 0.2s ease",
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── Route Legend ─────────────────────────────────────────────────────────────
function RouteLegend({ dark, visible, sidebarW }) {
  if (!visible) return null;
  const t = th(dark);
  const items = [
    { color: SUCCESS, label: "Safest route" },
    { color: "#6a7fdb", label: "Alternate Routes" },
  ];
  return (
    <div
      style={{
        position: "absolute",
        bottom: 36,
        left: sidebarW + 12,
        zIndex: 20,
        padding: "12px 16px",
        borderRadius: 12,
        background: dark ? "rgba(22,27,34,0.92)" : "rgba(255,255,255,0.92)",
        border: `1px solid ${t.border}`,
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        transition: "left 0.28s",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: t.muted,
          marginBottom: 8,
        }}
      >
        Route Legend
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {items.map((it) => (
          <div
            key={it.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: t.text,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: it.color,
                flexShrink: 0,
              }}
            />
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const bg = type === "success" ? SUCCESS : DANGER;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 36,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 500,
        background: bg,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: `0 4px 24px ${bg}55`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
        maxWidth: "90vw",
      }}
    >
      <span>
        {type === "success" ? "✓" : "⚠"} {message}
      </span>
      <button
        onClick={onDismiss}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: 18,
          lineHeight: 1,
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}

// ─── Loading overlay ──────────────────────────────────────────────────────────
function LoadingOverlay({ dark }) {
  const t = th(dark);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        style={{
          padding: "28px 36px",
          borderRadius: 16,
          textAlign: "center",
          background: t.surface,
          border: `1px solid ${t.border}`,
          color: t.text,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>🛡</div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
          Finding safest route…
        </div>
        <div style={{ fontSize: 12, color: t.muted, marginBottom: 16 }}>
          Analyzing crime data in your area
        </div>
        <div
          style={{
            height: 4,
            borderRadius: 2,
            background: t.elevated,
            overflow: "hidden",
            width: 200,
          }}
        >
          <style>{`
            @keyframes loadbar { 0%{margin-left:-40%;width:40%} 60%{margin-left:60%;width:40%} 100%{margin-left:100%;width:0} }
            .sy-loadbar { animation: loadbar 1.4s ease-in-out infinite; height: 100%; background: ${ACCENT}; border-radius: 2px; }
          `}</style>
          <div className="sy-loadbar" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Map Component
// ═══════════════════════════════════════════════════════════════════════════════
export default function Map() {
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Route
  const [showRouteDialog, setShowRouteDialog] = useState(false);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeVisible, setRouteVisible] = useState(false);

  // Map refs — never trigger re-renders
  const endLocationSetterRef = useRef(null);
  const showRouteDialogSetterRef = useRef(null);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const routeLayersRef = useRef([]);
  const hotspotRef = useRef(null);

  // Hotspots
  const [hotspotsVisible, setHotspotsVisible] = useState(false);

  // Popups
  const [showSaved, setShowSaved] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPolice, setShowPolice] = useState(false);

  // Data
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [recentAddresses, setRecentAddresses] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "error") => setToast({ message, type });

  // ── Init map ────────────────────────────────────────────────────────────────
  const mapDivRef = useRef(null);

  useEffect(() => {
    // Prevent double-init in React StrictMode
    if (mapRef.current) return;

    const init = async () => {
      const leafletMod = await import("leaflet");
      const L = leafletMod.default ?? leafletMod;
      leafletRef.current = L;

      const container = mapDivRef.current;
      if (!container) return;

      const mapInstance = L.map(container, {
        zoomControl: false,
        attributionControl: false,
        maxBounds: [
          [41.73, -87.85],
          [42.02, -87.45],
        ],
        maxBoundsViscosity: 0.5,
      });

      mapInstance.setView([41.8781, -87.6298], 12);
      mapInstance.on("click", (e) => {
        const lat = e.latlng.lat.toFixed(5);
        const lng = e.latlng.lng.toFixed(5);
        endLocationSetterRef.current?.(`${lat},${lng}`);
        showRouteDialogSetterRef.current?.(true);
      });

      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 0);

      const darkTiles = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19,
        },
      );
      const lightTiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "© OpenStreetMap contributors" },
      );

      darkTiles.addTo(mapInstance);
      mapInstance._darkTiles = darkTiles;
      mapInstance._lightTiles = lightTiles;

      // L.control.zoom({ position: "bottomright" }).addTo(mapInstance);

      mapRef.current = mapInstance;

      const hint = L.control({ position: "bottomright" });
      hint.onAdd = () => {
        const div = L.DomUtil.create("div");
        div.style.cssText = `
    background: rgba(0,0,0,0.6); color: #fff; padding: 6px 12px;
    border-radius: 8px; font-size: 11px; font-family: sans-serif;
    backdrop-filter: blur(6px); pointer-events: none;
  `;
        div.innerText = "💡 Click anywhere on the map to set destination";
        return div;
      };
      hint.addTo(mapInstance);
    };

    const style = document.createElement("style");
    style.innerText = `.leaflet-interactive { transition: stroke-width 0.2s ease, opacity 0.2s ease, filter 0.2s ease; }`;
    document.head.appendChild(style);

    init();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/api/auth/getuser");
        if (res.data.success) {
          const { emergencyContacts, savedLocations } = res.data.user;
          if (emergencyContacts?.length) {
            setPhoneNumbers(emergencyContacts);
          }
          if (res.data.user.recentSearches?.length) {
            setRecentAddresses(res.data.user.recentSearches);
          }
          if (savedLocations?.length) {
            setSavedAddresses(
              savedLocations.map((l) => l.address || l.label || ""),
            );
          }
        } //tp
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    })();
  }, []);

  useEffect(() => {
    endLocationSetterRef.current = setEndLocation;
    showRouteDialogSetterRef.current = setShowRouteDialog;
  });

  // ── Theme switch ────────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map._darkTiles) return;
    if (dark) {
      if (map.hasLayer(map._lightTiles)) map.removeLayer(map._lightTiles);
      if (!map.hasLayer(map._darkTiles)) map._darkTiles.addTo(map);
    } else {
      if (map.hasLayer(map._darkTiles)) map.removeLayer(map._darkTiles);
      if (!map.hasLayer(map._lightTiles)) map._lightTiles.addTo(map);
    }
  }, [dark]);

  // ── Hotspot toggle ──────────────────────────────────────────────────────────
  const toggleHotspots = () => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L) return;

    if (hotspotsVisible) {
      if (hotspotRef.current) {
        map.removeLayer(hotspotRef.current);
        hotspotRef.current = null;
      }
      setHotspotsVisible(false);
    } else {
      const clusters = [
        [41.7505, -87.6018],
        [41.9163, -87.6559],
        [41.7751, -87.6794],
        [41.9072, -87.744],
        [41.8, -87.62],
        [41.83, -87.65],
      ];
      // const markers = clusters.map((c) =>
      //   L.circleMarker(c, {
      //     color: DANGER,
      //     weight: 2,
      //     radius: 16,
      //     fillColor: DANGER,
      //     fillOpacity: 0.18,
      //     opacity: 0.7,
      //   }).bindTooltip("⚠ Crime Hotspot", { direction: "top" }),
      // );
      const markers = clusters.map((c) => {
        const marker = L.circleMarker(c, {
          color: DANGER,
          weight: 2,
          radius: 5,
          fillColor: DANGER,
          fillOpacity: 0.4,
        }).addTo(map);

        let start = null;

        function animate(timestamp) {
          if (!start) start = timestamp;

          const elapsed = timestamp - start;
          const scale = (Math.sin(elapsed / 400) + 1) / 2;

          const radius = 8 + scale * 10; // 8 → 18
          const opacity = 0.3 + scale * 0.5;

          marker.setRadius(radius);
          marker.setStyle({
            fillOpacity: opacity,
          });

          requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        return marker.bindTooltip("⚠ Crime Hotspot", { direction: "top" });
      });
      hotspotRef.current = L.layerGroup(markers).addTo(map);
      setHotspotsVisible(true);
    }
  };

  // ── Route submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L) {
      showToast("Map not ready yet. Please wait.");
      return;
    }

    // Clear old layers
    routeLayersRef.current.forEach((l) => {
      try {
        map.removeLayer(l);
      } catch (_) {}
    });
    routeLayersRef.current = [];

    // Parse start
    let startCoords;
    const sp = startLocation.split(",").map((x) => parseFloat(x.trim()));
    if (sp.length === 2 && !isNaN(sp[0]) && !isNaN(sp[1])) {
      startCoords = sp;
    } else {
      try {
        startCoords = await new Promise((res, rej) => {
          if (!navigator.geolocation) {
            rej(new Error("Geolocation not supported"));
            return;
          }
          navigator.geolocation.getCurrentPosition(
            (p) => res([p.coords.latitude, p.coords.longitude]),
            () =>
              rej(
                new Error(
                  "Could not get your location. Enter coordinates manually.",
                ),
              ),
            { enableHighAccuracy: true, timeout: 8000 },
          );
        });
      } catch (err) {
        showToast(err.message);
        return;
      }
    }

    // Parse end
    const ep = endLocation.split(",").map((x) => parseFloat(x.trim()));
    if (ep.length !== 2 || isNaN(ep[0]) || isNaN(ep[1])) {
      showToast("Enter a valid destination as lat,lng (e.g. 41.9163,-87.6559)");
      return;
    }

    setShowRouteDialog(false);
    setRouteLoading(true);

    try {
      const [safeRes, altRes] = await Promise.all([
        fetch("https://subham-28-safeyatra-fastapi.hf.space/safe_route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ start: startCoords, end: ep }),
        }),
        fetch("https://subham-28-safeyatra-fastapi.hf.space/alt_route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ start: startCoords, end: ep }),
        }),
      ]);

      if (!safeRes.ok)
        throw new Error(`Server error ${safeRes.status}. Please try again.`);

      const safeData = await safeRes.json();
      const altData = await altRes.json().catch(() => ({}));

      const safeRoute = safeData["safest_route"];
      if (!safeRoute || safeRoute.length === 0)
        throw new Error("No route returned from server.");

      // Draw alternates first (under safe route)
      const altColors = ["#6a7fdb", "#c38d94", "#7b4b94"];
      const altRoutes = [
        altData["alternate_routes"],
        altData["route-1"],
        altData["route-2"],
        altData["route-3"],
      ].filter((r) => r && r.length > 0);

      altRoutes.forEach((route, i) => {
        const p = L.polyline(route, {
          color: altColors[i % 3],
          weight: 4,
          opacity: 0.65,
        }).addTo(map);

        p.on("mouseover", () => {
          p.setStyle({ weight: 7, opacity: 1 });
          p.getElement()?.style.setProperty(
            "filter",
            `drop-shadow(0 0 6px ${altColors[i % 3]})`,
          );
        });
        p.on("mouseout", () => {
          p.setStyle({ weight: 4, opacity: 0.65 });
          p.getElement()?.style.setProperty("filter", "none");
        });

        routeLayersRef.current.push(p);
      });

      // Draw safe route on top
      const safePoly = L.polyline(safeRoute, {
        color: SUCCESS,
        weight: 6,
        opacity: 0.95,
      }).addTo(map);

      safePoly.on("mouseover", () => {
        safePoly.setStyle({ weight: 10, opacity: 1 });
        safePoly
          .getElement()
          ?.style.setProperty("filter", `drop-shadow(0 0 8px ${SUCCESS})`);
      });
      safePoly.on("mouseout", () => {
        safePoly.setStyle({ weight: 6, opacity: 0.95 });
        safePoly.getElement()?.style.setProperty("filter", "none");
      });

      routeLayersRef.current.push(safePoly);

      // Markers
      const startM = L.circleMarker(safeRoute[0], {
        radius: 9,
        fillColor: SUCCESS,
        color: "#fff",
        weight: 2.5,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup("📍 <b>Start</b>")
        .openPopup();
      routeLayersRef.current.push(startM);

      const endM = L.marker(safeRoute[safeRoute.length - 1])
        .addTo(map)
        .bindPopup("🏁 <b>Destination</b>");
      routeLayersRef.current.push(endM);

      map.fitBounds(safePoly.getBounds(), { padding: [60, 60] });

      // User tracking
      if (navigator.geolocation) {
        const userM = L.circleMarker(safeRoute[0], {
          radius: 8,
          fillColor: "#3b82f6",
          color: "#fff",
          weight: 2.5,
          fillOpacity: 1,
        })
          .addTo(map)
          .bindTooltip("📍 You", { permanent: false });
        routeLayersRef.current.push(userM);

        navigator.geolocation.watchPosition(
          (p) => userM.setLatLng([p.coords.latitude, p.coords.longitude]),
          () => {},
          { enableHighAccuracy: true, maximumAge: 0 },
        );
      }

      setRouteVisible(true);
      try {
        const res = await API.put("/api/auth/recent-searches", {
          destination: endLocation,
        });
        if (res.data.success) setRecentAddresses(res.data.recentSearches);
      } catch (e) {
        console.error("Failed to save recent search", e);
      }
      showToast("Safest route found! 🛡", "success");
    } catch (err) {
      showToast(
        err.message ||
          "Failed to get route. Check your coordinates and try again.",
      );
    } finally {
      setRouteLoading(false);
    }
  };

  // ── Simulate navigation ───────────────────────────────────────────────────
  const simulateNavigation = () => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L || routeLayersRef.current.length === 0) {
      showToast("Plan a route first before simulating.");
      return;
    }

    const safePolyline = routeLayersRef.current.find(
      (l) => l.options?.color === "#22c55e",
    );
    if (!safePolyline) {
      showToast("No safe route found to simulate.");
      return;
    }

    const latlngs = safePolyline.getLatLngs();
    if (!latlngs || latlngs.length === 0) return;

    // Clean up existing simulation
    if (map._simMarker) {
      map.removeLayer(map._simMarker);
      cancelAnimationFrame(map._simRaf);
    }

    const simMarker = L.circleMarker(latlngs[0], {
      radius: 9,
      fillColor: "#f59e0b",
      color: "#fff",
      weight: 2.5,
      fillOpacity: 1,
    })
      .addTo(map)
      .bindTooltip("🚶 Simulating…", { permanent: true, direction: "top" });

    map._simMarker = simMarker;

    const totalPoints = latlngs.length;
    const duration = totalPoints * 80; // total ms for full route, adjust to taste
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1

      // Which segment are we on
      const exactIndex = progress * (totalPoints - 1);
      const i = Math.floor(exactIndex);
      const remainder = exactIndex - i;

      if (i >= totalPoints - 1) {
        simMarker.setLatLng(latlngs[totalPoints - 1]);
        showToast("Simulation complete! ✅", "success");
        setTimeout(() => {
          if (map._simMarker) {
            map.removeLayer(map._simMarker);
            map._simMarker = null;
          }
        }, 2600);
        return;
      }

      // Interpolate between point i and i+1 for smooth movement
      const from = latlngs[i];
      const to = latlngs[i + 1];
      const lat = from.lat + (to.lat - from.lat) * remainder;
      const lng = from.lng + (to.lng - from.lng) * remainder;

      simMarker.setLatLng([lat, lng]);
      map.panTo([lat, lng], {
        animate: true,
        duration: 0.3,
        easeLinearity: 0.5,
      });

      map._simRaf = requestAnimationFrame(animate);
    };

    map._simRaf = requestAnimationFrame(animate);
  };

  const stopSimulation = () => {
    const map = mapRef.current;
    if (map?._simRaf) {
      cancelAnimationFrame(map._simRaf);
      if (map._simMarker) map.removeLayer(map._simMarker);
      map._simMarker = null;
      map._simRaf = null;
      showToast("Simulation stopped.", "success");
    }
  };

  // ── Derived ─────────────────────────────────────────────────────────────────
  const sidebarW = sidebarOpen ? 220 : 64;
  const t = th(dark);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      {/* Map div — never unmounts */}
      <div
        ref={mapDivRef}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      />

      {/* ── Sidebar ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          zIndex: 40,
          width: sidebarW,
          overflow: "hidden",
          background: t.bg,
          backdropFilter: "blur(12px)",
          borderRight: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.28s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "18px 14px 8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: ACCENT,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              boxShadow: `0 0 14px ${ACCENT_GLOW}`,
            }}
          >
            🛡
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: t.text,
              whiteSpace: "nowrap",
              opacity: sidebarOpen ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          >
            SafeYatra
          </span>
        </div>

        {/* Toggle */}
        <SidebarToggle
          dark={dark}
          open={sidebarOpen}
          onClick={() => setSidebarOpen((v) => !v)}
          t={t}
        />

        {/* Divider */}
        <div
          style={{ height: 1, margin: "4px 12px 8px", background: t.border }}
        />

        {/* Nav items */}
        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <HomeLink dark={dark} sidebarOpen={sidebarOpen} t={t} />
          {[
            { icon: "⭐", label: "Saved", onClick: () => setShowSaved(true) },
            { icon: "🕘", label: "Recent", onClick: () => setShowRecent(true) },
            {
              icon: "📞",
              label: "Emergency",
              onClick: () => setShowPhone(true),
            },
            {
              icon: "🚔",
              label: "Police Stations",
              onClick: () => setShowPolice(true),
            },
            {
              icon: "🎯",
              label: hotspotsVisible ? "Hide Hotspots" : "Crime Hotspots",
              onClick: toggleHotspots,
              active: hotspotsVisible,
            },
            {
              icon: "▶️",
              label: "Simulate Route",
              onClick: simulateNavigation,
              active: false,
            },
            {
              icon: "⏹️",
              label: "Stop Simulation",
              onClick: stopSimulation,
              active: false,
            },
          ].map((item) => (
            <NavBtn
              key={item.label}
              dark={dark}
              sidebarOpen={sidebarOpen}
              {...item}
            />
          ))}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div
            style={{
              padding: "10px 14px 14px",
              fontSize: 10,
              color: t.muted,
              opacity: 0.5,
            }}
          >
            SafeYatra · Chicago
          </div>
        )}
      </div>

      {/* ── Top search bar ── */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: sidebarW + 12,
          right: 76,
          zIndex: 30,
          transition: "left 0.28s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <SearchBar
          dark={dark}
          t={t}
          routeVisible={routeVisible}
          onClick={() => setShowRouteDialog(true)}
        />
      </div>

      {/* ── Theme toggle ── */}
      <div style={{ position: "absolute", top: 12, right: 14, zIndex: 40 }}>
        <ThemeToggle dark={dark} onClick={() => setDark((v) => !v)} />
      </div>
      <div
        className="absolute right-2 sm:right-4 z-20 flex flex-col items-center gap-2"
        style={{ top: "60%" }}
      >
        <HelpButton />
      </div>

      {/* ── Route legend ── */}
      <RouteLegend dark={dark} visible={routeVisible} sidebarW={sidebarW} />

      {/* ── Hotspot badge ── */}
      {hotspotsVisible && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: sidebarW + 12,
            zIndex: 30,
            background: "rgba(239,68,68,0.1)",
            color: DANGER,
            padding: "4px 10px",
            borderRadius: 99,
            fontSize: 11,
            fontWeight: 700,
            border: "1px solid rgba(239,68,68,0.2)",
            transition: "left 0.28s",
          }}
        >
          🎯 Hotspots visible
        </div>
      )}

      {/* ── Loading overlay ── */}
      {routeLoading && <LoadingOverlay dark={dark} />}

      {/* ── Toast ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      {/* ── Modals ── */}
      {showRouteDialog && (
        <RouteDialog
          dark={dark}
          startLocation={startLocation}
          endLocation={endLocation}
          onChangeStart={setStartLocation}
          onChangeEnd={setEndLocation}
          onSubmit={handleSubmit}
          onClose={() => setShowRouteDialog(false)}
          loading={routeLoading}
        />
      )}
      {showSaved && (
        <SavedPopup
          dark={dark}
          savedAddresses={savedAddresses}
          onSave={(i, v) => {
            const a = [...savedAddresses];
            a[i] = v;
            setSavedAddresses(a);
          }}
          onClose={() => setShowSaved(false)}
        />
      )}
      {showRecent && (
        <RecentPopup
          dark={dark}
          recentAddresses={recentAddresses}
          onSelect={(addr) => {
            setEndLocation(addr);
            setShowRouteDialog(true);
          }}
          onClose={() => setShowRecent(false)}
        />
      )}
      {showPhone && (
        <PhonePopup
          dark={dark}
          phoneNumbers={phoneNumbers}
          onClose={() => setShowPhone(false)}
        />
      )}
      {showPolice && (
        <PoliceStationsPopup
          dark={dark}
          darkMode={dark}
          onClose={() => setShowPolice(false)}
        />
      )}
    </div>
  );
}

// ─── Small extracted render helpers (avoid inline complexity) ─────────────────

function SidebarToggle({ dark, open, onClick, t }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={open ? "Collapse" : "Expand"}
      style={{
        margin: "4px 10px 4px",
        padding: "8px 10px",
        borderRadius: 8,
        border: "none",
        background: hov ? t.elevated : "transparent",
        cursor: "pointer",
        color: t.muted,
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "flex-end" : "center",
        transition: "background 0.15s",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        {open ? (
          <>
            <line x1="3" y1="9" x2="15" y2="9" />
            <polyline points="10,4 15,9 10,14" />
          </>
        ) : (
          <>
            <line x1="3" y1="5" x2="15" y2="5" />
            <line x1="3" y1="9" x2="15" y2="9" />
            <line x1="3" y1="13" x2="15" y2="13" />
          </>
        )}
      </svg>
    </button>
  );
}

function HomeLink({ sidebarOpen, t }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to="/LandingPage2"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        margin: "2px 8px",
        background: hov ? t.elevated : "transparent",
        color: t.text,
        fontSize: 14,
        fontWeight: 500,
        textDecoration: "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        transition: "background 0.15s",
        width: "calc(100% - 16px)",
      }}
    >
      <span
        style={{ fontSize: 18, flexShrink: 0, width: 22, textAlign: "center" }}
      >
        🏠
      </span>
      <span
        style={{
          maxWidth: sidebarOpen ? 140 : 0,
          opacity: sidebarOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-width 0.25s, opacity 0.2s",
        }}
      >
        Home
      </span>
    </Link>
  );
}

function SearchBar({ dark, t, routeVisible, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 16px",
        borderRadius: 12,
        border: `1px solid ${hov ? ACCENT : t.border}`,
        background: dark ? "rgba(22,27,34,0.92)" : "rgba(255,255,255,0.92)",
        color: t.muted,
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        boxShadow: hov
          ? `0 0 0 3px ${ACCENT_GLOW}`
          : "0 2px 12px rgba(0,0,0,0.15)",
        fontSize: 14,
        fontFamily: "inherit",
        textAlign: "left",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.45, flexShrink: 0 }}
      >
        <circle cx="6" cy="6" r="4.5" />
        <line x1="9.5" y1="9.5" x2="13" y2="13" />
      </svg>
      <span style={{ flex: 1 }}>Enter destination to find safest route…</span>
      <span
        style={{
          background: routeVisible
            ? "rgba(34,197,94,0.12)"
            : "rgba(37,99,235,0.1)",
          color: routeVisible ? SUCCESS : ACCENT,
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 8px",
          borderRadius: 99,
          flexShrink: 0,
        }}
      >
        {routeVisible ? "Route active" : "Plan route"}
      </span>
    </button>
  );
}

function ThemeToggle({ dark, onClick }) {
  return (
    <button
      onClick={onClick}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 50,
        height: 28,
        borderRadius: 14,
        border: "none",
        cursor: "pointer",
        background: dark ? "#1c2128" : "#cbd5e1",
        padding: "0 4px",
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: dark ? "#94a3b8" : ACCENT,
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
          transform: dark ? "translateX(0)" : "translateX(22px)",
          transition: "transform 0.3s cubic-bezier(.4,0,.2,1), background 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
        }}
      >
        {dark ? "🌙" : "☀"}
      </div>
    </button>
  );
}

function FabBtn({ icon, title, dark, t }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        border: `1px solid ${t.border}`,
        background: dark ? "rgba(22,27,34,0.92)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        fontSize: 20,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hov
          ? "0 6px 20px rgba(0,0,0,0.25)"
          : "0 2px 10px rgba(0,0,0,0.15)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
    >
      {icon}
    </button>
  );
}
