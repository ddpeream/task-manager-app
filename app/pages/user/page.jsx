"use client"; // Marcar como componente del cliente en Next.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importamos useRouter de Next.js
import Link from 'next/link'; // Importamos Link de Next.js
import { FormContainer, Input, Button } from '../../components/login/style/CreateUser';
import { createUser } from '../../services/userService'; // Importamos el servicio createUser

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter(); // Inicializamos useRouter

  useEffect(() => {
    // Limpiar los campos de entrada cuando el componente se monte
    setName('');
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    console.log('usuario a enviar', { name, email, password });
    const result = await createUser({ name, email, password }); // Llamamos al servicio createUser

    if (result.success) {
      setSuccess('User created successfully!');
      router.push('/pages/task'); // Redirigimos al usuario a /pages/task
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <FormContainer onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-black">Create User</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-black">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Create User</Button>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/pages/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </FormContainer>
    </div>
  );
};

export default CreateUserForm;