import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ServiciosAcordeon from './components/ServiciosAcordeon.jsx'
import CasosModal from './components/CasosModal.jsx'
import Calculadora from './components/Calculadora.jsx'
import Certificados from './components/Certificados.jsx'
import FormularioContacto from './components/FormularioContacto.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiciosAcordeon />
        <CasosModal />
        <Calculadora />
        <Certificados />
        <FormularioContacto />
      </main>
      <Footer />
    </>
  )
}
