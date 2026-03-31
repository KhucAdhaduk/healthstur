'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/image.util';

interface DynamicResourceHeroProps {
    title: string;
    description: string;
    image?: string;
    resourceTitle: string;
}

export default function DynamicResourceHero({ title, description, image, resourceTitle }: DynamicResourceHeroProps) {
    const defaultImage = "/Wellness.jpg";
    const bgImage = getImageUrl(image) || defaultImage;

    return (
        <section className="relative w-full min-w-full h-[70vh] min-h-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt="Resource Background"
                    fill
                    className="object-cover scale-105"
                    priority
                    unoptimized
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#02142d]/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* Breadcrumbs */}
                    <div className="mb-10 ">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-90">
                            HOME &gt; {resourceTitle}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight">
                        {title}
                    </h1>

                    {/* Description */}
                    <p className="max-w-3xl mx-auto text-gray-200 text-base md:text-lg leading-relaxed font-light">
                        {description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
