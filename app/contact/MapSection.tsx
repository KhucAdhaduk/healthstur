'use client';

import { motion } from 'framer-motion';
import { useCompanyInfo } from '@/context/CompanyInfoContext';

export default function MapSection() {
    const { info } = useCompanyInfo();

    if (!info?.mapUrl) {
        return null;
    }

    return (
        <section className="py-0 pb-16 md:pb-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-gray-100"
                >
                    <iframe
                        src={info.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Location"
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
}
