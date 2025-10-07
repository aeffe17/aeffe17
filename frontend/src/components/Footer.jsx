import { Button } from '@/components/ui/button.jsx'
import { 
  Home, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Torna su"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">EasyRealEstate</h3>
                <p className="text-sm text-gray-400">Garda Lake</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              La tua agenzia immobiliare di fiducia sul Lago di Garda. 
              Specializzati in ville, appartamenti e case con vista lago.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Link Utili</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#properties" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Proprietà
                </a>
              </li>
              <li>
                <a href="#search" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Ricerca Avanzata
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Chi Siamo
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Servizi
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contatti
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servizi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Vendita Immobili
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Affitto Immobili
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Valutazione Immobili
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Consulenza Immobiliare
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Gestione Proprietà
                </a>
              </li>
              <li>
                <Button variant="outline" size="sm" className="mt-2 text-xs">
                  Richiedi Preventivo
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contatti</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Via del Lago, 123</p>
                  <p className="text-gray-300">37016 Garda (VR)</p>
                  <p className="text-gray-300">Italia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a 
                  href="tel:+390456270123" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  +39 045 627 0123
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a 
                  href="mailto:info@easyrealestate-garda.it" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  info@easyrealestate-garda.it
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 EasyRealEstate Garda Lake. Tutti i diritti riservati.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Termini di Servizio
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
              <a href="#sitemap" className="text-gray-400 hover:text-blue-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
