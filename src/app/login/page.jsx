"use client";

import HeaderPg from "../components/HeaderPg";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <HeaderPg />

      <main className="flex justify-center items-center min-h-screen bg-gray-50 px-100 pt-32">
        <LoginForm />
      </main>

      <Footer />
    </>
  );
}
