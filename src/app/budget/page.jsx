"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import HeaderPg from "../components/HeaderPg";
import Footer from "../components/Footer";

export default function BudgetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;
    axios
      .get(`http://localhost:8080/api/v1/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Erro ao carregar produto"));
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      const budgetData = { description, productId };
      localStorage.setItem("pendingBudget", JSON.stringify(budgetData));
      alert(
        "Você precisa estar logado para enviar um orçamento. Após o login, volte para esta página para finalizar o envio."
      );
      router.push(`/login?redirect=/budget?productId=${productId}`);
      setSubmitting(false);
      return;
    }

    if (!imageFile) {
      setError("Por favor, selecione uma imagem.");
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("productId", productId);
      formData.append("customerId", userId);
      formData.append("image", imageFile);

      await axios.post("http://localhost:8080/api/v1/budgets", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.removeItem("pendingBudget");
      router.push("/budgets"); 
    } catch (error) {
      console.error("Erro ao enviar orçamento:", error.response?.data || error.message);
      setError("Erro ao enviar orçamento. Verifique os dados e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeaderPg />

      <main className="container mx-auto p-6 mt-28 max-w-3xl">
        {product && (
          <div className="bg-white shadow rounded p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full max-h-80 object-contain mb-4"
            />
            <p className="text-gray-600">{product.description}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded space-y-4">
          <h3 className="text-xl font-semibold mb-4">Detalhes do Orçamento</h3>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div>
            <label className="block mb-1 font-medium">Descreva como você quer o produto</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              rows="5"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Foto (obrigatória)</label>
            <label
              htmlFor="image-upload"
              className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Selecionar imagem
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="hidden"
              required
            />
            {imageFile && (
              <p className="mt-2 text-sm text-gray-700">Arquivo selecionado: {imageFile.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Enviar Orçamento"}
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
