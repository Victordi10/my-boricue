import { Shield, Users, Star } from "lucide-react"

const TrustCard = ({ title, description, icon: Icon }) => {
    return (
        <div className="relative group">
            {/* Card Container */}
            <div
                className="h-full p-6 bg-white rounded-xl shadow-md transition-all duration-300 
        hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            >
                {/* Icon Container */}
                <div className="mb-4 flex justify-center">
                    <div
                        className="p-3 rounded-full bg-green-50 text-green-600 
            transition-transform duration-300 group-hover:scale-110"
                    >
                        <Icon size={24} />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                    <h3
                        className="text-xl font-bold text-gray-800 group-hover:text-green-600 
            transition-colors duration-300"
                    >
                        {title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>

                {/* Decorative Elements */}
                <div
                    className="absolute -z-10 top-0 left-0 w-24 h-24 bg-green-50 rounded-full 
          opacity-0 group-hover:opacity-50 transition-all duration-500 
          group-hover:scale-150 -translate-x-12 -translate-y-12"
                />
                <div
                    className="absolute -z-10 bottom-0 right-0 w-24 h-24 bg-blue-50 rounded-full 
          opacity-0 group-hover:opacity-50 transition-all duration-500 
          group-hover:scale-150 translate-x-12 translate-y-12"
                />
            </div>
        </div>
    )
}

const TrustSection = () => {
    const trustItems = [
        {
            title: "SOMOS CONFIABLES",
            description: "Boricue en ningún momento comprometerá tu información o la usará para otros asuntos.",
            icon: Shield,
        },
        {
            title: "SOMOS PROFESIONALES",
            description:
                "Entendemos las necesidades de nuestros usuarios y más aún de la economía actual y ofrecemos una solución.",
            icon: Users,
        },
        {
            title: "SOMOS BORICUE",
            description:
                "Somos tu plataforma en línea confiable para comunicarte entre usuarios y empresas y contribuir a un nuevo modelo económico.",
            icon: Star,
        },
    ]

    return (
        <section className="py-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Por qué elegirnos?</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto rounded-full" />
                </div>

                {/* Trust Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {trustItems.map((item, index) => (
                        <TrustCard key={index} title={item.title} description={item.description} icon={item.icon} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrustSection

