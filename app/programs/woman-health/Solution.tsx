'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

const programs = [
    {
        id: "pcos",
        title: "Managing PCOS/PCOD Naturally",
        description: "PCOS/PCOD disrupts hormonal balance and impacts metabolism. It can contribute to weight fluctuations and persistent skin concerns. Menstrual irregularities are a common symptom. Fertility may also be affected without proper lifestyle and nutritional support.",
        approach: "Insulin-balancing meal plans designed to stabilize blood sugar and support hormonal health. Anti-inflammatory nutrition to reduce internal stress and improve metabolic function. Structured strength training to enhance insulin sensitivity and body composition. Lifestyle corrections focused on stress management and quality sleep for sustainable results.",
        benefits: "Improved cycle regularity, reduced symptoms, better weight control, and enhanced hormonal stability.",
        image: "/Woman1.jpg"
    },
    {
        id: "menopause",
        title: "Menopause Wellness",
        description: "Menopause involves significant hormonal shifts that influence metabolism and body composition. Bone density may decline, increasing the risk of weakness or fractures. Mood fluctuations and energy changes are also common during this phase. Heart health becomes a key priority for long-term well-being.",
        approach: "Calcium and protein-optimized nutrition to support bone strength and muscle preservation. Targeted strength training programs designed to protect bone density.Structured routines that enhance stability and functional strength. Stress-management practices to support hormonal balance and overall well-being.",
        benefits: "Reduced hot flashes, better energy levels, improved bone strength, and stable weight management.",
        image: "/Woman2.jpg"
    },
    {
        id: "postnatal",
        title: "Postnatal Fitness & Nutrition Guide",
        description: "Post-delivery recovery demands nutrient-rich support for healing and energy restoration. Gradual muscle rebuilding helps regain strength and core stability. Balanced nutrition plays a key role in restoring hormonal equilibrium. A structured approach ensures safe, sustainable recovery and long-term wellness.",
        approach: "Gradual fitness progression to rebuild strength safely after delivery. Core restoration exercises focused on stability and pelvic support. Lactation-supportive nutrition to maintain energy and milk quality. Safe, structured fat-loss guidance for sustainable postnatal recovery.",
        benefits: " Stronger core, healthy weight recovery, improved stamina, and enhanced emotional well-being.",
        image: "/Woman3.jpg"
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
                        Empowering Women Through Smart Health & Nutrition
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        Specialized workout and diet plans tailored to women’s unique body needs and life stages. Support your wellness with balanced nutrition, hormonal care, and sustainable fitness routines.
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
