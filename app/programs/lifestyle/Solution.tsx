'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

const programs = [
    {
        id: "wellness-challenge",
        title: "28 Days Wellness Challenge (Habit Building)",
        description: "Lasting habits are built through consistent repetition and discipline. Small daily actions create powerful long-term change. Breaking unhealthy patterns requires awareness and steady commitment. Consistency transforms effort into sustainable lifestyle success.",
        approach: "A structured 28-day plan designed to build discipline and lasting results. Combines nutrition consistency, regular workouts, and hydration tracking. Step-by-step guidance to create sustainable daily habits. Aligned with mindset development for long-term transformation and accountability.",
        benefits: "Stronger discipline, visible physical changes, improved energy, and sustainable lifestyle transformation.",
        image: "/Life1.jpg"
    },
    {
        id: "sleep-screen-time-productivity",
        title: "Sleep, Screen Time & Productivity",
        description: "Poor sleep disrupts hormonal balance and slows metabolism. Excessive screen time reduces focus and mental clarity. Both can negatively affect mood and emotional stability. Improving sleep quality and digital habits supports overall health and performance.",
        approach: "Sleep optimization strategies to restore hormonal balance and energy levels. Digital detox guidelines to reduce screen-related stress and mental fatigue. Structured daily scheduling for better time management and consistency. Productivity- enhancing routines that support focus, efficiency, and overall well - being.",
        benefits: "Better sleep quality, sharper focus, balanced hormones, improved performance, and reduced fatigue.",
        image: "/Life2.jpg"
    },
    {
        id: "weekend-detox",
        title: "Weekend Detox",
        description: "Stress, processed foods, and irregular routines gradually take a toll on the body. Busy weeks often disrupt sleep, nutrition, and exercise consistency. These patterns can increase fatigue, cravings, and inflammation. Resetting habits early helps restore balance and prevent long-term health issues.",
        approach: "Light detox meal plans focused on whole, easily digestible foods. Strategic hydration practices to support natural cleansing and energy balance. Gentle mobility sessions to reduce stiffness and improve circulation. Relaxation techniques to reset the body, calm the mind, and restore balance.",
        benefits: "Improved digestion, reduced bloating, mental refresh, and renewed energy for the week ahead.",
        image: "/Life3.jpg"
    },
    {
        id: "healthy-routine-setup",
        title: "Healthy Routine Setup",
        description: "A structured daily routine brings clarity and stability to your schedule. It reduces stress by eliminating decision fatigue and unpredictability. Consistent habits become easier to maintain over time. This structure supports steady progress toward long-term health goals.",
        approach: "Personalized morning routines designed to boost energy, focus, and productivity. Evening routines structured to support recovery and quality sleep. Aligned with your work schedule and fitness commitments. Creating balance, consistency, and long-term sustainability in daily life.",
        benefits: "Greater productivity, reduced decision fatigue, consistent progress, and long-term wellness balance",
        image: "/Life4.jpg"
    },
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
                        Healthy Lifestyle Transformation Programs
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        Build powerful daily habits that improve your energy, productivity, sleep, and overall well-being. Our structured lifestyle programs help you create sustainable routines for long-term health and success.
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
