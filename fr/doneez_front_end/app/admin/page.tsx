'use client';

import { useEffect, useState } from 'react';
import { getStorage, isTokenExpired } from '../utils/helper';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MechanicProfileList = dynamic(() => import('./components/mechanis'), {
    ssr: true
})

export default function Admin() {
    const router = useRouter()
    useEffect(() => {
        const accessToken = getStorage('admin-access_token');
        if(isTokenExpired(accessToken)){
            router.replace('/admin/sign-in');
        }
    }, []);
    return (
        <div className="min-w-full min-h-screen flex flex-col mb-10">
            <div className="mt-16 flex flex-col items-center w-full">
                <div className="max-w-[1280px] w-full p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-md shadow-[0_2px_2px_0_rgba(224,226,230,.5)]">
                    <MechanicProfileList/>
                </div>
            </div>
        </div>
    );
}
