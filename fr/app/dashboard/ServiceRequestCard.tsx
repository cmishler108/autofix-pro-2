import { motion, AnimatePresence } from 'framer-motion';
import {
  ClockIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  XCircleIcon,
  UserIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
 
import { CustomerServiceRequest , MechanicServiceRequest , ServiceRequestCardProps } from '@/app/utils/types';

 

// STATUS COLORS
const customerStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  completed: 'bg-purple-100 text-purple-800',
  canceled: 'bg-red-100 text-red-800',
};

const mechanicStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-gray-200 text-gray-700',
  completed: 'bg-purple-100 text-purple-800',
};

const getStatusColor = (status: string, role: 'customer' | 'mechanic') => {
  return role === 'customer'
    ? customerStatusColors[status as keyof typeof customerStatusColors]
    : mechanicStatusColors[status as keyof typeof mechanicStatusColors];
};

const ServiceRequestCard = ({ request, role, onClick }: ServiceRequestCardProps) => {
  const isCustomer = role === 'customer';
  const colorClass = getStatusColor(request.status, role);

  // Defensive: get vehicle info safely
  const vehicleInfo = isCustomer
    ? (request as CustomerServiceRequest)
    : (request as MechanicServiceRequest)?.service_request;

  const appointmentDate = isCustomer
    ? (request as CustomerServiceRequest)?.appointment_date
    : vehicleInfo?.appointment_date;

  // Defensive: fallback for missing vehicle info
  const vehicleYear = vehicleInfo?.vehicle_year || '';
  const vehicleMake = vehicleInfo?.vehicle_make || '';
  const vehicleModel = vehicleInfo?.vehicle_model || '';
  const serviceLocation = vehicleInfo?.service_location || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(16,185,129,0.12)' }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 cursor-pointer transition-all duration-300 relative"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className={`${colorClass} px-3 py-1 rounded-full text-sm flex items-center gap-2 font-semibold`}>
              {request.status === 'pending' && <ClockIcon className="w-5 h-5" />}
              {request.status === 'quoted' && <CurrencyDollarIcon className="w-5 h-5" />}
              {(request.status === 'accepted' || request.status === 'completed') && <CheckCircleIcon className="w-5 h-5" />}
              {(request.status === 'canceled' || request.status === 'rejected') && <XCircleIcon className="w-5 h-5" />}
              <span className="capitalize">{request.status}</span>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {appointmentDate ? (
                new Date(appointmentDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })
              ) : (
                <span className="text-gray-400 italic">No date</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              {(vehicleYear || vehicleMake || vehicleModel)
                ? `${vehicleYear} ${vehicleMake} ${vehicleModel}`.trim()
                : 'No vehicle information'}
            </h3>
            {serviceLocation && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPinIcon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{serviceLocation}</span>
              </div>
            )}
          </div>
          
        </div>

        <div className="sm:w-48 flex sm:flex-col justify-between items-end gap-4">
          {!(request.status === 'canceled' || request.status === 'rejected') && (
            <button className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-2 group transition-colors" onClick={onClick}>
              <span>{isCustomer ? 'View Details' : 'Manage Request'}</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>

      {/* Toast-like creation date at bottom right */}
      {request.created_at && (
        <div
          className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 border border-gray-200 shadow-md px-3 py-1 rounded-lg text-xs text-gray-700"
          style={{ maxWidth: 240 }}
        >
          <ClockIcon className="w-4 h-4 text-emerald-500" />
          <span>
            Created: <span className="font-medium">{new Date(request.created_at).toLocaleString()}</span>
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceRequestCard;