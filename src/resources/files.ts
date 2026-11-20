const file = (name: string) => ({ name, url: `/recursos/${name}` })

export const kitFiles = {
  zip: file('Dentflow_Kit_Gratuito_Publico.zip'),
  guide: file('Dentflow_Kit_Guia_Practica.pdf'),
  prompt: file('Dentflow_Mega_Prompt_Web_Odontologica.txt'),
  sheet: file('Dentflow_Planilla_Seguimiento.xlsx'),
  checklist: file('Dentflow_Checklist_Diagnostico.pdf'),
} as const
