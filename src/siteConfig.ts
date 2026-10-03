import { BarChart3, ClipboardList, Focus, MessageCircle, type LucideIcon } from 'lucide-react'

type SiteConfig = {
  brand: string
  founder: { name: string; role: string; photo: string | null }
  product: { name: string }
  contact: { email: string | null; whatsapp: string | null; linkedin: string | null }
  social: {
    tiagoInstagram: string
    dentflowInstagram: string
    dentflowTikTok: string
  }
  navigation: readonly { label: string; href: string }[]
  hero: { eyebrow: string; title: { before: string; accent: string; after: string }; description: string }
  copy: {
    approach: { eyebrow: string; title: string; accent: string; description: string; note: string }
    product: { eyebrow: string; title: string; accent: string; description: string; capabilitiesTitle: string }
    process: { eyebrow: string; title: string; accent: string; description: string }
    founder: { eyebrow: string; title: string; lead: string; body: string; productBefore: string; productEmphasis: string; iteration: string; quote: string }
    faq: { eyebrow: string; title: string; accent: string; description: string }
    contact: { eyebrow: string; title: string; accent: string; description: string }
  }
  issues: readonly { number: string; title: string; text: string }[]
  capabilities: readonly { icon: LucideIcon; title: string; text: string }[]
  steps: readonly { number: string; title: string; text: string }[]
  questions: readonly { question: string; answer: string }[]
}

export const site: SiteConfig = {
  brand: 'Tiago Systems',
  founder: {
    name: 'Tiago Ortega',
    role: 'Fundador y desarrollador',
    photo: null,
  },
  product: { name: 'DentFlow' },
  contact: {
    email: null,
    whatsapp: '+595 993 367341',
    linkedin: null,
  },
  social: {
    tiagoInstagram: 'https://www.instagram.com/tiago.systems/',
    dentflowInstagram: 'https://www.instagram.com/dentflow.py/',
    dentflowTikTok: 'https://www.tiktok.com/@dentflow.py',
  },
  navigation: [
    { label: 'Enfoque', href: '#enfoque' },
    { label: 'DentFlow', href: '#dentflow' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Sobre mí', href: '#sobre-tiago' },
  ],
  hero: {
    eyebrow: 'TIAGO SYSTEMS · TECNOLOGÍA APLICADA A NEGOCIOS',
    title: { before: 'Transformo procesos', accent: 'dispersos', after: 'en sistemas fáciles de usar' },
    description: 'Soy Tiago Ortega. Diseño y desarrollo herramientas para que los equipos trabajen con más contexto. DentFlow es mi producto para organizar consultas y seguimiento en clínicas odontológicas.',
  },
  copy: {
    approach: {
      eyebrow: '01 / EL ENFOQUE',
      title: 'Cuando el trabajo se dispersa,',
      accent: 'el sistema tiene que unirlo.',
      description: 'Una herramienta útil empieza por entender lo que pasa entre la primera consulta y la próxima decisión.',
      note: 'Diseño la herramienta alrededor del proceso del equipo: información visible, acciones claras y menos pasos sueltos.',
    },
    product: {
      eyebrow: '02 / PRODUCTO ACTUAL',
      title: 'Esto es',
      accent: 'DentFlow.',
      description: 'Un CRM orientado a clínicas odontológicas. Organiza consultas, estados y próximas acciones para que el seguimiento tenga contexto.',
      capabilitiesTitle: 'Una herramienta para el trabajo de todos los días.',
    },
    process: {
      eyebrow: '03 / CÓMO FUNCIONA',
      title: 'Del primer interés',
      accent: 'al próximo paso.',
      description: 'Un recorrido breve que mantiene a las personas a cargo del seguimiento.',
    },
    founder: {
      eyebrow: 'QUIÉN ESTÁ DETRÁS',
      title: 'Construyo sistemas para resolver problemas operativos reales.',
      lead: 'Soy Tiago, fundador de Tiago Systems y creador de DentFlow.',
      body: 'Mi foco actual está en entender cómo las clínicas odontológicas gestionan sus consultas, seguimiento y proceso comercial, y convertir esos problemas en sistemas más simples.',
      productBefore: 'DentFlow nació de esa idea: no agregar más herramientas porque sí, sino darle al equipo una forma clara de saber ',
      productEmphasis: 'qué está pasando con cada consulta y cuál debería ser el próximo paso',
      iteration: 'Estoy construyendo el producto cerca del problema: hablando con clínicas, observando cómo trabajan e iterando sobre lo que realmente necesitan.',
      quote: 'Me interesa construir software que se use, no software que solamente se vea bien en una demo.',
    },
    faq: {
      eyebrow: '05 / PREGUNTAS FRECUENTES',
      title: 'Lo importante,',
      accent: 'bien claro.',
      description: 'Qué hace DentFlow y cómo se trabaja con él.',
    },
    contact: {
      eyebrow: '06 / CONVERSEMOS',
      title: 'Contame qué trabajo querés',
      accent: 'ordenar.',
      description: 'Si hay consultas, decisiones o pendientes que hoy se pierden entre herramientas, podemos revisar el proceso y pensar una solución útil.',
    },
  },
  issues: [
    { number: '01', title: 'La consulta llega', text: 'Un mensaje o formulario inicia el trabajo. Si queda aislado, el contexto se pierde.' },
    { number: '02', title: 'El estado cambia', text: 'Entre una respuesta y la próxima acción, el equipo necesita saber qué pasó y quién sigue.' },
    { number: '03', title: 'Hay que decidir', text: 'Ver el proceso completo permite revisar pendientes y actuar con más criterio.' },
  ],
  capabilities: [
    { icon: ClipboardList, title: 'Consultas en un lugar', text: 'La información de cada consulta queda disponible para el equipo.' },
    { icon: Focus, title: 'Próxima acción visible', text: 'Estado, responsable y pendiente se pueden revisar con contexto.' },
    { icon: MessageCircle, title: 'WhatsApp con control humano', text: 'Una persona abre el mensaje preparado, lo revisa y decide enviarlo.' },
    { icon: BarChart3, title: 'Proceso medible', text: 'El embudo ayuda a ver el avance entre etapas sin confundir presupuestos con cobros.' },
  ],
  steps: [
    { number: '01', title: 'Ingresa la consulta', text: 'El formulario de una landing registra el interés y la información que la persona dejó.' },
    { number: '02', title: 'Se organiza el seguimiento', text: 'DentFlow reúne el estado, el responsable y el próximo paso de cada caso.' },
    { number: '03', title: 'El equipo actúa', text: 'Recepción revisa el contexto, abre WhatsApp y registra el resultado de su gestión.' },
  ],
  questions: [
    { question: '¿DentFlow envía mensajes automáticamente?', answer: 'No. El sistema prepara el mensaje, pero una persona lo revisa, abre WhatsApp y decide enviarlo. Después registra el avance en el CRM.' },
    { question: '¿Qué información organiza?', answer: 'Consultas, estados, responsables, próximas acciones y etapas del seguimiento. La vista de análisis ayuda a revisar cómo avanza el proceso.' },
    { question: '¿Las cifras de la demo son resultados reales?', answer: 'No. La demo usa datos ficticios y calcula sus cifras a partir de las acciones que probás. No está conectada al CRM privado ni envía mensajes reales.' },
    { question: '¿Podemos conversar sobre un proyecto?', answer: 'Sí. Contame qué proceso querés ordenar y qué usa hoy tu equipo. A partir de eso podemos definir si tiene sentido trabajar juntos.' },
  ],
}

export const contactHref = site.contact.email
  ? `mailto:${site.contact.email}?subject=Consulta%20para%20Tiago%20Systems`
  : site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`
    : null
