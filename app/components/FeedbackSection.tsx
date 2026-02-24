'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FeedbackDialog from './FeedbackDialog';

// ... (imports remain)

export default function FeedbackSection() {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    return (
        <section className="pb-12 md:pb-24 bg-white relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center"
            >
                {/* Header */}
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#023051] mb-6 leading-tight">
                    Share Your Fitness <br className="hidden md:block" /> Experience
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto">
                    Tell us about your workout and diet journey with our programs your feedback helps us improve and serve you better. Share your experience and help others make the right fitness choice.
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => setIsFeedbackOpen(true)}
                    className="inline-flex cursor-pointer items-center gap-2 bg-[#00284D] text-white px-8 py-3 rounded-xl font-bold text-sm md:text-base hover:bg-[#00355E] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Give Feedback
                    <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </button>
            </motion.div>

            <FeedbackDialog
                isOpen={isFeedbackOpen}
                onClose={() => setIsFeedbackOpen(false)}
            />
        </section>
    );
}
