import { useState } from 'react';
import Link from 'next/link'; // Importamos Link de Next.js
import { FormContainer, Input, Button } from '../../components/login/style/LoginForm.styles';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <FormContainer onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Login</Button>

      {/* Eliminamos la etiqueta <a> dentro de <Link> */}
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link href="/pages/user" className="text-blue-500 hover:underline">
          Create an account
        </Link>
      </p>
    </FormContainer>
  );
};

export default LoginForm;
