
const AE = {
  async loadRegistry() {
    const r = await fetch("tool-registry.json", {cache:"no-store"});
    if (!r.ok) throw new Error(`Could not load tool-registry.json (${r.status})`);
    return await r.json();
  },

  async loadManifest(entry) {
    const r = await fetch(entry.manifest, {cache:"no-store"});
    if (!r.ok) throw new Error(`Could not load ${entry.manifest} (${r.status})`);
    const manifest = await r.json();
    manifest.__manifestPath = entry.manifest;
    manifest.__folder = entry.folder || null;
    return manifest;
  },

  async loadAll() {
    const registry = await this.loadRegistry();
    const items = await Promise.all(registry.tools.map(async entry => {
      try {
        const manifest = await this.loadManifest(entry);
        return {entry, manifest, error:null};
      } catch (error) {
        return {entry, manifest:null, error};
      }
    }));
    return {registry, items};
  },

  statusClass(s) {
    const x = String(s || "").toLowerCase();
    if (x.includes("beta")) return "beta";
    if (x.includes("active")) return "active";
    return "published";
  },

  query() {
    return new URLSearchParams(location.search);
  },

  async findTool(id) {
    const registry = await this.loadRegistry();
    const entry = registry.tools.find(x => x.id === id);
    if (!entry) throw new Error(`Unknown tool "${id}"`);
    const manifest = await this.loadManifest(entry);
    return {entry, manifest};
  },

  docHref(toolId, docId) {
    return `document.html?tool=${encodeURIComponent(toolId)}&doc=${encodeURIComponent(docId)}`;
  },

  toolHref(toolId) {
    return `tool.html?tool=${encodeURIComponent(toolId)}`;
  },

  resolveDocPath(manifest, doc) {
    const p = manifest.__manifestPath || "";
    const slash = p.lastIndexOf("/");
    const base = slash >= 0 ? p.slice(0, slash + 1) : "";
    return base + doc.file;
  },

  esc(v) {
    return String(v ?? "").replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    })[m]);
  },

  inlineMarkdown(s) {
    let x = this.esc(s);
    x = x.replace(/`([^`]+)`/g, "<code>$1</code>");
    x = x.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    x = x.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    x = x.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return x;
  },

  renderMarkdown(md) {
    // Remove simple YAML front matter.
    md = String(md || "").replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");
    const lines = md.replace(/\r\n/g,"\n").split("\n");
    let out = [], inCode = false, code = [], list = null, table = null;

    const flushList = () => {
      if (!list) return;
      out.push(`<${list.type}>${list.items.map(i=>`<li>${this.inlineMarkdown(i)}</li>`).join("")}</${list.type}>`);
      list = null;
    };
    const flushTable = () => {
      if (!table) return;
      const [head, ...rows] = table;
      out.push("<table><thead><tr>" + head.map(c=>`<th>${this.inlineMarkdown(c)}</th>`).join("") + "</tr></thead><tbody>"
        + rows.map(r=>"<tr>"+r.map(c=>`<td>${this.inlineMarkdown(c)}</td>`).join("")+"</tr>").join("")
        + "</tbody></table>");
      table = null;
    };

    for (let i=0; i<lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith("```")) {
        flushList(); flushTable();
        if (!inCode) { inCode = true; code=[]; }
        else {
          out.push(`<pre><code>${this.esc(code.join("\n"))}</code></pre>`);
          inCode = false; code=[];
        }
        continue;
      }
      if (inCode) { code.push(line); continue; }

      // Markdown table detector.
      if (line.includes("|") && i+1 < lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]+\|?\s*$/.test(lines[i+1])) {
        flushList(); flushTable();
        const parseRow = s => s.trim().replace(/^\||\|$/g,"").split("|").map(x=>x.trim());
        table = [parseRow(line)];
        i++; // separator
        while (i+1 < lines.length && lines[i+1].includes("|") && lines[i+1].trim()) {
          table.push(parseRow(lines[++i]));
        }
        flushTable();
        continue;
      }

      const ul = line.match(/^\s*[-*]\s+(.+)/);
      const ol = line.match(/^\s*\d+\.\s+(.+)/);
      if (ul || ol) {
        flushTable();
        const type = ul ? "ul" : "ol";
        if (!list || list.type !== type) { flushList(); list={type,items:[]}; }
        list.items.push((ul || ol)[1]);
        continue;
      } else {
        flushList();
      }

      if (!line.trim()) { flushTable(); continue; }

      if (/^---+$/.test(line.trim())) {
        flushTable(); out.push("<hr>"); continue;
      }

      const h = line.match(/^(#{1,4})\s+(.+)/);
      if (h) {
        flushTable();
        const n = h[1].length;
        out.push(`<h${n}>${this.inlineMarkdown(h[2])}</h${n}>`);
        continue;
      }

      const q = line.match(/^>\s?(.*)/);
      if (q) { flushTable(); out.push(`<blockquote>${this.inlineMarkdown(q[1])}</blockquote>`); continue; }

      flushTable();
      out.push(`<p>${this.inlineMarkdown(line)}</p>`);
    }
    flushList(); flushTable();
    if (inCode) out.push(`<pre><code>${this.esc(code.join("\n"))}</code></pre>`);
    return out.join("\n");
  },

  setYear() {
    document.querySelectorAll("[data-current-year]").forEach(x => x.textContent = new Date().getFullYear());
  }
};
window.addEventListener("DOMContentLoaded", () => AE.setYear());
