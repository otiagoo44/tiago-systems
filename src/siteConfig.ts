import founderPhoto from './assets/tiago-ortega.webp'
import founderPhotoMobile from './assets/tiago-ortega-mobile.webp'

type SiteConfig = {
  brand: string
  founder: { name: string; role: string; photo: string | null; photoMobile?: string }
  product: { name: string }
  contact: { email: string | null; whatsapp: string | null; linkedin: string | null }
  social: {
    tiagoInstagram: string
    dentflowInstagram: string
    dentflowTikTok: string
  }
  navigation: readonly { label: string; href: string }[]
  hero: { eyebrow: string; title: string; description: string; microcopy: string }
  ctas: { header: string; primary: string; demo: string; afterDemo: string; final: string }
  resource: { url: string; title: string; description: string; cta: string } | null
  copy: {
    approach: { eyebrow: string; title: string; accent: string; description: string; note: string }
    product: { eyebrow: string; title: string; accent: string; description: string; demoLead: string; demoInstructions: string; demoNotice: string; afterDemo: string }
    model: { eyebrow: string; title: string; description: string; conclusion: string }
    roles: { eyebrow: string; title: string; description: string }
    proof: { eyebrow: string; title: string; description: string }
    fit: { eyebrow: string; title: string; description: string; note: string }
    process: { eyebrow: string; title: string; accent: string; description: string }
    founder: { eyebrow: string; title: string; lead: string; body: string; productBefore: string; productEmphasis: string; iteration: string; quote: string }
    faq: { eyebrow: string; title: string; accent: string; description: string }
    contact: { eyebrow: string; title: string; accent: string; description: string }
  }
  issues: readonly { number: string; title: string; text: string }[]
  workflow: readonly { question: string; problem: string; decision: string; steps: readonly string[]; output: string }[]
  roles: readonly { title: string; items: readonly string[] }[]
  proof: readonly { number: string; title: string; text: string; href: string; cta: string }[]
  fit: readonly { title: string; items: readonly string[] }[]
  steps: readonly { number: string; title: string; text: string }[]
  questions: readonly { question: string; answer: string }[]
}

export const site: SiteConfig = {
  brand: 'Tiago Systems',
  founder: {
    name: 'Tiago Ortega',
    role: 'Fundador y desarrollador',
    photo: founderPhoto,
    photoMobile: founderPhotoMobile,
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
    { label: 'Problema', href: '#enfoque' },
    { label: 'DentFlow', href: '#dentflow' },
    { label: 'Cómo funciona', href: '#proceso' },
    { label: 'FAQ', href: '#preguntas' },
  ],
  hero: {
    eyebrow: 'DENTFLOW · SISTEMA PARA CLÍNICAS ODONTOLÓGICAS',
    title: 'Que ninguna consulta quede sin próximo paso',
    description: 'DentFlow organiza el estado, responsable, próxima acción y fecha de cada consulta para que recepción y dirección sepan qué sigue, sin depender de la memoria ni revisar chat por chat.',
    microcopy: 'Primero revisamos cómo trabajan hoy. Ahí vemos si DentFlow encaja.',
  },
  ctas: {
    header: 'Revisar mi seguimiento',
    primary: 'Revisar el seguimiento de mi clínica',
    demo: 'Ver DentFlow en acción',
    afterDemo: 'Quiero revisar si esto encaja con mi clínica',
    final: 'Revisar mi proceso por WhatsApp',
  },
  // Activar únicamente con una URL pública real y verificada. No se muestra mientras sea null.
  resource: null,
  copy: {
    approach: {
      eyebrow: '01 / EL PROBLEMA',
      title: 'Si hoy el seguimiento',
      accent: 'funciona así…',
      description: 'No todas las clínicas trabajan igual. Estas son algunas situaciones que vale la pena revisar con el equipo.',
      note: 'El problema no es WhatsApp. Aparece cuando WhatsApp también tiene que funcionar como memoria, registro de consultas y sistema de seguimiento.',
    },
    model: {
      eyebrow: '02 / UN PRÓXIMO PASO CLARO',
      title: 'Cada consulta debería responder cuatro preguntas.',
      description: 'Elegí una pregunta para ver cómo se aplica al seguimiento de una consulta odontológica.',
      conclusion: 'Eso es lo que DentFlow convierte en un sistema.',
    },
    product: {
      eyebrow: '03 / EL PRODUCTO',
      title: 'Esto es',
      accent: 'DentFlow.',
      description: 'Un sistema de seguimiento comercial diseñado alrededor del recorrido de una consulta odontológica. Para organizar las consultas que tu clínica ya recibe.',
      demoLead: 'De una consulta a una próxima acción.',
      demoInstructions: 'Buscá a Ana Demo, simulá el contacto y agendá una cita. El resumen y el análisis se actualizan con lo que hagas.',
      demoNotice: 'Demo interactiva · Datos ficticios. No está conectada a datos reales de pacientes y no envía mensajes.',
      afterDemo: 'Llevemos este recorrido a tu contexto: cómo entra una consulta, quién la retoma y qué queda pendiente.',
    },
    roles: {
      eyebrow: '04 / EL EQUIPO',
      title: 'La misma información. Distintas decisiones.',
      description: 'Recepción necesita saber qué hacer después. Dirección necesita ver cómo avanza el proceso.',
    },
    process: {
      eyebrow: '05 / CÓMO LO IMPLEMENTAMOS',
      title: 'Primero tu proceso.',
      accent: 'Después, el sistema.',
      description: 'La configuración parte de cómo trabaja la clínica. El alcance y los tiempos se definen después de revisar lo necesario.',
    },
    proof: {
      eyebrow: '06 / PRUEBA DISPONIBLE',
      title: 'Qué podés comprobar hoy.',
      description: 'Podés explorar el funcionamiento antes de conversar. Las cifras son del escenario ficticio de la demo, no resultados de clientes.',
    },
    fit: {
      eyebrow: '07 / ¿TIENE SENTIDO PARA TU CLÍNICA?',
      title: 'El sistema tiene que responder a una necesidad.',
      description: 'La cantidad de herramientas no define qué tan organizado está un equipo. El punto es saber si necesitan más claridad en el seguimiento.',
      note: 'Si alcanza con un proceso más simple, debería quedar claro antes de implementar software.',
    },
    founder: {
      eyebrow: 'QUIÉN ESTÁ DETRÁS',
      title: 'Construyo sistemas para resolver problemas operativos reales.',
      lead: 'Soy Tiago Ortega, fundador de Tiago Systems y creador de DentFlow.',
      body: 'Mi foco actual está en entender cómo las clínicas odontológicas gestionan sus consultas, seguimiento y proceso comercial, y convertir esos problemas en sistemas más simples.',
      productBefore: 'DentFlow nació de esa idea: no agregar más herramientas porque sí, sino darle al equipo una forma clara de saber ',
      productEmphasis: 'qué está pasando con cada consulta y cuál debería ser el próximo paso',
      iteration: 'Estoy construyendo el producto cerca del problema: hablando con clínicas, observando cómo trabajan e iterando sobre lo que realmente necesitan.',
      quote: 'Me interesa construir software que se use, no software que solamente se vea bien en una demo.',
    },
    faq: {
      eyebrow: 'PREGUNTAS FRECUENTES',
      title: 'Lo importante,',
      accent: 'bien claro.',
      description: 'Qué hace DentFlow y cómo se trabaja con él.',
    },
    contact: {
      eyebrow: 'EL SIGUIENTE PASO',
      title: '¿Cómo están siguiendo hoy las consultas',
      accent: 'de tu clínica?',
      description: 'Vemos cómo entra una consulta, qué ocurre después y dónde queda registrado el próximo paso. A partir de eso podemos determinar si DentFlow tiene sentido para ustedes.',
    },
  },
  issues: [
    { number: '01', title: '«Te confirmo». ¿Y después?', text: 'Una persona consulta por un tratamiento. Recepción responde, pero no queda una fecha clara para retomar la conversación.' },
    { number: '02', title: 'Los chats anteriores bajan.', text: 'Llegan nuevos mensajes y el seguimiento de las consultas anteriores depende de que alguien recuerde volver.' },
    { number: '03', title: '¿Quién tenía que retomarla?', text: 'Más de una persona participa en recepción y no siempre queda claro quién sigue cada consulta.' },
    { number: '04', title: 'Hay que reconstruir la semana.', text: 'Dirección quiere saber qué ocurrió con las consultas. Para responder, hay que revisar conversaciones una por una.' },
  ],
  workflow: [
    {
      question: 'Estado · ¿Dónde quedó?',
      problem: 'Una consulta puede estar recién recibida, ya contactada o con una cita agendada. Cada situación necesita una acción distinta.',
      decision: 'Saber dónde está el caso.',
      steps: ['Consulta recibida', 'Contacto registrado', 'Estado visible'],
      output: 'El equipo puede revisar el avance sin reconstruir toda la conversación.',
    },
    {
      question: 'Responsable · ¿Quién la retoma?',
      problem: 'Si varias personas atienden consultas, hace falta que cada caso tenga a alguien a cargo.',
      decision: 'Dejar claro quién sigue.',
      steps: ['Consulta registrada', 'Responsable identificado', 'Contexto compartido'],
      output: 'Un responsable visible junto al historial y al pendiente de la consulta.',
    },
    {
      question: 'Próxima acción · ¿Qué sigue?',
      problem: 'Responder no siempre cierra el seguimiento. Puede quedar una cita por coordinar o una decisión por retomar.',
      decision: 'Convertir el pendiente en una acción.',
      steps: ['Revisar el caso', 'Registrar qué pasó', 'Ver la próxima acción'],
      output: 'Responder, coordinar una cita o consultar una decisión: un paso concreto para el equipo.',
    },
    {
      question: 'Fecha · ¿Cuándo?',
      problem: '«Volver a escribir» queda incompleto si no se sabe cuándo corresponde hacerlo.',
      decision: 'Ponerle fecha al próximo paso.',
      steps: ['Acción pendiente', 'Fecha definida', 'Seguimiento por fecha'],
      output: 'Los pendientes se pueden revisar por fecha, sin depender de la memoria.',
    },
  ],
  roles: [
    { title: 'Para recepción', items: ['Ver qué consultas requieren atención.', 'Revisar qué ocurrió y quién está a cargo.', 'Saber cuál es el próximo paso y cuándo retomarlo.'] },
    { title: 'Para dirección', items: ['Ver cuántas consultas ingresaron y en qué etapa están.', 'Identificar pendientes y revisar el avance entre etapas.', 'Tener visibilidad sin reconstruir cada conversación manualmente.'] },
  ],
  proof: [
    { number: '01', title: 'Un recorrido que podés probar.', text: 'Buscá una consulta, simulá el contacto, registrá el resultado y revisá su próxima acción.', href: '#demo-crm', cta: 'Explorar la demo' },
    { number: '02', title: 'Cifras que responden a tus acciones.', text: 'Resumen, estados y análisis se calculan desde las mismas consultas ficticias. Cambiá un caso y comprobalo.', href: '#demo-crm', cta: 'Ver el sistema' },
    { number: '03', title: 'Una implementación explicada.', text: 'Revisión, configuración, prueba y capacitación inicial. Podés conocer el proceso antes de dar el siguiente paso.', href: '#proceso', cta: 'Revisar la implementación' },
  ],
  fit: [
    { title: 'Tiene más sentido si…', items: ['Reciben consultas de forma frecuente.', 'Hay recepción o varias personas involucradas.', 'Algunas consultas necesitan seguimiento posterior.', 'Quieren ver el recorrido y registrar estados y próximas acciones.'] },
    { title: 'Quizás todavía alcance con algo más simple si…', items: ['Reciben muy pocas consultas.', 'Una sola persona maneja todo sin dificultad.', 'Casi no necesitan seguimiento posterior.', 'Pueden ordenar el trabajo con un proceso más simple.'] },
  ],
  steps: [
    { number: '01', title: 'Revisamos cómo trabajan hoy', text: 'Cómo llegan las consultas, qué canales usan, quién atiende y cómo retoman el seguimiento.' },
    { number: '02', title: 'Configuramos DentFlow', text: 'Clínica, usuarios, flujo, tratamientos y formulario o landing, según lo definido en la revisión.' },
    { number: '03', title: 'Probamos el recorrido', text: 'Ingresamos una consulta de prueba y verificamos su registro, responsable, próxima acción y seguimiento en el sistema.' },
    { number: '04', title: 'Lo usa el equipo', text: 'Preparamos los accesos, hacemos la capacitación inicial y verificamos el uso con el equipo.' },
  ],
  questions: [
    { question: '¿DentFlow reemplaza WhatsApp?', answer: 'No. WhatsApp puede seguir siendo el canal de conversación. DentFlow organiza el contexto, estado, responsable y próximas acciones de cada consulta.' },
    { question: '¿DentFlow envía mensajes automáticamente?', answer: 'No. El sistema prepara el mensaje, pero una persona lo revisa, abre WhatsApp y decide enviarlo. Después registra el resultado en DentFlow. En esta demo el contacto es una simulación: no se abre WhatsApp ni se envían mensajes.' },
    { question: '¿Tenemos que cambiar toda nuestra forma de trabajar?', answer: 'Primero revisamos el proceso existente. Después definimos qué hace falta ordenar y configuramos DentFlow alrededor de lo necesario, con el equipo involucrado.' },
    { question: '¿Quién usa DentFlow?', answer: 'Principalmente recepción, para gestionar consultas y pendientes, y dirección, para revisar el recorrido y las métricas operativas. Los accesos se definen según los roles y la configuración de la clínica.' },
    { question: '¿Cómo entran las consultas?', answer: 'El recorrido disponible parte del formulario de una landing configurada para la clínica: registra el interés y los datos que la persona deja. No significa que todos los chats de WhatsApp o mensajes de redes se importen automáticamente. En esta demo las consultas ficticias ya están cargadas.' },
    { question: '¿Cómo es la implementación?', answer: 'Revisamos el proceso, configuramos clínica, usuarios y flujo, probamos el recorrido con una consulta de prueba y hacemos la capacitación inicial. El alcance y los tiempos se acuerdan según lo necesario.' },
    { question: '¿Cómo sé si realmente necesito un CRM?', answer: 'Un CRM es una herramienta para organizar consultas y seguimiento. Primero revisamos cómo lo gestionan hoy. Si el problema puede resolverse con un proceso más simple, también debería quedar claro antes de implementar software.' },
    { question: '¿La demo usa información real?', answer: 'No. Todos los datos son ficticios. Las cifras se calculan a partir de las acciones que probás y no representan resultados de clientes. La demo no está conectada a datos reales de pacientes ni al CRM privado, y no envía mensajes.' },
    { question: '¿DentFlow garantiza más pacientes o más ventas?', answer: 'No. DentFlow organiza el seguimiento de las consultas que la clínica ya recibe y da visibilidad al proceso. El resultado comercial depende de múltiples factores de la clínica y del equipo.' },
  ],
}

export const whatsappMessages = {
  general: 'Hola Tiago. Vi DentFlow y quiero revisar cómo estamos gestionando el seguimiento de consultas en nuestra clínica.',
  demo: 'Hola Tiago. Probé la demo de DentFlow y quiero revisar si podría aplicarse a nuestra clínica.',
  final: 'Hola Tiago. Vi la página de DentFlow y me gustaría revisar nuestro proceso actual de seguimiento.',
} as const

export type ContactContext = keyof typeof whatsappMessages

export function getContactHref(context: ContactContext = 'general') {
  const phone = site.contact.whatsapp?.replace(/\D/g, '')
  if (phone) return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessages[context])}`
  return site.contact.email ? `mailto:${site.contact.email}?subject=${encodeURIComponent('Consulta sobre DentFlow')}&body=${encodeURIComponent(whatsappMessages[context])}` : null
}

export const contactHref = getContactHref()
