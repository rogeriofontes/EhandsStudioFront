"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import HeaderPg from "../components/HeaderPg";
import Footer from "../components/Footer";

export default function FilteredProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });

    axios
      .get("http://localhost:8080/api/v1/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category?.id === parseInt(selectedCategory)
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <>
      <HeaderPg />

      <main className="container mx-auto p-4 mt-24">
        <h1 className="text-3xl font-bold mb-6">Produtos com Filtro por Categoria</h1>

        <div className="mb-6">
          <label className="mr-2 font-medium">Filtrar por Categoria:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 && <p>Nenhum produto encontrado.</p>}

          {filteredProducts.map(({ id, name, description, imageUrl, price }) => (
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
              <p className="text-gray-800 mt-2 font-semibold">R$ {price}</p>

              <Link href={`/single-product/${id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Ver Produto
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
