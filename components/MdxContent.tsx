// Simple markdown-to-HTML renderer without next-mdx-remote
function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-marfil font-semibold">$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" class="text-rojo underline hover:text-marfil transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\[\^(\w+)\]/g, '<sup class="ml-0.5"><a id="fnref-$1" href="#fn-$1" class="text-rojo no-underline">[$1]</a></sup>');
}

function renderTimeline(lines: string[]): string {
  const items = lines
    .map((l) => l.split("|").map((p) => p.trim()))
    .filter((p) => p.length >= 2 && p[0]);

  const rows = items
    .map(
      ([year, label]) =>
        `<div class="border-l border-gris/30 pl-4"><p class="font-mono text-sm text-rojo">${inline(year)}</p><p class="mt-1 font-body text-sm text-beige/90 md:text-base">${inline(label)}</p></div>`
    )
    .join("\n");

  return `<div class="my-8 space-y-4">${rows}</div>`;
}

function renderQuote(lines: string[]): string {
  const paragraphs = lines
    .filter((l) => l.trim() !== "")
    .map((l) => `<p>${inline(l.trim())}</p>`)
    .join("\n");

  return `<blockquote class="my-10 border-l-2 border-rojo bg-negro/40 px-6 py-6 font-display text-xl uppercase tracking-wide leading-snug text-marfil md:text-2xl">${paragraphs}</blockquote>`;
}

function renderCivilization(name: string, lines: string[]): string {
  const fields = lines
    .map((l) => {
      const m = l.match(/^([^:]+):\s*(.*)$/);
      return m ? { label: m[1].trim(), value: m[2].trim() } : null;
    })
    .filter((f): f is { label: string; value: string } => !!f);

  const cells = fields
    .map(
      (f) =>
        `<div class="bg-negro px-5 py-3"><dt class="font-mono text-[10px] uppercase tracking-widest2 text-gris">${inline(f.label)}</dt><dd class="mt-1 font-body text-sm text-beige/90">${inline(f.value)}</dd></div>`
    )
    .join("\n");

  return `<div class="my-8 border border-gris/30"><div class="border-b border-gris/30 bg-negro/40 px-5 py-3"><p class="font-display text-lg uppercase tracking-wide text-marfil">${inline(name)}</p></div><dl class="grid grid-cols-1 gap-px bg-gris/20 text-xs sm:grid-cols-2">${cells}</dl></div>`;
}

function renderRelated(lines: string[]): string {
  const items = lines
    .map((l) => l.split("|").map((p) => p.trim()))
    .filter((p) => p.length >= 3 && p[0]);

  const cards = items
    .map(([code, title, target]) => {
      if (target.toLowerCase() === "locked") {
        return `<div class="border border-gris/30 px-4 py-3 opacity-60"><p class="font-mono text-[10px] uppercase tracking-widest2 text-gris">${inline(code)} · [ BLOQUEADO ]</p><p class="mt-1 font-body text-sm text-beige/70">${inline(title)}</p></div>`;
      }
      return `<a href="/expedientes/${target}" class="block border border-gris/30 px-4 py-3 transition-colors hover:border-rojo"><p class="font-mono text-[10px] uppercase tracking-widest2 text-rojo">${inline(code)}</p><p class="mt-1 font-body text-sm text-marfil">${inline(title)}</p></a>`;
    })
    .join("\n");

  return `<div class="mt-12 border-t border-gris/30 pt-6"><p class="font-mono text-xs uppercase tracking-widest2 text-rojo">Archivos relacionados</p><div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">${cards}</div></div>`;
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

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const fenceOpen = line.match(/^:::(\w+)\s*(.*)$/);
    if (fenceOpen) {
      closeList();
      const [, type, arg] = fenceOpen;
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        inner.push(lines[i]);
        i++;
      }
      switch (type) {
        case "timeline":
          html.push(renderTimeline(inner));
          break;
        case "quote":
          html.push(renderQuote(inner));
          break;
        case "civilization":
          html.push(renderCivilization(arg.trim(), inner));
          break;
        case "related":
          html.push(renderRelated(inner));
          break;
        default:
          break;
      }
      continue;
    }

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
