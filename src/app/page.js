import Image from "next/image";
import Seccion from "@/ui/Seccion";
import BlogCard from "@/ui/BlogCard";
import Titulo from "@/ui/Titulo";
import Parrafo from "@/ui/Parrafo";
import ImageSliderWithText from "@/ui/ImageSliderWithText";

export default function Home() {
  const slides = [
    {
      image: "/ResiduosReciclabes3.jpg",
      title: "Reciclaje Sostenible",
      description: "Transformando el futuro a través de prácticas sostenibles",
    },
    {
      image: "/ResiduosReciclabes1.jpeg",
      title: "Economía Circular",
      description: "Creando un ciclo de reutilización responsable",
    },
    {
      image: "/ResiduosReciclabes2.jpg",
      title: "Impacto Ambiental",
      description: "Reduciendo nuestra huella ecológica día a día",
    },
  ]
  return (
    <main className="flex flex-col w-full items-center ">

      <ImageSliderWithText slides={slides} />


      <Seccion className={'space-x-0'}>
        <Titulo
          texto={'Materiales permitidos'}
        />
        <Parrafo clas={'text-center'}>
          Observa un poco de los materiales a los que Boricue les da soporte en nuestra pagina web
        </Parrafo>


        <div className="w-full flex md:space-x-6 space-y-6 justify-center  items-center flex-col md:flex-row">
          <BlogCard
            title={'Carton'}
            description={'Carton en buen estado, sin haber sido usado anteriormente.'}
            imageUrl={'/Carton.jpg'}
          />
          <BlogCard
            title={'Aluminio'}
            description={'En todas sus presentaciones, latas, papel, todos los tipos son aceptados.'}
            imageUrl={'/Aluminio.jpg'}
          />
          <BlogCard
            title={'Cuero'}
            description={'Recortes de cuero, trozos de cuero o elementos de cuero que ya no sean de uso.'}
            imageUrl={'/Cuero.jpeg'}
          />
        </div>
      </Seccion>

    </main>

  );
}
