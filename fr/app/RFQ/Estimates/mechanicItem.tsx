'use client'

import { Rating } from '@smastrom/react-rating'
import { setStorage } from '@/app/utils/helper'
import { useRouter } from 'next/navigation'

interface MechanicProps {
    id: number
    mechanicName: string
    rating: number
    reviews: number
    distance?: number
    address: string
    zipcode: string
}

export default function MechanicItem({
    id,
    mechanicName,
    rating,
    reviews,
    distance,
    address,
    zipcode
}: MechanicProps) {
    const router = useRouter()
    const enterProfile = () => {
        setStorage('selectedId', String(id))
        router.replace('/get-quote/profile')
    }

    return (
        <div className="pt-6 px-4 pb-3 cursor-pointer hover:bg-emerald-50/30 rounded-xl transition-colors"
            onClick={enterProfile}
        >
            <h1 className="text-emerald-600 text-2xl font-bold max-md:text-xl">
                {mechanicName}
            </h1>
            <div className="flex items-center gap-2 mt-2">
                <Rating
                    value={rating}
                    readOnly
                    halfFillMode="svg"
                    className="max-w-28 h-6"
                />
                <span className="text-sm font-medium text-gray-600">
                    {rating} ({reviews} reviews)
                </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-emerald-700">{distance} mi</span> 
                {" "} - {address} {zipcode}
            </div>
            <div className="mt-4 mb-3 h-[1px] bg-gray-200/80 w-full" />
        </div>
    )
}