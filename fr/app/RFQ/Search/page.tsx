'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ServiceHeader from '@/app/headers/ServiceHeader';
import ServiceFooter from '@/app/footers/service_footer';
import { setStorage , getStorage} from '@/app/utils/helper';

export default function ServiceLocation() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [suggestions, setSuggestions] = useState<Array<{
        place_id: string;
        description: string;
        main_text: string;
        secondary_text: string;
    }>>([]);
    const [serviceStatus, setServiceStatus] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {

      const location = getStorage('service-location');
      if (location) {
        setInputValue(location);
    }
        if (typeof window !== 'undefined' && window.google) {
            // Initialize Google services if needed
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
        const query = e.target.value;
        if (window.google && query.length > 0) {
            const autocompleteService = new google.maps.places.AutocompleteService();
            autocompleteService.getPlacePredictions(
                {
                    input: query,
                    types: ['(regions)'],
                    componentRestrictions: { country: 'us' },
                },
                (predictions, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                        const zipCodeRegex = /\b\d{5}(?:-\d{4})?\b/;
                        const filteredPredictions = predictions.filter(
                            prediction => zipCodeRegex.test(prediction.description)
                        );
                        const mappedPredictions = filteredPredictions.map(prediction => ({
                            place_id: prediction.place_id,
                            description: prediction.description,
                            main_text: prediction.structured_formatting.main_text,
                            secondary_text: prediction.structured_formatting.secondary_text,
                        }));
                        setSuggestions(mappedPredictions);
                    } else {
                        setSuggestions([]);
                    }
                }
            );
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: {
        place_id: string;
        description: string;
        main_text: string;
        secondary_text: string;
    }) => {
        if (inputRef.current) {
            inputRef.current.value = `${suggestion.main_text} ${suggestion.secondary_text}`;
            setStorage('service-location', `${suggestion.main_text} ${suggestion.secondary_text}`);
            setStorage('customZipCode', suggestion.main_text);
            setSuggestions([]);
            router.replace('/RFQ/Book');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
        >
            <ServiceHeader
                progressNumber={6}
                progressTitle= 'Location'
            />

            <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-8"
                >
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.replace('/RFQ/Type')}
                            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-all text-white shadow-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>
                        <h1 className="text-3xl font-bold text-gray-900">Please Provide us your Location</h1>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-lg font-medium text-gray-700">Enter ZIP Code</label>
                            <div className="relative">
                                <input
                                    ref={inputRef}
                                    value={inputValue}
                                    type="search"
                                    placeholder="e.g. 90210"
                                    onChange={handleInputChange}
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-lg placeholder-gray-400 transition-all"
                                />
                                
                                {suggestions.length > 0 && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden"
                                    >
                                        {suggestions.map((suggestion) => (
                                            <motion.li
                                                key={suggestion.place_id}
                                                whileHover={{ scale: 1.02 }}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="px-6 py-4 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="font-medium text-gray-900">{suggestion.main_text}</div>
                                                <div className="text-sm text-gray-500 mt-1">{suggestion.secondary_text}</div>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                )}
                            </div>
                        </div>

                        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                            <div className="flex items-center gap-3 mb-3">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-emerald-600"
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <h3 className="text-lg font-semibold text-emerald-800">Nationwide Coverage</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                We work with certified professionals across the United States. Enter your ZIP code to find nearby service providers and get accurate estimates.
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.replace('/RFQ/Book')}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-emerald-200/50"
                        >
                           Continue to Appointment Details
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 ml-2 inline-block"
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <ServiceFooter />
        </motion.div>
    );
}