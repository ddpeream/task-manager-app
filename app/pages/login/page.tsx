// src/pages/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from '../../store/useAuthStore';
import LoginForm from '../../components/login/LoginForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    if (!error) {
      router.push('/pages/task');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <LoginForm onSubmit={handleLogin} />
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default LoginPage;