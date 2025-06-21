"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import HeaderPg from "../../components/HeaderPg";
import Footer from "../../components/Footer";

export default function ArtistBudgetsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/artists")
      .then((response) => {
        setArtists(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar artistas.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <HeaderPg />

      <main className="container mx-auto p-4 mt-24">
        <h1 className="text-3xl font-bold mb-6">Todos os Orçamentos do artista X</h1>

        {loading && <p>Carregando artistas...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artists.length === 0 && <p>Nenhum artista cadastrado.</p>}

            {artists.map((artist) => (
              <div
                key={artist.id}
                className="border rounded shadow p-4 flex flex-col items-center"
              >
                <Link href={`/artist/${artist.id}`}>
                  <div className="w-48 h-48 mb-3 rounded overflow-hidden cursor-pointer">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-48 h-48 object-cover"
                    />
                  </div>
                </Link>

                <h2 className="text-xl font-semibold">
                  <Link href={`/artist/${artist.id}`} className="hover:underline">
                    {artist.name}
                  </Link>
                </h2>
                <p className="text-gray-700 mt-2">
                  {artist.category?.name || "Categoria não informada"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
