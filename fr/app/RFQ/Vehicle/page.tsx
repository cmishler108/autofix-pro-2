'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ServiceHeader from '@/app/headers/ServiceHeader';
import ServiceFooter from '@/app/footers/service_footer';
import VehicleSelector from './vehicleselector';
import { getStorage, setStorage, removeStorage } from '@/app/utils/helper';

export default function VehicleSelect() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [serviceLocation, setServiceLocation] = useState<string | null>(null);
  const [service, setService] = useState<any>(null); // adjust type as needed

  // On page load, load default values from localStorage (if they exist)
  useEffect(() => {
    const storedService = JSON.parse(getStorage('selected-services') || '[]');
    const storedLocation = getStorage('service-location');
    const storedYear = getStorage('selectedYear') || '';
    const storedMake = getStorage('selectedMake') || '';
    const storedModel = getStorage('selectedModel') || '';

    setService(storedService);
    setServiceLocation(storedLocation);
    setSelectedYear(storedYear);
    setSelectedMake(storedMake);
    setSelectedModel(storedModel);
  }, []);

  // When the user changes the vehicle selection, update state and clear localStorage values.
  const handleVehicleSelectionChange = (year: string, make: string, model: string) => {
    setSelectedYear(year);
    setSelectedMake(make);
    setSelectedModel(model);
    // Clear localStorage values for these keys.
    removeStorage('selectedYear');
    removeStorage('selectedMake');
    removeStorage('selectedModel');
  };

  const handleContinue = () => {
    if (!selectedYear || !selectedMake || !selectedModel) {
      alert('Please select Year, Make, and Model');
      return;
    }
   
    setStorage('selectedYear', selectedYear);
    setStorage('selectedMake', selectedMake);
    setStorage('selectedModel', selectedModel);
    router.replace('/RFQ/Note');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
    >
      <ServiceHeader progressNumber={2} progressTitle="Vehicle" />

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
              onClick={() => router.replace('/RFQ/Services')}
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
            <h1 className="text-3xl font-bold text-gray-900">Tell Us About Your Vehicle</h1>
          </div>

          <div className="space-y-6">
            <VehicleSelector onSelectionChange={handleVehicleSelectionChange} />

            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 space-y-6">
              { serviceLocation && (
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
              )}
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
                <span className="text-gray-600">
                  {service?.length ? `${service.length} service(s) selected` : 'No services selected'}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              disabled={!selectedModel}
              className={`w-full ${
                selectedModel 
                  ? 'bg-emerald-500 hover:bg-emerald-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-emerald-200/50`}
            >
              Continue to add a Note for Mechanic
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
