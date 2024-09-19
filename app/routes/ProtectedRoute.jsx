// src/routes/ProtectedRoute.jsx
"use client";  // Marcar el archivo para que se ejecute solo en el cliente

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Usa next/navigation en lugar de next/router
import useAuthStore from '../store/useAuthStore';  // Hook para gestionar la autenticación

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const loading = useAuthStore((state) => state.isLoading);
  const [isClient, setIsClient] = useState(false);  // Nuevo estado para verificar si estamos en el cliente

  // Este useEffect se ejecuta solo en el cliente
  useEffect(() => {
    setIsClient(true);  // Indica que el componente está siendo ejecutado en el cliente
  }, []);

  useEffect(() => {
    if (isClient && !loading && !isAuthenticated) {
      // Si estamos en el cliente y no estamos autenticados, redirigir al login
      router.push('/pages/login');
    }
  }, [isAuthenticated, loading, router, isClient]);

  if (loading || !isClient) {
    return <p>Loading...</p>;  // Mostrar un mensaje mientras se carga el estado del cliente o autenticación
  }

  if (!isAuthenticated && isClient) {
    return null;  // Si no está autenticado y estamos en el cliente, no renderiza nada
  }

  return <>{children}</>;  // Si está autenticado, renderizar el contenido protegido
};

export default ProtectedRoute;
