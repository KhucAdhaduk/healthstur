"use client";

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Program {
    id: string;
    heading: string;
    subtext: string;
    background?: string;
    homeHeading?: string;
    homeSubtext?: string;
    homeBackground?: string;
    bullets: string[];
    isActive?: boolean;
    href?: string;
}

export default function Hero() {
    const [slides, setSlides] = useState<Program[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/programs`);
                if (res.ok) {
                    const data: Program[] = await res.json();
                    if (data && data.length > 0) {
                        const activePrograms = data.filter(p => p.isActive !== false);
                        setSlides(activePrograms);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch programs", error);
            }
        };
        fetchPrograms();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [slides]);

    const slide = slides.length > 0 ? slides[currentSlide] : null;

    if (!slide) {
        return (
            <section className="relative w-full min-h-[90vh] lg:min-h-[85vh] overflow-hidden flex items-center justify-center bg-gray-50/10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#023051]"></div>
            </section>
        );
    }


    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '');

    const bgToUse = slide.homeBackground || slide.background;
    const backgroundUrl = bgToUse?.startsWith('/uploads/')
        ? `${backendUrl}${bgToUse}`
        : bgToUse || '/Program_bg.png';

    const displayHeading = slide.homeHeading || slide.heading;
    const displaySubtext = slide.homeSubtext || slide.subtext;

    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-[85vh] overflow-hidden">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0 w-full h-full bg-cover bg-[65%_center] lg:bg-center"
                    style={{ backgroundImage: `url(${backgroundUrl})` }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                />
            </AnimatePresence>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-[100%] flex flex-col justify-center py-16 lg:py-14 min-h-[90vh] lg:min-h-[85vh]">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">

                    {/* Left Content */}
                    <div className="flex-1 lg:flex-[1.2] max-w-2xl text-center lg:text-left">
                        <div className="h-[100%] flex flex-col justify-center">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                                >
                                    {/* Trusted Badge */}
                                    <div className="inline-flex items-center gap-2 px-2 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-white shadow-sm mb-6 sm:mb-8 animate-fade-in-up">
                                        <div className="flex -space-x-2 pl-1">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                                    <Image
                                                        src={`https://i.pravatar.cc/150?u=${i + 10}`}
                                                        alt="User"
                                                        width={32}
                                                        height={32}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[12px] sm:text-[13px] font-bold text-[#023051] px-2 whitespace-nowrap">
                                            Trusted by 10,000+ Members
                                        </span>
                                    </div>

                                    {/* Heading */}
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#023051] leading-[1.1] mb-6">
                                        {displayHeading}
                                    </h1>

                                    {/* Subtext */}
                                    <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#000000] mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium opacity-90">
                                        {displaySubtext}
                                    </p>

                                    <div className="mb-4 text-center lg:text-left w-full max-w-lg mx-auto lg:mx-0">
                                        <span className="text-[18px] sm:text-[19px] font-bold text-[#000000]">
                                            Benefits:
                                        </span>
                                    </div>

                                    {/* Bullet List */}
                                    <div className="flex flex-col gap-3 mb-8 max-w-md mx-auto lg:mx-0">
                                        {slide.bullets.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 justify-center lg:justify-start"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-[#023051]" />
                                                <span className="text-[16px] sm:text-[17px] font-medium text-[#000000]">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>


                                    {/* CTA */}
                                    <div className="flex justify-center lg:justify-start">
                                        <Link
                                            href={slide.href || '#'}
                                            className="w-full sm:w-auto group cursor-pointer flex items-center justify-center gap-2 bg-[#023051] text-white px-7 py-3 rounded-full text-base sm:text-lg font-bold hover:bg-[#023051]/95 transition-all shadow-xl hover:shadow-2xl active:scale-95"
                                        >
                                            <span>Start Transformation</span>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div >
            </div >
        </section >
    );
}
