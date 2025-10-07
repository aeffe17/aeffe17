import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { X, Cookie, Settings } from 'lucide-react'

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent)
        setPreferences(savedPreferences)
      } catch (error) {
        console.error('Error parsing cookie preferences:', error)
      }
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
    setShowBanner(false)
    setShowSettings(false)
    
    // Initialize analytics and other services here
    initializeServices(allAccepted)
  }

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    setShowBanner(false)
    setShowSettings(false)
    
    // Initialize only selected services
    initializeServices(preferences)
  }

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    setPreferences(onlyNecessary)
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary))
    setShowBanner(false)
    setShowSettings(false)
  }

  const initializeServices = (prefs) => {
    // Initialize analytics if accepted
    if (prefs.analytics) {
      // Initialize Google Analytics, etc.
      console.log('Analytics cookies accepted - initializing tracking')
    }
    
    // Initialize marketing cookies if accepted
    if (prefs.marketing) {
      // Initialize marketing pixels, etc.
      console.log('Marketing cookies accepted - initializing marketing tools')
    }
    
    // Initialize functional cookies if accepted
    if (prefs.functional) {
      // Initialize chat widgets, etc.
      console.log('Functional cookies accepted - initializing additional features')
    }
  }

  const handlePreferenceChange = (type, value) => {
    if (type === 'necessary') return // Cannot change necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          {!showSettings ? (
            // Main Banner
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex items-start space-x-3 flex-1">
                <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Utilizziamo i cookie per migliorare la tua esperienza
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Utilizziamo cookie essenziali per il funzionamento del sito e cookie opzionali per 
                    analisi, personalizzazione e marketing. Puoi scegliere quali accettare o rifiutare tutti 
                    i cookie non essenziali. Per maggiori informazioni, consulta la nostra{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="w-full sm:w-auto"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Personalizza
                </Button>
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="w-full sm:w-auto"
                >
                  Rifiuta tutto
                </Button>
                <Button
                  onClick={acceptAll}
                  className="w-full sm:w-auto"
                >
                  Accetta tutto
                </Button>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Impostazioni Cookie
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Cookie Necessari</h4>
                    <p className="text-sm text-gray-600">
                      Essenziali per il funzionamento del sito. Non possono essere disabilitati.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Cookie Analitici</h4>
                    <p className="text-sm text-gray-600">
                      Ci aiutano a capire come i visitatori interagiscono con il sito.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('analytics', !preferences.analytics)}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.analytics 
                          ? 'bg-blue-600 justify-end' 
                          : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Cookie Marketing</h4>
                    <p className="text-sm text-gray-600">
                      Utilizzati per mostrare annunci personalizzati e misurare l'efficacia delle campagne.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('marketing', !preferences.marketing)}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.marketing 
                          ? 'bg-blue-600 justify-end' 
                          : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                    </button>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Cookie Funzionali</h4>
                    <p className="text-sm text-gray-600">
                      Abilitano funzionalità avanzate come chat dal vivo e personalizzazione.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('functional', !preferences.functional)}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.functional 
                          ? 'bg-blue-600 justify-end' 
                          : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="w-full sm:w-auto"
                >
                  Rifiuta tutto
                </Button>
                <Button
                  onClick={acceptSelected}
                  className="w-full sm:w-auto"
                >
                  Salva Preferenze
                </Button>
                <Button
                  onClick={acceptAll}
                  className="w-full sm:w-auto"
                >
                  Accetta tutto
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CookieBanner
