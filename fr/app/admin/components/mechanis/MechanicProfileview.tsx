'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { adminGetRequest } from '@/app/utils/axios';
import { MechanicProfileType } from '@/app/utils/types';
import clsx from 'clsx';
import { getStorage, isTokenExpired } from '@/app/utils/helper';
import { useRouter } from 'next/navigation';

interface ProfileViewProps {
    id: number;
    isOpen: boolean;
    onBack: () => void;
}

function MechanicProfileView({ id, isOpen, onBack }: ProfileViewProps) {
    const [mechanic, setMechanic] = useState<MechanicProfileType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        const getMechanic = async () => {
            if (!isOpen) return;

            setLoading(true);
            setError(null);

            const URI = `https://doneez.com/api/users/staff/mechanic-profile/${id}`;
            try {
                const response = await adminGetRequest<MechanicProfileType>(URI);
                setMechanic(response.data);
            } catch (err: any) {
                console.warn(err);
                setError('Failed to load mechanic profile');
            } finally {
                setLoading(false);
            }
        };
        getMechanic();
    }, [id, isOpen]);

    useEffect(() => {
        const accessToken = getStorage('admin-access_token');
        if(isTokenExpired(accessToken)){
            router.replace('/admin/sign-in');
        }
    }, []);

    return (
        <div
            className={clsx(
                'z-[99] min-w-full min-h-full bg-[#f4f6fa] flex flex-col transition-all duration-1000 absolute top-0 right-0 p-4 mb-10 border-solid border-2 border-cyan-400 rounded-md',
                {
                    'translate-x-0': isOpen,
                    'translate-x-[-150%]': !isOpen,
                }
            )}
        >
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && mechanic && (
                <>
                    <Button
                        color="primary"
                        variant="bordered"
                        radius="sm"
                        className="mb-4 w-[200px]"
                        onClick={onBack}
                    >
                        Back
                    </Button>
                    <div className="w-full grid grid-cols-2 gap-12">
                        <div>
                            <div className="text-black mb-2">
                                <span className='text-2xl font-bold'>{mechanic.business_name}</span>
                            </div>
                            <div className="text-black text-base mb-4">
                                Description: <span className='text-base text-blue-500'>{mechanic.business_info || "empty"}</span>
                            </div>
                            <div className='mb-2 text-base'>
                                Experience: <span className='text-xl text-blue-500'>{mechanic.years_of_experience || "empty"} years of experience</span>
                            </div>
                            <div className='mb-4 text-base'>
                                Phone: <span className='text-base text-blue-500'>{mechanic.phone_number || "empty"}</span>
                            </div>
                            <div className='mb-4 text-base'>
                                Website: <a className='text-base text-blue-500 break-words' href={`${mechanic.web_site}`} target="_blank" rel="noopener noreferrer"> 
                                    {mechanic.web_site || "empty"}
                                </a>
                            </div>
                            <div className='mb-4 text-base'>
                                Address: <span className='text-base text-blue-500'>{mechanic.address || "empty"}, {mechanic.address_city || "empty"}, {mechanic.address_state || "empty"}</span>
                            </div>
                            <div className='mb-4 text-base'>
                                Zip Code: <span className='text-base text-blue-500'>{mechanic.zip_code || "empty"}</span>
                            </div>
                            {/* Add more mechanic details here */}
                        </div>
                        <div>
                            <div className='text-base mb-4'>
                                Mobile Service: <span className='text-blue-500'>{mechanic.is_mobile ? "available" : "unavailble"}</span>
                            </div>
                            <div className='text-base mb-4'>
                                Offered Services: <span className='text-blue-500'>{mechanic.offered_services?.join(',') || 'empty'}</span>
                            </div>
                            <div className='text-base mb-4'>
                                Abailibility:
                                <div className='text-base mb-2'>
                                    Monday: <span className='text-blue-500'>{mechanic.availability.mon.join(',') || 'Closed'}</span>
                                </div>
                                <div className='text-base mb-2'>
                                    Tuesday: <span className='text-blue-500'>{mechanic.availability.tue.join(',') || 'Closed'}</span>
                                </div>
                                <div className='text-base mb-2'>
                                    Wednesday: <span className='text-blue-500'>{mechanic.availability.wed.join(',') || 'Closed'}</span>
                                </div>
                                <div className='text-base mb-2'>
                                    Thursday: <span className='text-blue-500'>{mechanic.availability.thu.join(',') || 'Closed'}</span>
                                </div>
                                <div className='text-base mb-2'>
                                    Friday: <span className='text-blue-500'>{mechanic.availability.fri.join(',') || 'Closed'}</span>
                                </div>
                                <div className='text-base mb-2'>
                                    Saturday: <span className='text-blue-500'>{mechanic.availability.sat.join(',') || "Closed"}</span>
                                </div>
                                <div className='text-base mb-2'>
                                    Sunday: <span className='text-blue-500'>{mechanic.availability.sun.join(',') || "Closed"}</span>
                                </div> 
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default React.memo(MechanicProfileView);
