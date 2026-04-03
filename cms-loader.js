/**
 * CMS Loader – IEI Jesús Maestro
 * Carga los archivos content/*.json y puebla el DOM.
 * Si los archivos no están disponibles, el HTML estático sigue funcionando.
 */
(async function initCMS() {
  const sections = ['contacto','hero','nosotros','testimonios','documentos','faq','galeria','programas','textos'];
  const data = {};

  await Promise.all(sections.map(async (s) => {
    try {
      const res = await fetch(`/content/${s}.json`);
      if (res.ok) data[s] = await res.json();
    } catch (_) { /* degradación elegante */ }
  }));

  applyContacto(data.contacto);
  applyHero(data.hero);
  applyNosotros(data.nosotros);
  applyTestimonios(data.testimonios);
  applyDocumentos(data.documentos);
  applyFaq(data.faq);
  applyGaleria(data.galeria);
  applyProgramas(data.programas);
  applyTextos(data.textos);
})();

/* ── Contacto ─────────────────────────────────────────────────────── */
function applyContacto(c) {
  if (!c) return;
  setAll('[data-cms="tel"]', c.telefono);
  setAll('[data-cms="email"]', c.email);
  setAll('[data-cms="horario"]', c.horario);
  setAll('[data-cms="direccion"]', c.direccion);
  attrAll('[data-cms="facebook"]', 'href', c.facebook);

  if (c.whatsapp) {
    const base = `https://wa.me/${c.whatsapp}`;
    attrAll('[data-cms="whatsapp"]',         'href', base);
    attrAll('[data-cms="whatsapp-msg"]',     'href', base + '?text=Hola,%20quisiera%20información%20sobre%20el%20jardín');
    attrAll('[data-cms="whatsapp-admision"]','href', base + '?text=Hola,%20deseo%20información%20sobre%20la%20admisión');
  }
  if (c.telefono) {
    const digits = c.telefono.replace(/\s/g, '');
    attrAll('[data-cms="tel-link"]', 'href', `tel:+51${digits}`);
  }
}

/* ── Hero ─────────────────────────────────────────────────────────── */
function applyHero(h) {
  if (!h) return;
  if (h.tag)            setAll('[data-cms="hero-tag"]', h.tag);
  if (h.titulo_antes)   setAll('[data-cms="hero-titulo-antes"]', h.titulo_antes);
  if (h.titulo_palabra) setAll('[data-cms="hero-titulo-palabra"]', h.titulo_palabra);
  if (h.titulo_despues) setAll('[data-cms="hero-titulo-despues"]', h.titulo_despues);
  if (h.descripcion)    setAll('[data-cms="hero-desc"]', h.descripcion);
  if (h.stats) {
    const el = document.querySelector('[data-cms="hero-stats"]');
    if (el) {
      el.innerHTML = h.stats.map(s =>
        `<div class="hero-stat"><strong>${esc(s.valor)}</strong><span>${esc(s.label)}</span></div>`
      ).join('');
    }
  }
}

/* ── Nosotros ─────────────────────────────────────────────────────── */
function applyNosotros(n) {
  if (!n?.descripcion) return;
  const el = document.querySelector('[data-cms="nosotros-desc"]');
  if (el) el.innerHTML = n.descripcion;
}

/* ── Testimonios ──────────────────────────────────────────────────── */
function applyTestimonios(t) {
  if (!t?.lista?.length) return;
  const grid = document.querySelector('[data-cms="testimonios-grid"]');
  if (!grid) return;
  grid.innerHTML = t.lista.map((item, i) => `
    <div class="testimonial-card reveal" style="transition-delay:${0.1*(i+1)}s">
      <div class="stars">★★★★★</div>
      <p class="testimonial-text">"${esc(item.texto)}"</p>
      <div class="testimonial-author">
        <div class="author-avatar-placeholder" style="background:${item.color}">${esc(item.inicial)}</div>
        <div>
          <span class="author-name">${esc(item.nombre)}</span>
          <span class="author-role">${esc(item.rol)}</span>
        </div>
      </div>
    </div>`).join('');
}

/* ── Documentos ───────────────────────────────────────────────────── */
function applyDocumentos(d) {
  if (!d?.lista?.length) return;
  const ul = document.querySelector('[data-cms="documentos-list"]');
  if (!ul) return;
  ul.innerHTML = d.lista.map(doc =>
    `<li><a href="${esc(doc.url)}" target="_blank"><i class="fas fa-chevron-right"></i> ${esc(doc.nombre)}</a></li>`
  ).join('');
}

/* ── FAQ ──────────────────────────────────────────────────────────── */
function applyFaq(f) {
  if (!f?.lista?.length) return;
  const container = document.querySelector('[data-cms="faq-list"]');
  if (!container) return;
  container.innerHTML = f.lista.map((item, i) => `
    <div class="faq-item ${i === 0 ? 'active' : ''}">
      <button class="faq-question" onclick="toggleFaq(this)">
        ${esc(item.pregunta)}
        <span class="faq-icon"><i class="fas fa-${i === 0 ? 'times' : 'plus'}"></i></span>
      </button>
      <div class="faq-answer">${esc(item.respuesta)}</div>
    </div>`).join('');
}

/* ── Galería ──────────────────────────────────────────────────────── */
function applyGaleria(g) {
  if (!g?.lista?.length) return;
  const grid = document.querySelector('[data-cms="galeria-grid"]');
  if (!grid) return;
  grid.innerHTML = g.lista.map((item, i) => `
    <div class="gallery-item ${item.clase || ''} reveal" style="transition-delay:${0.1*i}s">
      <img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy" />
      <span class="gallery-label">${esc(item.label)}</span>
    </div>`).join('');
}

/* ── Programas ────────────────────────────────────────────────────── */
function applyProgramas(p) {
  if (!p?.lista?.length) return;
  const track = document.querySelector('[data-cms="programas-track"]');
  if (!track) return;
  track.innerHTML = p.lista.map(item => `
    <div class="program-card" data-color="${esc(item.color)}">
      <div class="program-thumb">
        <img src="${esc(item.imagen)}" alt="${esc(item.nombre)}" loading="lazy" />
      </div>
      <div class="program-body">
        <div class="program-name">${esc(item.nombre)}</div>
        <p class="program-desc">${esc(item.descripcion)}</p>
        <div class="program-info-bar">
          <div class="program-info-item"><span class="info-val">${esc(item.info1_valor)}</span><span class="info-label">${esc(item.info1_label)}</span></div>
          <div class="info-sep"></div>
          <div class="program-info-item"><span class="info-val">${esc(item.info2_valor)}</span><span class="info-label">${esc(item.info2_label)}</span></div>
          <div class="info-sep"></div>
          <div class="program-info-item"><span class="info-val">${esc(item.info3_valor)}</span><span class="info-label">${esc(item.info3_label)}</span></div>
        </div>
      </div>
    </div>`).join('');
}

/* ── Textos (títulos y subtítulos de secciones) ───────────────────── */
function applyTextos(t) {
  if (!t) return;
  Object.keys(t).forEach(key => {
    const val = t[key];
    if (!val) return;
    document.querySelectorAll(`[data-cms="${key}"]`).forEach(el => {
      el.textContent = val;
    });
  });
}

/* ── Helpers ──────────────────────────────────────────────────────── */
function setAll(sel, val) {
  if (!val) return;
  document.querySelectorAll(sel).forEach(el => el.textContent = val);
}
function attrAll(sel, attr, val) {
  if (!val) return;
  document.querySelectorAll(sel).forEach(el => el.setAttribute(attr, val));
}
function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
