# Sistema visual de Tiago Systems

## Dirección

La página combina una composición editorial con evidencia de producto. Titulares grandes, márgenes generosos y alternancia de superficies oscuras y claras ordenan el relato. El naranja identifica acciones y detalles de orientación; no compite con las capturas de DentFlow.

Las referencias locales inspiraron jerarquía, ritmo y presencia del producto. No se trasladaron sus fotografías, métricas, promesas ni estructuras comerciales.

## Tokens implementados

| Uso | Valor |
| --- | --- |
| Fondo principal | `#101210` |
| Fondo oscuro secundario | `#1b1e1b` |
| Superficie clara | `#f5f3ec` |
| Superficie clara alterna | `#ece9df` |
| Acento naranja | `#f27b50` |
| Acento para texto en claro | `#a7482b` |
| Texto sobre oscuro | `#f5f3ec` |
| Texto secundario sobre oscuro | `#b8bcb6` |

Las variables de color viven en `src/styles.css`. Los títulos usan **Space Grotesk** y el cuerpo **DM Sans**, con alternativas del sistema. Los encabezados emplean tamaños fluidos con `clamp()`, interlineado ajustado y espaciado negativo moderado. El ancho de contenido llega a **1360 px** y los márgenes se reducen en 1100 y 760 px.

## Composición

- Header oscuro persistente, con navegación breve y CTA.
- Hero de dos columnas en escritorio: propuesta concreta a la izquierda y captura adaptada a la derecha. En tablet y móvil se apilan sin recortar la imagen.
- Enfoque editorial con tres momentos del proceso separados por líneas, seguido de una idea central.
- DentFlow en galería de pestañas y pantalla completa, con función y utilidad explicadas. La imagen mantiene proporción y `object-fit: contain`.
- Proceso numerado, sección del fundador con un marco de retrato reemplazable y FAQ con ancho de columnas flexible.
- Contacto en superficie naranja. El enlace directo usa el WhatsApp público configurado.

## Movimiento e interacción

El hero entra con opacidad y traslación sutil. Las secciones se animan al entrar en vista mediante Web Animations; el contenido permanece visible si el observador falla. Pestañas, botones, menú y FAQ tienen transiciones breves. Los cambios usan principalmente `transform` y `opacity`. `prefers-reduced-motion` elimina animaciones y desplazamiento suave.

Las pestañas usan flechas, Inicio y Fin; la imagen se puede ampliar en un diálogo. El menú móvil cierra con Escape o al elegir un enlace. Los controles tienen foco visible y áreas táctiles de al menos 44 px.

## Uso de imágenes

Las imágenes de DentFlow son derivados anonimizados de capturas reales, con datos de ejemplo señalados dentro y fuera de la imagen. Esta decisión permite mostrar el producto sin publicar información privada. La foto del fundador sigue pendiente; el monograma dentro de su marco es un placeholder explícito.
