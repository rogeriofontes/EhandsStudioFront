"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import HeaderPg from "../components/HeaderPg";
import Footer from "../components/Footer";

export default function CadastroUserPage() {
  const router = useRouter();

  const [role, setRole] = useState("CUSTOMER");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        login,
        password,
        role: role.toUpperCase(),
      };

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const createdUser = response.data; 

      localStorage.setItem("userId", createdUser.id);
      localStorage.setItem("userRole", createdUser.role);
      localStorage.setItem("userLogin", createdUser.login);

      setSuccess("Usuário criado com sucesso! Redirecionando...");

      setTimeout(() => {
        if (role.toUpperCase() === "ARTIST") {
          router.push("/signup-register?role=ARTIST");
        } else if (role.toUpperCase() === "CUSTOMER") {
          router.push("/signup-register?role=CUSTOMER");
        } else {
          router.push("/login");
        }
      }, 1500);
    } catch (err) {
      console.error("Erro ao criar usuário:", err.response?.data || err.message);
      setError("Erro ao criar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderPg />

      <main className="container mx-auto p-4 mt-24 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Criar Conta</h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRole("ARTIST")}
            className={`px-4 py-2 rounded border ${
              role === "ARTIST" ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            Quero vender
          </button>
          <button
            type="button"
            onClick={() => setRole("CUSTOMER")}
            className={`px-4 py-2 rounded border ${
              role === "CUSTOMER" ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            Quero comprar
          </button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleRegisterUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Login</label>
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline"
          >
            Fazer login
          </button>
        </p>
      </main>

      <Footer />
    </>
  );
}
