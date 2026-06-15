export default function PlausibilityInfo() {
  return (
    <details className="mt-2 font-mono text-[11px] text-gris">
      <summary className="cursor-pointer uppercase tracking-widest2 text-gris hover:text-marfil transition-colors">
        ¿Cómo se calcula este puntaje?
      </summary>
      <div className="mt-2 space-y-1.5 normal-case tracking-normal text-beige/70">
        <p>
          La escala va de <span className="text-marfil">Muy Baja</span> a{" "}
          <span className="text-marfil">Muy Alta</span> (0 a 10) y mide qué tan
          coherente es el escenario con la evidencia histórica disponible.
        </p>
        <p>
          Se evalúan tres factores: el respaldo documental del punto de
          divergencia, el número de variables encadenadas necesarias para
          sostener el escenario, y el grado de consenso historiográfico sobre
          sus consecuencias más probables.
        </p>
      </div>
    </details>
  );
}
