"use client";

import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import jwtDecode from "jwt-decode";
import axios from "axios";

function getArtistIdFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.artistId || decoded.id; 
    }
  } catch (error) {
    console.error("Erro ao decodificar o token", error);
  }
  return null;
}

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("personal-data");
  const [artistData, setArtistData] = useState(null);
  const artistId = getArtistIdFromToken();

  useEffect(() => {
    if (artistId) {
      axios
        .get(`http://localhost:8080/api/artists/${artistId}`)
        .then((response) => setArtistData(response.data))
        .catch((error) => console.error("Erro ao carregar dados do artista", error));
    }
  }, [artistId]);

  if (!artistId) {
    return <p>Você precisa estar logado como artista para acessar o painel.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAdmin />

      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar/menu */}
        <aside className="w-64 bg-white shadow-md">
          <nav className="flex flex-col mt-6">
            <button
              onClick={() => setActiveTab("personal-data")}
              className={`p-4 text-left hover:bg-blue-100 ${
                activeTab === "personal-data" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              Dados Pessoais
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`p-4 text-left hover:bg-blue-100 ${
                activeTab === "products" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              Produtos
            </button>

            <button
              onClick={() => setActiveTab("budgets")}
              className={`p-4 text-left hover:bg-blue-100 ${
                activeTab === "budgets" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              Orçamentos
            </button>
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-8">
          {activeTab === "personal-data" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Dados Pessoais</h2>
              {artistData ? (
                <form>
                  <div className="mb-4">
                    <label className="block">Nome:</label>
                    <input
                      type="text"
                      value={artistData.name}
                      className="border rounded p-2 w-full"
                      onChange={(e) =>
                        setArtistData({ ...artistData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block">Bio:</label>
                    <textarea
                      value={artistData.bio}
                      className="border rounded p-2 w-full"
                      onChange={(e) =>
                        setArtistData({ ...artistData, bio: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      axios
                        .put(
                          `http://localhost:8080/api/artists/${artistId}`,
                          artistData
                        )
                        .then(() => alert("Dados atualizados!"))
                        .catch((error) =>
                          console.error("Erro ao atualizar", error)
                        )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Salvar Alterações
                  </button>
                </form>
              ) : (
                <p>Carregando dados...</p>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Produtos</h2>
              {/* Aqui você pode criar um componente separado tipo: <ProductCrud artistId={artistId} /> */}
              <p>CRUD de produtos filtrando pelo ID do artista: {artistId}</p>
            </div>
          )}

          {activeTab === "budgets" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Orçamentos</h2>
              {/* Aqui um componente tipo: <BudgetList artistId={artistId} /> */}
              <p>Lista de orçamentos onde o artista {artistId} pode responder.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
