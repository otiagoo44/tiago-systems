import resumen from './assets/dentflow-resumen-publico.png'
import pendientes from './assets/dentflow-pendientes-publico.png'
import analisis from './assets/dentflow-analisis-publico.png'
import { BarChart3, ClipboardList, Focus, MessageCircle, type LucideIcon } from 'lucide-react'

export type ProductView = {
  id: 'resumen' | 'pendientes' | 'analisis'
  tab: string
  eyebrow: string
  title: string
  description: string
  image: string
  alt: string
  detail: string
}

type SiteConfig = {
  brand: string
  founder: { name: string; role: string; photo: string | null }
  product: { name: string; crmUrl: string | null; views: readonly ProductView[] }
  contact: { email: string | null; whatsapp: string | null; linkedin: string | null }
  social: {
    tiagoTikTok: string
    dentflowInstagram: string
    dentflowTikTok: string
  }
  navigation: readonly { label: string; href: string }[]
  hero: { eyebrow: string; title: { before: string; accent: string; after: string }; description: string }
  copy: {
    approach: { eyebrow: string; title: string; accent: string; description: string; note: string }
    product: { eyebrow: string; title: string; accent: string; description: string; capabilitiesTitle: string }
    process: { eyebrow: string; title: string; accent: string; description: string }
    founder: { eyebrow: string; lead: string; body: string; values: string }
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
  product: {
    name: 'DentFlow',
    crmUrl: 'https://dental-crm-one.vercel.app/',
    views: [
      {
        id: 'resumen',
        tab: 'Resumen',
        eyebrow: '01 / VISIÓN GENERAL',
        title: 'El estado de las consultas, de un vistazo.',
        description: 'El resumen reúne etapas y pendientes para que el equipo sepa dónde concentrar su atención.',
        image: resumen,
        alt: 'Vista adaptada de Resumen en DentFlow, con datos de ejemplo y sin información privada',
        detail: 'Embudo de consultas y puntos de atención del período.',
      },
      {
        id: 'pendientes',
        tab: 'Pendientes',
        eyebrow: '02 / COLA DE TRABAJO',
        title: 'Cada consulta tiene un siguiente paso.',
        description: 'La cola de trabajo ordena lo que requiere atención y muestra el contexto antes de actuar.',
        image: pendientes,
        alt: 'Vista adaptada de Pendientes en DentFlow, con consultas y datos de ejemplo',
        detail: 'Prioridad, tratamiento y acción pendiente en la misma vista.',
      },
      {
        id: 'analisis',
        tab: 'Análisis',
        eyebrow: '03 / LECTURA DEL PROCESO',
        title: 'Los datos ayudan a hacer mejores preguntas.',
        description: 'El análisis muestra cómo avanzan las consultas entre etapas y dónde conviene revisar el proceso.',
        image: analisis,
        alt: 'Vista adaptada de Análisis en DentFlow, con indicadores de ejemplo',
        detail: 'Etapas del embudo con sus denominadores explícitos.',
      },
    ],
  },
  contact: {
    email: null,
    whatsapp: '+595 993 367341',
    linkedin: null,
  },
  social: {
    tiagoTikTok: 'https://www.tiktok.com/@tiago.systems',
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
      eyebrow: '04 / DETRÁS DEL SISTEMA',
      lead: 'Fundé Tiago Systems para crear tecnología aplicada a problemas concretos de negocio.',
      body: 'Diseño y desarrollo las herramientas que construyo. DentFlow muestra mi forma de trabajar: entender un proceso, ordenar su información y hacer más claro el siguiente paso para el equipo.',
      values: 'Soy cristiano y busco hacer mi trabajo con excelencia, criterio y responsabilidad.',
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
    { question: '¿Las cifras de las imágenes son resultados reales?', answer: 'No. Las imágenes son versiones adaptadas de pantallas del producto. Los datos visibles son de ejemplo para proteger información privada.' },
    { question: '¿Podemos conversar sobre un proyecto?', answer: 'Sí. Contame qué proceso querés ordenar y qué usa hoy tu equipo. A partir de eso podemos definir si tiene sentido trabajar juntos.' },
  ],
}

export const contactHref = site.contact.email
  ? `mailto:${site.contact.email}?subject=Consulta%20para%20Tiago%20Systems`
  : site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`
    : null
