import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ExperienceLayer.css'

const routeProfiles = [
  {
    match: 'cana-de-azucar',
    tone: 'cane',
    label: 'Caña OS',
    title: 'Gemelo cañero activo',
    metrics: ['Brix', 'Soca', 'Trapiche'],
  },
  {
    match: 'frutales-tropicales',
    tone: 'fruit',
    label: 'Frutales Lab',
    title: 'Archivo botánico vivo',
    metrics: ['Fitosanidad', 'Cosecha', 'Poscosecha'],
  },
  {
    match: 'floricultura',
    tone: 'flower',
    label: 'Bloom Core',
    title: 'Invernadero inteligente',
    metrics: ['Tallo', 'Riego', 'Exportación'],
  },
  {
    match: 'tecnologia-innovacion',
    tone: 'tech',
    label: 'Agro Data',
    title: 'Telemetría e IA',
    metrics: ['NDVI', 'Sensores', 'Modelos'],
  },
  {
    match: 'asesorias-agroindustriales',
    tone: 'advisory',
    label: 'Unidad 01',
    title: 'Mapa técnico en curso',
    metrics: ['Diagnóstico', 'Plan', 'Seguimiento'],
  },
  {
    match: 'gestion-ambiental',
    tone: 'eco',
    label: 'Eco System',
    title: 'Restauración y agua',
    metrics: ['Cuenca', 'Carbono', 'Nativas'],
  },
  {
    match: 'logistica-infraestructura',
    tone: 'infra',
    label: 'Field Ops',
    title: 'Logística del predio',
    metrics: ['Rutas', 'Vías', 'Maquinaria'],
  },
]

const defaultProfile = {
  tone: 'core',
  label: 'INTAGROS',
  title: 'Inteligencia agropecuaria',
  metrics: ['Campo', 'Datos', 'Decisión'],
}

export default function ExperienceLayer() {
  const { pathname } = useLocation()
  const [progress, setProgress] = useState(0)

  const profile = useMemo(
    () => routeProfiles.find((item) => pathname.includes(item.match)) ?? defaultProfile,
    [pathname],
  )

  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? Math.min(window.scrollY / available, 1) : 0)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [pathname])

  return (
    <div className={`experience-layer experience-layer--${profile.tone}`} aria-hidden="true">
      <div className="experience-layer__progress">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="experience-layer__rail">
        <span>{profile.label}</span>
        <strong>{profile.title}</strong>
        <div>
          {profile.metrics.map((metric) => (
            <small key={metric}>{metric}</small>
          ))}
        </div>
      </div>
      <div className="experience-layer__constellation">
        {Array.from({ length: 9 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>
    </div>
  )
}
