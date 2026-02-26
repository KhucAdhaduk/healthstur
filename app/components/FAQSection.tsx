'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "What is the best diet for weight loss?",
        answer: "The best diet for weight loss is a balanced, calorie-controlled plan focused on protein, fiber, and whole foods for sustainable results."
    },
    {
        question: "Can I lose weight without giving up my favorite foods?",
        answer: "Yes, you can lose weight without completely giving up your favorite foods by following portion control and a balanced diet plan  moderation and consistency are the key to sustainable results."
    },
    {
        question: "What is better: cardio or weight training?",
        answer: "Both are important  cardio helps burn calories while weight training builds muscle and boosts metabolism, and a combination of both gives the best fitness and fat-loss results."
    },
    {
        question: "How much weight can I safely lose in a month?",
        answer: "A safe and sustainable rate is about 2–4 kg per month, depending on your body type and consistency with diet and exercise steady progress gives better long-term results."
    },
    {
        question: "Can vegetarians build muscle effectively?",
        answer: "Yes, vegetarians can build muscle effectively by following a high-protein vegetarian diet with proper calories and a structured strength-training program."
    },
    {
        question: "How important is sleep for weight loss?",
        answer: "Sleep is very important for weight loss, as proper rest supports metabolism, controls hunger hormones, and improves workout recovery and fat-loss results."
    },
    {
        question: "Can exercise help with thyroid issues?",
        answer: "Yes, regular exercise can help manage thyroid issues by boosting metabolism, improving energy levels, and supporting overall hormonal balance when combined with proper medical guidance."
    },
];

export default function FAQSection() {
    // Initialize with all closed (null)
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [dynamicFaqs, setDynamicFaqs] = useState<{ question: string, answer: string }[]>(faqs);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
                const response = await fetch(`${apiUrl}/faq`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setDynamicFaqs(data);
                    }
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        };

        fetchFaqs();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <section className="pt-10 md:pt-20 pb-6 md:pb-14 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#023051] leading-tight">
                        Frequently Asked <br className="hidden md:block" /> Question
                    </h2>
                </motion.div>

                {/* FAQ List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {dynamicFaqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border-b-2 border-gray-300 last:border-none"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center py-3 md:py-5 text-left group focus:outline-none"
                                >
                                    <span className={`text-lg md:text-xl font-medium pr-8 transition-colors duration-300 text-black
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'
                                        }`}>
                                        <ChevronDown className="w-6 h-6 text-[#023051]" strokeWidth={2.5} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-4 text-gray-600 leading-relaxed text-sm md:text-base">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
