"use client";

import { useRouter } from "next/navigation";

function HeaderAdmin() {
  const router = useRouter();

  const handleLogout = () => {
    
    router.push("/");
  };

  return (
    <header className="w-full bg-blue-600 text-white p-4 shadow flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/assets/images/logo.png"
          alt="Logo"
          className="h-10 w-auto"
        />
        <h1 className="text-xl font-bold flex-shrink-0">
          Painel Administrativo
        </h1>
      </div>

      <button
        className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900"
        onClick={handleLogout}
      >
        Sair
      </button>
    </header>
  );
}

export default HeaderAdmin;
