"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Link from "next/link";

import HeaderPg from "../components/HeaderPg";
import Footer from "../components/Footer";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar produtos.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <HeaderPg />

      <main className="container mx-auto p-4 mt-24">
        <h1 className="text-3xl font-bold mb-6">Todos os Produtos</h1>

        {loading && <p>Carregando produtos...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length === 0 && <p>Nenhum produto cadastrado.</p>}

            {products.map(({ id, name, description, imageUrl, price }) => (
              <div
                key={id}
                className="border rounded shadow p-4 flex flex-col items-center"
              >
                <Link href={`/product/${id}`}>
                  <div className="w-48 h-48 mb-3 rounded overflow-hidden cursor-pointer">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <h2 className="text-xl font-semibold">{name}</h2>

                <p className="text-gray-700 mt-2">{description}</p>
                <p className="text-gray-800 mt-2 font-semibold">R$ {price}</p>

                <Link href={`/single-product/${id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Ver Produto
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
