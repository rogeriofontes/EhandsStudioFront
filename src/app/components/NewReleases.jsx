"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NewReleases() {
  const [artists, setArtists] = useState([]);
  const router = useRouter();

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

  function handleViewArtist(id) {
    router.push(`/artist/${id}`);
  }

  return (
    <section className="section" id="men">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-heading">
              <h2>Artistas</h2>
              <span>Alguns de nossos talentos.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="artist-grid"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {artists.length > 0 ? (
            artists.map((artist) => (
              <div
                className="item"
                key={artist.id}
                style={{
                  width: "200px",
                  position: "relative",
                }}
              >
                <div
                  className="thumb"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <div
                    className="hover-icons"
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      display: "flex",
                      gap: "8px",
                      zIndex: 2,
                    }}
                  >
                    <i
                      className="fa fa-eye"
                      onClick={() => handleViewArtist(artist.id)}
                      style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        padding: "6px",
                        borderRadius: "50%",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    ></i>
                  </div>

                  <img
                    src={artist.imageUrl || "/assets/images/placeholder.jpg"}
                    alt={artist.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  className="down-content"
                  style={{ textAlign: "center", marginTop: "10px" }}
                >
                  <h4
                    onClick={() => handleViewArtist(artist.id)}
                    className="cursor-pointer text-gray-800 hover:text-yellow-500 transition-colors duration-200 underline">
                    {artist.name}
                  </h4>

                  <p style={{ fontSize: "14px", color: "#666" }}>
                    {artist.category?.name || "Categoria não informada"}

                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">Nenhum artista encontrado.</p>
          )}
        </div>
      </div>
    </section>
  );
}
