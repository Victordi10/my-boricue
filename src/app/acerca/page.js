import Image from "next/image";
import Seccion from "@/ui/Seccion";
import BlogCard, { BlogText } from "@/ui/BlogCard";
import Titulo from "@/ui/Titulo";
import Parrafo from "@/ui/Parrafo";
import TeamSection from "./components/ui/TeamSection";

export default function Acerca() {
  return (
    <main className="flex flex-col w-full items-center ">


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


      <Seccion className={'sm:flex-row'}>
        <BlogText title={'SOMOS CONFIABLES'} description={'Boricue en ningún momento comprometerá tu información o la usará para otros asuntos.'} />

        <BlogText title={'SOMOS PROFECIONALES'} description={'Entendemos las necesidades de nuestros usuarios usuarios y más aun de la economia actual y ofrecemos una solucion.'} />

        <BlogText title={'SOMOS BORICUE'} description={'Pero mas allá de todo, somos tu plataforma en linea confiable para comunicarte entre usuarios y empresas y contribuir a un nuevo modelo economico.'} />
      </Seccion>

      <TeamSection />


    </main>
  );
}