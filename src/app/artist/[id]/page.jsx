"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import HeaderPg from "../../components/HeaderPg";
import Footer from "../../components/Footer";

export default function ArtistProductsPage() {
  const params = useParams();
  const artistId = params.id;
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artistId) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/v1/products/artist/${artistId}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar produtos do artista.");
        setLoading(false);
      });
  }, [artistId]);

  useEffect(() => {
    if (!artistId) return;

    axios
      .get(`http://localhost:8080/api/v1/artists/${artistId}`)
      .then((response) => {
        setArtistName(response.data.name);
      })
      .catch(() => {
        setArtistName('');
      });
  }, [artistId]);

  function handleRequestQuote(productId) {
    router.push(`/single-product/${productId}`);
  }

  return (
    <>
      <HeaderPg />

      <main className="container mx-auto p-4 mt-24">
        <h1 className="text-3xl font-bold mb-6">
          Produtos do Artista {artistName ? `- ${artistName}` : `#${artistId}`}
        </h1>

        {loading && <p>Carregando produtos...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length === 0 && (
              <p>Este artista ainda não tem produtos cadastrados.</p>
            )}

            {products.map(({ id, name, description, imageUrl, price }) => (
              <div
                key={id}
                className="border rounded shadow p-4 flex flex-col items-center"
              >
                <div className="w-48 h-48 mb-3 rounded overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-gray-700 mt-2">{description}</p>
                <p className="text-gray-800 mt-2">R$ {price}</p>

                <button
                  onClick={() => handleRequestQuote(id)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Ver Produto
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
