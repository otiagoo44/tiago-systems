import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'

// Vite's static MIME map omits XLSX; use the same header as Vercel locally.
const kitMime = (request: IncomingMessage, response: ServerResponse, next: () => void) => {
  if (request.url?.split('?')[0] === '/recursos/Dentflow_Planilla_Seguimiento.xlsx') {
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  }
  next()
}

export default defineConfig({
  plugins: [react(), {
    name: 'kit-mime',
    configureServer(server) { server.middlewares.use(kitMime) },
    configurePreviewServer(server) { server.middlewares.use(kitMime) },
  }],
  build: {
    rollupOptions: { input: { main: 'index.html', resources: 'recursos/index.html' } },
  },
})
