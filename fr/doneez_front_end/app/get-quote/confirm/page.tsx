'use client';

import { useRouter } from 'next/navigation';

import ServiceFooter from '@/app/footers/service_footer';
import ServiceHeader from '@/app/headers/ServiceHeader';

import { Button } from '@nextui-org/react';

export default function Confirm() {
    const router = useRouter();

    return (
        <div className="min-h-[100vh] bg-[#f4f6fa] min-w-full flex flex-col">
            <ServiceHeader progressNumber={5} progressTitle="Confirm" />
            <div className="flex-1 max-w-[1024px] w-full mx-auto px-4 py-8 max-sm:bg-white max-sm:max-w-[540px] max-sm:shadow-none max-sm:min-h-full max-sm:h-auto">
                <div className="flex flex-row items-center pb-4">
                    <button
                        className="max-md:fixed max-md:left-[12px] max-md:top-[52px] max-md:translate-y-[-50%] flex items-center justify-center shadow-[0_2px_3px_0_#dce0e6] w-[40px] h-[40px] rounded-[50%] bg-white mr-4 text-[#788391]
                            active:border-solid active:border-red-300 active:border-[2px]"
                    >
                        {/* SVG Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="Arrow-Left--Streamline-Feather"
                            className="w-5 h-5"
                        >
                            <path
                                d="M11.76 4.850064000000001C11.628816 4.927944 4.901184000000001 11.660016 4.8426 11.772C4.775208 11.90088 4.775184 12.099072 4.842576 12.228C4.905768 12.348912 11.665992000000001 19.10628 11.781648 19.164144C11.91024 19.228512 12.158016 19.206072000000002 12.284136 19.118664C12.403824 19.035743999999998 12.504216000000001 18.848328 12.503471999999999 18.709296C12.502272 18.487344 12.573192 18.563328 9.461112 15.450000000000001L6.5162640000000005 12.504 12.661416 12.504L18.806568 12.504 18.928584 12.443208C19.004808 12.405216000000001 19.076352 12.345216 19.119287999999997 12.283248C19.18032 12.195192 19.188 12.163512 19.188 12C19.188 11.836488000000001 19.18032 11.804808000000001 19.119287999999997 11.716752C19.076352 11.654784 19.004808 11.594784 18.928584 11.556792L18.806568 11.496 12.661416 11.496L6.5162640000000005 11.496 9.461112 8.55C12.573192 5.436672 12.502272 5.512656 12.503471999999999 5.290704C12.504264 5.142744 12.402743999999998 4.960944 12.27036 4.873248C12.175128 4.810176 12.137832 4.8000240000000005 12.001896 4.800096C11.885088 4.800168 11.822136 4.8131520000000005 11.76 4.850064000000001"
                                stroke="none"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                    <h1 className="text-[25px] max-[488px]:text-[20px] font-bold text-black">
                        Confirm service details to book your appointment.
                    </h1>
                </div>

                <div className="flex shadow-[0_2px_4px_0_#d9dce9] rounded-[10px] max-md:shadow-none max-md:rounded-none bg-white">
                    <div className="px-4 max-lg:py-6 w-full">
                        <div className="lg:px-[112px] lg:py-[64px]">
                            <div className="text-[14px] mb-8 max-md:mb-4 text-[#616a76]">
                                Please make sure all of the service details are
                                correct before you confirm and book your
                                appointment. Once your service details are
                                confirmed we will provide you with next steps.
                            </div>
                            <div className="bg-[#f9fafb] border-solid border-[1px] border-[#e9e9e9] px-4 md:py-4 md:px-8">
                                <div className="relative flex flex-row max-md:flex-col py-6">
                                    <div className="w-[33%] max-md:w-full px-4 text-[14px] font-bold text-left">
                                        Services:
                                    </div>
                                    <div className="px-4 text-[14px] max-md:w-full">
                                        Check engine light is on (general
                                        diagnosis)
                                    </div>
                                    <div className="absolute px-4 bottom-0 w-full">
                                        <div className="border-b-[1px] border-solid border-b-[#dee2e6]"></div>
                                    </div>
                                </div>

                                <div className="relative flex flex-row max-md:flex-col py-6">
                                    <div className="w-[33%] max-md:w-full px-4 text-[14px] font-bold text-left">
                                        Vehicle:
                                    </div>
                                    <div className="px-4 text-[14px] max-md:w-full">
                                        2020 Buick Regal Sportback
                                    </div>
                                    <div className="absolute px-4 bottom-0 w-full">
                                        <div className="border-b-[1px] border-solid border-b-[#dee2e6]"></div>
                                    </div>
                                </div>

                                <div className="relative flex flex-row max-md:flex-col py-6">
                                    <div className="w-[33%] max-md:w-full px-4 text-[14px] font-bold text-left">
                                        Estimate:
                                    </div>
                                    <div className="px-4 text-[14px] max-md:w-full">
                                        <div>A & W Auto Repair</div>
                                        <div>2558RT 17M, Goshen, NY 10924</div>
                                        <div>(845) 926-4038</div>
                                    </div>
                                    <div className="ml-auto mr-4 cursor-pointer text-blue-700 text-[14px]">
                                        Change
                                    </div>
                                    <div className="absolute px-4 bottom-0 w-full">
                                        <div className="border-b-[1px] border-solid border-b-[#dee2e6]"></div>
                                    </div>
                                </div>

                                <div className="relative flex flex-row max-md:flex-col py-6 w-full">
                                    <div className="min-w-[33%] max-md:w-full px-4 text-[14px] font-bold text-left">
                                        Appointment:
                                    </div>
                                    <div className="px-4 flex flex-row w-full">
                                        <div className="text-[14px] max-md:w-full">
                                            Saturday Oct 5 at 10:00am
                                        </div>
                                        <div className="ml-auto text-blue-700 text-[14px] cursor-pointer">
                                            Change
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-row-reverse max-md:flex-col max-md:gap-4">
                                <Button
                                    className="bg-[#e83c79] text-[16px] font-bold text-white max-md:w-full md:ml-4 rounded-md"
                                    onClick={() => router.replace('/dashboard')}
                                >
                                    Confirm & book
                                </Button>
                                <Button className="bg-[#ffffff] text-[16px] rounded-md font-bold text-[#009ed5] max-md:w-full shadow-[0_2px_2px_0_rgba(224,226,230,.5)] border-solid border-[#e5e8ed] border-[1px]">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ServiceFooter />
        </div>
    );
}
