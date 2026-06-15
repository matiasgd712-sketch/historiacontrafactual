import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111111",
          color: "#F2E9DA",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            border: "2px solid #8C8C8C",
            padding: "60px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              backgroundColor: "#B12A1E",
              marginBottom: 32,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
            {SITE.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#B12A1E", textTransform: "uppercase", letterSpacing: 6 }}>
            {SITE.slogan}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
