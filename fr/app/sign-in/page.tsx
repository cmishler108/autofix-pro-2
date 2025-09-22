'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@nextui-org/react';
import { postRequest } from '../utils/axios';
import { getStorage, setStorage } from '../utils/helper';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  LockClosedIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

const CustomToast = ({
  message,
  type,
}: {
  message: string;
  type: 'success' | 'error';
}) => (
  <div
    className={`${
      type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
    } text-white px-6 py-4 shadow-md rounded-lg flex items-center`}
  >
    <span className="text-lg mr-3">{type === 'success' ? '✅' : '❌'}</span>
    <span className="font-semibold">{message}</span>
  </div>
);

export default function SignIn() {
  const router = useRouter();
  const accessToken = getStorage('access_token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- FIX: Only redirect in useEffect, not during render ---
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (accessToken) {
      router.replace('/dashboard');
    } else {
      setIsReady(true);
    }
  }, [accessToken, router]);

  if (!isReady) {
    // Prevent SSR/CSR mismatch and infinite redirect
    return null;
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!re.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  async function loginUser(email: string, password: string): Promise<void> {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);
    try {
      const payload = { email, password };
      const response = await postRequest(
        'users/login/',
        payload
      );

      // Extract data from response
      const { user, refresh, access } = response.data;

      // Store tokens and user data as needed
      setStorage('access_token', access);
      setStorage('refresh_token', refresh);
      setStorage('user', JSON.stringify(user));

      toast.custom(
        <CustomToast
          message="Sign in successful! Welcome back to DoneEZ."
          type="success"
        />
      );
      setTimeout(() => {
        router.replace('/dashboard');
      }, 1200);
    } catch (error: any) {
      // Always expect error.details as { field: [msg, ...], ... }
      const backendErrors = error.details || error;
      if (backendErrors) {
        if (backendErrors.email) {
          setEmailError(backendErrors.email[0]);
        }
        if (backendErrors.password) {
          setPasswordError(backendErrors.password[0]);
        }
        if (backendErrors.non_field_errors) {
          toast.custom(
            <CustomToast
              message={backendErrors.non_field_errors[0]}
              type="error"
            />
          );
        } else if (backendErrors.detail) {
          toast.custom(
            <CustomToast
              message={backendErrors.detail}
              type="error"
            />
          );
        } else {
          toast.custom(
            <CustomToast
              message={error.message || 'An error occurred during sign in. Please try again later.'}
              type="error"
            />
          );
        }
      } else {
        toast.custom(
          <CustomToast
            message={error.message || 'An error occurred during sign in. Please try again later.'}
            type="error"
          />
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.a
            href="/"
            className="text-2xl font-bold text-emerald-600"
            whileHover={{ scale: 1.05 }}
          >
            DoneEZ
          </motion.a>
          <Link href="/sign-up">
            <Button
              className="bg-[#10B981] text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#059669] transition-colors"
              size="md"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10"
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-[#10B981]">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to your DoneEZ account
          </p>
          <form
            onSubmit={e => {
              e.preventDefault();
              loginUser(email, password);
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  isInvalid={!!emailError}
                  errorMessage={emailError}
                  classNames={{
                    inputWrapper:
                      'h-14 border-2 border-gray-200 focus-within:border-[#10B981] rounded-md',
                  }}
                  startContent={
                    <EnvelopeIcon className="w-5 h-5 text-emerald-500" />
                  }
                  size="lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  isInvalid={!!passwordError}
                  errorMessage={passwordError}
                  classNames={{
                    inputWrapper:
                      'h-14 border-2 border-gray-200 focus-within:border-[#10B981] rounded-md pr-12',
                  }}
                  startContent={
                    <LockClosedIcon className="w-5 h-5 text-emerald-500" />
                  }
                  size="lg"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full bg-[#10B981] text-white font-semibold text-lg rounded-md shadow hover:bg-[#059669] transition-colors h-14"
              isLoading={loading}
            >
              Sign In
            </Button>
          </form>
          <div className="text-center mt-6 text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-[#10B981] font-semibold hover:underline">
              Sign up here
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}