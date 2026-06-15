import { ImageResponse } from "next/og";
import { getExpedienteBySlug, getExpedienteSlugs } from "@/lib/expedientes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getExpedienteSlugs().map((slug) => ({ slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const expediente = getExpedienteBySlug(params.slug);

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
