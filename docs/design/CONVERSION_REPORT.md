# Revisión comercial de Tiago Systems / DentFlow

Inicio de la revisión comercial: 4 de octubre de 2026. Finalización y retrato autorizado: 5 de octubre de 2026. Base: `b4d9f7b`, `main`. La continuación recibió los cambios comerciales sin commit y los conservó. Alcance autorizado: estructura, copy, conversión, SEO, acabado visual con las skills instaladas, retrato real y commit + push a main.

## Arquitectura y copy

Header → hero → problema → modelo de cuatro preguntas → DentFlow con demo → recepción/dirección → implementación → prueba disponible → encaje → fundador → FAQ → CTA final → footer.

La sección de recurso gratuito se renderiza entre FAQ y contacto únicamente cuando `site.resource` tiene una configuración real. Actualmente es `null` y no hay CTA público ni URL inventada.

Hero:

- Eyebrow: DENTFLOW · SISTEMA PARA CLÍNICAS ODONTOLÓGICAS.
- H1: Que ninguna consulta quede sin próximo paso.
- Descripción: DentFlow organiza el estado, responsable, próxima acción y fecha de cada consulta para que recepción y dirección sepan qué sigue, sin depender de la memoria ni revisar chat por chat.
- CTA principal: Revisar el seguimiento de mi clínica.
- CTA secundario: Ver DentFlow en acción.
- Microcopy: Primero revisamos cómo trabajan hoy. Ahí vemos si DentFlow encaja.

Se sustituyó la apertura filosófica por cuatro situaciones reconocibles, sin afirmar pérdidas de pacientes o dinero. El mapa interactivo pasó después de esas situaciones y ahora explica estado, responsable, próxima acción y fecha. Se conservan sus botones, selección, diagrama animado y región de anuncio.

El listado genérico de capacidades y el bloque breve de encaje se integraron en dos secciones más útiles: recepción/dirección y para quién tiene sentido. El proceso numerado ahora explica revisión, configuración, prueba y capacitación. Se agregó prueba disponible basada en acciones comprobables de la demo, sin logos, clientes, testimonios ni resultados inventados. El fundador conserva su historia y fallback; se incorpora su apellido en la presentación. Las nueve FAQ responden objeciones concretas. El cierre se enfoca en el seguimiento de la clínica.

## WhatsApp y verdad de producto

`getContactHref()` y `whatsappMessages` centralizan número y codificación. `ContactLink` comparte comportamiento, apertura y atributos seguros. Se conservó `+595 993 367341`.

| Ubicación | CTA | Mensaje |
| --- | --- | --- |
| Header y hero | Revisar mi seguimiento / Revisar el seguimiento de mi clínica | Hola Tiago. Vi DentFlow y quiero revisar cómo estamos gestionando el seguimiento de consultas en nuestra clínica. |
| Después de la demo | Quiero revisar si esto encaja con mi clínica | Hola Tiago. Probé la demo de DentFlow y quiero revisar si podría aplicarse a nuestra clínica. |
| Cierre | Revisar mi proceso por WhatsApp | Hola Tiago. Vi la página de DentFlow y me gustaría revisar nuestro proceso actual de seguimiento. |

Los enlaces abren un borrador de conversación: enviar sigue siendo una decisión humana. Los clics de QA se interceptaron antes de abrir WhatsApp. No se envió ningún mensaje. La demo continúa completamente sintética y en memoria, con un único reducer compartido por hero y producto.

La explicación del ingreso desde una landing sigue el contenido preexistente y la guía de coordinación del repositorio. No se afirma importación automática de chats o mensajes sociales. Se prueba agendamiento dentro de la consulta: esta demo no tiene una pestaña Agenda independiente. No se accedió a Supabase ni al CRM productivo.

## Identidad, referencias y skills aplicadas

Lectura: landing B2B para clínicas que llegan desde contenido social y necesitan entender el problema, explorar producto y decidir si conversar. Lenguaje sobrio, editorial y tecnológico. Diales preservados: composición 6, motion 4, densidad comercial 3; mayor densidad dentro del producto.

Se leyeron las cinco skills vendorizadas y sus guías de coordinación. Todas estaban disponibles en el catálogo.

- **Awesome Design MD:** se inspeccionaron visualmente GAZU, URBANX y Formix, además de `dentflow-resumen-publico.png`, `dentflow-pendientes-publico.png` y `dentflow-analisis-publico.png`. Se leyeron Linear como referencia de profundidad por superficies e interfaz protagonista y Resend para ritmo editorial oscuro. Se preservan jerarquía, acento contenido, divisores, marcos y ritmo existentes; no se copian paletas, fuentes, retratos ni claims de terceros.
- **UI UX Pro Max:** búsquedas locales verificadas `orphan heading line balance` (UX) y `state derived values` (React). Se aplican saltos naturales con `text-wrap: balance`, encabezados semánticos y conservación de los valores derivados del reducer. Python se resolvió desde la instalación de uv porque el alias del sistema abría Microsoft Store.
- **Google DESIGN.md:** el documento ya tenía la identidad negra/dorada reconciliada. Se actualizaron las reglas narrativas, CTA y composición del fundador. CLI oficial vendorizada 0.4.0: cero errores y cero advertencias. Ningún token de color cambió.
- **Taste:** modo conservación; público y propósito gobiernan composición. Se mantienen Space Grotesk y DM Sans, escalas, contenedores, paleta y animaciones. La instrucción expresa del usuario prevalece sobre heurísticas genéricas de rediseño, límites de bloques o cambio de stack.
- **Impeccable:** inspección de capturas reales, desbordes, estados, teclado, foco, semántica, legibilidad y enlaces. No se ejecutó ni se afirma disponer de la CLI original de Impeccable.

Comparación tipográfica: mismas familias y escala general; el H1 pierde el salto forzado antiguo para adaptarse al nuevo texto. Se ajustan composición de cuatro situaciones, columnas de decisión y wrapping de CTAs largos. La única escala nueva es el nombre del fundador (48–174 px), en Space Grotesk y sin sustituir el encabezado ni el cuerpo. Motion: se preservan entrada escalonada del hero, asentamiento del producto, revelados, cambio de mapa, pestañas, diálogos y FAQ. La corrección del menú hace inmediata su visibilidad para permitir foco, manteniendo sus transiciones de opacidad y desplazamiento. Reduced motion conserva contenido y controles.

## QA y hallazgos resueltos

- `npm test`: 10/10 tests, antes y después. El test de render agrega protección de arquitectura, H1, enlaces prellenados, metadatos y recurso ausente. La suite del reducer conserva cobertura de contacto, no respuesta, desinterés, agenda, asistencia, estados, historial, filtros, agrupaciones, recorrido y reinicio.
- `npm run build`: TypeScript + Vite, correcto. No existe script ESLint en el repositorio; no se afirma haberlo ejecutado.
- `git diff --check`: sin errores de whitespace. Sin modificaciones a `src/demo/*`, `package.json` o lockfile.
- Chromium sobre build de producción: **375, 430, 768, 1024 y 1440 px**, sin scroll horizontal ni elementos fuera del viewport, todos los destinos internos existentes. Capturas de todas las secciones a 375 y 1440; hero en los cinco tamaños. El header se oculta sólo durante las capturas largas de secciones para evitar superposiciones artificiales; se prueba visible en navegación y capturas de hero.
- Demo manual a 375 y 1440: búsqueda con acentos, filtros combinados, resultados vacíos, limpieza, selección, responsable, simulación, cancelación, Escape, focus trap, retorno del foco, fecha inválida, cita válida, asistencia, historial, análisis y reinicio. Cifras compartidas verificadas: `10/8/6` → contacto `10/9/6` → cita `10/9/7` → reinicio `10/8/6`.
- Recorrido guiado completo, reinicio y cancelación; mapa de cuatro preguntas; nueve FAQ mediante teclado; pestañas con flechas/Inicio/Fin.
- Menú móvil: corregido fallo preexistente en foco del primer enlace causado por transición de `visibility`. Escape devuelve foco; cada enlace cierra el menú.
- Corregidas etiquetas ARIA de dos contenedores mediante `role=group` y `nav`; se agregó un espacio textual entre las dos líneas del logo para alinear nombre visible y accesible sin cambiar su apariencia.
- Cinco enlaces WhatsApp, tres mensajes distintos, número y codificación verificados. Todos los clics comerciales probados sin envío. Se conservaron exactamente los enlaces de redes del repositorio; no se declara disponibilidad de esas plataformas externas autenticadas.
- Sin errores de consola ni solicitudes fallidas en la regresión completa. Reduced motion: scroll inmediato, contenido visible, cero animaciones de entrada activas.
- Auditoría final del 5 de octubre, Axe 4.13.0: cero violaciones automáticas a 375 y 1440 px, 44 comprobaciones aprobadas en cada vista. Sus comprobaciones de contraste sobre gradientes quedan como revisión manual; no se presenta como certificación WCAG. Evidencia: [axe-final.json](evidence/conversion/axe-final.json).

## Cierre visual y técnico del 5 de octubre

Se abrió el retrato original real y se comparó con la composición anterior. La solución evita la foto completa en un marco al lado de texto: primer plano centrado, máscaras CSS vertical/horizontal para fundir los bordes, nombre superpuesto en la zona inferior sin cubrir el rostro, y relato debajo. No usa IA, stock ni recorte destructivo del original. UI UX Pro Max aportó la comprobación local `image aspect ratio layout shift`: dimensiones reservadas, WebP y fuentes responsive. No se añadieron dependencias ni librerías de animación.

Se inspeccionaron las capturas finales del hero en los cinco anchos, fundador a 375/1440, problema y producto, equipo, implementación, prueba, encaje, FAQ, cierre, diálogo, análisis y reduced motion. No se atribuyen al 5 de octubre los archivos históricos `before-1264.png`, `lighthouse-initial.json`, `lighthouse.json` y `axe.json` recibidos en la continuación.

Build final: JS 287.81 KB / 87.35 KB gzip; CSS 55.75 KB / 10.82 KB gzip. Los dos retratos suman ~112 KB y se cargan diferidos con selección responsive. Tests finales: 10/10; TypeScript y Vite sin errores; ningún cambio en `src/demo/*`, dependencias o lockfile. La regresión completa distingue el 404 provocado a propósito para probar el monograma de los errores normales (cero).

Lighthouse 13.5.0 móvil, preview local de producción y emulación throttled, sin otras pruebas de navegador concurrentes: rendimiento **88**, accesibilidad **100**, buenas prácticas **100**, SEO **100**; FCP/LCP 2.8 s, TBT 90 ms, CLS 0. No es medición de usuarios reales ni garantía de puntuación constante. Quedan oportunidades de carga de fuentes/CSS y JavaScript no usado en el primer viewport; no se alteró la arquitectura de la demo sólo para optimizar una puntuación. Evidencia: [lighthouse-final-mobile.json](evidence/conversion/lighthouse-final-mobile.json).

Archivos de entrega: `src/App.tsx`, `src/siteConfig.ts`, `src/styles.css`, ambos WebP del fundador, `index.html`, `public/robots.txt`, `public/sitemap.xml`, `tests/render.test.mjs`, `scripts/verify-landing.mjs`, `DESIGN.md`, `README.md`, estos informes y evidencia. Sin migración de stack ni cambios al producto real.

## SEO y entrega

Título: `Tiago Systems | Sistemas para Clínicas Odontológicas`. Descripción enfocada en consultas, responsables, próximas acciones y seguimiento. Open Graph y Twitter coherentes. Se conserva `lang=es-PY`, canonical, favicon e imagen OG original; el alt de esa imagen sigue describiendo su contenido real. `robots.txt` y sitemap incorporados para la URL canónica, corrigiendo el fallback HTML que Lighthouse encontraba en robots.

La foto profesional entregada por el propietario está configurada en `site.founder.photo` y `photoMobile`. WebP de 900 × 1125 (~90 KB) y 480 × 600 (~22 KB), srcset, alt descriptivo, dimensiones y carga diferida. Composición editorial con retrato centrado, bordes fundidos, nombre superpuesto debajo del rostro y narrativa en otro nivel. No se generó ni retocó la persona. Para el recurso gratuito, aún hace falta una URL pública funcional, título, descripción y texto del CTA. Su ausencia no bloquea los caminos actuales.

La verificación responsive se realizó con viewports emulados, no dispositivos físicos ni los navegadores embebidos de Instagram/TikTok. No se midió una mejora de conversión con tráfico real. La lógica de producto, tipografía, assets y dependencias se preservan.

Evidencia reproducible: `scripts/verify-landing.mjs` y [browser-report.json](evidence/conversion/browser-report.json). Capturas y auditorías en [evidence/conversion](evidence/conversion/).
