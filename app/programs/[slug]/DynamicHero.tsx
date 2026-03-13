'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
    heading: string;
    subtext: string;
    background?: string;
    programName?: string;
}

export default function DynamicHero({ heading, subtext, background, programName }: HeroProps) {
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '');
    const bgPath = background?.replace('/uploads/', '/public/');
    const backgroundUrl = bgPath?.startsWith('/public/')
        ? `${backendUrl}${bgPath}`
        : background || '/Program_bg.png';



    return (
        <section className="relative w-full h-[70vh] min-h-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundUrl}
                    alt="Programs Background"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#02142d]/80" />
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
                            HOME &gt; PROGRAMS {programName ? `> ${programName.toUpperCase()}` : ''}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight">
                        {heading}
                    </h1>

                    {/* Description */}
                    <p className="max-w-3xl mx-auto text-gray-200 text-base md:text-lg leading-relaxed font-light">
                        {subtext}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
