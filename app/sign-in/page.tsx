'use client'
import React, { useState } from "react";
import { IUser } from "../interfaces/user";

export default function SignIn(): React.JSX.Element {
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: ""
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
    <main className="flex min-h-screen flex-col items-center pt-8 bg-[#000113]">
      <h1 className="text-[28px] text-white">Phonemix</h1>
      <h2 className="text-[32px] text-white mt-8">Register</h2>

      <section className="gap-7">
        <div className="gap-7 flex content-between">
          <label htmlFor="email" className="text-[14px] text-white/30">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user@example.com"
            className="text-white/30 text-[13px] bg-transparent border-none"
            value={user.email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="gap-7 flex content-between">
          <label htmlFor="username" className="text-[14px] text-white/30">
            Usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="text-white/30 text-[13px] bg-transparent border-none"
            value={user.username}
            onChange={handleUserNameChange}
          />
        </div>
        <div className="gap-7 flex content-between">
          <label htmlFor="password" className="text-[14px] text-white/30">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Ingresa tu password"
            className="text-white/30 text-[13px] bg-transparent border-none"
            value={user.password}
            onChange={handlePasswordChange} 
          />
        </div>

        <button
          type="button"
          className="bg-[#334155] text-white text-[14px] p-2 rounded-md"
          onClick={handleRegister} 
        >
          Registrar
        </button>
      </section>
    </main>
  );
}
