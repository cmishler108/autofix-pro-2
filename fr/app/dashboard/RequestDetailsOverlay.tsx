import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    XMarkIcon,
    WrenchIcon,
    MapPinIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    ScaleIcon,
    BuildingStorefrontIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import {
    Spinner,
    Divider,
    Button,
    Modal,
    Input,
    Textarea,
} from '@nextui-org/react';
import {
    CustomerServiceRequest,
    MechanicServiceRequest,
    Quote,
    Appointment,
    Review,
    Business,
} from '@/app/utils/types';
import { getRequest, postRequest } from '@/app/utils/axios';
import { useRouter } from 'next/navigation';

type Role = 'customer' | 'mechanic';

// --- Mechanic Reviews Overlay ---
const MechanicReviewsOverlay = ({
    mechanic,
    onClose,
}: {
    mechanic: Business;
    onClose: () => void;
}) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getRequest(`users/mechanics/${mechanic.id}/reviews/`)
            .then((res) => setReviews(res.data))
            .catch(() => setReviews([]))
            .finally(() => setLoading(false));
    }, [mechanic.id]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50 flex justify-end backdrop-blur-sm"
        >
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="w-full max-w-lg bg-white h-full p-8 overflow-y-auto border-l-8 border-purple-500 shadow-2xl relative rounded-l-xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>

                <h2 className="text-3xl font-extrabold mb-6 text-purple-600">
                    Reviews for {mechanic.business_name}
                </h2>

                {loading ? (
                    <Spinner size="lg" />
                ) : reviews &&
                  Array.isArray((reviews as any)?.results) &&
                  ((reviews as any)?.results).length > 0 ? (
                    <div className="space-y-6">
                        {((reviews as any)?.results).map((review: any) => (
                            <div
                                key={review.id}
                                className="bg-white p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                                        {review.customer_name?.[0][0]?.toUpperCase() ||
                                            'U'}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-800">
                                            {review.customer_name ||
                                                'Anonymous'}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(
                                                review.created_at
                                            ).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < review.rating
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {review.review_text}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 text-center mt-10 text-lg">
                        No reviews yet. Be the first to review!
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

// --- Accept Quote & Pay Overlay ---
const AcceptQuoteOverlay = ({
    quote,
    onClose,
}: {
    quote: Quote;
    onClose: () => void;
}) => {
    const [loading, setLoading] = useState(false);

    const handlePayDeposit = async () => {
        setLoading(true);
        try {
            const res = await postRequest<{ checkout_url: string }>(
                `users/quotes/${quote.id}/accept/`
            );
            window.location.href = res.data.checkout_url;
        } catch (e) {
            alert('Failed to accept quote');
        }
        setLoading(false);
    };

    const total = Number(quote.total_cost);
    const deposit = total * 0.1;
    const remaining = total - deposit;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-emerald-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-emerald-100 rounded-full p-4 mb-3">
                        <svg
                            className="h-8 w-8 text-emerald-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-700 mb-1">
                        Confirm & Pay Deposit
                    </h2>
                    <p className="text-gray-600 text-center max-w-xs">
                        You are about to pay a{' '}
                        <span className="font-semibold text-emerald-600">
                            10% deposit
                        </span>{' '}
                        to secure your booking. The remaining{' '}
                        <span className="font-semibold text-blue-700">90%</span>{' '}
                        is paid directly to the mechanic after the service is
                        completed.
                    </p>
                </div>
                <div className="mb-4 bg-emerald-50 rounded-lg p-4">
                    <div className="flex justify-between text-gray-700 mb-1">
                        <span className="font-medium">Mechanic:</span>
                        <span>{quote.mechanic.business_name}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-1">
                        <span className="font-medium">Total Quote:</span>
                        <span className="font-bold text-emerald-700">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-1">
                        <span className="font-medium">Deposit (10%):</span>
                        <span className="font-bold text-emerald-600">
                            ${deposit.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <span className="font-medium">Remaining (90%):</span>
                        <span className="font-bold text-blue-700">
                            ${remaining.toFixed(2)}
                        </span>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="text-gray-500 text-sm mb-2">
                        Quote Details:
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-gray-700">
                        {quote.estimate_details}
                    </div>
                </div>
                <button
                    onClick={handlePayDeposit}
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg text-lg flex items-center justify-center"
                >
                    {loading ? <Spinner size="sm" /> : 'Pay 10% Deposit & Book'}
                </button>
                <div className="text-xs text-gray-400 text-center mt-4">
                    Secure payment powered by Stripe.
                </div>
            </div>
        </div>
    );
};

// --- Review Overlay (custom, not NextUI Modal) ---
const ReviewOverlay = ({
    open,
    onClose,
    onSubmit,
    mechanic,
    submitting,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (rating: number, review_text: string) => void;
    mechanic: Business | null;
    submitting: boolean;
}) => {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        if (open) {
            setRating(5);
            setReviewText('');
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-emerald-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    aria-label="Close"
                    type="button"
                >
                    ×
                </button>
                <h3 className="text-2xl font-bold text-emerald-700 mb-4">
                    Leave a Review for {mechanic?.business_name || 'Mechanic'}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                            key={star}
                            className={`w-7 h-7 cursor-pointer ${
                                star <= rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                            onClick={() => setRating(star)}
                            data-testid={`star-${star}`}
                        />
                    ))}
                </div>

                <Textarea
                    required
                    label="Your Review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    minRows={3}
                />
                <div className="flex justify-end gap-2 mt-6">
                    <Button color="danger" onClick={onClose} type="button">
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        onClick={() => onSubmit(rating, reviewText)}
                        disabled={submitting}
                        type="button"
                    >
                        {submitting ? (
                            <Spinner size="sm" />
                        ) : (
                            'Submit Review & Complete'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Main Overlay ---
const RequestOverlay = ({
    requestData,
    role,
    onClose,
    status,
}: {
    requestData: any;
    role: Role;
    onClose: () => void;
    status: string;
}) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [quoteDetails, setQuoteDetails] = useState<Quote | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [showMechanicReviews, setShowMechanicReviews] =
        useState<Business | null>(null);
    const [acceptingQuote, setAcceptingQuote] = useState<Quote | null>(null);
    const [quoteAmount, setQuoteAmount] = useState('');
    const [quoteDescription, setQuoteDescription] = useState('');
    const [submittingQuote, setSubmittingQuote] = useState(false);
    const [quoteError, setQuoteError] = useState('');
    const [quotesLoaded, setQuotesLoaded] = useState(false);
    const [appointmentLoaded, setAppointmentLoaded] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const router = useRouter();

    const isCustomer = role === 'customer';

    // Robustly extract the service request object for both roles
    let serviceRequest: any = null;
    if (isCustomer) {
        serviceRequest = requestData;
    } else if (
        requestData &&
        typeof requestData === 'object' &&
        'service_request' in requestData &&
        requestData.service_request
    ) {
        serviceRequest = requestData.service_request;
    } else {
        serviceRequest = requestData;
    }

    // Defensive: get selected_services for both roles
    const selectedServices = isCustomer
        ? serviceRequest.selected_services
        : serviceRequest.selected_services || [];

    // Mechanic quote submission handler
    const handleSubmitQuote = async () => {
        setSubmittingQuote(true);
        setQuoteError('');
        try {
            await postRequest('users/quotes/', {
                service_request: isCustomer
                    ? requestData.id
                    : requestData.service_request
                    ? requestData.service_request.id
                    : requestData.id,
                total_cost: quoteAmount,
                estimate_details: quoteDescription,
            });
            setQuoteAmount('');
            setQuoteDescription('');
            setQuotesLoaded(false); // reload quotes if needed
            window.location.reload(); // <-- Refresh the page so customer sees updated data
        } catch (err: any) {
            setQuoteError(err?.message || 'Failed to submit quote');
        }
        setSubmittingQuote(false);
    };

    // Only fetch reviews on mount (always needed)
    useEffect(() => {
        getRequest(`users/service-requests/${requestData.id}/reviews/`)
            .then((res) => setReviews(res.data))
            .catch(() => setReviews([]));
    }, [requestData.id]);

    // Fetch quotes only when quotes section is visible (status === 'quoted')
    useEffect(() => {
        if (status === 'quoted' && !quotesLoaded) {
            setLoading(true);
            getRequest(`users/service-requests/${requestData.id}/quotes/`)
                .then((res) => setQuotes(res.data))
                .catch(() => setQuotes([]))
                .finally(() => {
                    setQuotesLoaded(true);
                    setLoading(false);
                });
        }
    }, [status, requestData.id, quotesLoaded]);

    // Fetch appointment and quote details if needed
    useEffect(() => {
        if (status === 'accepted' || status === 'completed') {
            if (!isCustomer) {
                setAppointment(requestData.appointment);
            } else {
                getRequest(
                    `users/service-requests/${requestData.id}/appointment/`
                )
                    .then((res) => {
                        setAppointment(res.data);
                        // If quote is an ID, fetch quote details
                        if (res.data && typeof res.data.quote === 'number') {
                            getRequest(`users/quotes/${res.data.quote}/`)
                                .then((qres) => setQuoteDetails(qres.data))
                                .catch(() => setQuoteDetails(null));
                        } else if (
                            res.data &&
                            res.data.quote &&
                            typeof res.data.quote === 'object'
                        ) {
                            setQuoteDetails(res.data.quote);
                        } else {
                            setQuoteDetails(null);
                        }
                    })
                    .catch(() => {
                        setAppointment(null);
                        setQuoteDetails(null);
                    });
            }
        }
    }, [status, requestData.id]);

    // In the main overlay component, before rendering, ensure quotes is always an array:
    const safeQuotes = Array.isArray(quotes)
        ? quotes
        : quotes && Array.isArray((quotes as any).results)
        ? (quotes as any).results
        : [];

    if (status === 'canceled' || status === 'rejected') {
        return null;
    }

    // Find the mechanic for the accepted appointment
    const mechanic = quoteDetails?.mechanic || null;

    // Find the customer address for mechanic (if mobile)
    const customerAddress =
        serviceRequest &&
        serviceRequest.user &&
        serviceRequest.user.customer_profile
            ? serviceRequest.user.customer_profile.address
            : null;

    // Handler for submitting review and marking as done
    const handleReviewSubmit = async (rating: number, review_text: string) => {
        if (!appointment || !mechanic || !mechanic.id) return;
        setReviewSubmitting(true);
        try {
            await postRequest(`users/business/${mechanic.id}/reviews/`, {
                appointment: appointment.id,
                rating,
                review_text,
            });
            setShowReviewModal(false);
            window.location.reload();
        } catch (e) {
            // handle error
        }
        setReviewSubmitting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50 flex justify-end backdrop-blur-sm"
        >
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full max-w-2xl bg-gradient-to-b from-white to-gray-50 h-full p-8 overflow-y-auto border-l-8 border-emerald-500 shadow-2xl relative"
            >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-green-500"></div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-emerald-100 rounded-full opacity-20"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                Service Details
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Request ID: {requestData.id}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
                        >
                            <XMarkIcon className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Spinner size="lg" />
                        </div>
                    ) : serviceRequest ? (
                        <div className="space-y-8">
                            {/* Vehicle Information Card */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-6 -mt-6"></div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 relative">
                                    <WrenchIcon className="w-5 h-5 text-emerald-600" />
                                    Vehicle Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-gray-500">Year</p>
                                        <p className="font-medium text-gray-900">
                                            {serviceRequest.vehicle_year || (
                                                <span className="italic text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-500">Make</p>
                                        <p className="font-medium text-gray-900">
                                            {serviceRequest.vehicle_make || (
                                                <span className="italic text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-500">Model</p>
                                        <p className="font-medium text-gray-900">
                                            {serviceRequest.vehicle_model || (
                                                <span className="italic text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-500">
                                            Location
                                        </p>
                                        <p className="font-medium text-gray-900 flex items-center gap-1">
                                            <MapPinIcon className="w-4 h-4" />
                                            {serviceRequest.service_location || (
                                                <span className="italic text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-500">
                                            Date & Time
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {serviceRequest.appointment_date ||
                                            serviceRequest.appointment_time ? (
                                                <>
                                                    {serviceRequest.appointment_date
                                                        ? serviceRequest.appointment_date
                                                        : null}
                                                    <br />
                                                    {serviceRequest.appointment_time
                                                        ? serviceRequest.appointment_time
                                                        : null}
                                                </>
                                            ) : (
                                                <span className="italic text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-500">
                                            Requirement
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {serviceRequest.radio_status ? (
                                                serviceRequest.radio_status
                                            ) : (
                                                <span className="italic text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-500">
                                            Mechanic Type
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {serviceRequest.mechanic_type ? (
                                                serviceRequest.mechanic_type
                                            ) : (
                                                <span className="italic text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Requested Services */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                                    Requested Services
                                </h3>
                                <Divider className="my-4" />
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(selectedServices) &&
                                    selectedServices.length > 0 ? (
                                        selectedServices.map(
                                            (service: string) => (
                                                <span
                                                    key={service}
                                                    className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1"
                                                >
                                                    <CheckCircleIcon className="w-4 h-4" />
                                                    {service}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <span className="text-gray-400 italic">
                                            No services listed
                                        </span>
                                    )}
                                </div>
                                {/* Show additional info fields if present */}
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Only show additional_info in pending section */}
                                    {status === 'pending' && (
                                        <div className="bg-gray-50 rounded-lg p-4 border">
                                            <div className="text-xs text-gray-500 mb-1">
                                                Additional Info
                                            </div>
                                            <div className="text-gray-800 font-medium">
                                                {serviceRequest.additional_info ? (
                                                    serviceRequest.additional_info
                                                ) : (
                                                    <span className="italic text-gray-400">
                                                        N/A
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {serviceRequest.problem_description && (
                                        <div className="bg-gray-50 rounded-lg p-4 border">
                                            <div className="text-xs text-gray-500 mb-1">
                                                Problem Description
                                            </div>
                                            <div className="text-gray-800 font-medium">
                                                {
                                                    serviceRequest.problem_description
                                                }
                                            </div>
                                        </div>
                                    )}
                                    {serviceRequest.service_notes && (
                                        <div className="bg-gray-50 rounded-lg p-4 border">
                                            <div className="text-xs text-gray-500 mb-1">
                                                Service Notes
                                            </div>
                                            <div className="text-gray-800 font-medium">
                                                {serviceRequest.service_notes}
                                            </div>
                                        </div>
                                    )}
                                    {/* Add more fields as needed */}
                                </div>
                            </div>

                            {/* Quotes Section - only show to customer */}
                            {isCustomer && status === 'quoted' && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <ScaleIcon className="w-5 h-5 text-purple-600" />
                                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                            Received Quotes
                                        </span>
                                    </h3>
                                    <Divider className="my-4" />
                                    <div className="space-y-4">
                                        {safeQuotes.length === 0 ? (
                                            <div className="text-gray-500">
                                                No quotes yet.
                                            </div>
                                        ) : (
                                            safeQuotes.map((item: any) => (
                                                <div
                                                    key={item.id}
                                                    className="bg-gradient-to-r from-gray-50 to-whitef p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div className="flex-1">
                                                            <div
                                                                className="flex items-center gap-2 mb-2 cursor-pointer"
                                                                onClick={() =>
                                                                    setShowMechanicReviews(
                                                                        item.mechanic
                                                                    )
                                                                }
                                                            >
                                                                <BuildingStorefrontIcon className="w-5 h-5 text-gray-600" />
                                                                <span className="font-medium text-gray-900 hover:underline">
                                                                    {
                                                                        item
                                                                            .mechanic
                                                                            .business_name
                                                                    }
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mb-2">
                                                                {
                                                                    item.estimate_details
                                                                }
                                                            </p>
                                                            <p className="text-emerald-800 font-bold text-xl">
                                                                $
                                                                {Number(
                                                                    item.total_cost
                                                                ).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <Button
                                                                color="primary"
                                                                variant="shadow"
                                                                size="sm"
                                                                onClick={() =>
                                                                    setAcceptingQuote(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Accept & Pay
                                                            </Button>
                                                            <Button
                                                                color="default"
                                                                variant="flat"
                                                                size="sm"
                                                                onClick={() =>
                                                                    setShowMechanicReviews(
                                                                        item.mechanic
                                                                    )
                                                                }
                                                            >
                                                                View Reviews
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <AnimatePresence>
                                        {showMechanicReviews && (
                                            <MechanicReviewsOverlay
                                                mechanic={showMechanicReviews}
                                                onClose={() =>
                                                    setShowMechanicReviews(null)
                                                }
                                            />
                                        )}
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {acceptingQuote && (
                                            <AcceptQuoteOverlay
                                                quote={acceptingQuote}
                                                onClose={() =>
                                                    setAcceptingQuote(null)
                                                }
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Mechanic: show waiting message if status is quoted */}
                            {!isCustomer && status === 'quoted' && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                                    <ScaleIcon className="w-10 h-10 text-purple-500 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                        Waiting for Customer Response
                                    </h3>
                                    <p className="text-gray-600 text-center max-w-md">
                                        The customer is reviewing your quote and
                                        will accept it soon if they are
                                        interested. You will be notified once
                                        the customer takes action.
                                    </p>
                                </div>
                            )}

                            {/* Mechanic Submit Quote Section (pending only, mechanic view) */}
                            {!isCustomer && status === 'pending' && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <ScaleIcon className="w-5 h-5 text-purple-600" />
                                        Submit a Quote
                                    </h3>
                                    <Divider className="my-4" />
                                    <div className="space-y-4">
                                        <input
                                            type="number"
                                            placeholder="Total Cost"
                                            value={quoteAmount}
                                            onChange={(e) =>
                                                setQuoteAmount(e.target.value)
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                        <textarea
                                            placeholder="Estimate Details"
                                            value={quoteDescription}
                                            onChange={(e) =>
                                                setQuoteDescription(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                        {quoteError && (
                                            <div className="text-red-600">
                                                {quoteError}
                                            </div>
                                        )}
                                        <Button
                                            color="success"
                                            onClick={handleSubmitQuote}
                                            disabled={
                                                submittingQuote ||
                                                !quoteAmount ||
                                                !quoteDescription
                                            }
                                        >
                                            {submittingQuote ? (
                                                <Spinner size="sm" />
                                            ) : (
                                                'Submit Quote'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Appointment Section */}
                            {(status === 'accepted' ||
                                status === 'completed') &&
                                appointment && (
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <WrenchIcon className="w-5 h-5 text-emerald-600" />
                                            Appointment Details
                                        </h3>
                                        <Divider className="my-4" />
                                        <div className="space-y-2">
                                            <div>
                                                <span className="font-medium text-gray-700">
                                                    Scheduled:
                                                </span>{' '}
                                                {new Date(
                                                    appointment.scheduled_date
                                                ).toLocaleString()}
                                            </div>
                                            {appointment.customer_notes && (
                                                <div>
                                                    <span className="font-medium text-gray-700">
                                                        Customer Notes:
                                                    </span>{' '}
                                                    {appointment.customer_notes}
                                                </div>
                                            )}
                                            {appointment.mechanic_notes && (
                                                <div>
                                                    <span className="font-medium text-gray-700">
                                                        Mechanic Notes:
                                                    </span>{' '}
                                                    {appointment.mechanic_notes}
                                                </div>
                                            )}
                                            <div>
                                                <span className="font-medium text-gray-700">
                                                    Status:
                                                </span>{' '}
                                                {appointment.is_completed ? (
                                                    <span className="text-emerald-600 font-semibold">
                                                        Completed
                                                    </span>
                                                ) : (
                                                    <span className="text-blue-600 font-semibold">
                                                        Scheduled
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {/* Customer sees mechanic details */}
                                        {isCustomer && (
                                            <div className="mt-6 bg-emerald-50 rounded-lg p-4 border">
                                                <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                                                    <BuildingStorefrontIcon className="w-5 h-5" />
                                                    Mechanic Details
                                                </h4>
                                                {mechanic ? (
                                                    <div className="text-gray-800">
                                                        <div>
                                                            <span className="font-medium">
                                                                Business:
                                                            </span>{' '}
                                                            {
                                                                mechanic.business_name
                                                            }
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Phone:
                                                            </span>{' '}
                                                            {mechanic.phone}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Email:
                                                            </span>{' '}
                                                            {
                                                                mechanic.business_email
                                                            }
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Address:
                                                            </span>{' '}
                                                            {
                                                                mechanic.full_address
                                                            }
                                                            , {mechanic.zipcode}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-500">
                                                        Mechanic details not
                                                        available.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {/* Mechanic sees customer address if mobile */}
                                        {!isCustomer &&
                                            serviceRequest.mechanic_type ===
                                                'mobile' &&
                                            serviceRequest.service_location && (
                                                <div className="mt-6 bg-blue-50 rounded-lg p-4 border">
                                                    <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                                        <MapPinIcon className="w-5 h-5" />
                                                        Customer Address
                                                    </h4>
                                                    <div className="text-gray-800">
                                                        <div>
                                                            <span className="font-medium">
                                                                Address:
                                                            </span>{' '}
                                                            {
                                                                serviceRequest.service_location
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        {/* Mark as Done button for customer */}
                                        {isCustomer &&
                                            !appointment.is_completed && (
                                                <div className="mt-6 flex justify-end">
                                                    <Button
                                                        color="success"
                                                        onClick={() =>
                                                            setShowReviewModal(
                                                                true
                                                            )
                                                        }
                                                        disabled={
                                                            reviewSubmitting
                                                        }
                                                        data-testid="mark-done-btn"
                                                        type="button"
                                                    >
                                                        Mark Work as Done &
                                                        Leave Review
                                                    </Button>
                                                </div>
                                            )}
                                        {!isCustomer &&
                                            !appointment.is_completed && (
                                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                                                    <ScaleIcon className="w-10 h-10 text-purple-500 mb-4" />
                                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                                        Appointment Scheduled
                                                    </h3>
                                                    <p className="text-gray-600 text-center max-w-md">
                                                        The customer will mark
                                                        the appointment as
                                                        complete with his
                                                        feedback for you when
                                                        satisfied with the work
                                                        done.
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                )}

                            {/* Reviews Section */}
                            {reviews.length > 0 && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <StarIcon className="w-5 h-5 text-yellow-500" />
                                        Your Reviews
                                    </h3>
                                    <Divider className="my-4" />
                                    <div className="space-y-4">
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="bg-gray-50 p-4 rounded border"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                className={`w-4 h-4 ${
                                                                    i <
                                                                    review.rating
                                                                        ? 'text-yellow-400 fill-current'
                                                                        : 'text-gray-300'
                                                                }`}
                                                            />
                                                        )
                                                    )}
                                                    <span className="text-xs text-gray-400 ml-2">
                                                        {new Date(
                                                            review.created_at
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="text-gray-700">
                                                    {review.review_text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-gray-500">No details found.</div>
                    )}
                    {/* --- Always render ReviewOverlay at the end of overlay --- */}
                    <ReviewOverlay
                        open={showReviewModal}
                        onClose={() => setShowReviewModal(false)}
                        onSubmit={handleReviewSubmit}
                        mechanic={mechanic}
                        submitting={reviewSubmitting}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default RequestOverlay;
