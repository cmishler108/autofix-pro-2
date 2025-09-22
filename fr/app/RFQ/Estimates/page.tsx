'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Rating } from '@smastrom/react-rating';
import { Card, Skeleton } from "@nextui-org/react";
import ServiceFooter from '@/app/footers/service_footer';
import ServiceHeader from '@/app/headers/ServiceHeader';
import ServiceHomeSvg from './garage_lift_car.svg';
import { getStorage, setStorage } from '@/app/utils/helper';
import { fetchMechanicsByDistance } from '@/app/utils/api';
import MechanicItem from './mechanicItem';

import { MechanicProfileType } from '@/app/utils/types';

export default function Estimates() {
    const router = useRouter();
    const [mechanics, setMechanics] = useState<MechanicProfileType[]>([]);
    const [serviceLocation, setServiceLocation] = useState('');
    const [service, setService] = useState('');
    const [serviceVehicle, setServiceVehicle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedService = getStorage('service-services') || 'No services selected';
        const serviceLocation = getStorage('service-location') || 'Location not specified';
        const vehicleInfo = [
            getStorage('selectedYear'),
            getStorage('selectedMake'),
            getStorage('selectedModel')
        ].filter(Boolean).join(' ') || 'Vehicle not specified';
        
        setService(storedService);
        setServiceLocation(serviceLocation);
        setServiceVehicle(vehicleInfo);
    }, []);

    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const customZipCode = getStorage('customZipCode');
                if (!customZipCode) {
                    throw new Error('No zip code found');
                }
                
                const data = await fetchMechanicsByDistance(customZipCode, 25);
                setMechanics(data);
                setError('');
            } catch (err) {
                setError('Failed to load mechanics. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMechanics();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col">
            <ServiceHeader progressNumber={3} progressTitle="Estimates" />

            <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-8">
                    <div className="flex items-center gap-4 mb-8">
                    <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.replace('/get-quote/service-request/service-note')}
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
                        <h1 className="text-3xl font-bold text-gray-900">Compare Estimates & Select Shop</h1>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold">
                                    Show Map
                                </button>
                                
                                <div className="flex divide-x divide-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                                    {['Availability', 'Rating', 'Distance', 'Price'].map((label) => (
                                        <button
                                            key={label}
                                            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-600 hover:text-emerald-600 transition-colors"
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                {loading ? (
                                    [1, 2, 3].map((i) => (
                                        <Card key={i} className="w-full p-4 rounded-xl" radius="lg">
                                            <Skeleton className="rounded-lg">
                                                <div className="h-24 rounded-lg bg-gray-100" />
                                            </Skeleton>
                                            <div className="space-y-3 mt-3">
                                                <Skeleton className="w-3/5 rounded-lg h-3 bg-gray-100" />
                                                <Skeleton className="w-4/5 rounded-lg h-3 bg-gray-100" />
                                                <Skeleton className="w-2/5 rounded-lg h-3 bg-gray-100" />
                                            </div>
                                        </Card>
                                    ))
                                ) : error ? (
                                    <div className="p-6 bg-red-50 text-red-600 rounded-xl">
                                        {error}
                                    </div>
                                ) : mechanics.length > 0 ? (
                                    mechanics.map((mechanic) => (
                                        <MechanicItem
                                        key={mechanic.id}
                                        id={mechanic.id}
                                        mechanicName={mechanic.business_name}
                                        rating={mechanic.rating}
                                        reviews={mechanic.rating || 0}
                                        distance={mechanic.distance}
                                        address={`${mechanic.address} ${mechanic.address_city}, ${mechanic.address_state}`}
                                        zipcode={mechanic.zip_code}
                                    />
                                    ))
                                ) : (
                                    <div className="p-6 bg-yellow-50 text-yellow-600 rounded-xl">
                                        No mechanics found in your area
                                    </div>
                                )}

                                {/* Add Shop Card */}
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        {/* Location Icon */}
                                        <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-emerald-600"
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Service Location</h3>
                                        <p className="text-sm text-gray-500 mt-1">{serviceLocation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                    <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-emerald-600"
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Selected Services</h3>
                                        <p className="text-sm text-gray-500 mt-1">{service}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        {/* Vehicle Icon */}
                                        <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 text-emerald-600"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path d="M15.5 6H4.5C3.67 6 3 6.67 3 7.5V12v3.5c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5V16h10v.5c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5V12l-1.6-4.8A1 1 0 0 0 14.86 6H15.5zM5 7.5h10c.28 0 .5.22.5.5v3H4.5V8c0-.28.22-.5.5-.5zm1 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
</svg>

                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Vehicle Details</h3>
                                        <p className="text-sm text-gray-500 mt-1">{serviceVehicle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ServiceFooter />
        </div>
    );
}