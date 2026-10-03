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

Las pruebas usan el runner integrado de Node y requieren **Node 24 o superior**. No agregan dependencias. En Vercel, el comando de build es `npm run build` y la salida es `dist`. No se realizó un despliegue como parte de esta corrección.

## Configuración y destinos

Los textos públicos, enlaces y retrato se editan en `src/siteConfig.ts`.

- WhatsApp comercial autorizado: `+595 993 367341`. El enlace se normaliza automáticamente. Email y LinkedIn son opcionales.
- Tiago Systems: **solo Instagram**, `@tiago.systems`.
- DentFlow: Instagram y TikTok, `@dentflow.py`.
- “Conocer DentFlow” lleva a `#dentflow`; “Probá la demo interactiva” lleva a `#demo-crm`.
- La landing no enlaza al acceso privado del CRM: requiere una cuenta y no es una presentación pública.

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

La foto profesional sigue pendiente. Prepará una imagen autorizada de al menos **800 × 960 px**, proporción **5:6**; guardala en `src/assets/`, importala en `src/siteConfig.ts` y asignala a `site.founder.photo`. El componente reserva la proporción y vuelve al placeholder si falla la carga.

Las imágenes `src/assets/dentflow-*-publico.png` de la versión anterior se conservan como referencia histórica, pero ya no se importan ni publican en el build. La presentación actual del producto se genera con componentes reales y datos ficticios.

Los originales de `capturas-dentflow/`, las referencias de `inspiracion-landing/` y las conversaciones locales permanecen excluidos de Git. No los publiques: pueden contener información privada.

## Verificaciones y pendientes

- Build de producción y TypeScript comprobados.
- Pruebas del recorrido completo, filtros combinados y vacíos, citas inválidas, asistencia, historial, métricas, no respuesta, desinterés, cancelación, recorrido guiado y reinicio exacto.
- Contraste de los tokens principales calculado; sin colores de marca anteriores en el código activo y favicon.
- **Revisión visual en navegador pendiente**: la conexión a Chrome denegó la URL local mediante una preferencia guardada. No se verificaron visualmente los tamaños 360–390, 768, 1024 y 1440 px, el foco real, la consola ni movimiento reducido en el navegador.

Antes de publicar: completar esa revisión, definir el dominio definitivo para la URL canónica y, si se desea, aportar retrato e imagen social. El contacto público ya está configurado. No confundir implementación y build completos con publicación final aprobada.
