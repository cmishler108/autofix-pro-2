'use client'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button, Skeleton } from "@nextui-org/react"
import { fetchMechanicProfileById } from "@/app/utils/api"
import { getStorage } from "@/app/utils/helper"
import { MechanicProfileType } from "@/app/utils/types"
import { useRouter } from "next/navigation"
import ServiceHeader from "@/app/headers/ServiceHeader"
import ServiceFooter from "@/app/footers/service_footer"
import { Rating } from '@smastrom/react-rating'
import { MapPin, Clock, Phone, Calendar, Star } from 'lucide-react'

export default function MechanicProfile() {
    const router = useRouter()
    const [profileData, setProfileData] = useState<MechanicProfileType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            const selectedId = getStorage('selectedId')
            if (!selectedId) {
                router.replace('/get-quote/estimates')
                return
            }

            try {
                const data = await fetchMechanicProfileById(selectedId)
                setProfileData(data)
            } catch (error) {
                console.error("Error fetching profile:", error)
                router.replace('/get-quote/estimates')
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [router])

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
        >
            
            
            <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-8"
                >
                    {loading ? (
                        <div className="space-y-6">
                            <Skeleton className="h-12 w-3/4 rounded-lg" />
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full rounded-lg" />
                                <Skeleton className="h-4 w-2/3 rounded-lg" />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-32 rounded-xl" />
                                ))}
                            </div>
                        </div>
                    ) : profileData ? (
                        <div className="space-y-8">
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {profileData.business_name}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Rating
                                            value={profileData.rating}
                                            readOnly
                                            className="max-w-28 h-6"
                                        />
                                        <span className="text-gray-600">
                                            {profileData.rating} (reviews)
                                        </span>
                                    </div>
                                </div>
                                <Button 
                                    size="lg" 
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold w-full md:w-auto"
                                >
                                    Book Appointment
                                </Button>
                            </div>

                            {/* About Section */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h2 className="text-xl font-semibold mb-4">About Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {profileData.business_info}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {/* Location Card */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <MapPin className="w-6 h-6 text-emerald-600" />
                                        <h3 className="text-lg font-semibold">Location</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        {profileData.address}<br />
                                        {profileData.address_city}, {profileData.address_state}<br />
                                        {profileData.zip_code}
                                    </p>
                                </div>

                                {/* Services Card */}
                                {/* <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Tools className="w-6 h-6 text-emerald-600" />
                                        <h3 className="text-lg font-semibold">Services</h3>
                                    </div>
                                    <div className="space-y-2">
                                        {profileData.services?.map((service, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-emerald-600">•</span>
                                                <span className="text-gray-600">{service}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}

                                {/* Hours Card */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Clock className="w-6 h-6 text-emerald-600" />
                                        <h3 className="text-lg font-semibold">Business Hours</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Mon-Fri: 8:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Certification & Specialties */}
                            <div className="bg-emerald-50 p-6 rounded-xl">
                                <h2 className="text-xl font-semibold mb-4">Certifications & Specialties</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-emerald-600" />
                                        <span className="text-gray-600">ASE Certified</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="w-5 h-5 text-emerald-600" />
                                        <span className="text-gray-600">Hybrid/Electric Vehicle Specialist</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-emerald-600" />
                                                <span className="text-gray-600">{profileData.phone_number}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="bordered" 
                                        className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 w-full md:w-auto"
                                    >
                                        Get Directions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-red-500">Profile not found</p>
                            <Button 
                                className="mt-4 bg-emerald-500 text-white"
                                onClick={() => router.back()}
                            >
                                Return to Estimates
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>

            <ServiceFooter />
        </motion.div>
    )
}