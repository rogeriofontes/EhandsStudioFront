"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const regUserId = searchParams.get("registeredUserId");
    if (regUserId) {
      localStorage.setItem("userId", regUserId);
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        login,
        password,
      });

      console.log("Resposta do servidor:", response.data);
      const { token } = response.data;

      if (!token) {
        setError("Token não recebido. Verifique suas credenciais.");
        return;
      } else if (token) {
        const { userId, role } = jwtDecode(token);
        console.log("Usuário decodificado:", userId);

        if (!userId) {
          setError("ID do usuário não encontrado no token.");
          return;
        }

        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);

        console.log("Usuário logado com sucesso:", userId);
        console.log("Role do usuário:", role);
        console.log("Token recebido:", token);

        if (role === "ADMIN") {
          router.push("/admin");
        } else if (role === "USER" || role === "ARTIST") {
          router.push("/artists/budgets");
        } else {
          setError("Função de usuário desconhecida.");
        }

      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Login inválido. Verifique suas credenciais.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Entrar</h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Login</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Senha</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Ainda não tem uma conta?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-600 hover:underline font-medium"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}
