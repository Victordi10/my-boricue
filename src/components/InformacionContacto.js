
import { useState } from "react"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import Seccion from "@/ui/Seccion"
import Titulo from "@/ui/Titulo"
import Parrafo from "@/ui/Parrafo"

const InformacionContacto = () => {
    return (
        <div className="bg-white rounded-2xl shadow-xl md:shadow-none p-8 w.full md:w-1/2">
            <h2 className="text-3xl font-bold md:hidden text-gray-800 mb-2">Información de Contacto</h2>

            <div className="space-y-4">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <MapPin className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Dirección</h3>
                        <Parrafo className="text-gray-600">Calatrava Itagui Cl. 63 #58B-03</Parrafo>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Phone className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Teléfono</h3>
                        <Parrafo className="text-gray-600">+57 313 664 0809</Parrafo>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Mail className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Correo</h3>
                        <Parrafo className="text-gray-600">BoricueTeAyuda@Boricue.com</Parrafo>
                    </div>
                </div>
            </div>

            {/* Mapa */}
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.624483295141!2d-75.60856782533112!3d6.180989193806478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e46823b07fa76e7%3A0xd858c9c2ddf4b118!2sSENA%20Complejo%20Sur%20Itag%C3%BC%C3%AD!5e0!3m2!1ses!2sco!4v1684982801092!5m2!1ses!2sco"
                    className="w-full h-[200px]"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    )
}

export default InformacionContacto;