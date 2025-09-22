'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button } from '@nextui-org/react';
import PhoneInput from 'react-phone-number-input';
import { postRequest } from '../utils/axios';
import { toast, Toaster } from 'react-hot-toast';
import {
  LockClosedIcon,
  UserCircleIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import MechanicSignupForm from "../component/MechanicSignupForm";
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { setStorage, getStorage , removeStorage} from '@/app/utils/helper';

const authVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const RoleCard = ({ title, icon: IconComponent, active, onClick }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`p-6 border-2 rounded-xl cursor-pointer transition-colors flex flex-col items-center text-center ${
      active ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
    }`}
  >
    <IconComponent className="w-8 h-8 mb-4 text-emerald-600" />
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mt-2">
      {title === 'Customer'
        ? 'Get instant quotes from verified professionals'
        : 'Grow your business with quality leads'}
    </p>
  </motion.div>
);

const FloatingInput = ({ label, value, onChange, error, icon: Icon, ...props }: any) => (
  <div className="relative w-full">
    <Input
      {...props}
      value={value}
      onChange={onChange}
      label={label}
      fullWidth
      classNames={{
        inputWrapper: `peer h-14 ${error ? 'border-danger' : 'border-gray-200'} hover:border-emerald-300 rounded-md`,
        label: 'text-gray-500 peer-focus:text-emerald-600'
      }}
    />
    {Icon && (
      <Icon className="w-5 h-5 absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-emerald-500" />
    )}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-danger text-sm mt-1"
      >
        {error}
      </motion.p>
    )}
  </div>
);

export default function SignUp() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'Customer' | 'Professional'>('Customer');
  const [loading, setLoading] = useState(false);
  const [mechanicSignup, setMechanicSignup] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({});

  // // Redirect if already authenticated
  // useEffect(() => {
  //   if (getStorage('access_token')) {
  //     router.replace('/');
  //   }
  // }, [router]);

  useEffect(() => {
    removeStorage('access_token');
    removeStorage('refresh_token');
    removeStorage('user');
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (selectedRole === 'Customer') {
      if (!formData.first_name.trim()) newErrors.firstName = 'First name is required';
      if (!formData.last_name.trim()) newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      const payload = {
        ...formData,
        is_customer: selectedRole === 'Customer',
        is_mechanic: selectedRole === 'Professional'
      };
      if (selectedRole === "Customer") {
        const response = await postRequest('users/register/', payload);
        setStorage('access_token', response.data.access);
        setStorage('refresh_token', response.data.refresh);
        setStorage('user', JSON.stringify(response.data.user));
        toast.success('Account created successfully!');
        router.push('/sign-in');
      } else {
        setMechanicSignup(true);
      }
    } catch (error: any) {
      // Always expect error.details as { field: [msg, ...], ... }
      const backendErrors = error.details || error;
      const newErrors: Record<string, string> = {};
      if (backendErrors) {
        if (backendErrors.first_name) newErrors.firstName = backendErrors.first_name[0];
        if (backendErrors.last_name) newErrors.lastName = backendErrors.last_name[0];
        if (backendErrors.email) newErrors.email = backendErrors.email[0];
        if (backendErrors.password) newErrors.password = backendErrors.password[0];
        if (backendErrors.non_field_errors) toast.error(backendErrors.non_field_errors[0]);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          toast.error(error.message || 'Registration failed. Please try again.');
        }
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        {mechanicSignup ? (
          <motion.div
            key="mechanic-signup"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -40, transition: { duration: 0.3 } }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50"
          >
            <MechanicSignupForm password={formData.password} email={formData.email} first_name = {formData.first_name} last_name = {formData.last_name} />
          </motion.div>
        ) : (
          <motion.div
            key="signup-form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -40, transition: { duration: 0.3 } }}
            className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
          >
            {/* Header */}
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <motion.a href="/" className="text-2xl font-bold text-emerald-600" whileHover={{ scale: 1.05 }}>
                  DoneEZ
                </motion.a>
              </div>
            </header>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12 flex-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="grid lg:grid-cols-2">
                  {/* Illustration Section */}
                  <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-12 hidden lg:flex flex-col justify-center text-white">
                    <motion.h2
                      className="text-4xl font-bold mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {selectedRole === 'Customer'
                        ? 'Get Quality Service, Faster'
                        : 'Grow Your Business with Us'}
                    </motion.h2>
                    <motion.p
                      className="text-lg opacity-90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {selectedRole === 'Customer'
                        ? 'Connect with trusted professionals and manage all your service needs in one place.'
                        : 'Access thousands of service requests and streamline your business operations.'}
                    </motion.p>
                  </div>
                  {/* Form Section */}
                  <div className="p-8 md:p-12">
                    <div className="text-center mb-8">
                      <motion.h1
                        className="text-3xl font-bold text-gray-800 mb-4"
                        variants={authVariants}
                        initial="initial"
                        animate="animate"
                      >
                        Create Your Account
                      </motion.h1>
                      {/* Role Cards in a row */}
                      <div className="flex gap-4 justify-center mb-8">
                        <RoleCard
                          title="Customer"
                          icon={UserCircleIcon}
                          active={selectedRole === 'Customer'}
                          onClick={() => setSelectedRole('Customer')}
                        />
                        <RoleCard
                          title="Professional"
                          icon={BriefcaseIcon}
                          active={selectedRole === 'Professional'}
                          onClick={() => setSelectedRole('Professional')}
                        />
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedRole}
                        variants={authVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-6"
                      >
                        
                          <>
                            <FloatingInput
                              label="First Name"
                              value={formData.first_name}
                              onChange={(e: any) => setFormData({ ...formData, first_name: e.target.value })}
                              error={errors.firstName}
                              icon={UserCircleIcon}
                            />
                            <FloatingInput
                              label="Last Name"
                              value={formData.last_name}
                              onChange={(e: any) => setFormData({ ...formData, last_name: e.target.value })}
                              icon={UserCircleIcon}
                              error={errors.lastName}
                            />
                          </>
                       
                        <FloatingInput
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          icon={EnvelopeIcon}
                          onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                          error={errors.email}
                        />
                        <FloatingInput
                          label="Password"
                          type="password"
                          value={formData.password}
                          onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                          error={errors.password}
                          icon={LockClosedIcon}
                        />
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            color="primary"
                            size="lg"
                            className="w-full bg-emerald-500 text-white hover:bg-emerald-600 h-14 text-lg flex items-center justify-center"
                            onClick={handleSubmit}
                            isLoading={loading}
                          >
                            {selectedRole === 'Customer'
                              ? 'Create Customer Account'
                              : 'Register Professional Account'}
                            <ChevronRightIcon className="w-5 h-5 ml-2" />
                          </Button>
                        </motion.div>
                        <p className="text-center text-gray-600 mt-4">
                          Already have an account?{' '}
                          <a href="/sign-in" className="text-emerald-600 hover:underline">
                            Sign in here
                          </a>
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </main>
            <style jsx global>{`
              .PhoneInputCountryIcon {
                width: 20px !important;
                height: 14px !important;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}