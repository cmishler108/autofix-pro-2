import CustomHeader from '../headers/CustomHeader';

export default function Faq() {
    return (
        <div className="min-w-full min-h-screen bg-[#f4f6fa] flex flex-col items-center">
            <div className="w-full">
                <CustomHeader />
            </div>

            <div className="max-w-[1280px] px-6 py-7 bg-white">
                <div className="my-3 text-[36px] font-bold">
                    Customer's FAQs
                </div>
                <div className="my-3 text-[24px] font-bold">
                    What is DoneEZ?
                </div>
                <div className="my-3 text-[18px]">
                    DoneEZ is a user-friendly platform designed to connect you
                    with reliable and highly-rated service professionals in your
                    area. With DoneEZ, you can effortlessly schedule
                    appointments with trusted experts and enjoy peace of mind
                    knowing that your needs will be taken care of efficiently
                    and effectively. Whether you need a plumber, electrician, or
                    any other service provider, DoneEZ simplifies the process of
                    finding and booking skilled professionals, giving you more
                    time to focus on what matters most.
                </div>

                <div className="my-3 text-[24px] font-bold">
                    What types of services can I find on DoneEZ?
                </div>
                <div className="my-3 text-[18px]">
                    DoneEZ is your ultimate destination for all types of
                    services, no matter how big or small the job may be. From
                    auto mechanics and handymen to house cleaners, tutors,
                    caterers, doctors, lawyers, and everything in between, our
                    platform offers a comprehensive range of services that cater
                    to your every need. Whether you need someone to run a simple
                    errand for you or require a team of professionals to handle
                    a complex project, DoneEZ has got you covered. Our
                    user-friendly website features a complete list of services
                    that you can easily access and book with just a few clicks.
                    So why go anywhere else when you can get all the help you
                    need at DoneEZ?
                </div>

                <div className="my-3 text-[24px] font-bold">
                    How much does this service cost?
                </div>
                <div className="my-3 text-[18px]">
                    Joining DoneEZ is completely free! You only pay for the
                    services you book with a participating DoneEZ service
                    professional. However, to book an appointment, we require a
                    deposit based on a percentage of the estimated quote for the
                    repair job. The deposit percentages are as follows:
                </div>
                <div className="p-4">
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="text-[18px]">
                            Quotes under $1000:{' '}
                            <span className="font-bold text-[18px]">
                                5% deposit
                            </span>
                        </li>
                        <li className="text-[18px]">
                            Quotes over $1000:{' '}
                            <span className="font-bold text-[18px]">
                                3% deposit
                            </span>
                        </li>
                        <li className="text-[18px]">
                            Quotes over $5000:{' '}
                            <span className="font-bold text-[18px]">
                                2% deposit
                            </span>
                        </li>
                        <li className="text-[18px]">
                            Quotes over $10,000:{' '}
                            <span className="font-bold text-[18px]">
                                1% deposit
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="my-3 text-[18px]">
                    This deposit will be applied to the total cost of the
                    service if you proceed with the appointment and approve the
                    repair work.
                </div>

                <div className="my-3 text-[24px] font-bold">
                    Can a service professional pay to be listed on the DoneEZ
                    platform?
                </div>
                <div className="text-[18px] my-3">
                    We do not accept payment from service professionals to be
                    listed on our platform. We carefully evaluate each
                    professional's credentials and expertise to ensure they meet
                    our criteria. If they meet our standards, they can join our
                    platform for free.
                </div>

                <div className="text-[24px] my-3 font-bold">
                    What criteria is a service professional required to meet in
                    order to become a member of the DoneEZ network?
                </div>
                <div className="my-3 text-[18px]">
                    To become a member of the DoneEZ network, a service
                    professional must demonstrate friendliness and
                    professionalism. Additionally, to submit a quote in response
                    to a customer's request, they must have a minimum 4-star
                    rating on Yelp, possess relevant licenses and
                    certifications, maintain adequate insurance coverage, and
                    show a history of delivering high-quality services to
                    clients. Our team meticulously evaluates each applicant to
                    ensure they meet these criteria before approving them to
                    join our network.
                </div>

                <div className="text-[24px] my-3 font-bold">
                    Is membership in the DoneEZ network guaranteed for life once
                    accepted?
                </div>
                <div className="text-[18px] my-3">
                    No, membership in the DoneEZ network is not guaranteed for
                    life. Service professionals must maintain a good standing by
                    consistently delivering high-quality services and
                    maintaining a minimum 4-star rating on Yelp. If a service
                    professional's rating falls below 4 stars, their ability to
                    submit quotes is deactivated. They can regain this ability
                    by improving their rating to 4 stars or higher on Yelp. This
                    protocol makes it easy to ensure that only the best service
                    professionals are listed in our network, ensuring our
                    customers receive the highest quality service available.
                </div>

                <div className="text-[24px] my-3 font-bold">
                    Why are auto services the only type of service that can be
                    requested of DoneEZ?
                </div>
                <div className="text-[18px] my-3">
                    We currently offer auto services on our platform. If
                    successful, we plan to expand by adding additional service
                    categories in the future. This phased approach ensures that
                    each new service meets our standards for quality and
                    reliability before we introduce other services. Stay tuned
                    for updates as we expand our offerings.
                </div>

                <div className="text-[24px] my-3 font-bold">
                    Are the auto mechanics listed on DoneEZ ASE-certified?
                </div>
                <div className="text-[18px] my-3">
                    Our auto mechanics are highly qualified and top-rated
                    professionals who are capable of performing any auto repair
                    service they are booked to do. Many of our mechanics are
                    certified by the National Institute for Automotive Service
                    Excellence (ASE). You can view a mechanic's certifications
                    on their online profile, which is accessible during the
                    booking process. Additionally, you can review their work
                    history, experience, completed jobs for other car owners,
                    fees paid by other car owners, and real customer ratings and
                    reviews. We take pride in being completely transparent and
                    providing our customers with all the information they need
                    to make an informed decision when booking an auto service
                    through our platform. Regardless of ASE certification, all
                    our mechanics are top-rated professionals.
                </div>

                <div className="text-[24px] my-3 font-bold">
                    What is your cancellation policy?
                </div>
                <div className="text-[18px] my-3">
                    We understand that schedules can change, and we strive to
                    accommodate our customers' needs with a flexible
                    cancellation policy. Our standard policy is as follows:
                </div>

                <div className="p-4">
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="text-[18px] font-bold">
                            If you need to cancel your appointment, you can
                            receive a full refund of your deposit by canceling
                            at least 24 hours before your scheduled appointment
                            time.
                        </li>
                        <li className="text-[18px] font-bold">
                            For appointments booked less than 24 hours in
                            advance, cancellations must be made at least 2 hours
                            before the appointment time to be eligible for a
                            refund.
                        </li>
                        <li className="text-[18px] font-bold">
                            Cancellations made within 2 hours of the appointment
                            time are not eligible for a refund.
                        </li>
                    </ul>
                </div>

                <div className="text-[18px] my-3">To cancel, you can:</div>
                <div className="p-4">
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="text-[18px] font-bold">
                            Email us at support@doneez.com
                        </li>
                        <li className="text-[18px] font-bold">
                            Use the cancellation feature in our online booking
                            system or mobile app
                        </li>
                    </ul>
                </div>

                <div className="text-[24px] my-3 font-bold">
                    What are the Deposit and Refund Policies?
                </div>
                <div className="text-[18px] my-3">
                    Cancellation/Rescheduling: You can receive a full refund of
                    your deposit if you cancel within 24 hours or reschedule
                    your appointment up to two hours before the scheduled time.
                </div>
                <div className="text-[18px] my-3">
                    In-Person Inspection: If you attend the appointment and
                    decide not to proceed after the in-person inspection due to
                    costs higher than the preliminary estimate, your deposit
                    will be refunded.
                </div>

                <div className="text-[24px] my-3 font-bold">
                    I would like to join. How do I do that?
                </div>
                <div className="text-[18px] my-3">
                    We're excited to have you join our platform! To get started,
                    simply visit our website and follow the sign-up process. If
                    you have any questions or concerns, please don't hesitate to
                    reach out to us at support@doneez.com or chat with one of
                    our moderators. As a limited time offer, new members who
                    book an appointment through our platform are eligible for a
                    complimentary oil change. We're thrilled to have you join
                    our community and look forward to providing you with
                    top-notch auto services.
                </div>

                <div className="text-[24px] my-3 font-bold">
                    I have further inquiries. Who do I contact?
                </div>
                <div className="text-[18px] my-3">
                    If you have any further inquiries, we encourage you to reach
                    out to us by using our contact form on our website or by
                    sending an email to support@doneez.com. Our team will be
                    happy to assist you with any questions or concerns you may
                    have.
                </div>

                <div className="my-3 text-[36px] font-bold">
                    Professional's FAQs
                </div>
                <div className="text-[24px] font-bold my-3">
                    What is DoneEZ?
                </div>
                <div className="text-[18px] my-3">
                    DoneEZ is a platform where service professionals can promote
                    and sell their services. By joining our network,
                    professionals can receive qualified leads that may result in
                    instant bookings or quote requests from potential customers.
                </div>

                <div className="text-[24px] font-bold my-3">
                    What types of services can I offer on DoneEZ?
                </div>
                <div className="text-[18px] my-3">
                    At the moment, DoneEZ only supports auto services for
                    instant booking or request. However, we plan to expand our
                    services to include other categories in the future.
                </div>

                <div className="text-[24px] font-bold my-3">
                    What are some benefits of being a DoneEZ service
                    professional?
                </div>
                <div className="text-[18px] my-3">
                    As a DoneEZ service professional, you'll have access to
                    various benefits, such as discounted products and services
                    from our partnered suppliers. These may include auto parts,
                    business software, digital marketing services, and other
                    resources that can help you streamline and improve your
                    business operations.
                </div>

                <div className="text-[24px] font-bold my-3">
                    Is there a fee for service professionals to join the DoneEZ
                    network?
                </div>
                <div className="text-[18px] my-3">
                    At DoneEZ, we believe in making it easy for qualified
                    service professionals to join our network. If you meet our
                    criteria, there is no fee to become a member. Our goal is to
                    provide a platform that connects top-rated service
                    professionals with customers who need their services.
                    However, please note that once you join our network, you
                    will be subject to our terms and conditions, which outline
                    the expectations and standards for service professionals. We
                    also offer additional benefits and resources to our members,
                    such as discounted products and services to help you run
                    your business more efficiently. So if you meet our criteria
                    and are interested in becoming a part of our network, we
                    encourage you to join us today!
                </div>

                <div className="text-[24px] font-bold my-3">
                    How do you make money if it is free to join?
                </div>
                <div className="text-[18px] my-3">
                    DoneEZ makes money primarily through the deposits customers
                    pay to set an appointment with a service professional. The
                    deposit is based on a percentage of the mechanic's quoted
                    price for the repair job. This deposit becomes a referral
                    fee for the platform if the customer makes the appointment
                    and approves the mechanic to perform the repair work.
                </div>

                <div className="text-[18px] my-3">Deposit Tiers</div>

                <div className="flex items-start mb-4 text-[18px]">
                    <div className="w-3 h-3 bg-black rounded-full mt-2"></div>
                    <div className="ml-4">
                        <p>
                            <strong>Under $1,000:</strong>
                        </p>
                        <ul className="pl-4 list-none">
                            <li>
                                <strong>Deposit Rate:</strong> 5%
                            </li>
                            <li>
                                <strong>Example:</strong> For a quote of $500,
                                the required deposit would be $500 * 0.05 = $25.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-start mb-4 text-[18px]">
                    <div className="w-3 h-3 bg-black rounded-full mt-2"></div>
                    <div className="ml-4">
                        <p>
                            <strong>$1,000 and over:</strong>
                        </p>
                        <ul className="pl-4 list-none">
                            <li>
                                <strong>Deposit Rate:</strong> 3%
                            </li>
                            <li>
                                <strong>Example:</strong> For a quote of $1,500,
                                the required deposit would be $1,500 * 0.03 =
                                $45.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-start mb-4 text-[18px]">
                    <div className="w-3 h-3 bg-black rounded-full mt-2"></div>
                    <div className="ml-4">
                        <p>
                            <strong>$5,000 and over:</strong>
                        </p>
                        <ul className="pl-4 list-none">
                            <li>
                                <strong>Deposit Rate:</strong> 2%
                            </li>
                            <li>
                                <strong>Example:</strong> For a quote of $5,000,
                                the required deposit would be $5,000 * 0.02 =
                                $100.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-start mb-4 text-[18px]">
                    <div className="w-3 h-3 bg-black rounded-full mt-2"></div>
                    <div className="ml-4">
                        <p>
                            <strong>$10,000 and over:</strong>
                        </p>
                        <ul className="pl-4 list-none">
                            <li>
                                <strong>Deposit Rate:</strong> 1%
                            </li>
                            <li>
                                <strong>Example:</strong> For a quote of
                                $12,000, the required deposit would be $12,000 *
                                0.01 = $120.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="my-3 text-[18px]">
                    Note: These rates are applied to the quoted amount to
                    determine the required deposit. The rate applicable is based
                    on the tier into which the quoted amount falls. For example,
                    if the quote is exactly $5,000, the entire amount is subject
                    to the 2% rate, resulting in a required deposit of $100.
                </div>

                <div className="my-3 text-[24px] font-bold">
                    Can I sign up as a DoneEZ auto service professional if I
                    don't own a shop?
                </div>

                <div className="my-3 text-[18px]">
                    Absolutely! Whether you operate a brick-and-mortar auto
                    repair shop or work as a mobile mechanic, you are welcome to
                    join DoneEZ as an auto service professional. We value a
                    commitment to excellent customer service and high-quality
                    auto repairs, and we rely on customer ratings and reviews to
                    ensure that all of our providers meet these standards. Our
                    aim is to build trust in an industry where trust has been
                    lacking, and we believe that by bringing together top-rated
                    service providers from all backgrounds, we can help achieve
                    this goal. So whether you have a physical shop or prefer to
                    work on the go, sign up with DoneEZ today and start
                    providing reliable, trustworthy auto services to customers
                    in your area.
                </div>

                <div className="my-3 text-[24px] font-bold">
                    I have further Inquiries. Who do I contact?
                </div>
                <div className="my-3 text-[18px]">
                    For any further assistance or inquiries, please do not
                    hesitate to reach out to us at support@doneez.com. We will
                    be happy to assist you in any way we can.
                </div>

                <div className="my-3 text-[36px] font-bold">
                    Supplier's FAQs
                </div>
                <div className="my-3 text-[24px] font-bold">
                    What are the benefits of joining the DoneEZ platform to list
                    parts for sale?
                </div>
                <div className="my-3 text-[18px]">
                    As a supplier, selling on the DoneEZ dashboard offers
                    several benefits:
                </div>

                <div className="p-4">
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="text-[18px] font-bold">
                            Increased Sales: Showcase your offerings to our
                            reputable auto service professionals, boosting your
                            sales potential.
                        </li>
                        <li className="text-[18px] font-bold">
                            Correct Installation: Ensure that your parts are
                            installed correctly, reducing part returns, costly
                            replacements, and loss of sales due to defective
                            parts.
                        </li>
                        <li className="text-[18px] font-bold">
                            Long-Term Relationships: Establish long-term
                            relationships with service professionals, enhancing
                            collaboration and trust.
                        </li>
                        <li className="text-[18px] font-bold">
                            Brand Visibility: Increase your brand visibility in
                            the industry by being associated with a trusted
                            platform.
                        </li>
                    </ul>
                </div>

                <div className="my-3 text-[24px] font-bold">
                    Who can join as a supplier on the DoneEZ platform?
                </div>
                <div className="my-3 text-[18px]">
                    We only partner with local remanufactured parts suppliers
                    and local recycled auto parts suppliers at this time.
                </div>

                <div className="my-3 text-[24px] font-bold">
                    Is there a fee to join the platform as a supplier?
                </div>
                <div className="my-3 text-[18px]">
                    Joining the DoneEZ platform is free for third party
                    suppliers. However, there is a 10% transaction fee on sales
                    made through our platform.
                </div>

                <div className="my-3 text-[24px] font-bold">
                    Do you allow OEM and new aftermarket parts suppliers on the
                    platform?
                </div>
                <div className="my-3 text-[18px]">
                    No, we do not partner with OEM and new aftermarket parts
                    suppliers. Our platform focuses on remanufactured and
                    recycled auto parts. Mechanics are welcome to order OEM and
                    new aftermarket parts from their own suppliers if needed.
                </div>

                <div className="my-3 text-[24px] font-bold">
                    Why don't you partner with OEM and new aftermarket parts
                    suppliers?
                </div>
                <div className="my-3 text-[18px]">
                    We believe that mechanics can easily order OEM and new
                    aftermarket parts from platforms like PartsTech, so we focus
                    on providing a marketplace for remanufactured and recycled
                    parts to support local suppliers and promote sustainability.
                </div>

                <div className="my-3 text-[24px] font-bold">
                    I have further inquiries. Who do I contact?
                </div>
                <div className="my-3 text-[18px]">
                    If you have further inquiries, please feel free to contact
                    our customer support team. They will be happy to assist you
                    and provide you with any additional information you may
                    need. You can find our contact details on our website or
                    reach out to us through our support email
                    support@doneez.com.
                </div>
            </div>
        </div>
    );
}
