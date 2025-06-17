"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import HeaderPg from "../../components/HeaderPg";
import Footer from "../../components/Footer";

export default function SingleProductPage() {
  const params = useParams();
  const productId = params.id;
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/v1/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar o produto.");
        setLoading(false);
      });
  }, [productId]);

  const handleOrcamentoClick = () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      localStorage.setItem(
        "pendingBudget",
        JSON.stringify({ productId, description: "" })
      );

      const redirectUrl = encodeURIComponent(`/budget?productId=${productId}`);
      router.push(`/login?redirect=${redirectUrl}`);
    } else {
      router.push(`/budget?productId=${productId}`);
    }
  };

  if (loading) {
    return (
      <>
        <HeaderPg />
        <main className="container mx-auto p-4 mt-24">
          <p>Carregando produto...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderPg />
        <main className="container mx-auto p-4 mt-24">
          <p className="text-red-600">{error}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <HeaderPg />
        <main className="container mx-auto p-4 mt-24">
          <p>Produto não encontrado.</p>
        </main>
        <Footer />
      </>
    );
  }

  const { name, description, size, imageUrl, price, artistName, categoryName } = product;

  return (
    <>
      <HeaderPg />
      <main className="container mx-auto p-4 mt-24 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/2 rounded overflow-hidden shadow">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-4">{name}</h1>
            <p className="text-gray-700 mb-4">{description}</p>

            <p className="mb-2">
              <span className="font-semibold">Tamanho: </span>
              {size || "Não informado"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Artista: </span>
              {artistName || "Não informado"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Categoria: </span>
              {categoryName || "Não informada"}
            </p>
            <p className="mb-6 text-xl font-semibold">R$ {price}</p>

            <button
              onClick={handleOrcamentoClick}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
