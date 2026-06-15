import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { getExpedienteBySlug } from "@/lib/expedientes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600; // Revalidate every hour

export default function Image({ params }: { params: { slug: string } }) {
  const expediente = getExpedienteBySlug(params.slug);

  let backgroundImage: string | undefined;
  if (expediente.image.startsWith("/")) {
    try {
      const filePath = path.join(process.cwd(), "public", expediente.image);
      const data = fs.readFileSync(filePath);
      const ext = path.extname(filePath).slice(1);
      backgroundImage = `data:image/${ext};base64,${data.toString("base64")}`;
    } catch {
      backgroundImage = undefined;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111111",
          ...(backgroundImage
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(17,17,17,0.45) 0%, rgba(17,17,17,0.95) 100%), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}),
          color: "#F2E9DA",
          fontFamily: "sans-serif",
          padding: 80,
          border: "16px solid #111111",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 28,
              color: "#B12A1E",
              letterSpacing: 8,
              textTransform: "uppercase",
              border: "2px solid #B12A1E",
              padding: "8px 20px",
            }}
          >
            Expediente {expediente.code}
          </div>
          <div style={{ fontSize: 22, color: "#8C8C8C", letterSpacing: 6, textTransform: "uppercase" }}>
            Plausibilidad {expediente.plausibility}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.15, textTransform: "uppercase" }}>
            {expediente.title}
          </div>
          <div style={{ marginTop: 24, fontSize: 26, color: "#D6C7AE" }}>
            Fecha de divergencia: {expediente.divergenceDate}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#8C8C8C", letterSpacing: 6, textTransform: "uppercase" }}>
          Historia Contrafactual — Archivo de realidades plausibles
        </div>
      </div>
    ),
    { ...size }
  );
}
