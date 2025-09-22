'use client';

import { useState } from 'react';
import Link from 'next/link';
interface ServiceProps {
    progressNumber: number;
    progressTitle: string;
    ServiceStatus ?: (status: boolean) => void;
}
export default function ServiceHeader({
    progressNumber,
    progressTitle,
    ServiceStatus,
}: ServiceProps) {
    const [serviceStatus, setServiceStatus] = useState(false);
    const handleStatus = () => {
        ServiceStatus?.(!serviceStatus);
        setServiceStatus(!serviceStatus);
    };
    return (
        <div className="flex min-h-[80px] max-md:min-h-[145px] p-[12px] lg:px-6 shadow-[0_.125rem_.25rem_rgba(0,0,0,0.075)] bg-white sticky top-0 z-[10]">
            <div className="flex flex-row items-center w-full max-md:relative">
                <div className="text-[30px] max-md:text-[24px] text-black max-md:absolute max-md:left-[50%] max-md:top-[40px] max-md:translate-x-[-50%] max-md:translate-y-[-50%]">
                    <Link href={'/'}>DoneEZ</Link>
                </div>
                <div className="flex flex-row max-w-[530px] w-full mx-auto items-center left-auto max-md:mt-[80px] max-md:max-w-[70%] max-[500px]:max-w-[50%] max-md:mx-auto">
                    <div className="md:hidden absolute left-0 top-[95px] text-[#e83c79] text-[16px] font-bold">
                        {progressTitle}
                    </div>

                    <div className="w-full px-[16px] pt-[4px] pb-[20px] relative text-center">
                        <div className="text-[#e83c79] max-md:hidden">
                            Services
                        </div>
                        <div className="bg-[#e83c79] border-4 border-white rounded-full bottom-[-3px] h-[18px] left-1/2 ml-[-9px] absolute w-[18px] z-[1]"></div>
                    </div>
                    <div className="w-full px-[16px] pt-[4px] pb-[20px] relative text-center">
                        <div
                            className={`${
                                progressNumber >= 2
                                    ? 'text-[#e83c79]'
                                    : 'text-[#e1e4f1]'
                            } max-md:hidden`}
                        >
                            Vehicle
                        </div>
                        <div
                            className={`${
                                progressNumber >= 2
                                    ? 'bg-[#e83c79]'
                                    : 'bg-[#e1e4f1]'
                            } border-4 border-white rounded-full bottom-[-3px] h-[18px] left-1/2 ml-[-9px] absolute w-[18px] z-[1]`}
                        ></div>
                        <div
                            className={`${
                                progressNumber >= 2
                                    ? 'bg-[#e83c79]'
                                    : 'bg-[#e1e4f1]'
                            } bottom-[4px] h-[3px] absolute right-1/2 w-full`}
                        ></div>
                    </div>
                    <div className="w-full px-[16px] pt-[4px] pb-[20px] relative text-center">
                        <div
                            className={`${
                                progressNumber >= 3
                                    ? 'text-[#e83c79]'
                                    : 'text-[#e1e4f1]'
                            } max-md:hidden`}
                        >
                            Estimates
                        </div>
                        <div
                            className={`${
                                progressNumber >= 3
                                    ? 'bg-[#e83c79]'
                                    : 'bg-[#e1e4f1]'
                            } border-4 border-white rounded-full bottom-[-3px] h-[18px] left-1/2 ml-[-9px] absolute w-[18px] z-[1]`}
                        ></div>
                        <div
                            className={`${
                                progressNumber >= 3
                                    ? 'bg-[#e83c79]'
                                    : 'bg-[#e1e4f1]'
                            } bottom-[4px] h-[3px] absolute right-1/2 w-full`}
                        ></div>
                    </div>
                    <div className="w-full px-[16px] pt-[4px] pb-[20px] relative text-center">
                        <div
                            className={`${
                                progressNumber >= 4
                                    ? 'text-[#e83c79]'
                                    : 'text-[#e1e4f1]'
                            } max-md:hidden`}
                        >
                            Book
                        </div>
                        <div
                            className={`${
                                progressNumber >= 4
                                    ? 'bg-[#e83c79]'
                                    : 'bg-[#e1e4f1]'
                            } border-4 border-white rounded-full bottom-[-3px] h-[18px] left-1/2 ml-[-9px] absolute w-[18px] z-[1]`}
                        ></div>
                        <div
                            className={`${
                                progressNumber >= 4
                                    ? 'bg-[#e83c79]'
                                    : 'bg-[#e1e4f1]'
                            } bottom-[4px] h-[3px] absolute right-1/2 w-full`}
                        ></div>
                    </div>
                    <div className="w-full px-[16px] pt-[4px] pb-[20px] relative text-center">
                        <div
                            className={`${
                                progressNumber == 5
                                    ? 'text-[#e83c79]'
                                    : 'text-[#e1e4f1]'
                            } max-md:hidden`}
                        >
                            Confirm
                        </div>
                        <div
                            className={`${
                                progressNumber == 5
                                    ? 'bg-[#e83c79]'
                                    : 'bg-[#e1e4f1]'
                            } border-4 border-white rounded-full bottom-[-3px] h-[18px] left-1/2 ml-[-9px] absolute w-[18px] z-[1]`}
                        ></div>
                        <div
                            className={`${
                                progressNumber == 5
                                    ? 'bg-[#e83c79]'
                                    : 'bg-[#e1e4f1]'
                            } bottom-[4px] h-[3px] absolute right-1/2 w-full`}
                        ></div>
                    </div>

                    <div
                        className="md:hidden right-[22px] top-[97px] absolute cursor-pointer"
                        onClick={handleStatus}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="Arrow-Down-1--Streamline-Ultimate"
                            className={`${serviceStatus ? 'rotate-180' : 'rotate-0'} w-[20px] h-[20px] transition-transform duration-300 ease-out`}
                        >
                            <path
                                d="M1.236 6.403992000000001C0.9873360000000001 6.523032000000001 0.8720160000000001 6.806448 0.972816 7.050768C0.999144 7.11456 2.465136 8.596224 6.114816 12.247728C8.922672 15.056976 11.265792000000001 17.387520000000002 11.321760000000001 17.426712000000002C11.377704000000001 17.465904 11.496504 17.526456 11.58576 17.561256C11.72436 17.615351999999998 11.784696 17.624568 12 17.624568C12.215304 17.624568 12.275640000000001 17.615351999999998 12.41424 17.561256C12.503496000000002 17.526456 12.622296 17.465904 12.67824 17.426712000000002C12.734208 17.387520000000002 15.077328 15.056976 17.885184 12.247728C21.534864 8.596224 23.000856000000002 7.11456 23.027184000000002 7.050768C23.169456 6.705984 22.878936 6.324072 22.507848 6.368016C22.443192 6.375672000000001 22.355591999999998 6.405528 22.31316 6.434376C22.270728000000002 6.4632000000000005 19.951728 8.76948 17.159856 11.559408C12.348336 16.367592 12.079368 16.632 12 16.632C11.920632 16.632 11.651664 16.367592 6.840144 11.559408C4.048272 8.76948 1.728432 6.462599999999999 1.6849679999999998 6.433032C1.572984 6.356832 1.362864 6.343248000000001 1.236 6.403992000000001"
                                stroke="none"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                <div className="mr-0">
                    <button
                        className="max-md:absolute max-md:right-[12px] max-md:top-[40px] max-md:translate-y-[-50%] w-[40px] h-[40px] rounded-[50%] shadow-[0_2px_3px_0_#dce0e6] flex justify-center items-center
                        active:border-solid active:border-[2px] active:border-red-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="X--Streamline-Feather"
                            className="w-[15px] h-[15px]"
                        >
                            <path
                                d="M2.124 1.8933600000000002C2.0712 1.91772 2.004216 1.963536 1.975152 1.995168C1.852056 2.129064 1.812936 2.364528 1.8848160000000003 2.538768C1.91112 2.602512 3.259488 3.966096 6.606792 7.314L11.291952 12 6.606792 16.686C3.259488 20.033904 1.91112 21.397488 1.8848160000000003 21.461232C1.812936 21.635472 1.852056 21.870936 1.975152 22.004832C2.0995920000000003 22.140192000000003 2.35632 22.190472 2.538768 22.115184C2.602512 22.08888 3.966096 20.740512 7.314 17.393208L12 12.708048 16.686 17.393208C20.033904 20.740512 21.397488 22.08888 21.461232 22.115184C21.643680000000003 22.190472 21.900408000000002 22.140192000000003 22.024848 22.004832C22.147944000000003 21.870936 22.187064 21.635472 22.115184 21.461232C22.08888 21.397488 20.740512 20.033904 17.393208 16.686L12.708048 12 17.393208 7.314C20.740512 3.966096 22.08888 2.602512 22.115184 2.538768C22.190472 2.35632 22.140192000000003 2.0995920000000003 22.004832 1.975152C21.870936 1.852056 21.635472 1.812936 21.461232 1.8848160000000003C21.397488 1.91112 20.033904 3.259488 16.686 6.606792L12 11.291952 7.314 6.606792C3.966096 3.259488 2.602512 1.91112 2.538768 1.8848160000000003C2.4192240000000003 1.835496 2.2414560000000003 1.8391680000000001 2.124 1.8933600000000002"
                                stroke="none"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
