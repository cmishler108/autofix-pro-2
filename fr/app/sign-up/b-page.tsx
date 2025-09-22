'use client';

import Link from 'next/link';
import ServiceFooter from '../footers/service_footer';

import {
    Button,
    Input,
    Tabs,
    Tab,
    CardBody,
    Card,
    Textarea,
} from '@nextui-org/react';
import 'react-phone-number-input/style.css';
import PhoneInput, { Value } from 'react-phone-number-input';
import { useState } from 'react';
import { postRequest } from '../utils/axios';

interface RegisterResponse {
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

export default function SignUp() {
    const [selected, setSelected] = useState<string>('Customer');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [phoneVal, setPhoneVal] = useState<Value>();
    const [phoneVal2, setPhoneVal2] = useState<Value>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [firstName2, setFirstName2] = useState('');
    const [lastName2, setLastName2] = useState('');
    const [emailAddress2, setEmailAddress2] = useState('');
    const [password2, setPassword2] = useState('');
    const [jobtitle, setJobTitle] = useState('');
    const [businussName, setBusinessName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [website, setWebsite] = useState('');
    const [businessInfo, setBusinessInfo] = useState('');
    const [heardInfo, setHeardInfo] = useState('');

    const [is_firstName, setIs_FirstName] = useState(false);
    const [is_lastName, setIs_LastName] = useState(false);
    const [is_email, setIs_Email] = useState(false);
    const [is_password, setIs_Password] = useState(false);

    const [is_firstName2, setIs_FirstName2] = useState(false);
    const [is_lastName2, setIs_LastName2] = useState(false);
    const [is_email2, setIs_Email2] = useState(false);
    const [is_password2, setIs_Password2] = useState(false);
    const [is_phone2, setIs_Phone2] = useState(false);
    const [is_heard, setIs_Heard] = useState(false);

    const handleShowChange = () => {
        setShowPassword(!showPassword);
    };

    const handlePhoneChange = (value: Value) => {
        setPhoneVal(value);
    };

    const handleShowChange2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handlePhoneChange2 = (value: Value) => {
        setPhoneVal2(value);
    };
    async function RegisterUser(): Promise<void> {
        try {
            let payload = {};
            if (selected == 'Customer') {
                payload = {
                    email: emailAddress,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    is_customer: true,
                    is_mechanic: false,
                    customer_profile: {
                        phone_number: phoneVal,
                    },
                };
            } else if (selected == 'Professional') {
                payload = {
                    email: emailAddress2,
                    password: password2,
                    first_name: firstName2,
                    last_name: lastName2,
                    is_customer: false,
                    is_mechanic: true,
                    mechanic_profile: {
                        phone_number: phoneVal2,
                        business_name: businussName,
                        business_info: businessInfo,
                        heard_info: heardInfo,
                        zip_code: zipCode,
                        job_title: jobtitle,
                        web_site: website,
                    },
                };
            }
            const response = await postRequest<RegisterResponse>(
                'users/register/',
                payload
            );

            // Extract data from response
            const { user, refresh, access } = response.data;
            // Store tokens and user data as needed
            alert('Sign Up successful');
            console.log('Login successful:', user);
        } catch (error: any) {
            // Always expect error.details as { field: [msg, ...], ... }
            const backendErrors = error.details || error;
            let errorMsg = '';
            if (backendErrors) {
                Object.entries(backendErrors).forEach(([field, messages]) => {
                    if (Array.isArray(messages)) {
                        errorMsg += `${field}: ${messages[0]}\n`;
                    }
                });
                alert(errorMsg || 'Registration failed. Please try again.');
            } else {
                alert(error.message || 'Registration failed. Please try again.');
            }
        }
    }
    return (
        <div className="min-h-[100vh] bg-[#f4f6fa] min-w-full flex flex-col">
            <div className="flex min-h-[80px] p-[12px] lg:px-6 shadow-[0_.125rem_.25rem_rgba(0,0,0,0.075)]">
                <div className="flex flex-row items-center w-full">
                    <div className="text-[30px] text-black">
                        <Link href={'/'}>DoneEZ</Link>
                    </div>
                    <div className="ml-auto mr-0">
                        <Link href={'/sign-in'}>
                            <button
                                className="px-[24px] py-[8px] text-[16px] rounded-md shadow-[inset_0_1px_0_hsla(0,0%,100%,.15),_0_1px_1px_rgba(51,51,51,.115)] bg-[#009ed5] hover:bg-[#0082af] border-[#009ed5]
                            hover:border-[#0078a2] active:border-[1px] active:border-solid text-white"
                            >
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-[450px] w-full mx-auto px-4 max-[500px]:px-0 max-[500px]:pt-3 py-8 h-auto">
                <div className="flex flex-col gap-6 mt-6 max-sm:mt-4 h-auto rounded-md shadow-[0_4px_4px_4px_rgba(222,224,230,.5)] bg-white px-6 pb-12 pt-3">
                    <div className="text-[32px]">Sign Up</div>
                    <Tabs
                        aria-label={'Options'}
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key as string)}
                        variant="underlined"
                        color="primary"
                        classNames={{
                            tabList:
                                'max-md:flex-wrap gap-0 w-full rounded-none',
                            tab: 'max-md:w-auto',
                            cursor: 'w-full bg-[#22d3ee]',
                            tabContent:
                                'group-data-[selected=true]:text-[#06b6d4] text-[20px] font-bold',
                        }}
                    >
                        <Tab key={'Customer'} title="Customer">
                            <div className="flex flex-col gap-6">
                                <Input
                                    type="text"
                                    label="First Name"
                                    size="lg"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="sm"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <Input
                                    type="text"
                                    label="Last Name"
                                    size="lg"
                                    labelPlacement="outside"
                                    radius="sm"
                                    variant="bordered"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                                <Input
                                    type="email"
                                    label="Email Address"
                                    size="lg"
                                    labelPlacement="outside"
                                    radius="sm"
                                    variant="bordered"
                                    placeholder="Enter your email"
                                    value={emailAddress}
                                    onChange={(e) =>
                                        setEmailAddress(e.target.value)
                                    }
                                />
                                <div className="w-full relative">
                                    <Input
                                        type={`${
                                            showPassword ? 'text' : 'password'
                                        }`}
                                        label="Password"
                                        size="lg"
                                        radius="sm"
                                        variant="bordered"
                                        classNames={{
                                            input: 'pr-[25%]',
                                        }}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <div
                                        className="absolute w-[25%] flex justify-center items-center bg-white h-full border-[#e5e7eb] border-solid border-[1px] rounded-tr-md rounded-br-md z-10 top-0 right-0 cursor-pointer"
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

                                <div className="w-full">
                                    <div className="text-[21px] mb-4">
                                        Phone (optional)
                                    </div>

                                    <PhoneInput
                                        international
                                        defaultCountry="US"
                                        value={phoneVal}
                                        onChange={handlePhoneChange}
                                        className="w-full border-[1px] border-[#e5e7eb] border-solid p-4 rounded-md outline-none"
                                    />
                                </div>

                                <Button
                                    color="danger"
                                    size="md"
                                    className="w-full text-[20px] rounded-md"
                                    onClick={RegisterUser}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </Tab>
                        <Tab key={'Professional'} title="Professional">
                            <div className="flex flex-col gap-6">
                                <Input
                                    type="text"
                                    label="First Name"
                                    size="lg"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="sm"
                                    isRequired
                                    placeholder="First Name"
                                    value={firstName2}
                                    onChange={(e) =>
                                        setFirstName2(e.target.value)
                                    }
                                />
                                <Input
                                    isRequired
                                    type="text"
                                    label="Last Name"
                                    size="lg"
                                    labelPlacement="outside"
                                    radius="sm"
                                    variant="bordered"
                                    placeholder="Last Name"
                                    value={lastName2}
                                    onChange={(e) =>
                                        setLastName2(e.target.value)
                                    }
                                />
                                <Input
                                    isRequired
                                    type="email"
                                    label="Email Address"
                                    size="lg"
                                    labelPlacement="outside"
                                    radius="sm"
                                    variant="bordered"
                                    placeholder="Email Address"
                                    value={emailAddress2}
                                    onChange={(e) =>
                                        setEmailAddress2(e.target.value)
                                    }
                                />
                                <div className="w-full relative">
                                    <Input
                                        isRequired
                                        type={`${
                                            showPassword2 ? 'text' : 'password'
                                        }`}
                                        label="Password"
                                        size="lg"
                                        radius="sm"
                                        variant="bordered"
                                        classNames={{
                                            input: 'pr-[25%]',
                                        }}
                                        value={password2}
                                        onChange={(e) =>
                                            setPassword2(e.target.value)
                                        }
                                    />
                                    <div
                                        className="absolute w-[25%] flex justify-center items-center bg-white h-full border-[#e5e7eb] border-solid border-[1px] rounded-tr-md rounded-br-md z-10 top-0 right-0 cursor-pointer"
                                        onClick={handleShowChange2}
                                    >
                                        {showPassword2 ? (
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

                                <div className="w-full">
                                    <PhoneInput
                                        international
                                        defaultCountry="US"
                                        value={phoneVal2}
                                        onChange={handlePhoneChange2}
                                        className="w-full border-[1px] border-[#e5e7eb] border-solid p-4 rounded-md outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        label="Company name"
                                        size="lg"
                                        labelPlacement="outside"
                                        radius="sm"
                                        variant="bordered"
                                        placeholder="Company or business name"
                                        value={businussName}
                                        onChange={(e) =>
                                            setBusinessName(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        label="Job Title"
                                        size="lg"
                                        labelPlacement="outside"
                                        radius="sm"
                                        variant="bordered"
                                        placeholder="Job Title"
                                        value={jobtitle}
                                        onChange={(e) =>
                                            setJobTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="number"
                                        label="Zip code"
                                        size="lg"
                                        labelPlacement="outside"
                                        radius="sm"
                                        variant="bordered"
                                        placeholder="10921"
                                        value={zipCode}
                                        onChange={(e) =>
                                            setZipCode(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="url"
                                        label="Website"
                                        size="lg"
                                        labelPlacement="outside"
                                        radius="sm"
                                        variant="bordered"
                                        placeholder=""
                                        value={website}
                                        onChange={(e) =>
                                            setWebsite(e.target.value)
                                        }
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">
                                                    https://
                                                </span>
                                            </div>
                                        }
                                    />
                                </div>
                                <div>
                                    <Textarea
                                        label="Tell us about your company"
                                        labelPlacement="outside"
                                        placeholder="Enter your description"
                                        radius="none"
                                        defaultValue=""
                                        classNames={{
                                            base: 'w-full',
                                            input: 'resize-y min-h-[40px]',
                                        }}
                                        value={businessInfo}
                                        onChange={(e) =>
                                            setBusinessInfo(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Textarea
                                        label="Tell us how you heard about DoneEZ"
                                        labelPlacement="outside"
                                        placeholder="Enter your description"
                                        radius="none"
                                        defaultValue=""
                                        value={heardInfo}
                                        onChange={(e) =>
                                            setHeardInfo(e.target.value)
                                        }
                                        classNames={{
                                            base: 'w-full',
                                            input: 'resize-y min-h-[40px]',
                                        }}
                                    />
                                </div>
                                <div>
                                    <Button
                                        color="danger"
                                        size="md"
                                        className="w-full text-[20px] rounded-md"
                                        onClick={RegisterUser}
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <ServiceFooter />
        </div>
    );
}
