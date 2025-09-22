'use client';

import { AxiosError } from 'axios';
import Link from 'next/link';
import { Button, Input, Snippet } from '@nextui-org/react';
import { useState } from 'react';
import { postRequest } from '../../utils/axios';
import { getStorage, setStorage } from '../../utils/helper';
import { redirect, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface LoginResponse {
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        is_customer: boolean;
        is_mechanic: boolean;
        is_active: boolean;
        // Include other user fields as needed
    };
    refresh: string;
    access: string;
}

const CustomToast = ({
    message,
    type,
}: {
    message: string;
    type: 'success' | 'error';
}) => (
    <div
        className={`${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-4 shadow-md rounded-lg flex items-center`}
    >
        <span className="text-lg mr-3">{type === 'success' ? '✅' : '❌'}</span>
        <span className="font-semibold">{message}</span>
    </div>
);

export default function AdminSignIn() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowChange = () => {
        setShowPassword(!showPassword);
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required');
            return false;
        } else if (!re.test(email)) {
            setEmailError('Invalid email format');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password) {
            setPasswordError('Password is required');
            return false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        }
        setPasswordError('');
        return true;
    };

    async function loginUser(email: string, password: string): Promise<void> {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        try {
            const payload = { email, password };
            const response = await postRequest<LoginResponse>(
                'users/staff/login/',
                payload
            );

            // Extract data from response
            const { user, refresh, access } = response.data;

            // Store tokens and user data as needed
            setStorage('admin-access_token', access);
            setStorage('refresh_token', refresh);
            setStorage('admin-user', JSON.stringify(user));

            console.log('Login successful:', access);
            toast.custom((t) => (
                <CustomToast
                    message="Sign in successful! Welcome back to DoneEZ."
                    type="success"
                />
            ));
            setTimeout(() => {
                router.replace('/admin');
            }, 2000); // Delay navigation to allow the user to see the success message
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.status === 401) {
                    console.log('Invalid credentials');
                    toast.custom((t) => (
                        <CustomToast
                            message="Invalid credentials. Please check your email and password."
                            type="error"
                        />
                    ));
                } else {
                    console.error('Login error:', error.message);
                    toast.custom((t) => (
                        <CustomToast
                            message="An error occurred during sign in. Please try again later."
                            type="error"
                        />
                    ));
                }
            } else {
                console.error('Unexpected error:', error);
                toast.custom((t) => (
                    <CustomToast
                        message="An unexpected error occurred. Please try again later."
                        type="error"
                    />
                ));
            }
        }
    }

    return (
        <div className="min-w-full min-h-screen bg-[#f4f6fa] flex justify-center items-center">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex-1 max-w-[400px] w-full mx-auto px-4 py-8 h-auto">
                <div className="flex flex-col gap-6 mt-6 max-sm:mt-4 h-auto rounded-md shadow-[0_4px_4px_4px_rgba(222,224,230,.5)] bg-white px-6 py-12">
                    <div className="text-[32px]">Sign In</div>
                    {/* {loginValidation && (
                        <div className="w-full p-4 bg-[#fcdada] text-[#963e3e] rounded">
                            Your username and password are invalid. Please try
                            logging in again.
                        </div>
                    )} */}
                    <Input
                        type="email"
                        label="Email Address"
                        size="md"
                        variant="bordered"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                        errorMessage={emailError}
                        isInvalid={!!emailError}
                    />
                    <div className="w-full relative">
                        <Input
                            type={`${showPassword ? 'text' : 'password'}`}
                            label="Password"
                            size="md"
                            variant="bordered"
                            classNames={{
                                input: 'pr-[25%]',
                            }}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            errorMessage={passwordError}
                            isInvalid={!!passwordError}
                        />
                        <div
                            className="absolute w-[25%] max-h-[56px] flex justify-center items-center bg-white h-full border-[#e5e7eb] border-solid border-[1px] rounded-tr-md rounded-br-md z-10 top-0 right-0 cursor-pointer"
                            onClick={handleShowChange}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    id="Eye-Slash--Streamline-Heroicons"
                                    className="h-[26px]"
                                >
                                    <desc>
                                        {
                                            'Eye Slash Streamline Icon: https://streamlinehq.com'
                                        }
                                    </desc>
                                    <path
                                        d="M2.748 1.5697C2.2866 1.1398 1.5328 1.3706 1.3912 1.9852C1.3301 2.2503 1.4046 2.5285 1.5901 2.7275L21.252 22.3894C21.6819 22.8509 22.4501 22.6739 22.6348 22.0709C22.7266 21.7711 22.6393 21.4453 22.4099 21.2316L2.748 1.5697ZM23.6617 12.5836C23.0729 14.3504 22.0902 15.9603 20.7878 17.2915L17.4027 13.9064C18.8876 9.7491 15.3152 5.5433 10.9723 6.336C10.6666 6.3918 10.3659 6.4724 10.0731 6.5769L7.3674 3.8712C8.8388 3.2726 10.4126 2.9657 12.0011 2.9678C17.43 2.9678 22.0341 6.4884 23.6617 11.3678C23.7928 11.7633 23.7928 12.1893 23.6617 12.5836Z"
                                        fill="#fe1868"
                                        strokeWidth={1}
                                    />
                                    <path
                                        d="M16.0962 11.9796C16.0962 12.1762 16.082 12.3695 16.0558 12.5585L11.42 7.9237C13.8882 7.5707 16.0968 9.4861 16.0962 11.9796ZM12.5789 16.0354L7.9442 11.3995C7.5574 14.1038 9.8759 16.4216 12.58 16.0343Z"
                                        strokeWidth={1}
                                        fill="#fe1868"
                                    />
                                    <path
                                        d="M6.2653 11.9796C6.2653 11.3034 6.3822 10.6546 6.5973 10.0527L3.2111 6.6665C1.9092 7.9978 0.9268 9.6077 0.3383 11.3744C0.2072 11.7698 0.2072 12.1958 0.3383 12.5912C1.9648 17.4707 6.5689 20.9912 11.9989 20.9912C13.6374 20.9912 15.2027 20.6701 16.6326 20.0879L13.9269 17.3822C10.192 18.7146 6.2644 15.945 6.2653 11.9796Z"
                                        strokeWidth={1}
                                        fill="#fe1868"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    id="Eye--Streamline-Heroicons"
                                    className="h-[26px]"
                                >
                                    <desc>
                                        {
                                            'Eye Streamline Icon: https://streamlinehq.com'
                                        }
                                    </desc>
                                    <path
                                        d="M12.0001 15.277C14.5227 15.277 16.0993 12.5462 14.838 10.3615C14.2526 9.3476 13.1709 8.723 12.0001 8.723C9.4775 8.7232 7.9009 11.454 9.1623 13.6386C9.7476 14.6524 10.8294 15.277 12.0001 15.277Z"
                                        strokeWidth={1}
                                        fill="#fe1868"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M0.3374 11.396C1.9628 6.5122 6.5691 2.9884 12.0012 2.9884C17.43 2.9884 22.0341 6.5089 23.6617 11.3883C23.7928 11.7837 23.7928 12.2097 23.6617 12.6041C22.0374 17.4878 17.43 21.0116 11.999 21.0116C6.5702 21.0116 1.965 17.4911 0.3385 12.6117C0.2072 12.2171 0.2072 11.7905 0.3385 11.3959ZM17.7348 12C17.7348 16.4146 12.9559 19.1736 9.1328 16.9664C7.3585 15.942 6.2654 14.0488 6.2654 12C6.2654 7.5855 11.0443 4.8264 14.8674 7.0336C16.6418 8.058 17.7348 9.9512 17.7348 12Z"
                                        clipRule="evenodd"
                                        strokeWidth={1}
                                        fill="#fe1868"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
                    <Button
                        color="danger"
                        size="lg"
                        className="w-full text-[20px] rounded-md"
                        onClick={() => loginUser(email, password)}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    );
}
