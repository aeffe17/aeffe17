import { useEffect } from 'react'

const SEO = ({ 
  title = "EasyRealEstate Garda Lake - Immobili sul Lago di Garda",
  description = "Trova la tua casa dei sogni sul Lago di Garda. Ville, appartamenti e case con vista lago. La tua agenzia immobiliare di fiducia.",
  keywords = "immobili lago di garda, case garda, ville lago, appartamenti garda, real estate garda lake",
  image = "/og-image.jpg",
  url = "https://easyrealestate-garda.it"
}) => {
  
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'EasyRealEstate Garda Lake')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')

    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', 'website', true)
    updateMetaTag('og:site_name', 'EasyRealEstate Garda Lake', true)
    updateMetaTag('og:locale', 'it_IT', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)

    // Additional SEO tags
    updateMetaTag('theme-color', '#2563eb')
    updateMetaTag('msapplication-TileColor', '#2563eb')

    // JSON-LD structured data for Real Estate Agent
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "EasyRealEstate Garda Lake",
      "description": description,
      "url": url,
      "logo": `${url}/logo.png`,
      "image": `${url}${image}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via del Lago, 123",
        "addressLocality": "Garda",
        "addressRegion": "Veneto",
        "postalCode": "37016",
        "addressCountry": "IT"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+39-045-627-0123",
        "contactType": "customer service",
        "availableLanguage": ["Italian", "English", "German"]
      },
      "areaServed": [
        "Riva del Garda",
        "Limone sul Garda", 
        "Malcesine",
        "Bardolino",
        "Lazise",
        "Peschiera del Garda",
        "Sirmione",
        "Desenzano del Garda"
      ],
      "priceRange": "€€€",
      "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-13:00"
    }

    // Remove existing JSON-LD script
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new JSON-LD script
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    // Preload critical resources
    const preloadResource = (href, as, type = null) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (type) link.type = type
      document.head.appendChild(link)
    }

    // Preload critical fonts (if using custom fonts)
    // preloadResource('/fonts/inter-var.woff2', 'font', 'font/woff2')

    // Preload hero image for LCP optimization
    preloadResource('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop', 'image')

  }, [title, description, keywords, image, url])

  return null // This component doesn't render anything
}

export default SEO
