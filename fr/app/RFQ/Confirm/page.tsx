'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getStorage } from '@/app/utils/helper';
import { postRequest } from '@/app/utils/axios';
import ServiceHeader from '@/app/headers/ServiceHeader';
import ServiceFooter from '@/app/footers/service_footer';
import { toast, Toaster } from 'react-hot-toast';

interface VehicleDetails {
  year: string;
  make: string;
  model: string;
}

interface ServiceRequestPayload {
  service_location: string;
  selected_services: string[];
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  additional_info: string;
  radio_status: string;
  mechanic_type: string;
  appointment_date: string;
  appointment_time: string;
  zipcode: string;
}

export default function ConfirmAppointment() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    serviceLocation: '',
    selectedServices: [] as string[],
    vehicle: { year: '', make: '', model: '' } as VehicleDetails,
    additionalInfo: '',
    radioStatus: '',
    mechanicType: '',
    appointmentDate: '',
    appointmentTime: '',
    zipcode: ''
  });

  useEffect(() => {
    // Load all data from localStorage and map to formData
    setFormData({
      serviceLocation: getStorage('service-location') || '',
      selectedServices: JSON.parse(getStorage('selected-services') || '[]'),
      vehicle: {
        year: getStorage('selectedYear') || '',
        make: getStorage('selectedMake') || '',
        model: getStorage('selectedModel') || '',
      },
      additionalInfo: getStorage('service-additionalinfo') || '',
      radioStatus: getStorage('service-radioval') || '',
      mechanicType: getStorage('mechanicType') || '',
      appointmentDate: getStorage('appointmentDate') || '',
      appointmentTime: getStorage('appointmentTime') || '',
      zipcode: getStorage('customZipCode') || '',
    });
    setLoading(false);
  }, []);

  // Check authentication
  const accessToken = getStorage('access_token');
  if (!accessToken) {
    router.replace('/sign-in');
    return null;
  }

  const handleEdit = (path: string) => {
    router.push(`/RFQ/${path}`);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    // Validate required fields
    if (
      !formData.serviceLocation ||
      !formData.selectedServices.length ||
      !formData.vehicle.year ||
      !formData.vehicle.make ||
      !formData.vehicle.model ||
      !formData.mechanicType ||
      !formData.appointmentDate ||
      !formData.appointmentTime ||
      !formData.zipcode
    ) {
      toast.error('Please fill all required fields.');
      setSubmitting(false);
      return;
    }

    const payload: ServiceRequestPayload = {
      service_location: formData.serviceLocation,
      selected_services: formData.selectedServices,
      vehicle_year: formData.vehicle.year,
      vehicle_make: formData.vehicle.make,
      vehicle_model: formData.vehicle.model,
      additional_info: formData.additionalInfo,
      radio_status: formData.radioStatus,
      mechanic_type: formData.mechanicType,
      appointment_date: formData.appointmentDate,
      appointment_time: formData.appointmentTime,
      zipcode: formData.zipcode,
    };

    try {
      const response = await postRequest('/users/service-request/', payload);
      if (response.status >= 200 && response.status < 300) {
        toast.success('Service request created successfully!');
        // Clear storage after successful submission
        [
          'service-location',
          'selected-services',
          'selectedYear',
          'selectedMake',
          'selectedModel',
          'service-additionalinfo',
          'service-radioval',
          'mechanicType',
          'appointmentDate',
          'appointmentTime',
          'customZipCode',
        ].forEach((key) => localStorage.removeItem(key));
        router.push('/dashboard');
      } else {
        setError('Failed to create appointment. Please try again.');
      }
    } catch (err: any) {
      if (err.details) {
        // Show first error message from backend
        const firstField = Object.keys(err.details)[0];
        const firstMsg = err.details[firstField]?.[0] || err.message;
        setError(firstMsg);
        toast.error(firstMsg);
      } else {
        setError('Failed to create appointment. Please try again.');
        toast.error('Failed to create appointment. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
    >
      <Toaster position="top-center" />
      <ServiceHeader progressNumber={8} progressTitle="Confirm Appointment" />
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Review & Confirm Your Appointment</h1>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
          )}
          <div className="space-y-6">
            <SectionContainer
              title="Vehicle Details"
              onEdit={() => handleEdit('Vehicle')}
              content={
                <div className="grid grid-cols-3 gap-4">
                  <div><span className="font-semibold">Year:</span> {formData.vehicle.year}</div>
                  <div><span className="font-semibold">Make:</span> {formData.vehicle.make}</div>
                  <div><span className="font-semibold">Model:</span> {formData.vehicle.model}</div>
                </div>
              }
            />
            <SectionContainer
              title="Selected Services"
              onEdit={() => handleEdit('Services')}
              content={
                <div className="flex flex-wrap gap-2">
                  {formData.selectedServices.map((s, i) => (
                    <span key={i} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">{s}</span>
                  ))}
                </div>
              }
            />
            <SectionContainer
              title="Service Location"
              onEdit={() => handleEdit('Search')}
              content={<span>{formData.serviceLocation}</span>}
            />
            <SectionContainer
              title="Appointment Date & Time"
              onEdit={() => handleEdit('Book')}
              content={
                <span>
                  {formData.appointmentDate} at {formData.appointmentTime}
                </span>
              }
            />
            <SectionContainer
              title="Additional Info"
              onEdit={() => handleEdit('Note')}
              content={<span>{formData.additionalInfo || 'None'}</span>}
            />
            <SectionContainer
              title="Service Type"
              onEdit={() => handleEdit('Type')}
              content={<span>{formData.mechanicType}</span>}
            />
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Confirm & Book Appointment'}
            </button>
          </div>
        </motion.div>
      </div>
      <ServiceFooter />
    </motion.div>
  );
}

// Reusable section component
const SectionContainer = ({
  title,
  onEdit,
  content,
}: {
  title: string;
  onEdit: () => void;
  content: React.ReactNode;
}) => (
  <div className="border-b pb-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <button
        onClick={onEdit}
        className="text-emerald-600 hover:underline text-sm font-medium"
      >
        Edit
      </button>
    </div>
    <div className="mt-4 text-gray-700">{content}</div>
  </div>
);