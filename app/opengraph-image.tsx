import { ImageResponse } from "next/og";
import { site, areaList } from "@/data/site";

// Applies to every route under app/ unless a segment overrides it.
export const alt = `${site.name} — ${areaList}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (the renderer behind ImageResponse) supports flexbox only — no grid,
// and any element with more than one child needs an explicit display: flex.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0f1512",
          backgroundImage: "linear-gradient(135deg, #1a3d29 0%, #0f1512 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: "#55b374",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0f1512" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#a3b3a8", letterSpacing: "-0.01em" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#eef3ef", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Irrigation that reaches
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#eef3ef", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            every corner.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#a3b3a8" }}>
            Sprinklers · Pumps · Landscape lighting
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 27, color: "#a3b3a8" }}>{areaList}</div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              color: "#0f1512",
              backgroundColor: "#55b374",
              borderRadius: 999,
              padding: "14px 32px",
            }}
          >
            {site.phone}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
