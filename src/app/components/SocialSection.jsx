"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SocialSection() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar artistas:", error);
      });
  }, []);

  return (
    <section className="section" id="social">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Redes Sociais</h2>
              <span>
                Acompanhe de perto nossa arte! Siga as redes sociais de nossos artistas e encante-se com cada criação feita com amor.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row images">
          {artists.map(({ id, name, imageUrl, insta, face }) => (
            <div className="col-2" key={id}>
              <div className="thumb text-center">
                <h6 className="mb-2">{name}</h6>

                <div className="relative group w-[200px] h-[200px] mx-auto rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-pink-200 bg-opacity-70 flex justify-center items-center space-x-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    {insta && (
                      <a
                        href={insta}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Instagram de ${name}`}
                        className="text-pink-400 hover:text-pink-600 text-2xl"
                      >
                        <i className="fa fa-instagram"></i>
                      </a>
                    )}
                    {face && (
                      <a
                        href={face}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Facebook de ${name}`}
                        className="text-blue-400 hover:text-blue-600 text-2xl"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
