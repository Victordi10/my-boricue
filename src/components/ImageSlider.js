"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

const ImageSliderWithText = () => {
    // Estados
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    // Datos de ejemplo - puedes reemplazarlos con tus propios datos
    const slides = [
        {
            image: "/placeholder.svg?height=600&width=1200&text=Slide1",
            title: "Reciclaje Sostenible",
            description: "Transformando el futuro a través de prácticas sostenibles",
        },
        {
            image: "/placeholder.svg?height=600&width=1200&text=Slide2",
            title: "Economía Circular",
            description: "Creando un ciclo de reutilización responsable",
        },
        {
            image: "/placeholder.svg?height=600&width=1200&text=Slide3",
            title: "Impacto Ambiental",
            description: "Reduciendo nuestra huella ecológica día a día",
        },
    ]

    // Función para ir a la siguiente diapositiva
    const nextSlide = useCallback(() => {
        setCurrentSlide((current) => (current === slides.length - 1 ? 0 : current + 1))
    }, [slides])

    // Función para ir a la diapositiva anterior
    const prevSlide = () => {
        setCurrentSlide((current) => (current === 0 ? slides.length - 1 : current - 1))
    }

    // Función para ir a una diapositiva específica
    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    // Función para alternar el autoplay
    const toggleAutoplay = () => {
        setIsPlaying(!isPlaying)
    }

    // Efecto para el autoplay
    useEffect(() => {
        let intervalId
        if (isPlaying) {
            intervalId = setInterval(nextSlide, 5000) // Cambia cada 5 segundos
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [isPlaying, nextSlide])

    return (
        <div className="relative h-screen w-full overflow-hidden group">
            {/* Contenedor de slides */}
            <div className="relative h-full w-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    >
                        {/* Imagen de fondo */}
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />

                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />

                        {/* Contenido del slide */}
                        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">{slide.title}</h2>
                            <p className="text-xl md:text-2xl max-w-2xl text-center">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botones de navegación */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Siguiente"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full
              ${index === currentSlide ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/75"}`}
                        aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                ))}
            </div>

            {/* Botón de Play/Pause */}
            <button
                onClick={toggleAutoplay}
                className="absolute bottom-8 right-8 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200 z-30 backdrop-blur-sm"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
        </div>
    )
}

export default ImageSliderWithText

