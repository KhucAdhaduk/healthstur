'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

const programs = [
    {
        id: "immunity-boosting",
        title: "Immunity Boosting Herbs",
        description: "Strong immunity helps the body defend against infections and common illnesses. It reduces frequent fatigue and supports faster recovery. A resilient immune system lowers the risk of lifestyle-related disorders. Consistent nutrition and healthy habits are key to maintaining immune strength.",
        approach: "Guided use of natural herbs and immunity-supportive spices for holistic support. Balanced nutrition tailored to strengthen the body’s natural defense system. Lifestyle corrections aligned with individual body types and daily routines. A personalized approach to build resilience, vitality, and long-term wellness.",
        benefits: "Stronger immune response, improved vitality, better digestion, and enhanced overall resilience.",
        image: "/Ayurveda1.jpg"
    },
    {
        id: "ayurvedic-morning",
        title: "Ayurvedic Morning Routine",
        description: "How you begin your morning sets the tone for your metabolism and energy levels. Healthy early habits support smoother digestion and nutrient absorption. A mindful start enhances mental clarity and focus. Strong morning routines create momentum for a productive, balanced day.",
        approach: "Structured morning rituals begin with proper hydration to activate metabolism. Cleansing practices support digestion and internal balance. Light movement and breathing exercises improve circulation and mental clarity. Mindful nutrition choices set a strong, energized tone for the day ahead.",
        benefits: " Improved digestion, sharper focus, better energy flow, and balanced daily rhythm.",
        image: "/Ayurveda2.jpg"
    },
    {
        id: "seasonal-detox",
        title: "Seasonal Detox",
        description: "Seasonal changes influence immunity and the body’s natural defense system. Digestion patterns may shift due to temperature and routine variations. Energy levels can fluctuate with climate and daylight exposure. Adapting nutrition and lifestyle habits seasonally supports overall balance.",
        approach: "Season-specific dietary adjustments to align with changing climate and body needs. Light cleansing protocols to support digestion and metabolic balance. Herbal support tailored to enhance immunity and vitality. Restorative practices that help maintain energy and overall well-being year-round.",
        benefits: "Reduced toxin buildup, improved gut health, stronger immunity, and smoother adaptation to seasonal changes.",
        image: "/Ayurveda3.jpg"
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
                        Traditional Ayurveda for Modern Wellness
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        Discover natural herbal remedies and daily wellness practices inspired by authentic Ayurvedic principles. Achieve harmony between body and mind through safe, balanced, and sustainable healing methods.
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
