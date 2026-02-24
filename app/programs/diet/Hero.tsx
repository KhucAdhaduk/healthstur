'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative w-full h-[70vh] min-h-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Program_bg.png"
                    alt="Programs Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#023051]/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* Breadcrumbs */}
                    <div className="mb-10">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-90">
                            HOME &gt; PROGRAMS &gt; NUTRITION & DIET
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight">
                        Diet & Nutrition
                    </h1>

                    {/* Description */}
                    <p className="max-w-3xl mx-auto text-gray-200 text-base md:text-lg leading-relaxed font-light">
                        Nutrition is the foundation of energy, immunity, hormonal balance, and
                        long-term health. The right diet prevents lifestyle disorders and improves
                        overall performance.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
