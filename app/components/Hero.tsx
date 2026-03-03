"use client";

import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
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
    const [direction, setDirection] = useState(1);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

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
            nextSlide();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [slides, currentSlide, nextSlide]);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

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

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0
        })
    };

    const textVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0
        })
    };

    return (
        <section
            className="relative w-full min-h-[90vh] lg:min-h-[85vh] overflow-hidden group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                >
                    <Image
                        src={backgroundUrl}
                        alt="Background"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover object-[65%_center] lg:object-center"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows for Desktop */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-30 hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all shadow-lg hover:scale-105"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-8 h-8 ml-[-2px]" />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-30 hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all shadow-lg hover:scale-105"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-8 h-8 ml-[2px]" />
                </button>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-[100%] flex flex-col justify-center py-16 lg:py-14 min-h-[90vh] lg:min-h-[85vh]">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">

                    {/* Left Content */}
                    <div className="flex-1 lg:flex-[1.2] max-w-2xl text-center lg:text-left">
                        <div className="h-[100%] flex flex-col justify-center">
                            <AnimatePresence mode='wait' custom={direction}>
                                <motion.div
                                    key={currentSlide}
                                    custom={direction}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
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
