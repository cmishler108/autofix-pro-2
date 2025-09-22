'use client'

import { Rating } from '@smastrom/react-rating'
import { setStorage } from '@/app/utils/helper'
import { useRouter } from 'next/navigation'
interface mechaniProps {
    id: number
    mechanicName: string
    rating: number
    reviews: number
    distance?: number
    address: string
    zipcode: string
}

export default function MechanicItem({id, mechanicName, rating, reviews, distance, address, zipcode}:mechaniProps) {
    const router = useRouter()
    const enterProfile = () => {
        setStorage('selectedId', String(id))
        router.replace('/get-quote/profile')
    }
    return (
        <div>
            <div className="pt-8 px-4 pb-4 cursor-pointer hover:bg-slate-100"
                onClick={enterProfile}>
                <h1 className="text-[#009ed5] text-4xl font-semibold max-md:text-2xl sm:text-xl">
                    {mechanicName}
                </h1>
                <div className="flex flex-row items-center">
                    <Rating
                        value={rating}
                        readOnly
                        halfFillMode="svg"
                        className="h-10 max-w-24"
                    />
                    <span className="text-[14px] font-medium text-[#2d2e2f] ml-2">
                        {rating}{" "} ({reviews})
                    </span>
                </div>
                <div className="text-[14px] text-[#2d2e2f]">
                    <span className="font-bold">{distance}{" "} mi</span>{" "} - {" "}{address} {" "} {zipcode}
                </div>
            </div>
            <div className="mt-4 mb-6 h-[1px] bg-[#e5e8ed] w-full"></div>
        </div>
    );
}
