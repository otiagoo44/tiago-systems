---
version: alpha
name: Tiago Systems · Negro y dorado
description: Marca de Tiago Ortega y presentación interactiva de DentFlow.
colors:
  primary: "#D2B36C"
  primary-hover: "#E2C67F"
  on-primary: "#05070B"
  background: "#05070B"
  background-secondary: "#080B11"
  background-alternate: "#0A0F17"
  surface: "#0D1420"
  surface-raised: "#101927"
  surface-hover: "#172335"
  text: "#F6F7F9"
  text-secondary: "#D9DEE7"
  text-muted: "#9CA8B9"
  primary-subtle: "rgba(210,179,108,.08)"
  info: "#70A5FF"
  border: "rgba(255,255,255,.09)"
  border-hover: "rgba(255,255,255,.16)"
  border-control: "#647185"
  success: "#4ADE80"
  danger: "#FB7185"
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 86px
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: -0.065em
  heading:
    fontFamily: Space Grotesk
    fontSize: 66px
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: -0.055em
  subheading:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.045em
  body:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.5
  button:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.4
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section-mobile: 72px
  section-desktop: 112px
rounded:
  sm: 4px
  control: 6px
  panel: 8px
  frame: 12px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: 54px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    height: 46px
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.frame}"
  muted-on-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.text-muted}"
  selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  founder:
    backgroundColor: "{colors.background-alternate}"
    textColor: "{colors.text}"
  hero-frame:
    backgroundColor: "{colors.surface-raised}"
  selection-tint:
    backgroundColor: "{colors.primary-subtle}"
  informational:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.info}"
  separator:
    backgroundColor: "{colors.border}"
  frame-edge:
    backgroundColor: "{colors.border-hover}"
  input-edge:
    backgroundColor: "{colors.border-control}"
  status-success:
    backgroundColor: "{colors.background-secondary}"
    textColor: "{colors.success}"
  status-error:
    backgroundColor: "{colors.background-secondary}"
    textColor: "{colors.danger}"
---

# Sistema visual de Tiago Systems

## Overview

Landing editorial para responsables de clínicas y equipos con problemas operativos, con producto real explorable y contacto directo con Tiago Ortega. Identidad negra/azul casi negro con dorado restringido. Esta versión reemplaza la dirección azul de fd03ccb por instrucción expresa del propietario.

React + TypeScript + Vite y CSS propio. Diales Taste: variance 6, motion 4, density 3 para marketing; la demo conserva mayor densidad de producto. Referencias: Linear (profundidad por superficies, interfaz protagonista) y Notion (explicar trabajo con diagramas y ejemplos). No se adoptan sus paletas, marcas, fuentes, precios ni promesas.

## Colors

Los tokens YAML son normativos; `src/styles.css` los implementa. `--gold-primary` corresponde a `{colors.primary}` y `--brand-*` son alias de los tokens dorados. Fondo principal `{colors.background}`, alternancia discreta con `{colors.background-secondary}` y `{colors.background-alternate}`. El texto usa `{colors.text}`, `{colors.text-secondary}` y `{colors.text-muted}`.

CTA dorado con texto oscuro, nunca blanco. Azul `{colors.info}` sólo informativo. Éxito y error conservan sus colores semánticos y texto descriptivo. Bordes decorativos de bajo contraste no sustituyen el borde de campos `{colors.border-control}` ni el foco de 3px en dorado. La selección se reconoce también por borde y estado accesible.

No usar grandes manchas doradas ni párrafos enteros de color. Contraste validado por CLI oficial en pares declarados y comprobado sobre superficies compuestas del navegador; el lint no certifica WCAG.

## Typography

Space Grotesk para títulos/cifras; DM Sans para cuerpo/controles. Se conserva la pareja histórica en vez de sustituirla. Hero fluido 47–86px; títulos de sección 40–100px según jerarquía; fundador 44–68px; cuerpo de lectura 16–17px. Etiquetas CRM 11–13px acompañan datos y no reemplazan contenido explicativo.

`text-wrap: balance` en titulares, anchos limitados y saltos deliberados en el hero. Cuerpo con interlínea 1.65–1.75. Las fuentes usan `display=swap` y preconexión a Google Fonts. El fallback sans-serif mantiene contenido visible.

## Layout

Contenedor máximo 1360px, márgenes de 40px en desktop y 19px en móvil. Ritmo de secciones 72–112px. Hero a dos columnas desde 901px; una columna por debajo. Mapa interactivo a dos paneles desde 761px; preguntas y diagrama apilados en móvil. Principios editoriales separados por líneas, producto a ancho completo, proceso numerado vertical, retrato y texto del fundador, FAQ compacta.

El contenido agregado explica decisiones, inicio de la demo y encaje con una clínica. No se agregan siete secciones repetidas ni métricas comerciales inventadas. La navegación principal y los anclajes existentes permanecen.

CRM: sidebar en desktop, cuatro pestañas en móvil; filas y formularios se reorganizan, nunca se escala la aplicación entera. Espacio de foto 5:6 con dimensiones 800×960 reservado; placeholder explícito hasta recibir una foto autorizada.

## Elevation & Depth

Superficies y bordes delimitan planos. La perspectiva y sombra se reservan al resumen del hero; halo dorado de opacidad muy baja. El mapa une nodos con líneas y termina en un nodo activo; representa decisiones, no una medición. Diálogos nativos sobre backdrop opaco. Capas: contenido normal, header 90, skip-link 200 y diálogos en top layer nativo.

## Shapes

Radios de 4–6px en controles, 8px en paneles y 12px en marcos. Círculos sólo en nodos de recorrido, iniciales y estados. Botones con alto mínimo 44px en CRM y 54px en CTA. Separadores y numeración sustituyen tarjetas donde no existe una agrupación funcional.

## Components

CTA principal consistente: Hablemos por WhatsApp, hacia el número confirmado de `siteConfig.ts`. Acceso secundario: Conocé DentFlow. El mapa usa botones con `aria-pressed`, salida con anuncio cortés y recorrido ordenado. La introducción del producto inicia el mismo tour de la demo.

Demo con reducer compartido, búsqueda/filtros, resumen, pacientes, pendientes, análisis, timeline, contacto interno, resultados y citas. Hero y métricas derivan de las mismas consultas. `Reiniciar demo` devuelve el escenario inicial exacto. Datos y reloj simulados identificados. Ninguna acción de la demo envía mensajes o consulta el CRM de producción.

Pestañas con flechas/Inicio/Fin y foco visible. Diálogos nativos con Escape, cancelación y devolución de foco. FAQ con `aria-expanded` y regiones asociadas. Menú con Escape, cierre al salir del header con teclado y navegación a anclas. Controles con margen de scroll para el header fijo.

Entrada escalonada del hero 700ms; producto 1000ms y asentamiento único 4500ms; bloques revelados por IntersectionObserver 620ms, contenido visible por defecto; mapa 300ms y demo/diálogos 220ms; hover 200ms. Movimiento principalmente transform/opacity, sin librerías nuevas. FAQ conserva transición de filas de grid. `prefers-reduced-motion` reduce transiciones y desactiva los revelados; también se consulta antes de cada revelado si cambia la preferencia durante la sesión.

## Do's and Don'ts

- Conservar negro/dorado, fuentes, historia aprobada, contactos reales y estado compartido.
- Mostrar producto legible y explicar qué hará cada acción.
- Mantener visible la intervención humana en WhatsApp.
- Comprobar responsive, teclado, contraste compuesto y estados; no confundir build con auditoría visual.
- No inventar foto, clientes, casos, precios, resultados, integraciones ni publicaciones de Instagram.
- No restaurar archivos históricos completos ni migrar de framework.
- Cambios de producción requieren instrucción explícita; el propietario autorizó en esta sesión el push final a main.
