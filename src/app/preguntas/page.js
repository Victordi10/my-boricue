'use client'

import React, { useState } from 'react'
import Image from "next/image";
import Seccion from "@/ui/Seccion";
import Titulo from "@/ui/Titulo";
import Parrafo from "@/ui/Parrafo";
import { ChevronDown, ChevronUp } from "lucide-react";

const PreguntaItem = ({ title, description, imageUrl }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full border-b border-gray-300">
            {/* Barra de la pregunta */}
            <div
                className="flex justify-between items-center p-4 bg-fondo cursor-pointer hover:bg-gray-200 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>

            {/* Contenido desplegable */}
            {isOpen && (
                <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-md">
                    {imageUrl && (
                        <div className="relative md:w-56 md:h-56 w-48 h-48 flex-shrink-0">
                            <Image
                                src={imageUrl}
                                alt={title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                    )}
                    <p className="text-gray-600 text-base mt-2 md:mt-0 md:ml-4">{description}</p>
                </div>
            )}
        </div>
    );
};


export default function Preguntas() {
    return (
        <main className="flex flex-col w-full items-center ">
            <Seccion>
                <Titulo texto={'PREGUNTAS FRECUENTES'} />

                <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">

                    <Parrafo clas="text-justify">
                        Entendemos que puedes tener dudas o preguntas, por ello aqui te dejamos una serie de preguntas tipicas de nuestros usuarios con su respectiva respuesta, esperamos que te sea de ayuda, de no encontrar tu pregunta, siempre puedes comunicarte con nosotros mediante la pestaña de contactanos.
                    </Parrafo>
                </div>
            </Seccion>

            <Seccion className={'sm:flex-row'}>
                <div className="w-full flex flex-wrap justify-center gap-6">
                    <PreguntaItem
                        imageUrl={'/PestañaPreguntas1.jpg'}
                        title={'¿QUIÉNES PUEDEN PUBLICAR MATERIALES?'}
                        description={'Todos los usuarios pueden publicar sus productos y materiales, ya sean una persona natural o una empresa, todos son aceptados en Boricue.'}
                    />
                    <PreguntaItem
                        imageUrl={'/Preguntas2.jpeg'}
                        title={'¿QUÉ MATERIALES SON PERMITIDOS?'}
                        description={'Boricue presta soporte a varios tipos de materiales, entre los cuales se pueden encontrar el cuero, cobre, hierro, plástico y aluminio. Si no encuentras un material que posees, puedes avisarnos para añadirlo o puedes seleccionar la opción de otro.'}
                    />
                    <PreguntaItem
                        imageUrl={'/Preguntas3.jpeg'}
                        title={'¿QUÉ BENEFICIOS OBTENGO AL USAR BORICUE?'}
                        description={'Al utilizar Boricue, contribuyes activamente a la sostenibilidad t reduccion de residuos, Además, tienes la oportunidad de colaborar con otros usuarios, encontrar materiales valiosos para tus proyectos y promover prácticas ambientalmente responsables.'}
                    />
                </div>
            </Seccion>

        </main>
    );
}