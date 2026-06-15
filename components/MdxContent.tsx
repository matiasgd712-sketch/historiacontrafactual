// Simple markdown-to-HTML renderer without next-mdx-remote
function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-marfil font-semibold">$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" class="text-rojo underline hover:text-marfil transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\[\^(\w+)\]/g, '<sup class="ml-0.5"><a id="fnref-$1" href="#fn-$1" class="text-rojo no-underline">[$1]</a></sup>');
}

export default function MdxContent({ source }: { source: string }) {
  const lines = source.split("\n");
  const html: string[] = [];
  const footnotes: { id: string; text: string }[] = [];
  let listType: "ul" | "ol" | null = null;

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const line of lines) {
    const fnDef = line.match(/^\[\^(\w+)\]:\s*(.*)$/);
    if (fnDef) {
      closeList();
      footnotes.push({ id: fnDef[1], text: fnDef[2] });
      continue;
    }

    if (line.trim() === "---") {
      closeList();
      html.push('<hr class="my-10 border-t border-gris/30" />');
      continue;
    }

    if (line.startsWith("### ")) {
      closeList();
      html.push(
        `<h3 class="font-display text-xl md:text-2xl uppercase tracking-wide text-beige mt-8 mb-3">${inline(line.slice(4))}</h3>`
      );
      continue;
    }

    if (line.startsWith("## ")) {
      closeList();
      html.push(
        `<h2 class="font-display text-3xl md:text-4xl uppercase tracking-wide text-marfil mt-12 mb-4 pb-2 border-b border-gris/30">${inline(line.slice(3))}</h2>`
      );
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      html.push(
        `<h2 class="font-display text-3xl md:text-4xl uppercase tracking-wide text-marfil mt-12 mb-4 pb-2 border-b border-gris/30">${inline(line.slice(2))}</h2>`
      );
      continue;
    }

    const ulItem = line.match(/^[-*]\s+(.*)$/);
    if (ulItem) {
      if (listType !== "ul") {
        closeList();
        html.push('<ul class="my-4 space-y-2">');
        listType = "ul";
      }
      html.push(`<li class="pl-4 border-l border-gris/30 ml-1 text-beige/90 font-body">${inline(ulItem[1])}</li>`);
      continue;
    }

    const olItem = line.match(/^\d+\.\s+(.*)$/);
    if (olItem) {
      if (listType !== "ol") {
        closeList();
        html.push('<ol class="my-4 space-y-2 list-decimal list-inside marker:text-rojo">');
        listType = "ol";
      }
      html.push(`<li class="pl-2 text-beige/90 font-body">${inline(olItem[1])}</li>`);
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      html.push(
        `<blockquote class="my-6 border-l-2 border-rojo bg-negro/40 px-5 py-4 font-body italic text-beige/80">${inline(line.slice(2))}</blockquote>`
      );
      continue;
    }

    if (line.trim() === "") {
      closeList();
      continue;
    }

    closeList();
    html.push(`<p class="font-body text-base md:text-lg leading-relaxed text-beige/90 mb-5">${inline(line)}</p>`);
  }
  closeList();

  if (footnotes.length > 0) {
    html.push('<div class="mt-12 border-t border-gris/30 pt-6">');
    html.push('<p class="font-mono text-xs uppercase tracking-widest2 text-rojo">Notas</p>');
    html.push('<ol class="mt-3 space-y-2 font-body text-sm text-beige/70 list-decimal list-inside">');
    for (const fn of footnotes) {
      html.push(
        `<li id="fn-${fn.id}">${inline(fn.text)} <a href="#fnref-${fn.id}" class="text-rojo no-underline">↩</a></li>`
      );
    }
    html.push("</ol></div>");
  }

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html.join("\n") }}
    />
  );
}
