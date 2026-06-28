import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AgroVerse from './components/AgroVerse'
import AiAssistant from './components/AiAssistant'
import Header from './components/Header'
import ExperienceLayer from './components/ExperienceLayer'
import ErrorBoundary from './components/common/ErrorBoundary'
import { ContactProvider, UIProvider } from './context'
import { contact, crops, units } from './data/siteContent'
import './styles/global.css'
import './App.css'

// Páginas existentes
const AsesoriasAgroindustriales = lazy(() => import('./pages/AsesoriasAgroindustriales'))
const CanaPanela = lazy(() => import('./pages/CanaPanela'))
const Floricultura = lazy(() => import('./pages/Floricultura'))
const FrutalesTropicales = lazy(() => import('./pages/FrutalesTropicales'))
const AboutPage = lazy(() => import('./pages/InstitutionalPage').then((module) => ({ default: module.AboutPage })))
const ServicesPage = lazy(() => import('./pages/InstitutionalPage').then((module) => ({ default: module.ServicesPage })))
const TermsPage = lazy(() => import('./pages/InstitutionalPage').then((module) => ({ default: module.TermsPage })))
const UnitsPage = lazy(() => import('./pages/InstitutionalPage').then((module) => ({ default: module.UnitsPage })))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const TecnologiaInnovacion = lazy(() => import('./pages/TecnologiaInnovacion'))
const PredioZapote = lazy(() => import('./pages/PredioZapote'))
const PredioGuadalito = lazy(() => import('./pages/PredioGuadalito'))
const PredioGuadalitoTree = lazy(() => import('./pages/PredioGuadalitoTree'))
const PredioGuaguya = lazy(() => import('./pages/PredioGuaguya'))
const PrediosHub = lazy(() => import('./pages/PrediosHub'))

// Páginas nuevas mejoradas
const Fundadores = lazy(() => import('./pages/Fundadores'))
const Cultivos = lazy(() => import('./pages/Cultivos'))
const Productos = lazy(() => import('./pages/Productos'))
const Redes = lazy(() => import('./pages/Redes'))
const Contacto = lazy(() => import('./pages/Contacto'))

const LoadingFallback = () => (
  <div className="loading-fallback" role="status" aria-live="polite">
    <span />
    <p>Cargando experiencia INTAGROS...</p>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <ContactProvider>
        <UIProvider>
          <BrowserRouter>
            <div className="app">
              <Header />
              <ExperienceLayer />
              <AgroVerse />
              <main className="main">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<PrediosHub />} />
                    <Route path="/nosotros" element={<AboutPage />} />
                    <Route path="/nosotros/" element={<AboutPage />} />
                    
                    {/* Nuevas rutas mejoradas */}
                    <Route path="/fundadores" element={<Fundadores />} />
                    <Route path="/cultivos" element={<Cultivos />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/redes" element={<Redes />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/contacto/" element={<Contacto />} />
                    
                    {/* Rutas existentes */}
                    <Route path="/unidades" element={<UnitsPage />} />
                    <Route path="/unidades/" element={<UnitsPage />} />
                    {units.map((page) => (
                      <Route
                        path={`/unidades/${page.slug}/`}
                        element={
                          page.slug === 'tecnologia-innovacion'
                            ? <TecnologiaInnovacion />
                            : page.slug === 'asesorias-agroindustriales'
                              ? <AsesoriasAgroindustriales />
                              : <ServicePage slug={page.slug} />
                        }
                        key={page.slug}
                      />
                    ))}
                    <Route path="/unidades/asesorias-agroindustriales/cana-de-azucar/" element={<CanaPanela />} />
                    <Route path="/unidades/asesorias-agroindustriales/frutales-tropicales/" element={<FrutalesTropicales />} />
                    <Route path="/fincas" element={<PrediosHub />} />
                    <Route path="/fincas/" element={<PrediosHub />} />
                    <Route path="/predioshub/finca-garces-eder" element={<PrediosHub />} />
                    <Route path="/predioshub/finca-garces-eder/" element={<PrediosHub />} />
                    <Route path="/finca-garces-eder" element={<PrediosHub />} />
                    <Route path="/finca-garces-eder/" element={<PrediosHub />} />
                    <Route path="/predios" element={<PrediosHub />} />
                    <Route path="/predios/" element={<PrediosHub />} />
                    <Route path="/predio-el-zapote" element={<PredioZapote />} />
                    <Route path="/predio-el-zapote/" element={<PredioZapote />} />
                    <Route path="/predio-guadalito" element={<PredioGuadalito />} />
                    <Route path="/predio-guadalito/" element={<PredioGuadalito />} />
                    <Route path="/predio-guadalito/:id" element={<PredioGuadalitoTree />} />
                    <Route path="/predio-guadalito/:id/" element={<PredioGuadalitoTree />} />
                    <Route path="/predio-guaguya" element={<PredioGuaguya />} />
                    <Route path="/predio-guaguya/" element={<PredioGuaguya />} />
                    <Route path="/unidades/asesorias-agroindustriales/floricultura/" element={<Floricultura />} />
                    <Route path="/unidades/asesorias-agroindustriales/cultivos-transitorios/" element={<ServicePage slug="cultivos-transitorios" />} />
                    <Route path="/servicios" element={<ServicesPage />} />
                    <Route path="/servicios/" element={<ServicesPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/terms/" element={<TermsPage />} />
                    {crops.map((page) => (
                      <Route
                        path={`/${page.slug}/`}
                        element={<Navigate to={`/unidades/asesorias-agroindustriales/${page.slug === 'florales' ? 'floricultura' : page.slug}/`} replace />}
                        key={page.slug}
                      />
                    ))}
                    {units.map((page) => (
                      <Route path={`/${page.slug}/`} element={<Navigate to={`/unidades/${page.slug}/`} replace />} key={`legacy-${page.slug}`} />
                    ))}
                    <Route path="/asesorias" element={<Navigate to="/asesorias-agroindustriales/" replace />} />
                    <Route path="/asesorias-agroindustriales/" element={<Navigate to="/unidades/asesorias-agroindustriales/" replace />} />
                    <Route path="/floricultura/" element={<Navigate to="/unidades/asesorias-agroindustriales/floricultura/" replace />} />
                    <Route path="/gestion-ambiental/" element={<Navigate to="/unidades/gestion-ambiental/" replace />} />
                    <Route path="/tecnologia-e-innovacion/" element={<Navigate to="/unidades/tecnologia-innovacion/" replace />} />
                    <Route path="/unidades/tecnologia-e-innovacion/" element={<Navigate to="/unidades/tecnologia-innovacion/" replace />} />
                    <Route path="/logistica-infraestructura/" element={<Navigate to="/unidades/logistica-infraestructura/" replace />} />
                    <Route path="/cana-de-azucar-y-panela/" element={<Navigate to="/unidades/asesorias-agroindustriales/cana-de-azucar/" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>
              <AiAssistant />
            <footer className="footer">
              <div>
                <strong>INTAGROS</strong>
                <span>Inteligencia Agropecuaria Sostenible</span>
              </div>
              <p>{contact.city} · {contact.phoneLabel} · {contact.email}</p>
            </footer>
          </div>
          </BrowserRouter>
        </UIProvider>
      </ContactProvider>
    </ErrorBoundary>
  )
}

export default App
