'use client';
import { motion } from 'framer-motion';
import ServiceHeader from '@/app/headers/ServiceHeader';
import ServiceFooter from '@/app/footers/service_footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStorage, setStorage } from '@/app/utils/helper';

export default function ServiceNote() {
    const router = useRouter();
    const [radioStatus, setRadioStatus] = useState('');
    const [otherDetail, setOtherDetail] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [serviceLocation, setServiceLocation] = useState<string | null>(null);
    const [service, setService] = useState<string | null>(null);

    useEffect(() => {
        const location = getStorage('service-location');
        const services =JSON.parse(getStorage('selected-services') || '[]');
        const note = getStorage('service-additionalinfo');
        const rad = getStorage('service-radioval');
        if (note!=null) setAdditionalInfo(note)
        if (rad!=null) setRadioStatus(rad)
        setServiceLocation(location);
        setService(services);
    }, []);

    const handleChange = (val: string) => setRadioStatus(val);
    
    const handleContinue = () => {
         let radioVal = radioStatus;
        if (radioStatus === 'Other (explain)') {
            radioVal = otherDetail;
        }
        setStorage('service-additionalinfo', additionalInfo);
        setStorage('service-radioval', radioVal);
        router.replace('/RFQ/Type');

    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
        >
            <ServiceHeader progressNumber={4} progressTitle="NOTE" ServiceStatus={() => {}} />

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
                            onClick={() => router.replace('/RFQ/Vehicle')}
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
                        <h1 className="text-3xl font-bold text-gray-900">Add a Note for the Mechanic</h1>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <textarea
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-lg placeholder-gray-400 transition-all"
                                placeholder="(Optional) Any additional information you can provide"
                                rows={4}
                            />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-700">Urgency of Request (Optional)</h3>
                                {[
                                    'Immediate, within 1-2 days',
                                    'Within 1 week',
                                    'Within 1 month',
                                    'Other (explain)'
                                ].map((option, index) => (
                                    <label key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="deadline"
                                            value={option}
                                            checked={radioStatus === option}
                                            onChange={() => handleChange(option)}
                                            className="h-5 w-5 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                                        />
                                        <span className="text-gray-700">{option}</span>
                                    </label>
                                ))}

                                {radioStatus === 'Other (explain)' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="ml-8"
                                    >
                                        <input
                                            type="text"
                                            value={otherDetail}
                                            onChange={(e) => setOtherDetail(e.target.value)}
                                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                            placeholder="Please specify..."
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 space-y-6">
                        { serviceLocation ?
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
                            </div> : ''
}

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
                                <span className="text-gray-600">{service?.length || 'No services selected'}</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleContinue}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-emerald-200/50"
                        >
                            Continue to type Selection
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