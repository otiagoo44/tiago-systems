# Recuperación de Tiago Systems

## Kit Agenda y Seguimiento · 20 de noviembre de 2026

Esta revisión sustituye las notas históricas de recurso pendiente y autorización para publicar. La instrucción vigente permite una **versión de prueba**. No se modifica producción ni se envían mensajes reales. Rama: `codex/dentflow-kit-preview`, base `e549be09cab612482b1bee3347551589cc660e2d`, verificada contra origin/main y el SHA de producción de Vercel. Auditoría previa y plan de archivos: [KIT_AUDIT.md](KIT_AUDIT.md).

### Cambios y archivos

- `src/App.tsx`, `src/siteConfig.ts`: enlace al kit desde menú/hero, bloque destacado con dos rutas y descarga ZIP; se mantienen CTAs comerciales, redes, anclas, fundador y lógica compartida de la demo.
- `src/styles.css`, `src/demo/demo.css`: hero móvil más compacto, azul informativo sobre negro/dorado, entrada de producto más discreta, sin vaivén largo, entradas coherentes y cancelación de movimiento al activar reduced-motion en vivo. No se añaden librerías.
- `src/resources/ResourcesPage.tsx`, `resources.css`, `copy.ts`, `files.ts`, `kit-content.json`: biblioteca con guía completa en páginas desplegables tituladas, checklist con sus nueve preguntas en lectura móvil y transcripción completa alternativa, apertura PDF original, TXT íntegro/copiar con confirmación y fallback si el portapapeles está bloqueado; XLSX con explicación de las cuatro pestañas y muestra estática original ficticia. No hay visor falso, edición online ni cálculos simulados.
- `scripts/prepare-resources.mjs`, `vite.config.ts`, `package.json`: dos entradas Vite. React renderiza recursos a HTML en preparación; esa página no descarga el runtime React ni los PDF/XLSX al entrar. Sólo un módulo pequeño mejora la copia. Acceso y lectura funcionan sin JavaScript. El build comprueba hashes antes de copiar los originales al directorio público.
- `index.html`: enlaces principales sin JavaScript; `public/sitemap.xml`: nueva página; `vercel.json`: MIME correcto para XLSX/TXT y descarga ZIP/XLSX; `.gitattributes`: evita que Git transforme saltos del TXT original. `.gitignore`: excluye sólo las copias generadas y el HTML generado.
- Auditoría binaria/documental en `scripts/audit-kit.py`; test de integridad/contenido en `tests/resources.test.mjs`; `scripts/verify-kit.mjs` cubre navegador. El verificador histórico admite salida separada para conservar evidencias anteriores. Los servidores SSR de pruebas desactivan HMR y escaneo cliente. El runner ejecuta los archivos secuencialmente porque las dos pruebas SSR de Vite comparten el puerto WebSocket por defecto; esto evita su aviso de puerto ocupado sin quitar comprobaciones.

### Recursos reales y rutas públicas

Los originales permanecen intactos en `kit-separado-y-zip/`. El build genera las siguientes copias, fuera del bundle JS:

| Ruta del mismo dominio | Bytes | Comprobación |
| --- | ---: | --- |
| `/recursos/Dentflow_Kit_Gratuito_Publico.zip` | 173225 | CRC válido, exactamente los cuatro archivos, comparación binaria idéntica |
| `/recursos/Dentflow_Kit_Guia_Practica.pdf` | 114094 | 11 páginas y texto completo |
| `/recursos/Dentflow_Mega_Prompt_Web_Odontologica.txt` | 8249 | Contenido completo y campos entre corchetes |
| `/recursos/Dentflow_Planilla_Seguimiento.xlsx` | 32153 | INICIO, CONSULTAS, RESUMEN, LISTAS; 613 fórmulas y 5 validaciones |
| `/recursos/Dentflow_Checklist_Diagnostico.pdf` | 83658 | 2 páginas, 9 preguntas, sin puntuación científica |

Página: `/recursos/` (también se puede acceder por `/recursos`). ZIP: **169,2 KiB / 173225 bytes**. [Auditoría y SHA-256](evidence/kit/kit-audit.json). Los cinco GET locales devuelven 200, MIME apropiado y exactamente los hashes originales. Se probaron clics de descarga reales de los cinco archivos y apertura del PDF en otra pestaña, además de los href. No se creó proveedor de analítica porque no existía uno activo/consentido.

Observación editorial conservada: ambos PDF dicen «Edición de trabajo · 18 de noviembre de 2026». No se reescribieron documentos, fórmulas ni fuentes. Se advierte que proveedores pueden cambiar planes/interfaz. No se ofrecen pacientes, ranking SEO, integraciones automáticas ni un chatbot terminado; el kit se distingue de DentFlow CRM y de una historia clínica.

### Referencias y decisiones verificadas

Se abrieron con visor de imágenes **GAZU, URBANX y Formix** del índice, y `dentflow-resumen-publico.png`, `dentflow-pendientes-publico.png`, `dentflow-analisis-publico.png`. Principios aplicados: escala y aire editorial de GAZU; contraste/claridad de CTA de URBANX; planos oscuros y protagonismo de producto de Formix; jerarquía, densidad y estados negro/dorado de las capturas DentFlow. No se copian modelos, colores de referencia, cifras o testimonios. También se renderizaron y abrieron la página de contenido de la guía y la checklist original para comprobar su presentación.

Skills leídas y aplicadas desde sus rutas reales: Awesome Design MD (referencia Vercel para jerarquía de acciones/bordes; se descartan sus colores, fuentes y gradientes), UI UX Pro Max (lectura móvil, touch, foco, reflow; se descarta su candidato cian/neumorfismo/testimonios por contradecir el brief), Google DESIGN.md (tokens vigentes/validator), Taste (evolución con diales 6/4/3, movimiento ligado a jerarquía), Impeccable (revisión funcional, responsive y visual con evidencia). Las cinco figuraban en el selector; no fue necesario inventar una instalación ni usar el CLI original de Impeccable.

Se consultaron `C:/Users/User/.codex/skills/autoeditor-animacion/SKILL.md` y `C:/htdocs/auto-editor/config/estilo.json`. Sus HEX son tonos propuestos, no códigos oficiales certificados. Se conservan los tokens vigentes y aprobados de este repositorio: negro `#05070B`, dorado `#D2B36C`, azul informativo `#70A5FF`. La instrucción azul de fd03ccb sigue sustituida; no había que volver a aplicar una recuperación de paleta ya completada en octubre.

Tipografía comparada: los candidatos 2504ab0/91c6541 y la landing vigente usan Space Grotesk/DM Sans; se mantienen familias y voz. Se descartan el nowrap y la escala de hasta 112px del primer candidato para este texto actual más largo. Desktop conserva su hero y 86px; móvil pasa del mínimo previo 47px a 38px y ~45px a 390px, con interlineado 1.08. Esto reduce el bloque sin perder el mensaje ni bajar el cuerpo de 16px. Recursos usa 35–70px en hero y cuerpo 16–18px, interlínea de lectura 1.8.

Movimiento comparado: 2504ab0 tenía flotación/breathing infinita de 7–8s; 91c6541 introducía entradas editoriales. El estado de octubre había quedado con entrada de producto 1s + demora y vaivén de 4.5s, revelados 620ms, mapa 300ms y vistas 220ms. Ahora: hero/revelados 560ms, producto 650ms sin vaivén, mapa 500ms, vistas/diálogos 450ms; feedback breve de estado conserva respuesta rápida. Desplazamientos de 10–12px y opacidad inicial 0.65–0.7 evitan texto completamente invisible. Se conserva movimiento por defecto y se elimina el no esencial en reduced-motion; el observer cancela las animaciones activas tras el evento de cambio de preferencia del navegador.

### Evidencia y validación

- Baseline **antes de editar** en la landing real de producción y local: 320×800, 360×800, 390×844, 768×900 y 1440×900. No había desborde horizontal global en el hero; se mejoró el ritmo/altura móvil sin atribuir fallos inexistentes. [Mediciones originales](evidence/kit/baseline.json).
- Build TypeScript/Vite correcto; **11/11 tests**; typecheck explícito correcto. El proyecto no tiene script de lint de código; no se afirma haber ejecutado ESLint. Lint oficial DESIGN.md: **0 errores / 0 advertencias**. Revisión React de dependencias, listeners, limpieza de effects, controles semánticos y ausencia de datos/runtime pesado en recursos.
- [QA del kit](evidence/kit/kit-browser-report.json): 10 combinaciones página/viewport correctas, sin scroll horizontal, CTA principal dentro del primer viewport, enlaces previos conservados, cuatro lecturas expandibles, 13 páginas completas, TXT completo copiado, fallback de portapapeles, navegación comercial y recursos, disclosures por teclado, apertura PDF y descargas reales. Windows normaliza los saltos del portapapeles a CRLF; el texto y las divisiones se conservan. El TXT descargado conserva los bytes originales.
- [Regresión de la landing/demo](evidence/kit/regression/browser-report.json): 375/430/768/1024/1440, sin overflow ni anclas rotas; búsqueda, filtros combinados/vacíos, contacto simulado, validación de cita, asistencia, métricas compartidas, análisis, recorrido guiado/reset, pestañas/foco, mapa, nueve FAQ, menú móvil y retrato/fallback. Cinco enlaces WhatsApp y tres mensajes contextuales preservados; ningún mensaje ni request al CRM privado.
- Axe con WCAG A/AA/2.1: **0 violaciones automáticas** en ambas páginas a 390 y 1440, incluidos los cuatro recursos expandidos. Esto no certifica WCAG ni sustituye una prueba manual con lector de pantalla.
- Reduced-motion: contenido disponible y cero animaciones en ejecución; también se probó activar la preferencia durante una entrada. Sin JavaScript: enlaces principales de la landing; biblioteca, PDF completo en HTML, TXT y descargas accesibles. Copiar oculta su botón sin JS y ofrece selección/descarga.
- Lighthouse móvil local de recursos: rendimiento **68**, accesibilidad/buenas prácticas/SEO **100**; LCP **1,82s**, CLS **0,007**, TBT **3577ms**. El primer ensayo dio 64; se conservan ambos JSON. Es una medición de laboratorio en este equipo, con throttling simulado, no de campo. El TBT es alto y requiere diagnóstico antes de promover: no se presenta el resultado como aprobación de rendimiento aunque la página sólo envía ~1,6KB de JS y no carga React/PDF/XLSX inicialmente. Archivo: `evidence/kit/lighthouse-resources-mobile.json`.

Capturas nuevas inspeccionadas: hero y recursos en 320/360/390/768/1440; bloque del kit, planilla, checklist y regresión de la demo en desktop/celular. Comparaciones: [móvil antes/después](evidence/kit/comparacion-movil.png), [desktop antes/después](evidence/kit/comparacion-escritorio.png). Página nueva: [recursos móvil](evidence/kit/resources-390.png), [recursos desktop](evidence/kit/resources-1440.png). Originales antes/después permanecen en `evidence/kit/`. No existía una página de recursos previa que se pudiera comparar como tal.

### Límites antes de producción

La revisión usa Chromium con viewports emulados, no teléfono físico ni navegador integrado de Instagram. La estructura del XLSX se abrió en lectura y sus fórmulas/validaciones se inventariaron; no se afirma recálculo probado en Excel o importación real a Sheets. La transcripción HTML conserva el texto completo, pero no la diagramación de tablas del PDF: el original siempre está disponible. Los planes de terceros se presentan como contenido fechado del kit, sin afirmar una nueva verificación contractual. Promover a producción requiere la aprobación explícita del usuario después de revisar la preview.

### Preview verificada en Vercel

Aplicación revisada en commit `bb862ddf4a9a82e0bd8b3444efcf3da8761a5c63`, rama `codex/dentflow-kit-preview`. Deployment `dpl_3Ep6rPM6xdHv7SDFV3KypqUQcyhw`, READY, entorno de prueba (target distinto de production): [abrir preview](https://tiago-systems-gcqlmgzja-ortegatiago733-2656s-projects.vercel.app/). Recursos: `/recursos/`. Vercel mantiene su protección; se generó un enlace temporal de revisión sin desactivarla. El parámetro temporal no se versiona.

`scripts/verify-kit-preview.mjs` pasó contra esa URL: los cinco recursos responden **200**, MIME apropiado y SHA-256 idéntico; ZIP descargado por clic; prompt completo copiado; navegación de recursos a DentFlow y cinco enlaces comerciales presentes. Sin errores JS y sin overflow a 390/1440. Capturas reales remotas y [reporte de preview](evidence/kit/preview/report.json) guardados. La espera de carga React después de navegar es explícita para evitar comprobar una página aún vacía.

Producción se volvió a consultar al terminar: sigue en `dpl_3rq59Dceovtz7PvEtYCDwbN55DGe`, commit `e549be09cab612482b1bee3347551589cc660e2d`. No se promovió ni se cambiaron dominios. El commit posterior de documentación/evidencia no cambia la aplicación de la preview probada.

Perfil directo local complementario: [resource-profile.json](evidence/kit/resource-profile.json), 356 nodos y cinco tareas mayores de 50ms (máxima 515ms). La red confirma sólo CSS, dos módulos JS pequeños y fuentes/favicón; no React, PDF, XLSX ni ZIP en la carga inicial. No se adjudica el TBT alto a una causa sin evidencia adicional: requiere perfilado específico y prueba de teléfono antes de producción.

---

> Cierre, 5 de octubre de 2026: foto profesional real incorporada y revisión comercial finalizada. La nota de foto pendiente al final de la recuperación histórica ya no aplica. El recurso gratuito permanece oculto porque no tiene URL real.

> Continuidad, 4 de octubre de 2026: la revisión comercial solicitada posteriormente conserva esta recuperación visual. La arquitectura, CTAs, evidencia nueva, comparación tipográfica/motion y QA están en [CONVERSION_REPORT.md](CONVERSION_REPORT.md). No se reemplazó la demo ni se modificaron sus archivos.

## Acabado final del 5 de octubre de 2026

Se retomaron los cambios comerciales sin commit sobre `main` (`b4d9f7b`) y se conservaron. Se leyeron completamente las cinco skills de diseño vendorizadas y sus recursos relevantes; estaban disponibles en el selector. Se abrió cada inspiración GAZU, URBANX y Formix del índice de referencias, los tres assets DentFlow públicos y la foto profesional real entregada. Se compararon los candidatos históricos `91c6541` y `2504ab0`, sin reemplazar archivos completos de versiones antiguas.

Principios aplicados: jerarquía editorial y protagonismo del producto (Linear), ritmo y espacio en superficies oscuras (Resend), contraste y acento dorado contenido, reutilización de divisores/grillas existentes, dimensiones reservadas y formatos responsive. La pareja Space Grotesk/DM Sans y las escalas generales se mantienen. La composición del fundador pasa de retrato enmarcado junto a texto a primer plano centrado, bordes fundidos, nombre 48–174 px y narrativa debajo. El rostro real no se modificó. Se preserva su copy exacto y un monograma accesible si falla la imagen.

Motion comparado: se conservan hero escalonado, asentamiento del producto, revelados, mapa operativo, pestañas, diálogos y FAQ. No hay bibliotecas nuevas ni pérdida de animación por defecto. La alternativa reduced-motion mantiene contenido y controles; el menú permite foco inmediato conservando sus transiciones.

Verificación final: tests 10/10, TypeScript/Vite correctos, lint oficial de DESIGN.md sin errores ni advertencias, `git diff --check` limpio. Chromium a 375/430/768/1024/1440 sin overflow ni anclas rotas; demo manual y guiada, citas, búsqueda, resumen compartido, teclado, WhatsApp prellenado sin envío y fallback del retrato comprobados. Axe 4.13.0: cero violaciones automáticas a 375/1440. Lighthouse móvil local: rendimiento 88, accesibilidad/buenas prácticas/SEO 100, CLS 0; no es certificación WCAG ni medición de campo. Se inspeccionaron capturas reales desktop/mobile, no sólo el build.

Evidencia final: [fundador desktop](evidence/conversion/sobre-tiago-1440.png), [fundador móvil](evidence/conversion/sobre-tiago-375.png), [hero móvil](evidence/conversion/hero-375.png), [regresión de navegador](evidence/conversion/browser-report.json), [accesibilidad](evidence/conversion/axe-final.json), [rendimiento](evidence/conversion/lighthouse-final-mobile.json). Arquitectura, copy, archivos y límites detallados en [CONVERSION_REPORT.md](CONVERSION_REPORT.md).

---

Fecha: 3 de octubre de 2026. Rama inicial: `feat/tiago-systems-landing`. El propietario pidió finalizar y después autorizó integrar y pushear todo a `main` para actualizar Vercel.

## Resultado y alcance

Se conservaron React 19 + TypeScript + Vite, el reducer compartido, los enlaces reales y todos los párrafos aprobados del fundador. Se integraron los avances negro/dorado que ya estaban sin commit y se completó su documentación, composición, contenido e interacción. Sin librerías de animación ni nuevas dependencias de la aplicación. Las herramientas de QA se ejecutaron desde el directorio temporal.

La página no necesitaba siete secciones nuevas. El hueco principal era mostrar cómo se pasa de un problema operativo a una decisión de diseño. Ahora el bloque Enfoque incluye un mapa interactivo con tres preguntas, un problema concreto, un recorrido de tres nodos y una salida comprensible. Se agregó una introducción que inicia el tour real de DentFlow y un bloque breve de encaje con clínicas. El texto del hero se acortó para mejorar lectura y acceso a los CTA. La FAQ conserva transparencia, datos ficticios y contacto humano.

No se inventaron clientes, resultados, precios, garantías, perfiles ni funciones. Se intentó consultar `instagram.com/tiago.systems/`, pero el proveedor devolvió bloqueo de lectura; no se extrajeron afirmaciones de ese perfil.

## Evidencia inspeccionada

Se abrieron con la herramienta de imágenes:

- `references/gazu.png`: contraste extremo de escala, jerarquía editorial y capas. Se retoma la presencia del titular y del producto, no modelos ni comercio de moda.
- `references/urbanx.png`: acción principal inequívoca, contraste y encuadres. Se descartan verde neón, productos, fotos y catálogo.
- `references/formix.png`: planos oscuros, profundidad contenida y encuadre de una persona. Se retoman superficies y marco del fundador; se descartan naranja, retrato ficticio, cifras y logos.
- Las tres capturas `src/assets/dentflow-{resumen,pendientes,analisis}-publico.png`: sidebar, selección dorada, embudo por etapas, cola de pendientes, análisis y énfasis contextual. Son referencias; la web sigue renderizando controles React, no capturas.

Se comparó el código histórico `2504ab0` y `91c6541`: ambos tenían Space Grotesk/DM Sans y titulares grandes; el inicial añadía flotación del producto y respiración ambiental continua. La versión 91c6541 conservaba entrada de hero, perspectiva y apariciones. No se restauraron archivos completos. La recuperación mantiene escala y carácter, conserva la entrada escalonada y usa un asentamiento acotado del producto en lugar de bucles decorativos permanentes.

## Aplicación efectiva de las skills

Se leyeron los cinco SKILL.md del repositorio, sus guías de coordinación y los recursos pertinentes. Todos estaban disponibles en el catálogo.

| Skill | Recurso / decisión aplicada |
| --- | --- |
| Awesome Design MD | Catálogo y DESIGN.md completos de Linear y Notion. Linear aporta superficies por niveles y producto protagonista; Notion, explicación visual del trabajo. Se descartan sus paletas, tipografías propietarias, precios y claims. Máximo dos sistemas seleccionados. |
| UI/UX Pro Max | Herramienta local consultada con `orphan heading line balance`, `keyboard focus modal`, `reduced motion transition` y stack React `responsive derived state`. Aplicados balance de titulares, foco visible, movimiento reducido y datos derivados sin efectos sincronizadores. Se leyeron quick-reference y pro-rules, distinguiendo unidades web y nativas. |
| Google DESIGN.md | Especificación y CLI incluidas. Migración del documento azul a YAML + ocho secciones. Lint oficial 0.4.0: cero errores, cero advertencias. Diff y export guardados; el export Tailwind es evidencia de tokens, no se importó en esta app de CSS propio. |
| Taste | Brief, diales, arquitectura/layout, movimiento, accesibilidad, protocolo de rediseño y preflight. Lectura: landing editorial para responsables de clínicas/equipos, orientada a comprender, explorar y contactar. Diales 6/4/3; variedad de composición, producto ancho y mapa con función. Las heurísticas se subordinan al brief: se conservan fuentes, Lucide y CSS sin migración. |
| Impeccable | Guía de revisión aplicada sobre capturas reales y acciones de navegador. Correcciones de foco, jerarquía de encabezados, contraste de controles y coherencia de tokens. No existe ni se invocó una CLI Impeccable. |

Apoyo técnico: skills de navegador, revisión React y despliegues de Vercel. Sin subagentes. No se modificaron licencias/procedencia de las adaptaciones.

## Composición, tipografía y movimiento

Identidad negro/azul muy oscuro con `{gold-primary: #D2B36C}`; azul sólo como token informativo secundario. CTA dorado con texto oscuro y estados semánticos separados. Las superficies oscuras recuperan diferencia de profundidad sin transformar secciones en paneles azules.

Space Grotesk sigue en títulos/cifras y DM Sans en cuerpo/interfaz. Hero hasta 86px, producto hasta 100px, fundador hasta 68px; móvil mantiene títulos protagonistas, texto de lectura de 16px y controles reales. El mapa alterna preguntas y diagrama; principios usan líneas; proceso una lista vertical; fundador conserva el espacio 5:6 sin foto falsa.

Movimiento: hero escalonado, entrada del producto, revelados por IntersectionObserver, microinteracciones de CTA, mapa de 300ms, vistas/diálogos de 220ms, menú y FAQ. No se bloquean acciones. Preferencia de movimiento reducido comprobada en navegador; también se consulta antes de revelar nuevos bloques durante la sesión.

## Revisión final de Impeccable

| Hallazgo | Gravedad / evidencia | Corrección |
| --- | --- | --- |
| DESIGN.md azul contradice la interfaz dorada | Alta: valores y texto del documento anterior | Un sistema único reconciliado; lint sin advertencias. |
| Falta explicar decisiones operativas | Media: contenido anterior enumera principios y funciones sin ejemplo del razonamiento | Mapa de trabajo interactivo y encaje con una clínica, integrados a bloques existentes. |
| Inicio de la demo poco contextual | Media: navegación y tour existentes, sin escenario concreto en el texto de producto | Introducción con Ana Demo y enlace que activa el mismo tour. |
| Shift+Tab desde el primer control del diálogo podía perder el foco de la página hacia el navegador | Alta: aserción fallida en revisión móvil | Bucle explícito de Tab/Shift+Tab entre controles del diálogo; repetición dirigida pasó. Escape y restitución del foco conservados. |
| Menú puede seguir abierto al salir con teclado | Media: revisión del cierre existente | Cierre al mover el foco fuera del header. |
| Resumen del hero saltaba de h1 a h3 | Baja: inspección de estructura | Encabezado h2 sin alterar la escala visual. |
| Metadatos sin imagen social ni URL canónica | Media: index.html | Imagen original 1200×630 y URL confirmada por homepage pública de GitHub + HTTP 200 de producción. |

Los cuatro anchos verificados no presentan desbordes, tampoco elementos fuera del viewport según medición DOM. Los campos usan un borde más distinguible, y las capturas de diálogos muestran foco dorado y superficies legibles. El reporte de contraste guarda pares computados y fondo compuesto para superficies planas; las imágenes, gradientes y todos los estados no están cubiertos por una certificación automática. Los pares representativos superan 4.5:1 (CTA: 9.99:1; texto secundario hero: 14.93:1; texto tenue sobre superficie CRM: 7.66:1).

## Verificación ejecutada

- `npm test`: 10/10 pruebas; reducer, agenda, filtros, cancelación, tour, métricas y render React. El test del fundador exige sus frases exactas.
- `npm run build`: TypeScript y Vite correctos. JavaScript ~281 kB / 85.5 kB gzip, CSS ~53 kB / 10.3 kB gzip. Sin dependencias nuevas de runtime.
- Lint oficial de DESIGN.md: 0 errores / 0 advertencias. No hay script ESLint en el proyecto, no se afirma haberlo ejecutado.
- Chromium local: 390, 768, 1024, 1440 px; capturas reales inspeccionadas, cero errores JavaScript y cero llamadas a WhatsApp/Supabase/CRM durante acciones de demo.
- UI: buscar Ana → abrir detalle → simular contacto → registrar cita → resumen 10/9/7 → hero 10/9/7 → análisis por fuente → reiniciar a 10/8/6.
- UI móvil: recorrido guiado completo hasta paso 6, diálogo y foco contenidos; menú, Escape, FAQ y pestañas por flechas/Fin. Alternativa reduced-motion y animación normal comprobadas.
- `git diff --check` sin errores de whitespace. Comprobaciones repetidas únicamente al cambiar código o corregir fallos concretos.

## Capturas y archivos

Las imágenes `before-1440.png` y `before-390.png` ya existían al inicio: muestran la versión azul y fueron abiertas para comparación; no se atribuye su captura a este turno. `start-1440.png` sí se capturó al empezar este trabajo y muestra los avances dorados sin commit que se conservaron.

- [Antes, versión azul desktop](evidence/before-1440.png) · [antes móvil](evidence/before-390.png).
- [Estado inicial de este turno](evidence/start-1440.png).
- [Después, página desktop](evidence/after-1440.png) · [después móvil](evidence/after-390.png).
- [Tablet 768](evidence/after-768.png) · [desktop 1024](evidence/after-1024.png).
- [Mapa operativo](evidence/approach-1440.png) · [CRM desktop](evidence/demo-1440.png) · [CRM móvil](evidence/demo-390.png).
- [Diálogo móvil](evidence/dialog-390.png) · [foco desktop](evidence/contact-dialog.png) · [movimiento reducido](evidence/reduced-motion-390.png).
- [Verificación UI](evidence/browser-review.json) · [revisión final y contraste](evidence/final-review.json) · [lint oficial](evidence/design-lint.json).

## Publicación y pendientes reales

Preparado para la integración Git existente: build `npm run build`, salida `dist`, producción `https://tiago-systems.vercel.app/`. Push a `main` autorizado por el propietario. El estado final del despliegue se debe verificar después del push, no deducir del build local.

Pendiente editorial opcional: foto profesional autorizada en `site.founder.photo`. Si se conecta otro dominio, actualizar canonical, og:url e imagen social absoluta. No hay integración de contacto imprescindible pendiente; el WhatsApp comercial está confirmado. No se promete compatibilidad probada en Safari, dispositivos físicos, lectores de pantalla ni Core Web Vitals de campo.
