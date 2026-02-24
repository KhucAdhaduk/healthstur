'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

const programs = [
    {
        id: "children",
        title: "Children (Ages 5 – 12)",
        description: "Nutrition is the foundation of sustained energy, strong immunity, and balanced hormones. A well-structured diet helps prevent lifestyle disorders and supports long-term health. When you fuel your body right, your performance, focus, and overall well-being naturally improve.",
        approach: "We create personalized, sustainable meal plans tailored to your body type, goals, daily schedule, and medical conditions. Our approach focuses on real, wholesome foods, balanced portions, and long-term consistency—so results are practical, achievable, and lasting.",
        benefits: "Stronger immunity, improved focus, healthy growth patterns, and reduced risk of childhood obesity",
        image: "/Age1.jpg"
    },
    {
        id: "teenagers",
        title: "Teenagers (Ages 13 – 19)",
        description: "Rapid physical growth during this stage increases nutritional demands. Hormonal changes influence energy levels, mood, and body composition. Emotional development also requires stability and balanced support. Proper nutrition and structured fitness create a strong, healthy transition into adulthood.",
        approach: "Protein-balanced meals and iron-rich nutrition to support strength and energy. Guided fitness plans designed to enhance sports performance and improve posture. Building body confidence through structured, sustainable health habits.",
        benefits: "Better energy, improved academic focus, healthy body composition, and hormonal balance.",
        image: "/Age2.jpg"
    },
    {
        id: "young-adults",
        title: "Young Adults (20 – 30)",
        description: "Metabolism may be active during this phase, but it isn’t immune to poor habits. Lifestyle stress, irregular eating patterns, and lack of movement can disrupt balance. Over time, these factors may slow progress and impact long- term health.Consistent nutrition and regular activity are key to maintaining vitality.",
        approach: "Goal-based plans designed for fat loss, muscle gain, or improved endurance. Practical meal structures that fit seamlessly into work routines and social schedules. Helping you achieve results without sacrificing balance or lifestyle flexibility.",
        benefits: "Improved physique, higher stamina, better stress management, and strong metabolic health.",
        image: "/Age3.jpg"
    },
    {
        id: "adults",
        title: "Adults (31 – 45)",
        description: "Metabolism naturally begins to slow with age. Stress levels often increase due to personal and professional responsibilities. These changes can raise the risk of lifestyle-related disorders. Proactive nutrition and movement habits become essential for long-term health.",
        approach: "Balanced calorie control to support healthy weight management. Strength training focus to preserve muscle mass and metabolic efficiency. Hormone-supportive nutrition combined with sustainable lifestyle corrections for long-term wellness.",
        benefits: "Weight stability, improved muscle tone, better stress control, and reduced lifestyle disease risk.",
        image: "/Age4.jpg"
    },
    {
        id: "middle-aged",
        title: "Middle Aged (46 – 60)",
        description: "Hormonal shifts become more prominent and require targeted support. Joint health and mobility play a crucial role in daily comfort and independence. Maintaining bone density is essential to prevent long-term complications. Cardiovascular care becomes a key priority for sustained vitality and longevity.",
        approach: "Anti-inflammatory nutrition designed to support recovery and overall wellness. Calcium and protein optimization to protect bone health and preserve muscle mass. Low-impact strength and mobility programs to enhance flexibility, stability, and long-term function.",
        benefits: "Stronger bones, improved heart health, better flexibility, and sustained energy levels.",
        image: "/Age5.jpg"
    },
    {
        id: "seniors",
        title: "Seniors (60+)",
        description: "Preserving mobility is key to maintaining daily independence. Strong immunity supports resilience and overall well-being. Functional strength helps prevent falls and injuries. Together, these factors protect long-term quality of life.",
        approach: "Easy-to-digest, balanced meals that support comfort and proper nutrient absorption. Muscle-preserving protein intake to maintain strength and daily functionality. Gentle, functional fitness programs to improve mobility, balance, and independence.",
        benefits: "Better balance, reduced fall risk, improved digestion, and enhanced overall well-being.",
        image: "/Age6.jpg"
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
                        Personalized Fitness & Nutrition for Every Age
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        Tailored workout and diet plans designed to match the unique needs of every age group. From children to seniors, we ensure safe, effective, and goal-focused wellness programs for every life stage.
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
