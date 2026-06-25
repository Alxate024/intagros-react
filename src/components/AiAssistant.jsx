import { useMemo, useState } from 'react'
import { contact } from '../data/siteContent'
import './AiAssistant.css'

const quickPrompts = [
  'Diagnosticar caña',
  'Optimizar riego',
  'Mejorar trapiche',
  'Ver tecnología',
]

const responses = new Map([
  ['Diagnosticar caña', 'Para caña empezaría por ficha de lote: variedad, edad, Brix, suelo, riego, historial de fertilización y ventana de cosecha. Con eso armamos prioridades por impacto.'],
  ['Optimizar riego', 'La ruta ideal combina humedad de suelo, textura, clima y etapa fenológica. Si el lote tiene datos, podemos pasar de calendario fijo a riego por demanda.'],
  ['Mejorar trapiche', 'En trapiche miraría eficiencia de extracción, tiempo poscorte, limpieza de jugo, punto de panela, combustible y trazabilidad de lote. Ahí suelen aparecer mejoras rápidas.'],
  ['Ver tecnología', 'La capa tecnológica puede arrancar simple: tablero de lotes, alertas Brix/cosecha, control de labores y telemetría. Después se conecta IA predictiva.'],
])

export default function QuickInfoPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [activePrompt, setActivePrompt] = useState(quickPrompts[0])

  const currentResponse = useMemo(() => responses.get(activePrompt), [activePrompt])

  return (
    <aside className={`ai-assistant ${isOpen ? 'is-open' : ''}`} aria-label="Asistente IA INTAGROS">
      <button className="ai-assistant__orb" type="button" onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen}>
        <span className="ai-assistant__rings" aria-hidden="true" />
        <span className="ai-assistant__core">IA</span>
      </button>

      <div className="ai-assistant__panel">
        <div className="ai-assistant__head">
          <span>INTAGROS AI</span>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar asistente">×</button>
        </div>
        <div className="ai-assistant__message">
          <strong>Asistente agroindustrial</strong>
          <p>{currentResponse}</p>
        </div>
        <div className="ai-assistant__prompts">
          {quickPrompts.map((prompt) => (
            <button
              className={activePrompt === prompt ? 'is-active' : ''}
              type="button"
              onClick={() => setActivePrompt(prompt)}
              key={prompt}
            >
              {prompt}
            </button>
          ))}
        </div>
        <a className="ai-assistant__cta" href={contact.whatsappHref} target="_blank" rel="noreferrer">
          Convertir esto en asesoría
        </a>
      </div>
    </aside>
  )
}
