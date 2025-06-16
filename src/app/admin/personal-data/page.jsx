"use client";

import React, { useState } from "react";

export default function AdminDashboard() {
  const [artistData, setArtistData] = useState({
    name: "Artista Exemplo",
    email: "artista@exemplo.com",
    phone: "1234-5678",
  });

  const [formData, setFormData] = useState({ ...artistData });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setArtistData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(artistData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dados Pessoais do Artista</h2>

      {!isEditing && (
        <div>
          <p><strong>Nome:</strong> {artistData.name}</p>
          <p><strong>Email:</strong> {artistData.email}</p>
          <p><strong>Telefone:</strong> {artistData.phone}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Editar
          </button>
        </div>
      )}

      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col gap-4"
        >
          <label className="flex flex-col">
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>

          <label className="flex flex-col">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>

          <label className="flex flex-col">
            Telefone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </label>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
