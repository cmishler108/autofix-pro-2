'use client'
import React, { useState, useEffect } from "react"
import { fetchMechanicProfileById } from "@/app/utils/api"
import { getStorage } from "@/app/utils/helper"
import { MechanicProfileType } from "@/app/utils/types"
import { useRouter } from "next/navigation"
import ServiceHeader from "@/app/headers/ServiceHeader"
import ServiceFooter from "@/app/footers/service_footer"
import { Button } from "@nextui-org/react";

export default function MechanicProfile() { // Renamed to start with uppercase
    const router = useRouter()
    const [profileData, setProfileData] = useState<MechanicProfileType | null>(null)

    useEffect(() => {
        const profileDataFetch = async () => { // Corrected typo
            const selectedId: string | null = getStorage('selectedId')
            if (selectedId == null) {
                router.replace('/get-quote/estimates')
                return // It's good practice to return after redirecting
            }

            try {
                const fetchedProfileData = await fetchMechanicProfileById(selectedId)
                setProfileData(fetchedProfileData)
            } catch (error) {
                console.error("Error fetching mechanic profile:", error)
                // Optionally, handle the error (e.g., set an error state)
            }
        }
        profileDataFetch()
    }, [router]) // Added router to the dependency array

    return (
        <div className="min-h-[100vh] bg-white min-w-full flex flex-col">
            <div className="flex-1 max-w-[1285px] w-full mx-auto px-4 py-8 max-sm:bg-white max-sm:max-w-[540px] max-sm:shadow-none max-sm:min-h-full max-sm:h-auto">
                {profileData != null ? 
                    <div className="w-full">
                        <h2 className="text-[32px] max-sm:text-[28px]">
                            {profileData.business_name}
                        </h2>
                        <div className="mt-4">
                            <div className="text-base">
                                {profileData.business_info}
                            </div>
                        </div>
                        <div className="mt-10">
                            <h4 className="text-[24px] max-sm:text-[22px]">Offered Services:</h4>
                            {}
                        </div>
                        <div className="mt-4">
                            <Button size="lg" color="danger">Book now</Button>
                        </div>
                        {/* You can add more profile details here */}
                    </div>
                :
                <div className="flex justify-center items-center w-full h-full">
                    <Button color="primary" isLoading className="mx-auto">
                        Loading
                    </Button>
                </div>
                }
            </div>
            <ServiceFooter />        
        </div>
    )
}
