'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

const programs = [
    {
        id: "desk-job-fitness",
        title: "Desk Job Fitness Routine",
        description: "Long sitting hours place continuous strain on the spine and lower back. Reduced movement slows metabolism, increasing the risk of weight gain. It also contributes to poor posture and muscular imbalances. Over time, energy levels drop and overall productivity declines.",
        approach: "Short, practical movement routines tailored for office environments. Focused on improving mobility and reducing stiffness from prolonged sitting. Core-strengthening exercises to support spinal stability. Posture-correction drills that enhance alignment, comfort, and daily productivity.",
        benefits: "Reduced stiffness, improved energy levels, better posture, and increased workplace productivity.",
        image: "/Corporate1.jpg"
    },
    {
        id: "meal-planning-for-professionals",
        title: "Meal Planning for Professionals",
        description: "Irregular meals disrupt energy levels and reduce mental focus. Frequent unhealthy snacking can slow metabolism and increase cravings. Over time, these habits negatively impact long-term health and weight balance. Structured, balanced nutrition helps restore stability and sustained performance.",
        approach: "Time-efficient, balanced meal plans designed around demanding work schedules. Adapted to fit travel routines and irregular timings without compromising nutrition. Structured to manage stress-related eating and support steady energy levels. Helping you stay consistent, focused, and in control of your health.",
        benefits: "Stable energy, better concentration, controlled weight, and improved metabolic health.",
        image: "/Corporate2.jpg"
    },
    {
        id: "office-stretches-eye-care",
        title: "Office Stretches & Eye Care",
        description: "Extended screen exposure increases eye strain and visual fatigue. Static posture contributes to headaches and neck stiffness. Prolonged tension in the shoulders and back worsens discomfort. Regular posture breaks and eye care habits help reduce long-term strain.",
        approach: "Guided micro-break stretches to release tension during work hours. Posture reset techniques to realign the spine and shoulders. Simple breathing exercises to reduce stress and improve focus. Eye relaxation practices to ease strain from prolonged screen exposure.",
        benefits: "Reduced fatigue, fewer headaches, improved circulation, and better comfort during long work hours.",
        image: "/Corporate3.jpg"
    },
    {
        id: "mental-health-at-workplace",
        title: "Mental Health at Workplace",
        description: "Chronic stress and burnout reduce mental clarity and productivity. They drain motivation and make daily tasks feel overwhelming. Over time, performance declines and physical health may suffer. Managing stress is essential for sustained success and overall well-being.",
        approach: "Work-life balance strategies designed to create healthier daily routines. Practical stress-management techniques to improve emotional resilience. Mindfulness practices that enhance focus, clarity, and inner stability. Wellness education sessions to build long-term awareness and sustainable habits.",
        benefits: "Improved focus, reduced stress, stronger team morale, and healthier workplace culture.",
        image: "/Corporate4.jpg"
    }
];

export default function Solutions() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState('');

    const handleStartNow = (programTitle: string) => {
        setSelectedProgram(programTitle);
        setIsDialogOpen(true);
    };

    return (
        <section className="pt-12 md:pt-20 pb-4 md:pb-4 bg-white">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#0F172A]">
                        Smart Workplace Health & Wellness Programs
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        Boost employee energy, reduce stress, and improve productivity with customized fitness and nutrition plans. Designed specifically for corporate teams seeking sustainable wellness results.
                    </p>
                </div>

                {/* Programs List */}
                <div className="space-y-8 md:space-y-12">
                    {programs.map((program, index) => (
                        <motion.div
                            id={program.id}
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className={`scroll-mt-34 lg:scroll-mt-30 flex flex-col lg:flex-row items-start gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Image */}
                            <div className="w-[60%] mx-auto lg:mx-0 lg:w-[22%] flex-shrink-0 relative">
                                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden">
                                    <Image
                                        src={program.image}
                                        alt={program.title}
                                        fill
                                        className="object-cover"
                                        unoptimized // Needed for placeholder images
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full lg:w-[78%] space-y-4 mt-2">
                                <h3 className="text-xl md:text-2xl font-bold text-[#0F172A]">
                                    {program.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {program.description}
                                </p>

                                <div className="space-y-3 pt-1">
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] text-sm md:text-base mb-1">Healthstura's Approach:</h4>
                                        <p className="text-gray-600 text-sm">{program.approach}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] text-sm md:text-base mb-1">Results:</h4>
                                        <p className="text-gray-600 text-sm">{program.benefits}</p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        onClick={() => handleStartNow(program.title)}
                                        className="bg-[#023051] cursor-pointer text-white px-6 py-2 rounded-full font-bold hover:bg-[#023051]/90 transition-all shadow-lg text-xs md:text-sm"
                                    >
                                        Start Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <StartApplicationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                selectedProgram={selectedProgram}
            />
        </section>
    );
}
