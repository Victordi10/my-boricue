'use client';

import React, { useState } from "react";
import Image from "next/image";
import Seccion from "@/ui/Seccion";
import MaterialCard from "@/ui/Card";
import Titulo from "@/ui/Titulo";
import Parrafo from "@/ui/Parrafo";
import CoverHero from "@/ui/CoverHero";
import ContactSection from "@/ui/ContactSection";

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
    <>
      <CoverHero slides={slides} />


      <Seccion className={'space-x-0'}>
        <Titulo
          texto={'Materiales permitidos'}
        />
        <Parrafo className={'text-center'} style={{textAlign: 'center'}} >
          Observa un poco de los materiales a los que Boricue les da soporte en nuestra pagina web
        </Parrafo>


        <div className="w-full px-2 flex md:space-x-6 space-y-6 justify-center items-center flex-col md:flex-row">
          <MaterialCard
            title={'Carton'}
            description={'Carton en buen estado, sin haber sido usado anteriormente.'}
            imageUrl={'/Carton.jpg'}
          />
          <MaterialCard
            title={'Aluminio'}
            description={'En todas sus presentaciones, latas, papel, todos los tipos son aceptados.'}
            imageUrl={'/Aluminio.jpg'}
          />
          <MaterialCard
            title={'Cuero'}
            description={'Recortes de cuero, trozos de cuero o elementos de cuero que ya no sean de uso.'}
            imageUrl={'/Cuero.jpeg'}
          />
        </div>
      </Seccion>

      <ContactSection />

    </>

  );
}
