"use client";

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookConsultationDialog from './BookConsultationDialog';

const SLIDES = [
    {
        id: 1,
        heading: "Nutrition & Diet",
        subtext: "Nutrition is the foundation of physical strength, mental clarity, and long-term health. The right balance of macronutrients and micronutrients fuels performance and prevents lifestyle diseases.",
        bullets: ["Sustainable weight management", "Improved digestion & metabolism", "Higher energy levels", "Stronger immunity"],
        background: "/Hero_Bg1.svg"
    },
    {
        id: 2,
        heading: "Age-Group Specific",
        subtext: "Different life stages require different nutrition and fitness approaches from growth and development to muscle maintenance and mobility support.",
        bullets: ["Supports healthy growth in youth", "Maintains muscle & bone density in adults", "Enhances mobility & vitality in seniors"],
        background: "/Hero_Bg2.svg"
    },
    {
        id: 3,
        heading: "Gym & Workouts",
        subtext: "Regular exercise strengthens the body, boosts mental resilience, and reduces the risk of chronic disease.",
        bullets: ["Fat loss & muscle gain", "Improved cardiovascular health", "Better posture & mobility", "Stress reduction"],
        background: "/Hero_Bg3.svg"
    },
    {
        id: 4,
        heading: "Corporate Wellness",
        subtext: "Employee health directly impacts productivity, morale, and long-term organizational success.",
        bullets: ["Reduced absenteeism", "Increased focus & productivity", "Better team morale", "Lower healthcare costs"],
        background: "/Hero_Bg4.svg"
    },
    {
        id: 5,
        heading: "Woman’s Health",
        subtext: "Women experience unique hormonal and physiological changes that require specialized care and attention.",
        bullets: ["Hormonal balance support", "Improved reproductive health", "Stronger bones & metabolism", "Stress & fatigue management"],
        background: "/Hero_Bg5.svg"
    },
    {
        id: 6,
        heading: "Health Specific Programs",
        subtext: "Targeted programs are essential for managing and improving specific health conditions safely and effectively.",
        bullets: ["Improved thyroid function support", "Reduced joint pain & better flexibility", "Controlled blood pressure levels", "Enhanced quality of life"],
        background: "/Hero_Bg6.svg"
    },
    {
        id: 7,
        heading: "Lifestyle Habits",
        subtext: "Daily habits shape long-term health outcomes. Small, consistent changes lead to lasting transformation.",
        bullets: ["Improved sleep quality", "Better stress management", "Enhanced mental clarity", "Long-term disease prevention"],
        background: "/Hero_Bg7.svg"
    },
    {
        id: 8,
        heading: "Ayurveda",
        subtext: "Ayurveda promotes balance between body, mind, and environment through natural healing principles.",
        bullets: ["Improved digestion & detoxification", "Strengthened immunity", "Balanced energy levelse", "Natural preventive care"],
        background: "/Hero_Bg8.svg"
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const slide = SLIDES[currentSlide];

    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-[85vh] overflow-hidden">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0 w-full h-full bg-cover bg-[65%_center] lg:bg-center"
                    style={{ backgroundImage: `url(${slide.background})` }}
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
                                        {slide.heading}
                                    </h1>

                                    {/* Subtext */}
                                    <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#000000] mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium opacity-90">
                                        {slide.subtext}
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
                                        <button
                                            onClick={() => setIsConsultationOpen(true)}
                                            className="w-full sm:w-auto group cursor-pointer flex items-center justify-center gap-2 bg-[#023051] text-white px-7 py-3 rounded-full text-base sm:text-lg font-bold hover:bg-[#023051]/95 transition-all shadow-xl hover:shadow-2xl active:scale-95"
                                        >
                                            <span>Start Transformation</span>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div >
            </div >
            <BookConsultationDialog isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
        </section >
    );
}
