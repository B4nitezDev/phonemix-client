"use client";
import React, { useState } from "react";
import { IRegisterUser } from "@/app/interfaces/user";

export default function SignIn(): React.JSX.Element {
  const [user, setUser] = useState<IRegisterUser>({
    username: "",
    email: "",
    password: "",
  });

  function handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, username: e.target.value });
  }

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
      <div className="bg-[#0d0d1f] p-8 rounded-lg shadow-lg w-[320px]">
        <h1 className="text-[32px] text-white text-center font-bold mb-2">
          Phonemix
        </h1>
        <h2 className="text-[24px] text-white text-center mb-6">Register</h2>

        <div className="mb-4">
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

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white/60 mb-1 flex justify-between items-center"
          >
            Password
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

        <div className="mb-4">
          <label htmlFor="username" className="block text-white/60 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="w-full p-2 bg-[#1a1a2e] text-white/90 text-[13px] rounded-md"
            value={user.username}
            onChange={handleUserNameChange}
          />
        </div>

        <button
          type="button"
          className="w-full bg-[#334155] text-white py-2 rounded-md font-semibold text-[14px] hover:bg-[#475569] transition duration-200"
          onClick={handleRegister}
        >
          Log In
        </button>

        <div className="flex justify-center mt-6">
          <p className="text-white/60 text-[12px]">
            Ya tienes Cuenta?{" "}
            <a href="/login" className="text-white/90 font-semibold">
              Inicia Sesion
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
