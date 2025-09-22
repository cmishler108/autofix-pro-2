"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import CustomHeader from '@/app/headers/CustomHeader';
import { getStorage } from '@/app/utils/helper';


export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isCustomer, setIsCustomer] = useState<boolean | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Check authentication and role on client only
    const accessToken = getStorage('access_token');
    if (!accessToken) {
      redirect('/sign-in');
      return;
    }
    // Check user role (assuming user info is stored in localStorage)
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user && user.is_mechanic) {
        setIsCustomer(false);
        // Optionally redirect mechanics away from RFQ
        redirect('/dashboard');
      } else {
        setIsCustomer(true);
      }
    } catch {
      setIsCustomer(null);
    }
  }, []);

  if (!isClient || isCustomer === false) {
    // Prevent SSR/CSR mismatch and block mechanics
    return null;
  }

  return (
    <motion.div  initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}>
    <CustomHeader/>
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      >
      <h1 className="text-4xl font-bold mb-6 text-green-600">Auto Service Finder
</h1>
      <p className="mb-6 text-gray-700">
Easily connect with trusted professionals for all your car care needs.
      </p>
      <Link className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition" href="/RFQ/Services">
          Get Started
      </Link>
    </div>
      </motion.div>
  );
}
