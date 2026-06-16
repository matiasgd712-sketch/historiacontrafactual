import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "FAQ — Historia Contrafactual",
  description: "Preguntas frecuentes sobre Historia Contrafactual.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-0 sm:px-6">
      {/* Header Image */}
      <div className="w-full">
        <Image
          src="/images/header.png"
          alt="Header"
          width={1920}
          height={400}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* FAQ Content */}
      <div className="py-12">
        <header className="border-b border-gris/30 pb-4">
          <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">
            Preguntas frecuentes
          </p>
          <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-marfil md:text-4xl">
            FAQ
          </h1>
          <p className="mt-2 font-body text-sm text-beige/70">
            Respuestas a las preguntas más comunes sobre Historia Contrafactual.
          </p>
        </header>

        <div className="mt-8 space-y-8">
          {/* FAQ Section 1 */}
          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-marfil md:text-3xl">
              ¿Qué es Historia Contrafactual?
            </h2>
            <p className="mt-4 font-body text-base md:text-lg leading-relaxed text-beige/90 mb-5">
              Historia Contrafactual es un archivo digital de escenarios históricos
              alternativos. Cada expediente analiza cómo podría haber evolucionado la
              historia si un evento clave hubiese ocurrido de forma distinta. No es
              ficción especulativa en el sentido tradicional, sino un análisis riguroso
              de bifurcaciones históricas plausibles.
            </p>
            <Image
              src="/images/faq-1.png"
              alt="FAQ Imagen 1"
              width={1200}
              height={600}
              className="w-full h-auto mt-6 border border-gris/30"
            />
          </section>

          {/* FAQ Section 2 */}
          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-marfil md:text-3xl mt-10">
              ¿Cómo se evalúa la plausibilidad?
            </h2>
            <p className="mt-4 font-body text-base md:text-lg leading-relaxed text-beige/90 mb-5">
              Cada expediente recibe una calificación de plausibilidad en una escala de
              0 a 10. Esta escala se basa en el grado en que el evento divergente es
              contingente (pudo haber ocurrido) y en cuánta especulación es necesaria
              para proyectar sus consecuencias hasta 2026. Alta plausibilidad significa
              que el punto de divergencia fue casi histórico y que la cadena causal es
              robusta. Baja plausibilidad significa que requiere múltiples coincidencias
              o que contiene especulaciones controvertidas.
            </p>
            <Image
              src="/images/faq-2.png"
              alt="FAQ Imagen 2"
              width={1200}
              height={600}
              className="w-full h-auto mt-6 border border-gris/30"
            />
          </section>

          {/* FAQ Section 3 */}
          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-marfil md:text-3xl mt-10">
              ¿Cuál es la diferencia entre este archivo y la ficción alternativa?
            </h2>
            <p className="mt-4 font-body text-base md:text-lg leading-relaxed text-beige/90 mb-5">
              La ficción alternativa (alternate history fiction) busca la narrativa y
              el entretenimiento. Este archivo busca la plausibilidad y la rigor. No
              tenemos "héroes" ni "villanos" en nuestros escenarios; tenemos actores
              históricos actuando conforme a sus intereses y limitaciones. Tampoco
              suponemos que "todo es posible": cada expediente justifica por qué su
              punto de divergencia no es descartable y qué cadenas causales lo
              conectan con 2026.
            </p>
          </section>

          {/* FAQ Section 4 */}
          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-marfil md:text-3xl mt-10">
              ¿Por qué todo los escenarios llegan a 2026?
            </h2>
            <p className="mt-4 font-body text-base md:text-lg leading-relaxed text-beige/90 mb-5">
              2026 es "hoy" desde la perspectiva del archivo. Cada escenario se proyecta
              hacia la presente para responder una pregunta concreta: ¿cómo sería el
              mundo ahora si ese evento hubiese ocurrido diferente? Permite una
              comparación sistemática entre líneas temporales, en lugar de detenerse en
              momentos históricos arbitrarios.
            </p>
          </section>

          {/* FAQ Section 5 */}
          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-marfil md:text-3xl mt-10">
              ¿Se puede predecir el futuro con esto?
            </h2>
            <p className="mt-4 font-body text-base md:text-lg leading-relaxed text-beige/90 mb-5">
              No. Historia Contrafactual analiza el pasado, no predice el futuro. Lo que
              sí hace es mostrar cómo cambios pequeños en eventos ya ocurridos habrían
              alterado el presente. Esta es una herramienta para entender la fragilidad
              de la historia y la contingencia: "¿qué habría pasado si...?" es una
              pregunta sobre lo que fue, no sobre lo que será.
            </p>
          </section>
        </div>
      </div>

      {/* Footer Image */}
      <div className="w-full mt-12">
        <Image
          src="/images/footer.png"
          alt="Footer"
          width={1920}
          height={400}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
