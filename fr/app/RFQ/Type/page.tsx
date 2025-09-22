'use client';
import { useState, useEffect } from 'react';
import { Card, Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { MapPin, Home, Building } from 'lucide-react'; // Changed icons
import { motion } from 'framer-motion';
import ServiceHeader from '@/app/headers/ServiceHeader';
import { getStorage, setStorage } from '@/app/utils/helper';



export default function ChooseMechanicType() {
  const router = useRouter();
  const [mechanicType, setMechanicType] = useState<'mobile' | 'shop' | null>(null);

  // Load saved data
  useEffect(() => {
    const savedType = getStorage('mechanicType');
    if (savedType) setMechanicType(savedType as 'mobile' | 'shop');
  }, []);

  // Handle selection
  const handleSelect = (type: 'mobile' | 'shop') => {
    setMechanicType(type);
    setStorage('mechanicType', type);
  };

  // Handle continue
  const handleContinue = () => {
    router.push('/RFQ/Search');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
    >
      <ServiceHeader progressNumber={5} progressTitle="Service Type" />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-8"
        >
            <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.replace("/RFQ/Note")}
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
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Choose Service Type</h1>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Mobile Mechanic Card */}
              <Card
                isPressable
                onPress={() => handleSelect('mobile')}
                className={`p-6 text-left transition-all cursor-pointer ${
                  mechanicType === 'mobile' 
                    ? 'ring-2 ring-emerald-500 bg-emerald-50'
                    : 'hover:ring-1 hover:ring-emerald-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Home className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mobile Mechanic</h3>
                    <p className="text-gray-600">
                      Our certified mechanics will come to your preferred location
                    </p>
                  </div>
                </div>
              </Card>

              {/* In-Shop Mechanic Card */}
              <Card
                isPressable
                onPress={() => handleSelect('shop')}
                className={`p-6 text-left transition-all cursor-pointer ${
                  mechanicType === 'shop' 
                    ? 'ring-2 ring-emerald-500 bg-emerald-50'
                    : 'hover:ring-1 hover:ring-emerald-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Building className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">In-Shop Service</h3>
                    <p className="text-gray-600">
                      Professional service at our certified repair shops
                    </p>
                  </div>
                </div>
              </Card>
            </div>


            <Button
              size="lg"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
              onClick={handleContinue}
             
            >
              {mechanicType ? 'Continue' : 'Select Service Type'}
            </Button>
          </div>
        </motion.div>
      </div>

     </motion.div>
  );
}