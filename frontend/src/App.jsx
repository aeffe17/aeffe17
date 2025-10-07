import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import PropertyCard from './components/PropertyCard'
import Footer from './components/Footer'
import SEO from './components/SEO'
import CookieBanner from './components/CookieBanner'
import { Button } from '@/components/ui/button.jsx'
import { Filter, Grid, List } from 'lucide-react'
import './App.css'

function App() {
  const [visitorsCount, setVisitorsCount] = useState(0)
  const [properties, setProperties] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Mock data per le proprietà
  const mockProperties = [
    {
      id: 1,
      title: "Villa Panoramica con Vista Lago",
      description: "Splendida villa moderna con vista mozzafiato sul Lago di Garda, giardino privato e piscina.",
      price: 1200000,
      city: "Riva del Garda",
      sqm: 250,
      rooms: 5,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop"
      ],
      status: "available"
    },
    {
      id: 2,
      title: "Appartamento Moderno Centro Storico",
      description: "Elegante appartamento ristrutturato nel cuore del centro storico, a pochi passi dal lago.",
      price: 450000,
      city: "Malcesine",
      sqm: 120,
      rooms: 3,
      images: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop"
      ],
      status: "available"
    },
    {
      id: 3,
      title: "Casa Tradizionale con Giardino",
      description: "Caratteristica casa tradizionale con ampio giardino e vista panoramica sulle montagne.",
      price: 680000,
      city: "Limone sul Garda",
      sqm: 180,
      rooms: 4,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
      ],
      status: "reserved"
    },
    {
      id: 4,
      title: "Attico di Lusso Fronte Lago",
      description: "Esclusivo attico con terrazza panoramica e accesso diretto alla spiaggia privata.",
      price: 2100000,
      city: "Sirmione",
      sqm: 300,
      rooms: 6,
      images: [
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop"
      ],
      status: "available"
    }
  ]

  // Simula il caricamento dei dati e il conteggio visitatori
  useEffect(() => {
    // Simula una chiamata API per il conteggio visitatori
    const fetchVisitorsCount = async () => {
      try {
        // In un'app reale, questa sarebbe una chiamata API
        // const response = await fetch('/api/metrics/visitors')
        // const data = await response.json()
        // setVisitorsCount(data.total_visitors)
        
        // Per ora, usiamo un valore simulato
        setVisitorsCount(1247)
      } catch (error) {
        console.error('Errore nel recupero del conteggio visitatori:', error)
      }
    }

    // Simula il caricamento delle proprietà
    const fetchProperties = async () => {
      try {
        // In un'app reale, questa sarebbe una chiamata API
        // const response = await fetch('/api/properties')
        // const data = await response.json()
        // setProperties(data)
        
        // Per ora, usiamo i dati mock
        setProperties(mockProperties)
      } catch (error) {
        console.error('Errore nel caricamento delle proprietà:', error)
      }
    }

    // Registra la visita
    const recordVisit = async () => {
      try {
        // In un'app reale, questa sarebbe una chiamata API
        // await fetch('/api/metrics/visit', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ page: '/' })
        // })
        console.log('Visita registrata')
      } catch (error) {
        console.error('Errore nella registrazione della visita:', error)
      }
    }

    fetchVisitorsCount()
    fetchProperties()
    recordVisit()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Component */}
      <SEO />
      
      {/* Header */}
      <Header visitorsCount={visitorsCount} />

      {/* Hero Section */}
      <Hero />

      {/* Properties Section */}
      <section id="properties" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proprietà in Evidenza
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Scopri le migliori opportunità immobiliari sul Lago di Garda
            </p>
          </div>

          {/* Filters and View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtri
              </Button>
              <span className="text-sm text-gray-600">
                {properties.length} proprietà trovate
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prezzo Min
                  </label>
                  <input
                    type="number"
                    placeholder="€ 0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prezzo Max
                  </label>
                  <input
                    type="number"
                    placeholder="€ 999,999"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Camere
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Qualsiasi</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Superficie Min
                  </label>
                  <input
                    type="number"
                    placeholder="m²"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Carica Altre Proprietà
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Chi Siamo
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              EasyRealEstate Garda Lake è la tua agenzia immobiliare di fiducia specializzata 
              nelle proprietà più esclusive del Lago di Garda. Con oltre 10 anni di esperienza 
              nel settore, offriamo un servizio personalizzato per aiutarti a trovare la casa 
              dei tuoi sogni o a vendere la tua proprietà al miglior prezzo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Anni di Esperienza</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Proprietà Vendute</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Clienti Soddisfatti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  )
}

export default App
