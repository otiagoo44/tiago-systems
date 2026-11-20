# Auditoría previa · 20/11/2026

Antes de modificar la aplicación se inspeccionó `e549be0`, igual a origin/main y al HTML renderizado de producción. Rama de trabajo: `codex/dentflow-kit-preview`. El único contenido ajeno sin seguimiento al inicio era `kit-separado-y-zip/`; se conserva completo.

## Stack y funcionamiento

React 19.3.0, TypeScript 5.9.3, Vite 6.4.3 (versiones instaladas verificadas), npm/package-lock. Sin router: una página `/` con anclas. Sin configuración Vercel versionada, variables ni servicios backend necesarios para la landing. Proyecto Vercel GitHub `otiagoo44/tiago-systems`, proyecto `prj_1yPtZTuIVBAthOUoKoZaqfVRxaOK`, equipo `team_fHImRjkE8m0NyoHDOZHtaNH1`.

Navegación: `#inicio`, `#enfoque`, `#dentflow`, `#proceso`, `#preguntas`, `#demo-crm`, además de equipo, prueba, encaje, fundador y contacto. Cinco enlaces comerciales WhatsApp, tres mensajes contextuales y número `595993367341`. Redes: Instagram Tiago Systems, Instagram y TikTok DentFlow. Sin formulario comercial activo; los formularios de la demo son sintéticos. Sin tracker/proveedor analítico: no añadir uno. Google Fonts (DM Sans/Space Grotesk), Lucide y fotos reales del fundador. SEO canónico y social presentes.

Demo: reducer compartido entre hero y CRM, consultas ficticias, filtros, pendientes, contacto simulado, agenda, asistencia, análisis, tour, diálogos nativos y reset. No hace requests al CRM ni envía WhatsApp. Preservar sus contratos y pruebas.

## Archivos reales

Ubicación: `kit-separado-y-zip/`. `evidence/kit/kit-audit.json` registra tamaños, SHA-256, texto de todas las páginas, fórmulas y validaciones del XLSX. ZIP: 173225 bytes; cuatro entradas, CRC válido y comparación binaria idéntica con los cuatro originales. PDF guía: 11 páginas; checklist: 2. XLSX abre con openpyxl en lectura: INICIO, CONSULTAS, RESUMEN, LISTAS, 613 fórmulas y 5 validaciones. No se guarda ni modifica. TXT: contenido completo con campos editables y fuentes. Observación editorial: ambos PDF dicen Edición de trabajo, 18/11/2026; no se corrigen.

## Evidencia y hallazgos

Capturas nuevas antes de editar: `evidence/kit/before-{320,360,390,768,1440}.png` y `production-*.png`. Medición `baseline.json`. Hero sin scroll horizontal global en las cinco medidas, CTA comercial visible. En 320px el botón comercial usa dos líneas y el bloque ocupa casi todo el alto; la jerarquía móvil puede compactarse sin cambiar su mensaje. La entrada del hero llega a 1s + 150ms de demora frente a 220ms en vistas y diálogos; homogeneizar entradas en 450–650ms, con desplazamiento menor y contenido visible. El observer de secciones no cancela animaciones al cambiar a reduced-motion en vivo. Hover de enlaces anima gap y puede desplazar contenido. No afirmar problemas adicionales sin pruebas. Pruebas iniciales: 10/10 pasan; build en ejecución al redactar.

## Plan incremental de archivos

- `src/App.tsx`, `src/siteConfig.ts`: enlace visible al kit, bloque propio y ZIP; preservar textos comerciales, anclas y demo.
- `src/styles.css`, `src/demo/demo.css`: duración/easing coherentes, reduced-motion, refinamientos móviles y azules informativos sobre base negra/dorada.
- `src/resources/*`, `recursos/index.html`, scripts de preparación: página HTML estática generada con React en build, TXT íntegro copiable, transcripción completa por páginas de los PDF y explicación del XLSX. Funciona sin JavaScript salvo copiar. Mantener React/Vite, sin router o bibliotecas de visores.
- `public/recursos/`: copias binarias exactas generadas de los cinco originales, fuera del bundle JS.
- `index.html`: fallback sin JS con enlaces principales; `public/sitemap.xml`, configuración multipágina Vite y package scripts.
- pruebas y scripts de navegador: integridad, descarga, clipboard, teclado, viewport/reduced-motion y regresión comercial.
- `DESIGN.md`, `RECOVERY_REPORT.md`: procedencia de paleta y evidencia de esta revisión.

## Dirección

Landing B2B para clínicas, seria y editorial; diales 6/4/3. Evolución del diseño existente, no rediseño total. Tokens negros/dorados aprobados del repositorio prevalecen sobre la antigua pasada azul de fd03ccb. Autoeditor usa tonos candidatos, no HEX oficiales. Se conserva Space Grotesk/DM Sans: no transplantar las fuentes de videos. Referencias visuales abiertas: GAZU (escala/aire), URBANX (contraste/CTA), Formix (profundidad oscura), y las tres capturas anónimas DentFlow (densidad/estados). Referencia adicional Awesome Design MD: Vercel, para jerarquía de acciones y bordes; se descartan paleta, fuentes y gradientes ajenos. UI UX Pro Max propuso neumorfismo/cian/testimonios, descartados por incompatibilidad con el brief; se aplican sus reglas de legibilidad, foco y touch. Taste e Impeccable guían composición, movimiento y revisión real.
