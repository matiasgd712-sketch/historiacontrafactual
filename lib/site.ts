export const SITE = {
  name: "Historia Contrafactual",
  shortName: "H.C.",
  slogan: "Explorando los caminos posibles del pasado.",
  description:
    "Archivo digital de escenarios históricos alternativos. Cada expediente analiza cómo podría haber evolucionado la historia si un evento clave hubiese ocurrido de forma distinta.",
  url: "https://historiacontrafactual.cl",
  locale: "es_CL",
  twitter: "@historiacf",
};

export type CategorySlug =
  | "america-alternativa"
  | "chile-alternativo"
  | "imperios-perdidos"
  | "guerras-diferentes"
  | "ciencia-contrafactual"
  | "futuro-contrafactual"
  | "encuentros-imposibles"
  | "civilizaciones-alternativas"
  | "grandes-divergencias";

export const CATEGORIES: { slug: CategorySlug; name: string; description: string }[] = [
  {
    slug: "america-alternativa",
    name: "América Alternativa",
    description: "Bifurcaciones en la historia del continente americano.",
  },
  {
    slug: "chile-alternativo",
    name: "Chile Alternativo",
    description: "Otros rumbos posibles para la historia de Chile.",
  },
  {
    slug: "imperios-perdidos",
    name: "Imperios Perdidos",
    description: "Civilizaciones e imperios que pudieron persistir o expandirse.",
  },
  {
    slug: "guerras-diferentes",
    name: "Guerras Diferentes",
    description: "Conflictos bélicos con desenlaces distintos a los conocidos.",
  },
  {
    slug: "ciencia-contrafactual",
    name: "Ciencia Contrafactual",
    description: "Otros caminos posibles para el desarrollo científico y tecnológico.",
  },
  {
    slug: "futuro-contrafactual",
    name: "Futuro Contrafactual",
    description: "Proyecciones de futuros que pudieron derivarse de otros pasados.",
  },
  {
    slug: "encuentros-imposibles",
    name: "Encuentros Imposibles",
    description: "Civilizaciones y potencias que jamás llegaron a cruzarse en la historia real.",
  },
  {
    slug: "civilizaciones-alternativas",
    name: "Civilizaciones Alternativas",
    description: "Sociedades que tomaron caminos de desarrollo completamente distintos a los conocidos.",
  },
  {
    slug: "grandes-divergencias",
    name: "Grandes Divergencias",
    description: "Los puntos de quiebre con mayor capacidad de transformar el curso completo de la historia.",
  },
];

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
