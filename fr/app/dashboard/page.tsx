'use client';

import { useEffect, useState } from 'react';
import { Tabs, Tab, Spinner, Button } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import {StarIcon} from '@heroicons/react/24/outline';
import useAuth from '@/app/utils/hooks';
import { getRequest } from '@/app/utils/axios';
import RequestOverlay from './RequestDetailsOverlay';
import ServiceRequestCard from './ServiceRequestCard';
import CustomHeader from '../headers/CustomHeader';
const Dashboard = ({ role }: { role: 'customer' | 'mechanic' }) => {
  const [selectedTab, setSelectedTab] = useState<string>('pending');
  const [selectedRequest, setSelectedRequest] = useState<{ data: any; status: string } | null>(null);
  const [data, setData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  const [autoOpenRequest, setAutoOpenRequest] = useState<{ data: any; status: string } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [handledPayment, setHandledPayment] = useState(false);

  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const quoteId = searchParams.get('quote');
    if (paymentStatus === 'success' && quoteId && !handledPayment) {
      setHandledPayment(true);
      getRequest(`users/quotes/${quoteId}/`).then(res => {
        const serviceRequestId = res.data.service_request;
        // Find the request in the dashboard data after fetchData
        getRequest(
          role === 'customer'
            ? 'users/user-dashboard/'
            : 'users/mechanic-dashboard/'
        ).then(srRes => {
          const allRequests = Object.values(srRes.data).flat();
          const found = allRequests.find((r: any) => r.id === serviceRequestId);
          if (found) {
            setAutoOpenRequest({ data: found, status: (found as any).status || '' });
          }
        });
      });
      router.replace('/dashboard');
    }
  }, [searchParams, router, handledPayment, role]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint = role === 'customer'
          ? 'users/user-dashboard/'
          : 'users/mechanic-dashboard/';
        const response = await getRequest(endpoint);
        setData(response.data);
      } catch (error) {
        setData({
          pending: [],
          quoted: [],
          accepted: [],
          completed: [],
          ...(role === 'customer' ? { canceled: [] } : { rejected: [] }),
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [role]);

  return (
    <>
      <CustomHeader />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        {/* Get a Quote Button - only for customers */}
        {role === 'customer' && (
          <div className="flex justify-end max-w-6xl mx-auto px-4 pt-8">
            <a
              href="/RFQ/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold shadow-lg hover:from-emerald-600 hover:to-blue-600 transition-all text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Get a Quote
            </a>
          </div>
           )}
        {searchParams.get('payment') === 'success' && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-emerald-100 border border-emerald-300 text-emerald-800 px-6 py-3 rounded-xl shadow-lg z-50">
            Payment successful! Your appointment has been created.
          </div>
        )}
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
              {role === 'customer' ? 'My Service Requests' : 'Service Requests'}
            </h1>
          </div> */}
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(String(key))}
            variant="underlined"
            classNames={{
              tabList: 'flex flex-col md:flex-row gap-4',
              cursor: 'bg-emerald-500',
              tab: 'text-lg font-semibold',
            }}
          >
            {Object.keys(data).map((tab) => (
              <Tab key={tab} title={<span className="capitalize">{tab}</span>} />
            ))}
          </Tabs>

          <div className="mt-8 space-y-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" color="success" />
              </div>
            ) : data[selectedTab]?.length > 0 ? (
              <AnimatePresence mode="wait">
                {data[selectedTab].map((request) => (
                  <ServiceRequestCard
                    key={request.id}
                    request={request}
                    role={role}
                    onClick={() => setSelectedRequest({ data: request, status: request.status })}
                  />
                ))}
              </AnimatePresence>
            ) : (
              <div className="text-center py-12 text-gray-400 text-lg font-medium">
                <StarIcon className="w-8 h-8 mx-auto mb-2 text-emerald-200" />
                No {selectedTab} requests
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {(selectedRequest || autoOpenRequest) && (
            <RequestOverlay
              requestData={(selectedRequest || autoOpenRequest)!.data}
              role={role}
              status={(selectedRequest || autoOpenRequest)!.status}
              onClose={() => {
                setSelectedRequest(null);
                setAutoOpenRequest(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};


export default function DashboardWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        <Spinner size="lg" color="success" />
      </div>
    );
  }
  if (!user) {
    // Prevent infinite null render on dashboard
    if (typeof window !== 'undefined' && window.location.pathname !== '/sign-in') {
      return null;
    }
    return null;
  }

  return (
    <Dashboard role={user.is_mechanic ? 'mechanic' : 'customer'} />
  );
}