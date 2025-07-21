import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Icon } from '../../components/ui/Icon';
import { useAuth } from '../../hooks/useAuth';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError('');
    setPasswordError('');

    // Specific validation
    if (!email.trim()) {
      setEmailError('Email is required');
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/photos');
      } else {
        setEmailError('Invalid email or password');
        setPasswordError('Invalid email or password');
      }
    } catch {
      setEmailError('An error occurred. Please try again.');
      setPasswordError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-start sm:justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center pt-9 sm:pt-0">
        <div className="flex justify-center">
          <Icon name="logo" size={75} />
        </div>
        <h2
          className="mt-6 text-center font-bold text-xl text-gray-900 leading-none tracking-normal"
          style={{ marginTop: '24px' }}
        >
          Sign in to your account
        </h2>

        <div className="mt-10 bg-white py-8 px-6 rounded-lg w-full sm:w-[319px] h-auto sm:h-[395px]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Username"
              value={email}
              onChange={setEmail}
              placeholder="testing@testing.com"
              error={emailError}
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              showForgotPassword
              error={passwordError}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base leading-none tracking-normal text-center py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
