"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import Seccion from "@/ui/Seccion"
import Titulo from "@/ui/Titulo"
import FormularioContacto from "@/components/FormularioContacto"
import InformacionContacto from "@/components/InformacionContacto"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Aquí iría la lógica real de envío
    console.log("Formulario enviado:", formData)

    setIsSubmitting(false)
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <Seccion className=" flex md:flex-row items-center  ">
      {/* Formulario de Contacto */}
      <FormularioContacto formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />

      {/* Información de Contacto */}
      <InformacionContacto />
    </Seccion>
  )
}

export default ContactSection

