'use client'
import React, { useState } from "react";
import { ILoginUser } from "@/app/interfaces/user";

export default function Login(): React.JSX.Element {
  const [user, setUser] = useState<ILoginUser>({
    email: "",
    password: ""
  });

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, email: e.target.value });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, password: e.target.value });
  }

  function handleRegister(): void {
    console.log("Usuario registrado:", user);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#000113]">
    <div className="bg-[#0d0d1f] p-8 rounded-lg shadow-lg w-[320px] relative">
      {/* Sección del fondo inclinado */}

      <h1 className="text-[32px] text-white text-center font-bold mb-2 relative z-10">Phonemix</h1>
      <h2 className="text-[24px] text-white text-center mb-6 relative z-10">Login</h2>

      <div className="mb-4 relative z-10">
        <label htmlFor="email" className="block text-white/60 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="user@example.com"
          className="w-full p-2 bg-[#1a1a2e] text-white/90 text-[13px] rounded-md"
          value={user.email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="mb-4 relative z-10">
        <label htmlFor="password" className="block text-white/60 mb-1 flex justify-between items-center">
          Password
          <a href="#" className="text-white/60 text-[12px]">Forgot?</a>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Ingresa tu password"
          className="w-full p-2 bg-[#1a1a2e] text-white/90 text-[13px] rounded-md"
          value={user.password}
          onChange={handlePasswordChange}
        />
      </div>

      <button
        type="button"
        className="w-full bg-[#334155] text-white py-2 rounded-md font-semibold text-[14px] hover:bg-[#475569] transition duration-200 relative z-10"
        onClick={handleRegister}
      >
        Log In
      </button>

      <div className="flex justify-center mt-6 relative z-10">
        <p className="text-white/60 text-[12px]">
          Aun no tienes cuenta?{" "}
          <a href="/sign-in" className="text-white/90 font-semibold">Create una</a>
        </p>
      </div>
    </div>
  </main>
  );
}
