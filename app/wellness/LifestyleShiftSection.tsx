'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Activity, Sparkles, Heart, User } from 'lucide-react';

const benefits = [
    {
        id: 1,
        title: "Sustainable Weight Loss",
        icon: TrendingUp,
        color: '#06A76C'
    },
    {
        id: 2,
        title: "Increased Strength & Stamina",
        icon: Zap,
        color: '#E49A34'
    },
    {
        id: 3,
        title: "Hormonal Balance Support",
        icon: Activity,
        color: '#71F226'
    },
    {
        id: 4,
        title: "Better Energy & Mental Clarity",
        icon: Sparkles,
        color: '#31C2BB'
    },
    {
        id: 5,
        title: "Confidence That Lasts",
        icon: Heart,
        color: '#E30000'
    },
    {
        id: 6,
        title: "Expert Accountability",
        icon: User,
        color: '#B779E6'
    }
];

export default function LifestyleShiftSection() {
    return (
        <section className="py-10 md:py-16 bg-[#0C2D48]"> {/* Dark Blue Background */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6"
                    >
                        We Don't Just Change Bodies; <br />
                        We Shift Lifestyles.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
                    >
                        With Healthstur expert-based guidance, you aren't just achieving a temporary goal. You are becoming the person who can maintain it for life.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        const isFilled = benefit.id !== 1 && benefit.id !== 3;

                        return (
                            <motion.div
                                key={benefit.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#1a3b5c]/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-[#1a3b5c]/70 transition-colors duration-300 group flex flex-col justify-center h-full"
                            >
                                <div className="mb-6">
                                    <Icon
                                        className="w-9 h-9"
                                        color={benefit.color}
                                        fill={isFilled ? benefit.color : "none"}
                                        strokeWidth={isFilled ? 1 : 1.5}
                                    />
                                </div>
                                <h3 className="text-xl md:text-1xl text-white">
                                    {benefit.title}
                                </h3>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
