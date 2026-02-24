'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

const programs = [
    {
        id: "thyroid-disorders",
        title: "Thyroid Disorders",
        description: "Thyroid imbalance disrupts metabolism and affects calorie regulation. It often leads to weight fluctuations and low energy levels. Mood changes and mental fog may also occur. Targeted nutrition and lifestyle support help restore metabolic balance.",
        approach: "Metabolism-supportive nutrition designed to enhance energy production and hormonal balance. Micronutrient optimization including iodine, selenium, and adequate protein intake.Structured strength training to maintain muscle mass and metabolic efficiency.Stress regulation strategies to protect thyroid function and overall well- being.",
        benefits: "Improved energy, better weight stability, enhanced metabolism, and balanced lifestyle management.",
        image: "/Health1.jpg"
    },
    {
        id: "joint-pain",
        title: "Joint Pain Relief & Mobility",
        description: "Joint stiffness and inflammation restrict natural movement and flexibility. They reduce overall strength and physical performance. Daily tasks can become uncomfortable or painful over time. Targeted mobility work and anti-inflammatory support help restore comfort and function.",
        approach: "Anti-inflammatory nutrition to reduce joint stress and internal inflammation. Low-impact strength training to build stability without overloading the joints. Targeted mobility drills to improve range of motion and flexibility. Posture correction routines to enhance alignment and long-term comfort.",
        benefits: "Reduced pain, improved flexibility, stronger joint support, and enhanced daily movement.",
        image: "/Health2.jpg"
    },
    {
        id: "hypertension-therapy",
        title: "Hypertension Therapy",
        description: "High blood pressure places excessive strain on the heart and blood vessels. Over time, it significantly increases the risk of heart disease. It also raises the likelihood of stroke and other cardiovascular complications. Early lifestyle management plays a crucial role in prevention and control.",
        approach: "Low-sodium, heart-friendly nutrition planning to support healthy blood pressure levels. Guided cardio routines designed to strengthen cardiovascular endurance safely. Breathing techniques to improve oxygen efficiency and relaxation. Stress-management practices that protect heart health and promote long-term balance.",
        benefits: "Improved blood pressure control, better heart health, reduced stress levels, and sustainable lifestyle improvements.",
        image: "/Health3.jpg"
    },
    {
        id: "beginners",
        title: "Beginners & Intermediate",
        description: "Starting with proper guidance ensures correct technique and body alignment. It reduces the risk of injury and unnecessary strain. A strong foundation builds confidence and consistency. This approach supports safe, sustainable long-term practice.",
        approach: "Step-by-step asana progression designed to match your current fitness level. Guided pranayama techniques to improve breathing control and mental clarity. Gradual flexibility development to enhance mobility safely. Structured practice that builds strength, balance, and long-term confidence.",
        benefits: "Improved flexibility, better posture, enhanced breathing capacity, and increased body awareness.",
        image: "/Health4.jpg"
    },
    {
        id: "special-guide",
        title: "Special Guide",
        description: "Specific goals such as stress relief or weight management require targeted strategies. Hormonal balance demands structured nutrition and mindful lifestyle support. Back pain improvement depends on corrective exercises and mobility work. Focused practice ensures safe, measurable, and sustainable results.",
        approach: "Customized yoga sequences tailored to individual health conditions. Designed to align with your lifestyle, schedule, and fitness level. Focused on addressing specific goals safely and effectively. Promoting balance, flexibility, strength, and long-term well-being.",
        benefits: "Targeted relief, improved balance, better energy flow, and sustainable mind-body harmony.",
        image: "/Health5.jpg"
    },
    {
        id: "healing-exercises",
        title: "Healing, Exercises & Regular Practices",
        description: "Consistency in mindful movement enhances physical and immune resilience. Regular meditation supports mental clarity and emotional balance. Together, they reduce stress and improve overall well-being. Sustained practice builds long-term stability, focus, and inner strength.",
        approach: "A balanced combination of therapeutic yoga to support physical healing and mobility. Guided meditation sessions to enhance mental clarity and emotional balance. Relaxation techniques that reduce stress and nervous system overload. Structured daily practice plans to build consistency and long-term well-being.",
        benefits: "Reduced stress, improved focus, balanced emotions, stronger immunity, and long-term inner wellness.",
        image: "/Health6.jpg"
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
                        Personalized Care Programs for Specific Health Needs
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        Customized workout and diet strategies built around individual health conditions and recovery goals. Designed to help you improve strength, balance, and well-being safely.
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
