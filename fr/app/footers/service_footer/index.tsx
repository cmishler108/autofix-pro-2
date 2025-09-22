import { motion } from 'framer-motion';

export default function ServiceFooter() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            className="min-h-[40px] text-[#616a76] px-[16px] py-[8px] text-center shadow-[0_-0.125rem_0.25rem_rgba(0,0,0,0.075)] flex items-center justify-center bg-white/80 text-[16px] backdrop-blur-lg"
        >
            <div>
                Copyright © 2024 <span className="text-[#10B981] font-bold">DoneEZ</span>, Inc. All rights Reserved.
            </div>
        </motion.div>
    );
}