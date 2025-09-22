'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@nextui-org/react';
import ServiceFooter from '@/app/footers/service_footer';
import ServiceHeader from '@/app/headers/ServiceHeader';
import { getStorage, setStorage } from '@/app/utils/helper';
import { useRouter } from 'next/navigation';
import { accordionsData } from '../../component/DoneezServices/serviceslist';

export default function ServiceInterView() {
    const router = useRouter();
    const [serviceLocation, setServiceLocation] = useState<string | null>(null);
    // Now selectedServices is an array of service names.
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Flatten all services for search
    const allServices = accordionsData.flatMap(accordion =>
        accordion.subItems.flatMap(subItem =>
            subItem.services.map(service => ({
                ...service,
                category: accordion.title,
                subCategory: subItem.title
            }))
        )
    );

    // Filter services based on search query
    const filteredServices = allServices.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );

    useEffect(() => {
        const location = getStorage('service-location');
        // Parse stored services which now should be an array of service names.
        const services = JSON.parse(getStorage('selected-services') || '[]');
        setServiceLocation(location);
        setSelectedServices(services);
    }, []);

    // Toggle function now works with service names instead of IDs.
    const toggleService = (serviceName: string) => {
        const newServices = selectedServices.includes(serviceName)
            ? selectedServices.filter(name => name !== serviceName)
            : [...selectedServices, serviceName];
        setSelectedServices(newServices);
        setStorage('selected-services', JSON.stringify(newServices));
    };

    const clearServices = () => {
        setSelectedServices([]); // Clear the state
        setStorage('selected-services', JSON.stringify([]));
    };

    const toggleAccordion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleContinue = () => {
        if (selectedServices.length === 0) {
            alert('Please select at least one service to proceed');
            return;
        }
        router.push('/RFQ/Vehicle');
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
        >
            <ServiceHeader progressNumber={1} progressTitle="SERVICES" />

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
                            onClick={() => router.back()}
                            className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
                        >
                            {/* Back button SVG */}
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
                        <h1 className="text-3xl font-bold text-gray-900">Select Your Services</h1>
                    </div>

                    <div className="space-y-6">
                        {/* Search Bar */}
                        <Input
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                            startContent={
                                <svg 
                                    className="w-5 h-5 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                    />
                                </svg>
                            }
                        />

                        {/* Search Results */}
                        {searchQuery && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Search Results</h3>
                                {filteredServices.map(service => (
                                    <label
                                        key={service.id}
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedServices.includes(service.name)}
                                            onChange={() => toggleService(service.name)}
                                            className="h-5 w-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
                                        />
                                        <div>
                                            <span className="text-gray-700">{service.name}</span>
                                            <p className="text-sm text-gray-500">
                                                {service.category} • {service.subCategory}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}

                        {/* Services Accordions */}
                        {!searchQuery && accordionsData.map((accordion, index) => (
                            <div key={accordion.title} className="border rounded-xl overflow-hidden">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 py-4 bg-emerald-50 flex justify-between items-center hover:bg-emerald-100 transition-colors"
                                >
                                    <span className="text-lg font-semibold text-emerald-800">
                                        {accordion.title}
                                    </span>
                                    <motion.span
                                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                        className="text-emerald-600"
                                    >
                                        ▼
                                    </motion.span>
                                </button>
                                
                                {expandedIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="px-6 py-4 space-y-4"
                                    >
                                        {accordion.subItems.map((subItem) => (
                                            <div key={subItem.title} className="ml-4 space-y-3">
                                                <h3 className="text-md font-medium text-gray-700">{subItem.title}</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {subItem.services.map((service) => (
                                                        <label
                                                            key={service.id}
                                                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedServices.includes(service.name)}
                                                                onChange={() => toggleService(service.name)}
                                                                className="h-5 w-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
                                                            />
                                                            <span className="text-gray-700">{service.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        ))}

                        {/* Selected Services Summary */}
                        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 space-y-6">
                        { serviceLocation ? (
                            <div className="flex items-center gap-3">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-emerald-600"
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <h3 className="text-lg font-semibold text-emerald-800">Selected Location</h3>
                                <span className="text-gray-600 ml-2">{serviceLocation}</span>
                            </div>
                        ) : null }
                            <div className="flex items-center gap-3">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-emerald-600"
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <h3 className="text-lg font-semibold text-emerald-800">Selected Services</h3>
                                <span className="text-gray-600 ml-2">
                                    {selectedServices.length} service(s) selected
                                </span>
                            </div>
                            <span onClick={clearServices} className="text-red-600 ml-2" style={{ float: 'right', marginTop: '0', marginRight: '-9px', cursor: 'pointer' }}>
                                Clear Services
                            </span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleContinue}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-emerald-200/50"
                        >
                            Continue to Vehicle Selection
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
