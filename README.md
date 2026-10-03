# Tiago Systems

Landing de Tiago Ortega y presentación de DentFlow, construida con React, TypeScript, Vite y CSS propio. Las decisiones visuales están documentadas en [DESIGN.md](DESIGN.md).

## Desarrollo

```bash
npm install
npm run dev
```

Para comprobar el build de producción:

```bash
npm run build
npm run preview
```

En Vercel, usar `npm run build` y el directorio de salida `dist`.

## Contenido editable

Los textos, enlaces e imágenes principales se configuran en `src/siteConfig.ts`. El CTA principal abre el WhatsApp público autorizado por Tiago. Para cambiar los canales:

- `site.contact.whatsapp`: número público con código de país. Puede incluir `+` y espacios; el enlace se normaliza para `wa.me`.
- `site.contact.email`: dirección pública opcional. Si hay email y WhatsApp, el email tiene prioridad en el CTA principal.
- `site.contact.linkedin`: perfil profesional opcional.

Los perfiles confirmados también están en `src/siteConfig.ts`: TikTok de Tiago Systems (`@tiago.systems`) e Instagram y TikTok de DentFlow (`@dentflow.py`).

`site.product.crmUrl` apunta al acceso al CRM, separado del contacto comercial y de esta página informativa. Su URL respondió al momento de la revisión, pero conviene comprobar el destino antes de publicar. Cuando haya un dominio definitivo para esta landing, agregá la URL canónica y una imagen social rasterizada apropiada en `index.html`.

## Imágenes

- `src/assets/dentflow-resumen-publico.png`, `dentflow-pendientes-publico.png` y `dentflow-analisis-publico.png` son **versiones adaptadas y anonimizadas de capturas del producto**. Se generaron a partir de las capturas locales mediante una edición de privacidad; pueden diferir en detalles visuales del estado actual del CRM. Todos los valores visibles se presentan como ejemplos. La etiqueta exterior en la galería y la etiqueta interior de cada imagen lo indican.
- Los originales permanecen en `capturas-dentflow/` y están excluidos por `.gitignore`. No los subas: contienen nombres, teléfonos y datos de una cuenta. `inspiracion-landing/` y `ultima-conversacion.txt` también están excluidos.
- Para reemplazar una vista, prepará una captura nueva **sin datos personales, credenciales ni métricas privadas**, idealmente de **1672 × 940 px** o proporción **16:9**. Importala en `src/siteConfig.ts` y actualizá `image`, `alt` y `detail` de esa vista. `MediaFrame` conserva el espacio, muestra la imagen completa y ofrece un fallback si falla.
- Para el retrato de Tiago, usá una foto autorizada de al menos **800 × 960 px**, idealmente proporción **5:6**. Guardala en `src/assets/` y asigná su import a `site.founder.photo`. El placeholder actual no representa a una persona real.

## Pendientes para publicar

1. Foto profesional autorizada de Tiago, si se desea mostrar un retrato.
2. Dominio final de la landing para URL canónica y vista previa social.
3. Revisión visual final en navegador a 360–390, 768, 1024 y 1440 px antes del despliegue.

La landing está implementada visualmente y el enlace directo de contacto está configurado. Antes de publicarla falta completar la revisión visual en navegador.
