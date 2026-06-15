import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const isotipo = fs.readFileSync(path.join(process.cwd(), "public", "brand", "isotipo.png"));
  const isotipoSrc = `data:image/png;base64,${isotipo.toString("base64")}`;

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={isotipoSrc} width={140} height={140} style={{ marginBottom: 32 }} />
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
