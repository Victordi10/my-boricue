import { Facebook, Twitter, Linkedin, Instagram, Plus } from "lucide-react"
import Seccion from "@/ui/Seccion"
import Titulo from "@/ui/Titulo"
import Parrafo from "@/ui/Parrafo"

const TeamMember = ({ name, role, description, image }) => {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            {/* Imagen y Overlay */}
            <div className="relative overflow-hidden">
                <div className="aspect-square">
                    <img
                        src={image || "/Sena.jpe"}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Redes Sociales */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-[-1rem] group-hover:opacity-100">
                    {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                        <a
                            key={index}
                            href="#"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <Icon className="h-5 w-5 text-white" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
                <div className="mb-4 text-center">
                    <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        {role}
                    </span>
                </div>

                {/* Descripción */}
                <div className="relative">
                    <Parrafo className="text-center text-gray-600 leading-relaxed">{description}</Parrafo>
                    {/*  <div className="absolute -right-2 -top-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Plus className="h-5 w-5" />
                        </span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const TeamSection = () => {
    const teamMembers = [
        {
            name: "Sena",
            role: "Desarrollador",
            description: "El SENA es el encargado principal de este sitio web y al que se le atribuye toda esta plataforma.",
            image: "/Sena.jpg",
        },
        {
            name: "Sena",
            role: "Administrador",
            description: "El SENA es el encargado principal de administrar los usuarios y empresas dentro de la plataforma.",
            image: "/Sena.jpg",
        },
        {
            name: "Sena",
            role: "Asistente",
            description: "El SENA es el encargado principal de brindarle asistencia a los usuarios y empresas.",
            image: "/Sena.jpg",
        },
    ]

    return (
        <Seccion className="py-16 bg-gradient-to-br from-fondo via-fondo to-uno mb-10">
            <div className="container mx-auto px-4">
                {/* Encabezado */}
                <div className="mb-12 text-center flex flex-col items-center">
                    <Titulo className=" border-b-4 border-dos mb-4 w-80" texto={'NUESTRO EQUIPO'} />
                    <Parrafo className="text-gray-600 max-w-2xl mx-auto">
                        Un equipo comprometido con la innovación y el desarrollo sostenible
                    </Parrafo>
                </div>

                {/* Grid de miembros del equipo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMember key={index} {...member} />
                    ))}
                </div>
            </div>
        </Seccion>
    )
}

export default TeamSection

