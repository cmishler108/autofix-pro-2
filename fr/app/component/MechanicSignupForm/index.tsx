'use client';

import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import 'tailwindcss/tailwind.css';
import { postRequest } from '../../utils/axios';
import './styles.css';
import toast, { Toaster } from 'react-hot-toast';
import MapWithMarker from '../MapWithMarker';
import ServiceInterView from '../DoneezServices';
import SuccessAnimation from './SuccessAnimation';
import { DayHours } from '@/app/utils/types';
import { setStorage } from '@/app/utils/helper';

interface MechanicSignupFormProps {
    password: string;
    email: string;
    first_name : string;
    last_name : string;
}
const MechanicSignupForm: React.FC<MechanicSignupFormProps> = ({ password, email , first_name , last_name}) => {
    const [days, setDays] = useState<DayHours[]>([
        { day: 'Mon', startTime: '09:00', endTime: '17:00', isClosed: false },
        { day: 'Tue', startTime: '09:00', endTime: '17:00', isClosed: false },
        { day: 'Wed', startTime: '09:00', endTime: '17:00', isClosed: false },
        { day: 'Thu', startTime: '09:00', endTime: '17:00', isClosed: false },
        { day: 'Fri', startTime: '09:00', endTime: '17:00', isClosed: false },
        { day: 'Sat', startTime: '09:00', endTime: '17:00', isClosed: false },
        { day: 'Sun', startTime: '09:00', endTime: '17:00', isClosed: false },
    ]);

    const handleTimeChange = (
        dayIndex: number,
        field: 'startTime' | 'endTime',
        value: string
    ) => {
        const updatedDays = days.map((day, index) =>
            index === dayIndex ? { ...day, [field]: value } : day
        );
        setDays(updatedDays);
    };

    const toggleClosed = (dayIndex: number) => {
        const updatedDays = days.map((day, index) =>
            index === dayIndex ? { ...day, isClosed: !day.isClosed } : day
        );
        setDays(updatedDays);
    };

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isUnSubmitted, setIsUnSubmitted] = useState(true);
    const [formData, setFormData] = useState({
        businessName: '',
        businessTagline: '',
        website: '',
        phone: '',
        locationCount: '',
        hoursOfOperation: [] as DayHours[],
        specialHours: '',
        businessDescription: '',
        fullAddress: '',
        city: '',
        state: '',
        zipcode: '',
        services: [] as string[],
    });

    const [Address, setAddress] = useState('');

    useEffect(() => {
        if (currentStep === 2) {
            setAddress(formData.fullAddress);
        }
    }, [currentStep, formData.fullAddress]);

    const validateField = (name: string, value: string): string | null => {
        switch (name) {
            case 'businessName':
                if (!value.trim()) return 'Business Name cannot be empty.';
                break;
            case 'businessTagline':
                if (!value.trim()) return 'Business Tagline cannot be empty.';
                break;
            case 'phone': {
                const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
                if (!phoneRegex.test(value))
                    return 'Please enter a valid phone number.';
                break;
            }
            case 'businessEmail': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value))
                    return 'Please enter a valid email address.';
                break;
            }
            case 'website':
                try {
                    new URL(value);
                } catch {
                    return 'Please enter a valid URL (e.g., https://www.example.com).';
                }
                break;
            case 'locationCount':
                if (isNaN(Number(value)) || Number(value) < 0)
                    return 'Please enter a valid number for business locations.';
                break;
            case 'specialHours':
                if (!value.trim()) return 'Special Hours cannot be empty.';
                break;
            case 'businessDescription':
                if (!value.trim())
                    return 'Business Description cannot be empty.';
                break;
            case 'fullAddress':
                if (!value.trim()) return 'Full Address cannot be empty.';
                break;
            case 'city':
                if (!value.trim()) return 'City cannot be empty.';
                break;
            case 'state':
                if (!value.trim()) return 'State cannot be empty.';
                break;
            case 'zipcode': {
                // US zip code: 5 digits, not all 0s or 9s, not empty
                if (!/^\d{5}$/.test(value)) return 'Zip code must be 5 digits.';
                if (/^(0{5}|9{5})$/.test(value)) return 'Zip code is not valid.';
                return null;
            }
            default:
                break;
        }
        return null;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) toast.error(error);
    };

    const handleServiceSelection = (selectedServices: string[]) => {
        setFormData((prev) => ({
            ...prev,
            services: selectedServices,
        }));
    };

    // Add password strength check (optional)
    const isPasswordStrong = (pwd: string) => {
        // Example: at least 8 chars, not common, has number, etc.
        return pwd.length >= 8 && !['password', '12345678', 'qwerty'].includes(pwd.toLowerCase());
    };

    const handleNext = () => {
        let errors: string[] = [];
        switch (currentStep) {
            case 0:
                const step1Fields = [
                    { name: 'businessName', value: formData.businessName },
                    { name: 'businessTagline', value: formData.businessTagline },
                    { name: 'phone', value: formData.phone },
                    { name: 'website', value: formData.website },
                    { name: 'locationCount', value: formData.locationCount },
                    { name: 'specialHours', value: formData.specialHours },
                    { name: 'businessDescription', value: formData.businessDescription },
                ];
                step1Fields.forEach(({ name, value }) => {
                    const error = validateField(name, value.toString());
                    if (error) errors.push(error);
                });
                // Password strength check
                if (!isPasswordStrong(password)) {
                    errors.push('Password is too common or weak.');
                }
                break;
            case 1:
                if (formData.services.length === 0) {
                    errors.push('Please select at least one service.');
                }
                break;
            case 2:
                submitAddress();
                break;
        }

        if (errors.length > 0) {
            errors.forEach((err) => toast.error(err));
            return;
        }
        setCurrentStep((prev) => prev + 1);
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            hoursOfOperation: days,
            password: password,
            businessEmail: email,
           first_name : first_name,
           last_name : last_name
           
        };
        const errors: string[] = [];

        const fieldsToValidate = [
            { name: 'businessName', value: updatedFormData.businessName },
            { name: 'businessTagline', value: updatedFormData.businessTagline },
            { name: 'phone', value: updatedFormData.phone },
            { name: 'website', value: updatedFormData.website },
            { name: 'locationCount', value: updatedFormData.locationCount },
            { name: 'specialHours', value: updatedFormData.specialHours },
            { name: 'businessDescription', value: updatedFormData.businessDescription },
            { name: 'fullAddress', value: updatedFormData.fullAddress },
            { name: 'city', value: updatedFormData.city },
            { name: 'state', value: updatedFormData.state },
            { name: 'zipcode', value: updatedFormData.zipcode },
            { name: 'first_name', value: updatedFormData.first_name },
            { name: 'last_name', value: updatedFormData.last_name },
        ];

        fieldsToValidate.forEach(({ name, value }) => {
            const error = validateField(name, value.toString());
            if (error) errors.push(error);
        });

        if (!isPasswordStrong(password)) {
            errors.push('Password is too common or weak.');
        }

        // Check for duplicate email (frontend validation)
        const existingUsers = JSON.parse(localStorage.getItem('user') || '[]');
        const isEmailDuplicate = existingUsers.some(
            (user: any) => user.email === email
        );
        if (isEmailDuplicate) {
            errors.push('Email is already in use. Please use a different email.');
        }

        const hasValidHours = days.some((day) => !day.isClosed);
        if (!hasValidHours) {
            errors.push('At least one day must have operating hours.');
        }

        if (errors.length > 0) {
            errors.forEach((err) => toast.error(err));
            return;
        }

        setLoading(true);
     try {
        const response = await postRequest(
            '/users/create-mechanic',
            updatedFormData
        );
        setStorage('access_token', response.data.tokens.access);
        setStorage('refresh_token', response.data.tokens.refresh);
        setStorage('user', JSON.stringify(response.data.user));
        toast.success('Signup Successful!');
        setIsUnSubmitted(false);
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 2000);
    } catch (error: any) {

        const backendErrors = error.details || error;
        if (backendErrors) {
            Object.entries(backendErrors).forEach(([field, messages]) => {
                if (Array.isArray(messages)) {
                    messages.forEach((msg: string) => {
                        toast.error(`${field}: ${msg}`);
                    });
                } else {
                    toast.error(`${field}: ${messages}`);
                }
            });
            return;
        }

        // If we get here, it's not an expected error format
        toast.error(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
        setLoading(false);
    }
    };

    const submitAddress = () => {
        setFormData((prev) => ({ ...prev, fullAddress: Address }));
    };

    const finaladdress = {
        fullAddress: formData.fullAddress,
    };

    const steps = ['Details', 'Services', 'Location'];

    return (
        <>
         <style>
                {`
                .mechanic-signup-main {
                width: 72%!important;
                }
                    @media (max-width: 700px) {
                        .mechanic-signup-main {
                            width: 98% !important;
                        }
                    }
                `}
            </style>
            <Toaster position="top-center" reverseOrder={false} />
           

            <main className=" bg-gradient-to-br from-emerald-50 to-green-50 flex flex-col items-center py-8 mechanic-signup-main " >
                {isUnSubmitted ? (
                    <div
                        className=" bg-white p-10 rounded-2xl shadow-2xl "
                        style={{ maxWidth: '100%', width: '100%' }}
                    >
                        <h2 className="text-2xl font-bold text-center mb-8 text-[#10B981]">Mechanic Signup</h2>
                        <Form onSubmit={handleSubmit}>
                            {/* Progress Steps */}
                            <div className="px-4 pt-4 mb-10">
                                <div className="relative pb-8">
                                    <div className="flex justify-between items-center">
                                        {steps.map((step, index) => (
                                            <div key={step} className="flex flex-col items-center flex-1">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-4 ${
                                                        currentStep === index
                                                            ? 'bg-[#10B981] text-white border-[#10B981] shadow-lg'
                                                            : currentStep > index
                                                            ? 'bg-[#059669] text-white border-[#059669]'
                                                            : 'bg-gray-200 text-gray-500 border-gray-200'
                                                    }`}
                                                    style={{ zIndex: 4 }}
                                                >
                                                    {index + 1}
                                                </div>
                                                <span
                                                    className={`text-sm font-semibold ${
                                                        currentStep === index
                                                            ? 'text-[#10B981]'
                                                            : currentStep > index
                                                            ? 'text-[#059669]'
                                                            : 'text-gray-500'
                                                    }`}
                                                >
                                                    {step}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] transition-all duration-300"
                                            style={{
                                                width: `${(currentStep / (steps.length - 1)) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 1: Business Details */}
                            {currentStep === 0 && (
                                <fieldset>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="text"
                                                name="businessName"
                                                value={formData.businessName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                Business Name
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter the official name of your business.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                Business Phone No.
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter your contact number (e.g., +1234567890).
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                    <Form.Group className="relative mb-10">
                                        <Form.Control
                                            type="text"
                                            name="businessTagline"
                                            value={formData.businessTagline}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            placeholder=" "
                                            className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                        />
                                        <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                            Business Tagline
                                        </Form.Label>
                                        <Form.Text className="text-gray-400">
                                            Enter a short tagline representing your business.
                                        </Form.Text>
                                    </Form.Group>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="url"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                Business Website
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter a valid URL (e.g., https://www.example.com).
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="number"
                                                name="locationCount"
                                                min="0"
                                                value={formData.locationCount}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                Total Business Locations
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter the number of business locations.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>

                                    {/* Weekly Hours Section */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-2 text-[#10B981]">
                                            Operating Hours (24-hour format)
                                        </h3>
                                        <div className="grid gap-4">
                                            {days.map((day, index) => (
                                                <div
                                                    key={day.day}
                                                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-50 p-3 rounded-lg"
                                                >
                                                    <span className="w-12 font-medium text-gray-700">
                                                        {day.day}
                                                    </span>
                                                    <div className="operation-closed">
                                                        <span className="font-medium text-gray-700 text-center">
                                                            Closed?
                                                        </span>
                                                        <Form.Check
                                                            type="switch"
                                                            id={`closed-${day.day}`}
                                                            checked={day.isClosed}
                                                            onChange={() => toggleClosed(index)}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                                        <div
                                                            className={`flex gap-2 ${
                                                                day.isClosed ? 'opacity-50' : ''
                                                            }`}
                                                        >
                                                            <Form.Control
                                                                type="time"
                                                                value={day.startTime}
                                                                onChange={(e) =>
                                                                    handleTimeChange(index, 'startTime', e.target.value)
                                                                }
                                                                disabled={day.isClosed}
                                                                className="w-32 border rounded px-2 py-1"
                                                            />
                                                            <span className="self-center text-gray-500">
                                                                to
                                                            </span>
                                                            <Form.Control
                                                                type="time"
                                                                value={day.endTime}
                                                                onChange={(e) =>
                                                                    handleTimeChange(index, 'endTime', e.target.value)
                                                                }
                                                                disabled={day.isClosed}
                                                                className="w-32 border rounded px-2 py-1"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1">
                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="text"
                                                name="specialHours"
                                                value={formData.specialHours}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                Business Special Hours
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter any special operating hours
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <Form.Group className="relative mb-6">
                                            <Form.Control
                                                as="textarea"
                                                name="businessDescription"
                                                value={formData.businessDescription}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                rows={4}
                                                className="peer border rounded p-2 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-2 top-0 text-gray-500 transition-all peer-focus:text-sm">
                                                Business Description
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Provide a brief description of your business.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        {currentStep !== 0 && (
                                            <Button
                                                type="button"
                                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                                onClick={handlePrevious}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        <Button
                                            type="button"
                                            className="bg-[#10B981] text-white px-6 py-2 rounded shadow hover:bg-[#059669] transition-colors"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </fieldset>
                            )}

                            {/* Step 2: Services */}
                            {currentStep === 1 && (
                                <fieldset>
                                    <div className="mb-6">
                                        <ServiceInterView
                                            initialSelectedServices={formData.services}
                                            onSelectionChange={handleServiceSelection}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <Button
                                            type="button"
                                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                            onClick={handlePrevious}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            type="button"
                                            className="bg-[#10B981] text-white px-6 py-2 rounded shadow hover:bg-[#059669] transition-colors"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </fieldset>
                            )}

                            {/* Step 3: Locations */}
                            {currentStep === 2 && (
                                <fieldset>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="text"
                                                name="fullAddress"
                                                value={Address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                Full Address
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter the complete address of your business location.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                City
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter the city where your business is located.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                State
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter the state where your business is located.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="relative mb-10">
                                            <Form.Control
                                                type="text"
                                                name="zipcode"
                                                value={formData.zipcode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                placeholder=" "
                                                className="peer border-b-2 border-gray-300 focus:border-[#10B981] outline-none bg-transparent"
                                            />
                                            <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                                                Zipcode
                                            </Form.Label>
                                            <Form.Text className="text-gray-400">
                                                Enter the postal code.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>

                                    {/* Map Component */}
                                    <div className="mb-6">
                                        <MapWithMarker
                                            addressInput={finaladdress}
                                            addressfnc={submitAddress}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <Button
                                            type="button"
                                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                            onClick={handlePrevious}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-[#10B981] text-white px-6 py-2 rounded shadow hover:bg-[#059669] transition-colors"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                'Submit'
                                            )}
                                        </Button>
                                    </div>
                                </fieldset>
                            )}
                        </Form>
                    </div>
                ) : (
                    <SuccessAnimation />
                )}
            </main>
        </>
    );
};

export default MechanicSignupForm;