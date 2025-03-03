import Image from "next/image";
import Seccion from "@/ui/Seccion";
import BlogCard, { BlogInfo }  from "@/ui/BlogCard";
import Titulo from "@/ui/Titulo";
import Parrafo from "@/ui/Parrafo";
import ImageSliderWithText from "@/ui/ImageSliderWithText";

export default function Preguntas() {
  return (
    <main className="flex flex-col w-full items-center ">
        <Seccion>
            <Titulo texto={'TODO SOBRE NOSOTROS'}/> 

            <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">

                <Parrafo clas="text-justify">
                    Entendemos que puedes tener dudas o preguntas, por ello aqui te dejamos una serie de preguntas tipicas de nuestros usuarios con su respectiva respuesta, esperamos que te sea de ayuda, de no encontrar tu pregunta, siempre puedes comunicarte con nosotros mediante la pestaña de contactanos.
                </Parrafo>
            </div>
        </Seccion>

        <Seccion className={'sm:flex-row'}>
            <div className="w-full flex flex-col space-y-6 justify-center items-center">
                <BlogInfo                    
                imageUrl={'/PestañaPreguntas1.jpg'}
                title={'¿Quienes pueden publicar materiales?'}
                description={'Todos los usuarios pueden publicar sus productos y materiales, ya sean una persona natural o una empresa, todos son aceptados en Boricue'}
                />
                <BlogInfo
                imageUrl={'/Preguntas2.jpeg'}
                title={'¿QUE MATERIALES SON ACEPTADOS?'}
                description={'Boricue presta soporte a varios tipos de materiales, entre los cuales se pueden encontrar el cuero, cobre, hierro, plastico y aluminio. Si no encuentras un material que posees, puedes avisarnos para añadirlo o puedes seleccionar la opcion de otro'}/>

            </div>
        </Seccion>
    </main>
  );
}