"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import HeaderPg from "../components/HeaderPg";
import Footer from "../components/Footer";

export default function SignupRegisterPage() {
  const router = useRouter();
  const params = useSearchParams();

  const userId = params.get("userId");
  const role = params.get("role");

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [insta, setInsta] = useState("");
  const [face, setFace] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (role === "ARTIST") {
      axios
        .get("http://localhost:8080/api/v1/categories")
        .then((res) => setCategories(res.data))
        .catch(() => setCategories([]));
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (role === "CUSTOMER") {
        const customerPayload = {
          name,
          address,
          email,
          cpf,
          phone,
          whatsapp,
          user: {
            userId: userId,
          },
        };

        await axios.post("http://localhost:8080/api/v1/customers", customerPayload, {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (role === "ARTIST") {
        if (!imageFile) {
          setError("Foto é obrigatória para artistas.");
          return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("email", email);
        formData.append("cpf", cpf);
        formData.append("phone", phone);
        formData.append("whatsapp", whatsapp);
        formData.append("insta", insta);
        formData.append("face", face);
        formData.append("categoryId", category);
        formData.append("userId", userId);
        formData.append("image", imageFile);

        await axios.post("http://localhost:8080/api/v1/artists", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSuccess("Cadastro concluído com sucesso! Redirecionando...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar os dados. Tente novamente.");
    }
  };

  return (
    <>
      <HeaderPg />

      <main className="container mx-auto p-4 mt-24 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Cadastro de {role === "CUSTOMER" ? "Cliente" : "Artista"}</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Endereço</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">CPF</label>
            <input
              type="text"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Telefone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">WhatsApp</label>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {role === "ARTIST" && (
            <>
              <div>
                <label className="block text-sm font-medium">Instagram</label>
                <input
                  type="url"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Facebook</label>
                <input
                  type="url"
                  value={face}
                  onChange={(e) => setFace(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Categoria</label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
                />
                {imageFile && (
                  <p className="mt-2 text-sm text-gray-700">Arquivo selecionado: {imageFile.name}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Finalizar Cadastro
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
