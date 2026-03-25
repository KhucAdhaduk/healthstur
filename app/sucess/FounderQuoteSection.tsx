'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface CompanyInfo {
    founderQuote?: string;
    founderName?: string;
    founderDesignation?: string;
    founderImage?: string;
}

export default function FounderQuoteSection() {
    const [founderData, setFounderData] = useState<CompanyInfo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/company-info`);
                if (res.ok) {
                    const data = await res.json();
                    setFounderData(data);
                }
            } catch (error) {
                console.error('Failed to fetch founder quote:', error);
            }
        };
        fetchData();
    }, []);

    // Fallbacks
    const quote = founderData?.founderQuote || "Every transformation reinforces why Healthstur exists to make healthy living practical, sustainable, and empowering.";
    const name = founderData?.founderName || "Atit Mehta";
    const designation = founderData?.founderDesignation || "Founder & Chief Healthstur";
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '');

    return (
        <section className="py-8 md:py-18 bg-[#023051]"> {/* Dark blue background */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#023051]">
                        <Quote className="w-8 h-8 fill-current" />
                    </div>
                </motion.div>

                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-snug mb-8"
                >
                    "{quote}"
                </motion.blockquote>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center">
                        {founderData?.founderImage ? (
                            <Image
                                src={founderData.founderImage.startsWith('http')
                                    ? founderData.founderImage
                                    : `${backendUrl}${founderData.founderImage}`}
                                alt={name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <span className="text-2xl font-bold text-white">{name.charAt(0)}</span>
                        )}
                    </div>
                    <cite className="not-italic">
                        <div className="text-xl font-bold text-white mb-1">

                            {name}
                        </div>
                        <div className="text-gray-300 font-medium text-sm tracking-wide">
                            {designation}
                        </div>
                    </cite>
                </motion.div>
            </div>
        </section>
    );
}
