"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignupRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role")?.toUpperCase() || "CUSTOMER";

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState(null);
  const [userLogin, setUserLogin] = useState("");

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedUserLogin = localStorage.getItem("userLogin");
    if (savedUserId && savedUserLogin) {
      setUserId(savedUserId);
      setUserLogin(savedUserLogin);
    } else {
      setError("Usuário não encontrado. Por favor, faça o cadastro novamente.");
      router.push("/signup-user");
    }
  }, [router]);

  useEffect(() => {
    if (role === "ARTIST") {
      const fetchCategories = async () => {
        try {
          const res = await fetch("http://localhost:8080/api/v1/categories");
          if (!res.ok) throw new Error("Erro ao buscar categorias");
          const data = await res.json();
          setCategories(data);
        } catch (err) {
          console.error(err);
          setError("Erro ao carregar categorias");
        }
      };
      fetchCategories();
    }
  }, [role]);

  const uploadImage = async () => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8080/api/files", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao fazer upload da imagem");

      const imagePath = await res.text();
      return `http://localhost:8080/api/files/${imagePath}`;
    } catch (err) {
      console.error(err);
      throw new Error("Falha ao fazer upload da imagem.");
    }
  };

  const formatCpf = (cpf) => cpf.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!userId) {
      setError("ID do usuário não encontrado. Faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      let uploadedImageUrl = "";

      if (role === "ARTIST" && file) {
        uploadedImageUrl = await uploadImage();
      }

      if (role === "ARTIST") {
        const artistPayload = {
          name,
          imageUrl: uploadedImageUrl,
          address,
          email,
          phone,
          whatsapp,
          cpf: formatCpf(cpf),
          insta: instagram,
          face: facebook,
          category: { id: Number(category) },
          user: {
            id: Number(userId),
            login: userLogin,
            userRole: "ARTIST",
          },
        };

        const res = await fetch("http://localhost:8080/api/v1/artists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(artistPayload),
        });

        if (!res.ok) throw new Error("Erro ao cadastrar artista");
        setSuccess("Artista cadastrado com sucesso!");
      } else {
        // CUSTOMER
        const customerPayload = {
          name,
          address,
          email,
          cpf: formatCpf(cpf),
          phone,
          whatsapp,
          user: {
            id: Number(userId),
            login: userLogin,
            userRole: "CUSTOMER",
          },
        };

        const res = await fetch("http://localhost:8080/api/v1/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerPayload),
        });

        if (!res.ok) throw new Error("Erro ao cadastrar cliente");
        setSuccess("Cliente cadastrado com sucesso!");
      }

      localStorage.removeItem("userId");
      localStorage.removeItem("userLogin");
      localStorage.removeItem("userRole");

      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro no cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 max-w-lg mt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {role === "ARTIST" ? "Cadastro de Artista" : "Cadastro de Cliente"}
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Nome</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            />
          </div>

          <div>
            <label>Endereço</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            />
          </div>

          <div>
            <label>Telefone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            />
          </div>

          <div>
            <label>Whatsapp</label>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            />
          </div>

          <div>
            <label>CPF</label>
            <input
              type="text"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            />
          </div>

          {role === "ARTIST" && (
            <>
              <div>
                <label>Instagram</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  className="w-full border p-2 rounded"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label>Facebook</label>
                <input
                  type="url"
                  placeholder="https://facebook.com/..."
                  className="w-full border p-2 rounded"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label>Imagem do Artista</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full border p-2 rounded"
                  disabled={loading}
                />
              </div>

              <div>
                <label>Categoria</label>
                <select
                  className="w-full border p-2 rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading || categories.length === 0}
                >
                  <option value="">Selecione</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
