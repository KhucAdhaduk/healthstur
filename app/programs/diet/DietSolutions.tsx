'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

const programs = [
    {
        id: "weight-loss",
        title: "Weight Loss",
        description: "Nutrition is the foundation of sustained energy, strong immunity, and balanced hormones. A well-structured diet helps prevent lifestyle disorders and supports long-term health. When you fuel your body right, your performance, focus, and overall well-being naturally improve.",
        approach: "We create personalized, sustainable meal plans tailored to your body type, goals, daily schedule, and medical conditions. Our approach focuses on real, wholesome foods, balanced portions, and long-term consistency—so results are practical, achievable, and lasting.",
        benefits: "Improved digestion, higher energy levels, better metabolism, and visible transformation within weeks.",
        image: "/Weight.svg"
    },
    {
        id: "muscle-gain",
        title: "Muscle Gain",
        description: "Lean muscle enhances overall strength and physical performance. It boosts metabolism, helping your body burn calories more efficiently. Improved muscle mass also supports better posture and balanced body composition.",
        approach: "We provide protein-optimized meal plans designed to support lean muscle growth and repair.Combined with strategic nutrition timing and proper recovery support, our approach maximizes performance, strength, and sustainable results.",
        benefits: "Lean muscle development, improved strength, faster recovery, and enhanced physique.",
        image: "/Muscle.svg"
    },
    {
        id: "3-meals-a-day",
        title: "3 Meals a Day (Veg / Non-Veg)",
        description: "Simple, structured meals make healthy eating easier to follow daily. They support better digestion by keeping portions balanced and timing consistent. Clear meal patterns also help prevent overeating and unnecessary snacking. Consistency becomes natural, leading to sustainable long-term results.",
        approach: "Well-balanced breakfast, lunch, and dinner plans tailored to your individual calorie needs. Includes both vegetarian and non-vegetarian options to match your preferences and lifestyle. Designed to ensure proper nutrition and portion control.",
        benefits: "Stable energy levels, controlled hunger, and easier adherence.",
        image: "/Meal.svg"
    },
    {
        id: "busy-routine-hacks",
        title: "Busy Routine Hacks",
        description: "Inconsistent eating patterns disrupt energy levels and lead to constant fatigue. Skipping meals or irregular timing increases cravings and poor food choices. This imbalance often slows metabolism and promotes unwanted weight gain. Structured eating habits help restore stability.",
        approach: "Quick-prep, time-efficient meals tailored for busy professionals and entrepreneurs. Designed to save time without compromising on nutrition or taste. Helping you stay energized, productive, and consistent despite a demanding schedule.",
        benefits: "Better productivity, improved focus, and controlled weight despite hectic schedules.",
        image: "/Busy.svg"
    },
    {
        id: "healthy-snacking",
        title: "Healthy Snacking",
        description: "Smart snacking helps control hunger between meals. It prevents overeating and reduces sudden cravings. Balanced snacks also stabilize blood sugar levels throughout the day. This supports steady energy, better focus, and improved weight management.",
        approach: "Nutrient-dense snack options designed to fuel your body the right way. Carefully portion-controlled to support weight management and energy balance. Customized to match your lifestyle, preferences, and fitness goals.",
        benefits: "Reduced cravings, balanced metabolism, and sustained energy.",
        image: "/Healthy.svg"
    },
    {
        id: "pcos-pcod-friendly",
        title: "PCOS/PCOD Friendly",
        description: "Hormonal imbalance can disrupt weight management and slow metabolism. It often affects mood, energy levels, and emotional stability. Reproductive health and fertility may also be impacted over time. Balanced nutrition and lifestyle habits play a key role in restoring harmony.",
        approach: "Low-inflammatory, insulin-balancing meal plans designed to support natural hormonal regulation. Focused on whole foods that reduce stress on the body and improve metabolic balance.Helping restore stability, energy, and long- term wellness naturally.",
        benefits: "Improved cycle regularity, reduced symptoms, and better weight control.",
        image: "/PCOD.svg"
    },
    {
        id: "thyroid-friendly",
        title: "Thyroid Friendly",
        description: "Thyroid health plays a key role in regulating metabolism and calorie burn. Imbalances can lead to low energy, fatigue, and sluggish body functions. It directly influences weight stability and overall hormonal balance. Proper nutrition and lifestyle support are essNutrient-focused diet supporting thyroid function without extreme restrictions.ential for optimal thyroid function.",
        approach: "A nutrient-focused diet designed to naturally support healthy thyroid function. Emphasizes essential vitamins and minerals without extreme restrictions or fad approaches. Promotes sustainable energy, balanced metabolism, and long-term well-being.",
        benefits: "Improved metabolism, better energy levels, and stable weight.",
        image: "/Thyroid.svg"
    },
    {
        id: "diabetes-friendly",
        title: "Diabetes Friendly",
        description: "Maintaining blood sugar control reduces the risk of serious long-term complications. Stable levels support consistent energy and better daily functioning. It also improves mood, focus, and metabolic health. Balanced habits ultimately enhance overall quality of life.",
        approach: "Low-glycemic meal planning designed to keep blood sugar levels stable. Balanced carbohydrate distribution with mindful portion awareness. Strategic timing to support steady energy and better metabolic control.",
        benefits: "Stable sugar levels, reduced insulin spikes, and improved overall health markers.",
        image: "/Diabetes.svg"
    },
    {
        id: "meals-for-busy-professionals",
        title: "Meals for Busy Professionals",
        description: "Performance, focus, and stamina begin with the right nutrition. Proper fueling supports sustained energy throughout the day. Balanced meals enhance mental clarity and physical endurance. When nutrition is optimized, productivity and resilience naturally improve.",
        approach: "Practical meal structures designed for busy schedules and on-the-go lifestyles.Travel-friendly and office-friendly options that require minimal preparation. Helping you stay consistent with nutrition wherever your day takes you.",
        benefits: "Higher productivity, consistent energy, and improved work-life-health balance.",
        image: "/Professionals.svg"
    }
];

export default function DietSolutions() {
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
                        Complete Diet & Nutrition Solutions
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        Simple, safe, and sustainable nutrition plans tailored to your specific lifestyle, health conditions, and fitness goals.
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
                                <div className="relative aspect-[3/4] w-full overflow-hidden">
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
