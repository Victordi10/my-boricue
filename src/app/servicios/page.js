import Image from "next/image";
import Seccion from "@/ui/Seccion";
import BlogCard from "@/ui/BlogCard";
import Titulo from "@/ui/Titulo";
import Parrafo from "@/ui/Parrafo";
import ImageSliderWithText from "@/ui/ImageSliderWithText";
import { ShoppingCart, Recycle, RefreshCw, CreditCard } from "lucide-react"

const ServiceCard = ({ title, description, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="p-3 bg-green-100 rounded-lg">
            <Icon className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 uppercase mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
export default function Servicios() {

  const services = [
    {
      title: "Venta",
      description:
        "Publica tus desechos o materiales y encuentra compradores interesados en ellos, comuníquense y realicen la compra",
      icon: ShoppingCart,
    },
    {
      title: "Donación",
      description:
        "¿Tienes desechos guardados? ¿Necesitas deshacerte de algún material? Dónalo a una empresa o usuario",
      icon: Recycle,
    },
    {
      title: "Intercambio",
      description: "Habla con un usuario o empresa y lleguen a un acuerdo, intercambien sus materiales o desechos",
      icon: RefreshCw,
    },
    {
      title: "Compra",
      description: "Encuentra un material o residuo para comprar, haz el trato con otro usuario o con una empresa",
      icon: CreditCard,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-uno  via-fondo to-fondo">
      <div className="container mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="max-w-2xl mb-12 relative">
          <div className="absolute left-0 top-0 h-full w-2 bg-green-600"></div>
          <div className="pl-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Servicios</h2>
            <p className="text-xl text-gray-600">Observa un poco de lo que Boricue puede ofrecerte como aplicación</p>
          </div>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} icon={service.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}



