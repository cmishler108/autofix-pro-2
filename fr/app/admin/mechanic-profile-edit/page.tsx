'use client'

import { Input } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { MechanicProfileType } from "@/app/utils/types";
import { adminGetRequest } from "@/app/utils/axios";
import { getStorage, isTokenExpired } from "@/app/utils/helper";
import { useRouter } from "next/navigation";

export default function MechanicProfileEdit(){
    const router = useRouter()
    const [mechanic, setMechanic] = useState<MechanicProfileType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [businessName, setBusinessName] = useState<string>('')
    const [businessInfo, setBusinessInfo] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const [businessExperience, setBusinessExperience] = useState<number | null>()

    useEffect(() => {
        const accessToken = getStorage('admin-access_token');
        if(isTokenExpired(accessToken)){
            router.replace('/admin/sign-in');
        }
    }, []);
    
    useEffect(() => {
        const getMechanic = async () => {

            setLoading(true);
            setError(null);
            const id = getStorage('selectedIdforAdmin')

            const URI = `https://doneez.com/api/users/staff/mechanic-profile/${id}`;
            try {
                const response = await adminGetRequest<MechanicProfileType>(URI);
                setMechanic(response.data);
                setBusinessName(response.data.business_name)
                setBusinessInfo(response.data.business_info)
                setBusinessExperience(response.data.years_of_experience)
                setPhoneNumber(response.data.phone_number)
            } catch (err: any) {
                console.warn(err);
                setError('Failed to load mechanic profile');
            } finally {
                setLoading(false);
            }
        };
        getMechanic();
    }, []);

    return(
        <div className="min-w-full min-h-screen bg-[#f7f7f7] p-8">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error} </p>}
            {!loading && !error && mechanic &&
                <div className="max-w-[1400px] grid grid-cols-1 md:grid-cols-2 mx-auto">
                    <div>
                        <div className="mb-4">
                            <Input label="Business Name" color="primary" size="md" className="max-w-[400px]"
                                value={businessName} onValueChange={(value) => setBusinessName(value)}/>
                        </div>

                        <div className="mb-4">
                            <Input label="Business Info" color="primary" size="md" className="max-w-[400px]"
                                value={businessInfo} onValueChange={(value) => setBusinessInfo(value)}/>
                        </div>

                        <div className="mb-4">
                            <Input type="number" label="Business Experience (Years)" color="primary" size="md" className="max-w-[400px]"
                                value={businessExperience?.toString()} onChange={(e) => setBusinessExperience(parseInt(e.target.value))}/>
                        </div>
                        <div className="mb-4">
                            <Input label="Phone" color="primary" size="md" className="max-w-[400px]"
                                    value={phoneNumber} onValueChange={(value) => setPhoneNumber(value)}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}