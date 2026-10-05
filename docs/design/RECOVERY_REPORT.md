# Recuperación de Tiago Systems

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
