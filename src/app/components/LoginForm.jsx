"use client";

import { useState, useEffect } from "react";  
import { useRouter, useSearchParams } from "next/navigation";
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

    const { token, user } = response.data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", user.id);

    const pending = localStorage.getItem("pendingBudget");

    if (pending) {
      const { description, productId } = JSON.parse(pending);

      const formData = new FormData();
      formData.append("description", description);
      formData.append("productId", productId);
      formData.append("customerId", user.id);

      await axios.post("http://localhost:8080/api/v1/budgets", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

        localStorage.removeItem("pendingBudget");

          router.push(`/budget?productId=${productId}`);
          return;
        }

        const redirect = searchParams.get("redirect");
        if (redirect) {
          router.push(redirect);
        } else if (user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/budgets");
        }
      } catch (err) {
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
