import { Button } from '@/components/ui/button.jsx'
import { MapPin, Bed, Square, Euro, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'
import LazyImage from './LazyImage'

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const {
    id,
    title,
    description,
    price,
    city,
    sqm,
    rooms,
    images = ['/api/placeholder/400/300'],
    status = 'available'
  } = property

  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden">
        <LazyImage
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 hover:bg-white text-gray-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 bg-white/80 hover:bg-white rounded-full text-gray-700 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Status Badge */}
        {status !== 'available' && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === 'sold' 
                ? 'bg-red-500 text-white' 
                : status === 'reserved'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-500 text-white'
            }`}>
              {status === 'sold' ? 'Venduto' : status === 'reserved' ? 'Riservato' : status}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-blue-600">
            {formatPrice(price)}
          </h3>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {city}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h4>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Property Details */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{rooms} camere</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{sqm} m²</span>
          </div>
          <div className="flex items-center">
            <Euro className="w-4 h-4 mr-1" />
            <span>{Math.round(price / sqm)}/m²</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            Dettagli
          </Button>
          <Button className="flex-1">
            Contatta
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
