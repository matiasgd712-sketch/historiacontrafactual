// Simple markdown-to-HTML renderer without next-mdx-remote
export default function MdxContent({ source }: { source: string }) {
  // Render markdown as formatted HTML with basic styling
  const html = source
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) {
        return `<h2 class="font-display text-3xl md:text-4xl uppercase tracking-wide text-marfil mt-12 mb-4 pb-2 border-b border-gris/30">${line.slice(3)}</h2>`;
      }
      if (line.startsWith("### ")) {
        return `<h3 class="font-display text-xl md:text-2xl uppercase tracking-wide text-beige mt-8 mb-3">${line.slice(4)}</h3>`;
      }
      if (line.startsWith("- ")) {
        return `<li class="pl-4 border-l border-gris/30 ml-1 text-beige/90">${line.slice(2)}</li>`;
      }
      if (line.startsWith("> ")) {
        return `<blockquote class="my-6 border-l-2 border-rojo bg-negro/40 px-5 py-4 font-body italic text-beige/80">${line.slice(2)}</blockquote>`;
      }
      if (line.trim() === "") {
        return "";
      }
      return `<p class="font-body text-base md:text-lg leading-relaxed text-beige/90 mb-5">${line}</p>`;
    })
    .join("\n");

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
