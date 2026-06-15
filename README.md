# Historia Contrafactual

Archivo digital de escenarios históricos alternativos plausibles. Cada publicación es un
**expediente**: un dossier que analiza cómo podría haber evolucionado la historia si un evento
clave hubiese ocurrido de forma distinta.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- TailwindCSS (paleta y tipografía propias)
- MDX (`next-mdx-remote`) para los expedientes
- Modo oscuro como única apariencia (estética de archivo/dossier)
- SEO: `sitemap.xml`, `robots.txt`, Open Graph dinámico, JSON-LD (Schema.org)

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Cómo agregar un nuevo expediente

1. Crear un archivo `.mdx` en `content/expedientes/`, por ejemplo `hc-007-mi-expediente.mdx`.
2. Completar el frontmatter (todos los campos son obligatorios salvo donde se indique):

```mdx
---
title: "Título del expediente"
code: "HC-007"
excerpt: "Resumen breve que aparece en las tarjetas y en SEO/Open Graph."
status: "Reconstrucción histórica"
plausibility: "Alta" # "Alta" | "Media" | "Baja"
divergenceDate: "Fecha del punto de divergencia"
date: "2025-05-01" # fecha de publicación, formato AAAA-MM-DD
categories:
  - "chile-alternativo" # ver lib/site.ts para los slugs disponibles
image: "compass" # variante del gráfico de portada: compass | star | tower | arrow | scroll | rocket
bibliography:
  - "Autor, Nombre. \"Título\". Editorial, año."
sources:
  - "Descripción de la fuente primaria."
---

## Primer apartado

Contenido en Markdown/MDX. Los encabezados `##` y `###` generan automáticamente el índice
del expediente. Las notas al pie usan la sintaxis estándar de Markdown:

Texto con una nota al pie[^1].

[^1]: Contenido de la nota.
```

3. El expediente aparecerá automáticamente en:
   - La página de inicio (últimos expedientes).
   - `/expedientes` (archivo completo).
   - `/categorias/[slug]` para cada categoría listada en `categories`.
   - El buscador (`/buscar`).
4. No es necesario tocar código ni reiniciar nada en producción: al desplegar en Vercel,
   Next.js regenera las páginas estáticas a partir de los archivos en `content/expedientes/`.

## Categorías disponibles

Definidas en [`lib/site.ts`](./lib/site.ts):

- `america-alternativa` — América Alternativa
- `chile-alternativo` — Chile Alternativo
- `imperios-perdidos` — Imperios Perdidos
- `guerras-diferentes` — Guerras Diferentes
- `ciencia-contrafactual` — Ciencia Contrafactual
- `futuro-contrafactual` — Futuro Contrafactual

## Despliegue

El proyecto es compatible con Vercel sin configuración adicional:

1. Subir el repositorio a GitHub/GitLab/Bitbucket.
2. Importarlo en Vercel (framework detectado automáticamente: Next.js).
3. Ajustar `SITE.url` en `lib/site.ts` al dominio definitivo (afecta sitemap, robots y Open Graph).
