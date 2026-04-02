/* ===================================================
   IEI Jesús Maestro — Decap CMS Preview Templates
   Cada sección del sitio tiene su propio preview
   que se actualiza en tiempo real mientras editas.
=================================================== */

(function () {
  var h = window.h;

  /* ── Registrar estilos globales del preview ── */
  CMS.registerPreviewStyle(
    'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap'
  );
  CMS.registerPreviewStyle(
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
  );
  CMS.registerPreviewStyle('/admin/preview.css');


  /* ════════════════════════════════════════════
     CONTACTO
  ════════════════════════════════════════════ */
  var ContactoPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var tel      = entry.getIn(['data', 'telefono'])  || '—';
      var wa       = entry.getIn(['data', 'whatsapp'])  || '—';
      var email    = entry.getIn(['data', 'email'])     || '—';
      var horario  = entry.getIn(['data', 'horario'])   || '—';
      var dir      = entry.getIn(['data', 'direccion']) || '—';
      var fb       = entry.getIn(['data', 'facebook'])  || '—';

      return h('div', { className: 'preview-wrap contacto-preview' },
        h('span', { className: 'preview-label' }, '📞 Contacto e Información'),
        h('div', { className: 'contact-info-grid' },

          h('div', { className: 'contact-item' },
            h('div', { className: 'contact-icon orange' }, h('i', { className: 'fas fa-map-marker-alt' })),
            h('div', {},
              h('span', { className: 'contact-item-title' }, 'Dirección'),
              h('span', { className: 'contact-item-val' }, dir)
            )
          ),

          h('div', { className: 'contact-item' },
            h('div', { className: 'contact-icon teal' }, h('i', { className: 'fas fa-phone' })),
            h('div', {},
              h('span', { className: 'contact-item-title' }, 'Teléfono'),
              h('span', { className: 'contact-item-val' }, tel)
            )
          ),

          h('div', { className: 'contact-item' },
            h('div', { className: 'contact-icon purple' }, h('i', { className: 'fab fa-whatsapp' })),
            h('div', {},
              h('span', { className: 'contact-item-title' }, 'WhatsApp'),
              h('span', { className: 'contact-item-val' }, wa),
              h('div', { className: 'wa-badge' },
                h('i', { className: 'fab fa-whatsapp' }), ' wa.me/' + wa
              )
            )
          ),

          h('div', { className: 'contact-item' },
            h('div', { className: 'contact-icon blue' }, h('i', { className: 'fas fa-envelope' })),
            h('div', {},
              h('span', { className: 'contact-item-title' }, 'Correo electrónico'),
              h('span', { className: 'contact-item-val' }, email)
            )
          ),

          h('div', { className: 'contact-item' },
            h('div', { className: 'contact-icon orange' }, h('i', { className: 'fas fa-clock' })),
            h('div', {},
              h('span', { className: 'contact-item-title' }, 'Horario de atención'),
              h('span', { className: 'contact-item-val' }, horario)
            )
          ),

          h('div', { className: 'contact-item' },
            h('div', { className: 'contact-icon teal' }, h('i', { className: 'fab fa-facebook-f' })),
            h('div', {},
              h('span', { className: 'contact-item-title' }, 'Facebook'),
              h('a', { className: 'contact-item-val', href: fb, style: { color: '#1877f2', wordBreak: 'break-all' } }, fb)
            )
          )
        )
      );
    }
  });
  CMS.registerPreviewTemplate('contacto', ContactoPreview);


  /* ════════════════════════════════════════════
     HERO
  ════════════════════════════════════════════ */
  var HeroPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var desc  = entry.getIn(['data', 'descripcion']) || '';
      var stats = entry.getIn(['data', 'stats']);
      var statsList = stats ? stats.toJS() : [];

      return h('div', { className: 'preview-wrap' },
        h('div', { className: 'hero-preview' },
          h('div', { className: 'hero-preview-body' },
            h('span', { className: 'hero-tag' }, '🏫 Institución Educativa Inicial · Chorrillos'),
            h('h1', { className: 'hero-h1' },
              'Donde la ', h('span', {}, 'infancia'), ' florece con amor y aprendizaje'
            ),
            h('p', { className: 'hero-desc-text' }, desc || h('em', { style: { opacity: 0.4 } }, 'Escribe la descripción principal…')),

            statsList.length > 0
              ? h('div', { className: 'hero-stats-row' },
                  statsList.map(function (s, i) {
                    return h('div', { className: 'hero-stat-item', key: i },
                      h('strong', {}, s.valor || '—'),
                      h('span', {}, s.label || '')
                    );
                  })
                )
              : h('div', { className: 'preview-empty' },
                  h('i', { className: 'fas fa-chart-bar' }),
                  h('p', {}, 'Agrega estadísticas para verlas aquí')
                )
          )
        )
      );
    }
  });
  CMS.registerPreviewTemplate('hero', HeroPreview);


  /* ════════════════════════════════════════════
     NOSOTROS
  ════════════════════════════════════════════ */
  var NosotrosPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var desc  = entry.getIn(['data', 'descripcion']) || '';

      return h('div', { className: 'preview-wrap' },
        h('div', { className: 'nosotros-preview' },
          h('div', { className: 'nosotros-preview-body' },
            h('span', { className: 'preview-label' }, '¿Quiénes Somos?'),
            h('h2', { className: 'section-title', style: { marginBottom: '16px' } },
              'Una familia dedicada a la primera infancia'
            ),
            h('p', { className: 'nosotros-desc' },
              desc || h('em', { style: { opacity: 0.4 } }, 'Escribe la descripción de la sección Nosotros…')
            ),
            h('div', { className: 'about-features' },
              h('div', { className: 'about-feature' },
                h('i', { className: 'fas fa-heart' }),
                h('span', {}, 'Visión humanista cristiana')
              ),
              h('div', { className: 'about-feature' },
                h('i', { className: 'fas fa-child' }),
                h('span', {}, 'Más de 20 años de trayectoria')
              ),
              h('div', { className: 'about-feature' },
                h('i', { className: 'fas fa-star' }),
                h('span', {}, 'Docentes altamente capacitados')
              ),
              h('div', { className: 'about-feature' },
                h('i', { className: 'fas fa-church' }),
                h('span', {}, 'Comunidad parroquial')
              )
            )
          )
        )
      );
    }
  });
  CMS.registerPreviewTemplate('nosotros', NosotrosPreview);


  /* ════════════════════════════════════════════
     TESTIMONIOS
  ════════════════════════════════════════════ */
  var colorMap = {
    orange: '#FF9B24', teal: '#00BBAE', purple: '#A855F7',
    blue: '#3B82F6',  green: '#22C55E', pink: '#FF577B'
  };

  var TestimoniosPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var lista = entry.getIn(['data', 'lista']);
      var items = lista ? lista.toJS() : [];

      if (items.length === 0) {
        return h('div', { className: 'preview-wrap' },
          h('span', { className: 'preview-label' }, '💬 Testimonios'),
          h('div', { className: 'preview-empty' },
            h('i', { className: 'fas fa-comments' }),
            h('p', {}, 'Agrega testimonios para verlos aquí')
          )
        );
      }

      return h('div', { className: 'preview-wrap testimonios-preview' },
        h('span', { className: 'preview-label' }, '💬 Testimonios'),
        h('div', { className: 'testimonials-grid' },
          items.map(function (t, i) {
            var bgColor = colorMap[t.color] || colorMap.orange;
            return h('div', { className: 'testimonial-card', key: i },
              h('div', { className: 'stars' }, '★★★★★'),
              h('p', { className: 'testimonial-text' }, t.texto || ''),
              h('div', { className: 'testimonial-author' },
                h('div', {
                  className: 'author-avatar-placeholder',
                  style: { background: bgColor }
                }, (t.inicial || '?').toUpperCase()),
                h('div', {},
                  h('span', { className: 'author-name' }, t.nombre || 'Autor'),
                  h('span', { className: 'author-role' }, t.rol || '')
                )
              )
            );
          })
        )
      );
    }
  });
  CMS.registerPreviewTemplate('testimonios', TestimoniosPreview);


  /* ════════════════════════════════════════════
     DOCUMENTOS
  ════════════════════════════════════════════ */
  var DocumentosPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var lista = entry.getIn(['data', 'lista']);
      var items = lista ? lista.toJS() : [];

      if (items.length === 0) {
        return h('div', { className: 'preview-wrap' },
          h('span', { className: 'preview-label' }, '📄 Documentos'),
          h('div', { className: 'preview-empty' },
            h('i', { className: 'fas fa-file-alt' }),
            h('p', {}, 'Agrega documentos para verlos aquí')
          )
        );
      }

      return h('div', { className: 'preview-wrap documentos-preview' },
        h('span', { className: 'preview-label' }, '📄 Documentos'),
        h('div', { className: 'doc-list' },
          items.map(function (doc, i) {
            return h('div', { className: 'doc-item', key: i },
              h('div', { className: 'doc-icon' }, h('i', { className: 'fas fa-file-pdf' })),
              h('div', { style: { flex: 1, minWidth: 0 } },
                h('div', { className: 'doc-name' }, doc.nombre || 'Sin nombre'),
                h('div', { className: 'doc-url' }, doc.url || '')
              ),
              h('i', { className: 'fas fa-external-link-alt', style: { color: '#ccc', fontSize: '0.85rem' } })
            );
          })
        )
      );
    }
  });
  CMS.registerPreviewTemplate('documentos', DocumentosPreview);


  /* ════════════════════════════════════════════
     FAQ
  ════════════════════════════════════════════ */
  var FaqPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var lista = entry.getIn(['data', 'lista']);
      var items = lista ? lista.toJS() : [];

      if (items.length === 0) {
        return h('div', { className: 'preview-wrap' },
          h('span', { className: 'preview-label' }, '❓ Preguntas frecuentes'),
          h('div', { className: 'preview-empty' },
            h('i', { className: 'fas fa-question-circle' }),
            h('p', {}, 'Agrega preguntas para verlas aquí')
          )
        );
      }

      return h('div', { className: 'preview-wrap faq-preview' },
        h('span', { className: 'preview-label' }, '❓ Preguntas frecuentes'),
        h('div', { className: 'faq-list' },
          items.map(function (faq, i) {
            var isFirst = i === 0;
            return h('div', { className: 'faq-item' + (isFirst ? ' active' : ''), key: i },
              h('div', { className: 'faq-question' },
                faq.pregunta || 'Pregunta…',
                h('div', { className: 'faq-icon' }, isFirst ? '−' : '+')
              ),
              isFirst
                ? h('div', { className: 'faq-answer' }, faq.respuesta || '')
                : null
            );
          })
        )
      );
    }
  });
  CMS.registerPreviewTemplate('faq', FaqPreview);


  /* ════════════════════════════════════════════
     GALERÍA
  ════════════════════════════════════════════ */
  var GaleriaPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var lista = entry.getIn(['data', 'lista']);
      var items = lista ? lista.toJS() : [];

      if (items.length === 0) {
        return h('div', { className: 'preview-wrap' },
          h('span', { className: 'preview-label' }, '🖼️ Galería'),
          h('div', { className: 'preview-empty' },
            h('i', { className: 'fas fa-images' }),
            h('p', {}, 'Agrega fotos para verlas aquí')
          )
        );
      }

      return h('div', { className: 'preview-wrap galeria-preview' },
        h('span', { className: 'preview-label' }, '🖼️ Galería de fotos'),
        h('div', { className: 'gallery-grid-preview' },
          items.map(function (img, i) {
            var extraClass = img.clase && img.clase !== 'normal' ? ' ' + img.clase : '';
            return h('div', { className: 'gallery-item-preview' + extraClass, key: i },
              img.src
                ? h('img', { src: img.src, alt: img.alt || '' })
                : h('div', { className: 'gallery-placeholder' },
                    h('i', { className: 'fas fa-image' }),
                    h('span', {}, img.alt || 'Sin imagen')
                  ),
              img.label
                ? h('span', { className: 'gallery-label-preview' }, img.label)
                : null
            );
          })
        )
      );
    }
  });
  CMS.registerPreviewTemplate('galeria', GaleriaPreview);

})();
