# Sistema visual de Tiago Systems

## Dirección y alcance

Identidad oscura, técnica y editorial. Esta corrección conserva el orden de las secciones, las grillas, las familias tipográficas, el ancho de 1360 px, los puntos de adaptación y las animaciones del hero y de aparición. Las superficies antes claras ahora alternan entre fondo secundario y superficie; el contacto también es oscuro. El azul se reserva para acciones, orientación y detalles.

El título más largo del fundador usa una escala ajustada de 38–62 px para conservar sus dos columnas y la legibilidad. El retrato continúa en su marco de proporción 5:6. No se agregó ninguna fotografía ficticia.

## Tokens implementados

Definidos en `src/styles.css` y compartidos por la landing y `src/demo/demo.css`.

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg-main` | `#0B0F14` | Base y campos |
| `--bg-secondary` | `#111722` | Secciones y contenido de la demo |
| `--surface` | `#18212E` | Marcos, tarjetas y secciones alternas |
| `--surface-hover` | `#202C3D` | Hover y pistas de gráficos |
| `--text-primary` | `#F5F7FA` | Títulos y texto principal |
| `--text-secondary` | `#CBD5E1` | Cuerpo de texto |
| `--text-muted` | `#A8B3C5` | Contexto, fechas y bordes de campos |
| `--brand-primary` | `#2563EB` | CTA principal, selección de texto |
| `--brand-hover` | `#1D4ED8` | Hover del CTA |
| `--brand-highlight` | `#93C5FD` | Foco, enlaces, selección y gráficos |
| `--brand-subtle` | `rgba(37,99,235,.10)` | Fondo de estados activos |
| `--border` | `rgba(255,255,255,.09)` | Separadores |
| `--border-hover` | `rgba(255,255,255,.16)` | Marcos |
| `--success` | `#4ADE80` | Confirmación y tratamiento iniciado |
| `--danger` | `#FB7185` | Errores y seguimiento cerrado por desinterés |

Los botones principales tienen texto blanco `#FFF`: contraste calculado de 5.17:1 sobre el azul principal. Texto tenue sobre la superficie hover: 6.66:1; azul claro sobre superficie: 8.99:1. Los gráficos usan azul claro para superar 3:1 contra su pista. Los estados incluyen texto o iconos, además del color. Estas comprobaciones de tokens no sustituyen una auditoría visual del navegador.

## Tipografía y composición

**Space Grotesk** en titulares y cifras; **DM Sans** en texto e interfaz. Se conservan los encabezados fluidos, el ritmo de secciones, el header persistente, el proceso numerado, la FAQ y el espacio del fundador. El hero mantiene su marco con perspectiva y ahora muestra una vista HTML calculada desde el mismo estado de la demo.

La demo ocupa el marco de la galería existente. Tiene cuatro vistas con navegación compacta, métricas de tamaño estable, gráficos horizontales y filas de consultas. En móvil las filas y formularios se reorganizan como bloques legibles; no se escala una aplicación de escritorio. Los diálogos tienen un máximo de `100dvh - 32px` y scroll propio.

## Movimiento y accesibilidad

Se conservan `hero-enter`, `hero-visual-enter` y el observador de aparición de secciones. El contenido es visible por defecto si falla el observador. Las nuevas vistas y diálogos entran en 220 ms mediante opacidad y traslación de 5 px. No se animan contadores. `prefers-reduced-motion` elimina el movimiento.

Las pestañas admiten flechas, Inicio y Fin, con roles y estados completos. Los diálogos nativos restringen el foco, cierran con Escape y devuelven el foco al control anterior o a la vista activa. Las acciones se anuncian mediante `role="status"`; los errores usan `role="alert"`. Los controles tienen un mínimo de 44 px de alto.

## Producto y privacidad

La demo es HTML/React, con un único reducer. El embudo conserva etapas alcanzadas; los conteos por etapa actual son una lectura separada. Búsqueda, filtros, pendientes y análisis derivan de las mismas consultas. El hero también refleja sus cambios.

Todos los nombres y teléfonos son ficticios. Los contactos se simulan dentro de un diálogo, sin abrir WhatsApp ni llamar al CRM. El WhatsApp comercial autorizado pertenece a los CTA de la landing. Los enlaces para conocer DentFlow llevan a la sección pública; el acceso privado fue retirado.

Las capturas anteriores se conservan como archivos de referencia, sin importarlas en la aplicación ni incluirlas en el build. La demo retoma la jerarquía de resumen, pendientes y embudo del producto; no utiliza capturas como controles.

## Revisión

Se aplicó la skill disponible `vercel:react-best-practices`: componentes separados, inicialización perezosa del reducer, cálculos derivados sin efectos sincronizadores, TypeScript estricto y sin dependencias adicionales. `google-design-md`, `ui-ux-pro-max`, `taste` e `impeccable` no estaban instaladas; no se afirma haberlas ejecutado.

Pendiente: revisión visual y de teclado en navegador a 360–390, 768, 1024 y 1440 px. El navegador conectado denegó la URL local por una preferencia guardada.
