'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { setStorage , getStorage} from '@/app/utils/helper';
import ServiceFooter from '@/app/footers/service_footer';
import ServiceHeader from '@/app/headers/ServiceHeader';
 

export default function Book() {
  const router = useRouter();

 
  const [date, setDate] = useState<string>('');
  
  const [time, setTime] = useState<string>('09:00');

  
  const [serviceLocation, setServiceLocation] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);

  useEffect(() => {
      const location = getStorage('service-location');
      const services = JSON.parse(getStorage('selected-services') || '[]');
      const date = getStorage('appointmentDate');
      const time = getStorage('appointmentTime');
      if (date!=null) setDate(date)
      if (time!=null) setTime(time)
      setServiceLocation(location);
      setService(services);
  }, []);


  const handleConfirm = () => {

    if (!date || !time) {
        alert('Please select a Date and Time');
        return;
    }
      setStorage('appointmentDate', date);
      setStorage('appointmentTime', time);
    router.replace('/RFQ/Confirm');
  };

  // Today's date in YYYY-MM-DD format for the min attribute.
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
    >
      <ServiceHeader progressNumber={7} progressTitle="Book" />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <h1 className="text-3xl font-bold text-gray-900">
              Choose an Appointment Time
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Choose a Date
                  </h2>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min={todayStr}
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Choose Drop-off Time
                  </h2>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="08:00"
                    max="16:00"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex justify-end"
                >
                  <button
                    onClick={handleConfirm}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl"
                  >
                    Confirm Date & Time
                  </button>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
             {/* Location Card */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
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
                    <h3 className="text-lg font-semibold">Selected Location</h3>
                    <p className="text-sm text-gray-500 mt-1">
                    {serviceLocation || 'No Location selected'}
                    </p>
                  </div>
                </div>
              </div>

                    

              {/* Services Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-emerald-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Selected Services</h3>
                    <p className="text-sm text-gray-500 mt-1">
                    {service?.length || 'No services selected'}
                    </p>
                  </div>
                </div>
              </div>

           
            </div>
          </div>
        </motion.div>
      </div>

      <ServiceFooter />
    </motion.div>
  );
}
