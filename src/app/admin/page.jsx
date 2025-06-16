"use client";

import { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dados");

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
              onClick={() => setActiveTab("produtos")}
              className={`p-4 text-left hover:bg-blue-100 ${
                activeTab === "produtos" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              Produtos
            </button>
            <button
              onClick={() => setActiveTab("categorias")}
              className={`p-4 text-left hover:bg-blue-100 ${
                activeTab === "categorias" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              Categorias
            </button>
            <button
              onClick={() => setActiveTab("orcamentos")}
              className={`p-4 text-left hover:bg-blue-100 ${
                activeTab === "orcamentos" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              Orçamentos
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {activeTab === "dados" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Dados Pessoais</h2>
              {/* Aqui vai o CRUD/editar dados pessoais */}
              <p>Aqui o formulário para editar dados pessoais do artista.</p>
            </div>
          )}

          {activeTab === "produtos" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Produtos</h2>
              {/* CRUD produtos */}
              <p>Aqui vai o CRUD para cadastrar, editar e deletar produtos.</p>
            </div>
          )}

          {activeTab === "categorias" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Categorias</h2>
              {/* CRUD categorias */}
              <p>Aqui vai o CRUD de categorias.</p>
            </div>
          )}

          {activeTab === "orcamentos" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Orçamentos</h2>
              {/* Lista orçamentos, respostas, etc */}
              <p>Aqui vai a lista e respostas dos orçamentos dos clientes.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}