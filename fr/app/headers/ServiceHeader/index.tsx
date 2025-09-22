'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceProps {
    progressNumber: number;
    progressTitle: string;
    ServiceStatus?: (status: boolean) => void;
}

const progressSteps = [
    { number: 1, label: 'Services' },
    { number: 2, label: 'Vehicle' },
    { number: 3, label: 'Note' },
    { number: 4, label: 'Type' },
    { number: 5, label: 'Location' },
    { number: 6, label: 'Book' },
    { number: 7, label: 'Confirm' },
];

export default function ServiceHeader({ progressNumber, progressTitle, ServiceStatus }: ServiceProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const activeColor = '#10B981'; // Emerald green
    const inactiveColor = '#e1e4f1';

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        ServiceStatus?.(!isMenuOpen);
    };

    return (
        <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white shadow-sm sticky top-0 z-20 border-b border-gray-100"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 relative">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-[#10B981] transition-colors">
                        DoneEZ
                    </Link>

                    {/* Desktop Progress Bar */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
                        <div className="flex items-center space-x-4">
                            {progressSteps.map((step, index) => {
                                const isActive = progressNumber >= step.number;
                                const isBetween = progressNumber > step.number;
                                
                                return (
                                    <div key={step.number} className="flex items-center">
                                        {/* Progress Line */}
                                        {index > 0 && (
                                            <div 
                                                className={`h-1 w-16 ${isBetween ? 'bg-[#10B981]' : 'bg-[#e1e4f1]'} transition-colors`}
                                            />
                                        )}
                                        
                                        {/* Progress Dot */}
                                        <div className="relative flex flex-col items-center">
                                            <div 
                                                className={`w-6 h-6 rounded-full border-4 border-white ${isActive ? 'bg-[#10B981]' : 'bg-[#e1e4f1]'} 
                                                    transition-colors shadow-sm`}
                                            />
                                            <span className={`mt-2 text-sm ${isActive ? 'text-[#10B981]' : 'text-gray-400'} font-medium transition-colors`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Header */}
                    <div className="md:hidden flex items-center gap-4 w-full">
                        {/* Progress Title */}
                        <motion.div
                            key="progress-title"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-lg font-semibold text-[#10B981] flex-1 text-center"
                        >
                            {progressTitle}
                        </motion.div>

                        {/* Menu Toggle */}
                        <button
                            onClick={handleMenuToggle}
                            className="p-2 text-gray-600 hover:text-[#10B981] transition-colors"
                        >
                            <motion.svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M1.236 6.404C0.987 6.523 0.872 6.806 0.973 7.05c0.027 0.064 1.493 1.546 5.142 5.197 2.808 2.81 5.151 5.14 5.207 5.18 0.056 0.04 0.175 0.1 0.264 0.135 0.139 0.054 0.199 0.063 0.415 0.063s0.276-0.009 0.415-0.063c0.089-0.035 0.208-0.096 0.264-0.135 0.056-0.04 2.4-2.37 5.207-5.18 3.65-3.65 5.116-5.133 5.142-5.197 0.142-0.345-0.149-0.727-0.52-0.771-0.065-0.008-0.153-0.038-0.195-0.066-0.042-0.029-2.36-2.336-5.152-5.126C12.348 4.368 12.079 4.104 12 4.104s-0.348 0.264-5.16 5.072C4.048 12.232 1.728 14.538 1.685 14.567 1.573 14.643 1.363 14.657 1.236 14.596"
                                />
                            </motion.svg>
                        </button>

                        {/* Close Button */}
                        <button className="p-2 text-gray-600 hover:text-[#10B981] transition-colors">
                            <svg viewBox="0 0 24 24" className="w-6 h-6">
                                <path
                                    fill="currentColor"
                                    d="M2.124 1.893c-0.053 0.024-0.12 0.07-0.149 0.102-0.123 0.134-0.162 0.369-0.09 0.543 0.027 0.064 1.375 1.428 4.723 4.776l4.685 4.686-4.685 4.686c-3.348 3.347-4.696 4.71-4.723 4.774-0.071 0.174-0.032 0.41 0.091 0.544 0.124 0.135 0.381 0.185 0.563 0.11 0.064-0.026 1.428-1.374 4.776-4.721l4.686-4.685 4.686 4.685c3.347 3.348 4.71 4.696 4.774 4.723 0.174 0.071 0.41 0.032 0.544-0.091 0.135-0.124 0.185-0.381 0.11-0.563-0.026-0.064-1.374-1.428-4.721-4.776l-4.685-4.686 4.685-4.686c3.348-3.347 4.696-4.71 4.723-4.774 0.071-0.174 0.032-0.41-0.091-0.544-0.124-0.135-0.381-0.185-0.563-0.11-0.064 0.026-1.428 1.374-4.776 4.721l-4.686 4.685-4.686-4.685C3.966 3.26 2.603 1.912 2.539 1.885c-0.12-0.049-0.297-0.045-0.415 0.008"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Progress Steps */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 border-t border-gray-100">
                                <div className="flex flex-col gap-4">
                                    {progressSteps.map((step) => (
                                        <div
                                            key={step.number}
                                            className={`flex items-center gap-2 ${
                                                progressNumber >= step.number 
                                                    ? 'text-[#10B981]' 
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            <div 
                                                className={`w-4 h-4 rounded-full ${
                                                    progressNumber >= step.number 
                                                        ? 'bg-[#10B981]' 
                                                        : 'bg-[#e1e4f1]'
                                                }`}
                                            />
                                            <span className="text-sm font-medium">
                                                {step.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}