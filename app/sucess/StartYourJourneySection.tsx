'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ConsultationDialog from '../components/ConsultationDialog';

export default function StartYourJourneySection() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <section className="py-18 bg-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#023051] mb-6">
                        Your Story Starts Here
                    </h2>
                    <p className="text-lg text-black mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                        Stop guessing and start thriving. Take our wellness quiz and get your personalized path to health today.
                    </p>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="inline-block bg-[#023051] cursor-pointer text-white font-bold py-4 px-10 rounded-2xl hover:bg-[#0A263D] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
                    >
                        Start Your Journey
                    </button>
                </motion.div>
            </div>
            <ConsultationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </section>
    );
}
