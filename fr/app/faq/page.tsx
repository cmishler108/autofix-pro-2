'use client';

import CustomHeader from '../headers/CustomHeader';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, type: 'spring', stiffness: 80 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function Faq() {
  // You can split your FAQ into sections and map over them for animation
  const faqs = [
    {
      question: "What is DoneEZ?",
      answer: "DoneEZ is a user-friendly platform designed to connect you with reliable and highly-rated service professionals in your area. With DoneEZ, you can effortlessly schedule appointments with trusted experts and enjoy peace of mind knowing that your needs will be taken care of efficiently and effectively. Whether you need a plumber, electrician, or any other service provider, DoneEZ simplifies the process of finding and booking skilled professionals, giving you more time to focus on what matters most.",
    },
    {
      question: "What types of services can I find on DoneEZ?",
      answer: "DoneEZ is your ultimate destination for all types of services, no matter how big or small the job may be. From auto mechanics and handymen to house cleaners, tutors, caterers, doctors, lawyers, and everything in between, our platform offers a comprehensive range of services that cater to your every need. Whether you need someone to run a simple errand for you or require a team of professionals to handle a complex project, DoneEZ has got you covered. Our user-friendly website features a complete list of services that you can easily access and book with just a few clicks. So why go anywhere else when you can get all the help you need at DoneEZ?",
    },
    // ...add more FAQ items as needed...
  ];

  return (
    <div className="min-w-full min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-100 flex flex-col items-center">
      <div className="w-full">
        <CustomHeader />
      </div>
      <motion.div
        className="max-w-3xl w-full px-6 py-12 bg-white/80 rounded-2xl shadow-2xl mt-10 mb-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl font-extrabold text-[#10B981] text-center mb-10"
          variants={fadeInUp}
          custom={1}
        >
          Frequently Asked Questions
        </motion.h1>
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              className="rounded-xl bg-gradient-to-r from-[#10B981]/10 to-white p-6 shadow hover:shadow-lg transition-all"
              variants={fadeInUp}
              custom={i + 2}
              whileHover={{ scale: 1.03, backgroundColor: "#e0f7fa" }}
            >
              <h2 className="text-2xl font-bold text-[#10B981] mb-2">{faq.question}</h2>
              <p className="text-lg text-gray-700">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}