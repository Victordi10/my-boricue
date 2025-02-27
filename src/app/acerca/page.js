import Image from "next/image";
import Seccion from "@/ui/Seccion";
import BlogCard, { BlogText } from "@/ui/Card";
import Titulo from "@/ui/Titulo";
import Parrafo from "@/ui/Parrafo";
import TeamSection from "./components/ui/TeamSection";
import TrustSection from "./components/ui/TrustSection";

export default function Acerca() {
  return (
    <>
      <Seccion>
        {/* Título centrado */}
        <Titulo texto="NOSOTROS SOMOS BORICUE" />

        {/* Contenedor full width sin espacios en blanco */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">

          {/* Imagen grande a la izquierda */}


          {/* Texto a la derecha */}
          <div className="w-full md:w-1/2">
            <Parrafo clas="text-justify">
              Boricue es una plataforma en línea diseñada para promover la sostenibilidad y la economía circular al brindar a los usuarios la oportunidad de intercambiar, donar o vender residuos y desechos materiales. Nuestro objetivo es crear un espacio virtual donde las personas y las empresas puedan encontrar una alternativa responsable para darle un segundo uso a materiales como el cuero, cartón, aluminio y otros recursos que de otro modo podrían convertirse en desperdicio.
            </Parrafo>
            <Parrafo clas="text-justify">
              En Boricue estás a solo pasos de contribuir como persona o como empresa por un mundo más limpio y sano, dándole una oportunidad a tus desechos. Bienvenidos a la plataforma en donde la sostenibilidad encuentra su mercado.
            </Parrafo>
          </div>

          <div className="w-full md:w-1/2">
            <Image
              src="/Fabrica.jpeg"
              alt="Fabrica"
              width={600}
              height={450}
              objectFit="cover"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </Seccion>

      <TrustSection />



      <TeamSection />


    </>
  );
}