import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, Home, Search, User, PlusCircle } from 'lucide-react'

const Header = ({ visitorsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Home className="h-8 w-8 text-blue-600" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">EasyRealEstate</h1>
                <p className="text-xs text-gray-600">Garda Lake</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#properties" className="text-gray-700 hover:text-blue-600 transition-colors">
              Proprietà
            </a>
            <a href="#search" className="text-gray-700 hover:text-blue-600 transition-colors">
              Ricerca
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Chi Siamo
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contatti
            </a>
          </nav>

          {/* Right Side - Visitors Counter & Actions */}
          <div className="flex items-center space-x-4">
            {/* Visitors Counter */}
            <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-600">
              <span>Visitatori:</span>
              <span className="font-semibold text-blue-600">{visitorsCount}</span>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-1" />
                Accedi
              </Button>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-1" />
                Pubblica
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 pt-4">
              <a 
                href="#properties" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Proprietà
              </a>
              <a 
                href="#search" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Ricerca
              </a>
              <a 
                href="#about" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Chi Siamo
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contatti
              </a>
              
              {/* Mobile Visitors Counter */}
              <div className="sm:hidden flex items-center space-x-1 text-sm text-gray-600 py-2">
                <span>Visitatori:</span>
                <span className="font-semibold text-blue-600">{visitorsCount}</span>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <User className="h-4 w-4 mr-1" />
                  Accedi
                </Button>
                <Button size="sm" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Pubblica Annuncio
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
