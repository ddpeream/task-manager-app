// src/pages/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from '../../store/useAuthStore';

const Login = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("logueo: form", credentials);

    // Validación de campos requeridos
    if (!credentials.username || !credentials.password) {
      setError("Por favor ingresa tu email y contraseña");
      return;
    }

    try {
      const result = await login(credentials.username, credentials.password);
      console.log("Result", result);
      if (result && result.success) {
        router.push("/pages/task");
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.log(error);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "8px", backgroundColor: "#fff" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ fontWeight: "bold" }}>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: "bold" }}>Email</label>
          <input
            onChange={handleInputChange}
            type="text"
            name="username"
            placeholder="example@gmail.com"
            required
            autoComplete="email"
            style={{ width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc", color: "#000" }}
          />

          <label style={{ fontWeight: "bold" }}>Password</label>
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            placeholder="********"
            required
            autoComplete="current-password"
            style={{ width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc", color: "#000" }}
          />

          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

          <button type="submit" style={{ width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "none", backgroundColor: "#0070f3", color: "#fff", fontWeight: "bold" }}>
            Log in
          </button>
        </form>

        <button style={{ width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "none", backgroundColor: "#ccc", fontWeight: "bold" }}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;