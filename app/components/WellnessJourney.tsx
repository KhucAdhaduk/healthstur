'use client';

import { Activity, ChevronRight, ClipboardList, FileText, TrendingUp } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "Your Details",
        description: "Share your biometrics, dietary preferences, and fitness goals in our comprehensive quiz.",
        icon: ClipboardList,
        color: '#D0B030'
    },
    {
        id: "02",
        title: "Get Custom Plan",
        description: "Our AI analyzes 50+ data points to generate your personalized nutrition and training roadmap.",
        icon: FileText,
        color: '#06A76C'
    },
    {
        id: "03",
        title: "Follow Diet & Workout",
        description: "Execute your daily tasks with meal prep instructions, and real-time support.",
        icon: Activity,
        color: '#B779E6'
    },
    {
        id: "04",
        title: "Track Progress",
        description: "Log your achievements and watch your body transform with detailed analytics and insights.",
        icon: TrendingUp,
        color: '#E30000'
    }
];

import { motion } from 'framer-motion';
import { useState } from 'react';
import ConsultationDialog from './ConsultationDialog';

// ... (imports remain)

export default function WellnessJourney() {
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);

    return (
        <section className="py-10 md:py-18 bg-[#023051] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-12"
                >
                    <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] mb-2 uppercase opacity-90">SIMPLE PROCESS</h3>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                        Your Journey to Wellness<br className="hidden md:block" /> Starts Here.
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-300 opacity-80 text-sm md:text-base leading-relaxed">
                        Complex science tailored into four simple steps. We handle the planning so you can focus on the execution.
                    </p>
                </motion.div>

                {/* Steps Container */}
                <div className="relative mb-12">
                    {/* Connecting Line (Desktop) */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[1.5px] bg-white z-0 origin-left"
                    ></motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 relative z-10 text-center">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="flex flex-col items-center group"
                            >
                                {/* Icon & Step Number Wrapper */}
                                <div className="relative flex flex-col items-center mb-15">
                                    {/* Icon Box */}
                                    <div className="w-18 h-18 md:w-[86px] md:h-[86px] rounded-3xl bg-[#03375f] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 z-10 border border-white/5">
                                        <step.icon className="w-8 h-8 md:w-9 md:h-9" style={{ color: step.color }} strokeWidth={1.5} />
                                    </div>

                                    {/* Step Pill - Absolutely positioned to overlap bottom half */}
                                    <div className="absolute -bottom-3 bg-white text-[#023051] text-[8px] md:text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md z-20">
                                        STEP {step.id}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="bg-[#03375f]/50 backdrop-blur-sm p-4 md:p-6 rounded-2xl w-full h-full border border-white/5 hover:bg-[#03375f] transition-colors duration-300">
                                    <h4 className="text-lg md:text-xl font-bold mb-4">{step.title}</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-12 md:mt-12"
                >
                    <button
                        onClick={() => setIsConsultationOpen(true)}
                        className="bg-white text-[#023051] px-10 py-4 cursor-pointer rounded-full font-bold text-lg inline-flex items-center gap-3 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl group active:scale-95"
                    >
                        Get Started
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
            <ConsultationDialog isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
        </section >
    );
}
