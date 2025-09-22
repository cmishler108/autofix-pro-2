// app/page.js
import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="flex flex-col items-center pb-8">
            {/* Hero Section */}
            <section className="w-full bg-[#009ed5] py-14 text-white">
                <div className="container mx-auto text-center px-6">
                    <h1 className="text-4xl max-lg:text-3xl font-bold mb-4 text-white">
                        Welcome to DoneEZ Automotive Service Platform
                    </h1>
                    <p className="text-xl mb-8 text-white">
                        🚗 Get Your Car Back on the Road—Fast! 🚗
                    </p>
                    <Link
                        href="/get-quote/service-request/service-location"
                        className="bg-white text-md text-[#009ed5] px-8 py-4 rounded-full font-semibold shadow hover:bg-gray-200"
                    >
                        Get a quote
                    </Link>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="w-full bg-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl max-lg:text-2xl font-bold text-gray-800 mb-6">
                        Tired of long waits and unresponsive mechanics?
                    </h2>
                    <p className="text-xl text-gray-700">
                        Welcome to DoneEZ, your all-new automotive repair platform designed to connect you with top-rated mechanics who are ready to get your car back in shape—now!
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section id="services" className="w-full py-12 bg-gray-100">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl mb-8 text-center text-black font-bold">
                        Why Choose DoneEZ?
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                ✅ Instant Quotes
                            </h3>
                            <p className="text-gray-600">
                                No more guessing games! Request quotes from reliable mechanics in your area with just a few clicks.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                ✅ Flexible Options
                            </h3>
                            <p className="text-gray-600">
                                Choose between mobile mechanics for quick fixes or shop mechanics for more extensive repairs.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                ✅ Book Today, Pay a Deposit
                            </h3>
                            <p className="text-gray-600">
                                Secure your appointment easily with a small deposit, credited towards your service cost.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Highlights Section */}
            <section className="py-12 w-full bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Get Your Car Running Safely at the Best Price! 🛠
                    </h2>
                    <p className="text-xl text-gray-700 text-center mb-8">
                        Don’t let car troubles hold you back. With DoneEZ, you can expect hassle-free, reliable service that puts you back on the road when you need it most.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-black">
                                <span className="underline">Clean Your Vehicle</span> with Ease
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-black">
                                <span className="underline">Repair Your Vehicle</span> with Ease
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-black">
                                <span className="underline">Maintain Your Vehicle</span> with Ease
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-black">
                                <span className="underline">Replace Your Tires</span> with Ease
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instant Access Section */}
            <section className="py-12 w-full bg-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                        Instant Access to Top-Rated Auto Service Pros!
                    </h2>
                    <p className="text-xl text-gray-700 mb-8">
                        Tell us what service you need or the issue you’re facing. DoneEZ offers a wide variety of automotive services to choose from.{' '}
                        <span className="font-bold">
                            <Link href={'/sign-up'} className="text-[#009ed5] hover:underline">
                                Join DoneEZ today!
                            </Link>
                        </span>
                    </p>
                    <Link
                        href="/get-quote/service-request/service-location"
                        className="bg-[#009ed5] text-white px-8 py-4 rounded-full font-semibold shadow hover:bg-[#007fa3]"
                    >
                        Get a Quote
                    </Link>
                </div>
            </section>

            {/* Important Information for Mechanics */}
            <section className="w-full py-12 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Important Information for Mechanics
                    </h2>
                    <div className="flex flex-col gap-4 items-start">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-gray-700 text-left">
                                Membership with DoneEZ requires an application and meeting specific criteria.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-gray-700 text-left">
                                Once approved, there are <span className="font-bold">no monthly or annual fees.</span>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-gray-700 text-left">
                                DoneEZ earns a small referral fee from deposits when customers book your services.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-gray-700 text-left">
                                Enjoy a <span className="font-bold">complimentary online business</span> profile to enhance your digital presence.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-gray-700 text-left">
                                Our onboarding process is quick and straightforward.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-gray-700 text-left">
                                <span className="font-bold">Free training on DoneEZ</span> is provided.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-4"></div>
                            <p className="text-lg text-gray-700 text-left">
                                Payments for services can be collected directly from the vehicle owner.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action for Mechanics */}
            <section className="w-full py-12 bg-[#009ed5] text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Automotive Service Professionals
                    </h2>
                    <p className="text-xl mb-6">
                        Elevate your business with us! Sign up for DoneEZ today!
                    </p>
                    <Link
                        href="/sign-up"
                        className="bg-white text-[#009ed5] px-8 py-4 rounded-full font-semibold shadow hover:bg-gray-200"
                    >
                        Sign Up as a Service Professional
                    </Link>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full py-12 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <Link href={'/faq'}>
                        <div className="flex flex-row items-center justify-center">
                            <h2 className="text-3xl font-bold text-black">FAQ</h2>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="ml-4 h-6"
                            >
                                <path
                                    d="M23.987 12a2.411 2.411 0 0 0 -0.814 -1.8L11.994 0.361a1.44 1.44 0 0 0 -1.9 2.162l8.637 7.6a0.25 0.25 0 0 1 -0.165 0.437H1.452a1.44 1.44 0 0 0 0 2.88h17.111a0.251 0.251 0 0 1 0.165 0.438l-8.637 7.6a1.44 1.44 0 1 0 1.9 2.161L23.172 13.8a2.409 2.409 0 0 0 0.815 -1.8Z"
                                    fill="#000000"
                                />
                            </svg>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Final Call to Action Section */}
            <section className="w-full py-16 bg-[#009ed5] text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl max-lg:text-2xl font-bold mb-4 text-white">
                        Get Started with DoneEZ Today!
                    </h2>
                    <p className="text-2xl max-lg:text-lg mb-8 text-white">
                        Experience hassle-free, reliable automotive services at your fingertips.
                    </p>
                    <Link
                        href="/sign-up"
                        className="bg-white text-[#009ed5] px-8 py-4 rounded-full font-semibold shadow hover:bg-gray-200"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </section>
        </main>
    );
}
