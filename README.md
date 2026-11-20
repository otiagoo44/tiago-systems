# Tiago Systems

Landing de Tiago Ortega y presentación pública de DentFlow. React 19, TypeScript, Vite y CSS propio. Sistema visual en [DESIGN.md](DESIGN.md).

## Desarrollo y verificación

```bash
npm install
npm run dev
npm test
npm run build
npm run preview
```

Las pruebas usan el runner integrado de Node y requieren **Node 24 o superior**. No agregan dependencias. En Vercel, el comando de build es `npm run build` y la salida es `dist`. El repositorio está conectado a Vercel: un push a `main` actualiza producción. Tras revisar la preview, el usuario autorizó el 20/11/2026 agregar apariciones al bajar y pushear todo a `main`.

## Configuración y destinos

Los textos públicos, enlaces, ejemplos del mapa de trabajo y retrato se editan en `src/siteConfig.ts`.

- WhatsApp comercial autorizado: `+595 993 367341`. `getContactHref()` normaliza el número y codifica los mensajes de `whatsappMessages`: general, demo y final. El canal principal es WhatsApp; email es un fallback opcional.
- Tiago Systems: **solo Instagram**, `@tiago.systems`.
- DentFlow: Instagram y TikTok, `@dentflow.py`.
- “Ver DentFlow en acción” lleva a `#dentflow`; “Probá la demo interactiva” y “Volver a la demo” llevan a `#demo-crm`. Se conservan los anclajes históricos.
- La landing no enlaza al acceso privado del CRM: requiere una cuenta y no es una presentación pública.
- Producción confirmada en la configuración pública del repositorio: `https://tiago-systems.vercel.app/`. URL canónica y metadatos sociales en `index.html`; imagen original de marca en `public/social-preview.png` (1200 × 630). Actualizar estas URL si se conecta un dominio propio.

## Demo funcional

- `src/demo/model.ts`: datos ficticios, reducer, validación y cálculos.
- `src/demo/DentFlowDemo.tsx`: Resumen, Pacientes, Pendientes, Análisis, detalle, diálogos y recorrido guiado. Incluye el resumen del hero, conectado al mismo estado.
- `src/demo/demo.css`: adaptación móvil y estilos de la interfaz, usando los tokens globales.
- `tests/demo.test.ts`: transiciones y cálculos, incluidos los casos de error y cancelación.
- `tests/render.test.mjs`: renderizado React en Node, texto del fundador, destinos internos y ausencia de enlaces al CRM privado. No es una prueba visual de navegador.

Hay diez consultas ficticias con teléfonos no operativos. Todo funciona en memoria; recargar o reiniciar restaura exactamente la configuración inicial. No hay backend, almacenamiento persistente, login, llamadas al CRM ni mensajes reales.

El reloj de la demo empieza el **3 de octubre de 2026 a las 12:00 de Paraguay** y avanza un minuto por cambio. Se muestra en la interfaz. Para agendar se requiere una fecha válida posterior a ese reloj; por ejemplo, 5 de octubre de 2026 a las 10:30. Es un escenario reproducible, no una agenda real.

El embudo acumulado cuenta etapas alcanzadas y conserva los pasos anteriores. “Etapa actual” cuenta cada consulta una sola vez. Fuentes y tratamientos se agrupan desde esas mismas consultas. Un intento sin respuesta no suma una respuesta ni una cita. “No está interesado” retira las acciones pendientes conservando el historial. Simular contacto no hace retroceder etapas avanzadas.

El recorrido guiado utiliza las mismas acciones que el uso manual: Pendientes → consulta → contacto simulado → resultado → cita → Resumen. Cancelarlo conserva los cambios; reiniciarlo restaura el escenario inicial. “Reiniciar demo” también limpia filtros, selección, diálogos y recorrido.

## Foto y archivos privados

La foto profesional autorizada de Tiago está integrada en `src/assets/tiago-ortega.webp` (900 × 1125, ~90 KB) y `tiago-ortega-mobile.webp` (480 × 600, ~22 KB). `site.founder.photo` y `photoMobile` configuran el retrato responsive. La sección usa un primer plano con bordes fundidos al fondo, nombre a gran escala y relato debajo, sin marco cuadrado. El original permanece fuera del repositorio; el rostro no se modificó. Carga diferida, dimensiones reservadas y monograma si falla la imagen.

Las imágenes `src/assets/dentflow-*-publico.png` de la versión anterior se conservan como referencia histórica, pero ya no se importan ni publican en el build. La presentación actual del producto se genera con componentes reales y datos ficticios.

Los originales de `capturas-dentflow/`, las referencias de `inspiracion-landing/` y las conversaciones locales permanecen excluidos de Git. No los publiques: pueden contener información privada.

## Verificaciones y pendientes

- Build de producción y TypeScript comprobados.
- Pruebas del recorrido completo, filtros combinados y vacíos, citas inválidas, asistencia, historial, métricas, no respuesta, desinterés, cancelación, recorrido guiado y reinicio exacto.
- Contraste de los tokens principales calculado; sin colores de marca anteriores en el código activo y favicon.
- **Revisión en Chromium realizada** a 390, 768, 1024 y 1440 px: sin desbordes ni errores JavaScript. Recorrido manual y guiado, métricas compartidas, búsqueda, citas, reinicio, pestañas, FAQ, menú móvil, foco de diálogos y movimiento reducido comprobados.
- Sistema negro/dorado reconciliado en `DESIGN.md`; lint oficial 0.4.0 con cero errores y advertencias. Decisiones de las cinco skills, hallazgos y capturas en [RECOVERY_REPORT.md](docs/design/RECOVERY_REPORT.md).

La foto profesional está incorporada. No se incorporó información nueva de Instagram porque su lectura pública fue bloqueada en la recuperación anterior. La revisión visual se hizo con viewports emulados, no con teléfonos físicos; no constituye una certificación WCAG ni una medición de Core Web Vitals de campo.

## Recorrido comercial y recurso opcional

La revisión de conversión de octubre de 2026 conserva el diseño negro/dorado, fuentes, motion, hero y lógica de la demo. El recorrido es: problema → cuatro preguntas → DentFlow → recepción/dirección → implementación → prueba disponible → encaje → fundador → FAQ → conversación por WhatsApp.

El Kit Agenda y Seguimiento tiene su propia página `/recursos/`, enlazada desde navegación, hero y bloque dedicado. La fuente binaria original es `kit-separado-y-zip/`; `scripts/prepare-resources.mjs` comprueba tamaños/SHA-256 antes de copiar los cinco archivos a `public/recursos/`. El ZIP pesa 173225 bytes. No hay formularios para acceder. `site.resource` sigue como slot opcional independiente para futuros recursos.

`src/resources/ResourcesPage.tsx` se renderiza a HTML durante preparación con React; Vite construye ambas páginas. Recursos no hidrata React ni carga PDF/XLSX en el primer render. Sus disclosures y lectura funcionan sin JavaScript. `copy.ts` añade copia al portapapeles con confirmación accesible y selección manual si falla. `src/resources/kit-content.json` conserva la transcripción íntegra de los PDF y las filas ficticias de muestra; el TXT se lee del archivo real en cada build. Los PDF originales siguen disponibles como alternativa a la transcripción, que no conserva diagramación de tablas.

Si un recurso cambia, ejecutar `scripts/audit-kit.py` con Python/pypdf/openpyxl de QA, revisar el contenido y actualizar deliberadamente `kit-content.json`/hashes antes de construir. No guardar el XLSX desde el auditor ni modificar fórmulas. El build falla si los originales ya no coinciden. Las copias públicas y `recursos/index.html` son generadas y se excluyen de Git; los originales sí deben versionarse. Los encabezados XLSX/ZIP/TXT están en `vercel.json` y el MIME XLSX local en Vite.

La regresión de navegador está en `scripts/verify-landing.mjs`. Con el build servido en `http://localhost:4173`, ejecutar `node scripts/verify-landing.mjs` en un entorno con Playwright disponible. Si la instalación es externa, definir `PLAYWRIGHT_MODULE` con su ruta y, opcionalmente, `CHROMIUM_EXECUTABLE` con el navegador instalado; `QA_URL` permite otro destino. No son dependencias de producción. El script verifica 375, 430, 768, 1024 y 1440 px, interacciones de la demo, teclado, FAQ, navegación, enlaces WhatsApp y SEO. Regenera evidencia en `docs/design/evidence/conversion/`.

Resultados históricos de conversión: [CONVERSION_REPORT.md](docs/design/CONVERSION_REPORT.md). Auditoría del kit: [KIT_AUDIT.md](docs/design/KIT_AUDIT.md). Evidencia actual en `docs/design/evidence/kit/` y actualización de [RECOVERY_REPORT.md](docs/design/RECOVERY_REPORT.md).

Para QA del kit: preparar/build primero, luego `node scripts/verify-kit.mjs` con `PLAYWRIGHT_MODULE`, `CHROMIUM_EXECUTABLE` y `AXE_MODULE` hacia instalaciones externas. `QA_URL` y `QA_OUTPUT` permiten probar preview y separar evidencia. Comprueba 320/360/390/768/1440px, descargas reales con hashes, MIME, TXT/clipboard y fallback, PDF, navegación preservada, accesibilidad automática, teclado, reduced-motion y lectura sin JS. La regresión existente acepta también `QA_OUTPUT` para no sobreescribir evidencia histórica.

`src/scrollReveals.ts` coordina las apariciones de ambas páginas: primer viewport visible, bloques posteriores pendientes hasta entrar, una vez por visita, 650ms/24px y escalonado desktop hasta 120ms. No agrega bibliotecas ni listeners de scroll. Foco, enlaces directos, reduced-motion y ausencia/fallo del observer muestran el contenido inmediatamente. La limpieza de React cancela animaciones y restablece visibilidad. `scripts/verify-scroll-reveals.mjs` comprueba el efecto real en el build minificado, incluida la conversión de segundos/milisegundos, y guarda evidencia en `docs/design/evidence/motion/`.
