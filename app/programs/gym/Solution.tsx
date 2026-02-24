'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

const programs = [
    {
        id: "home-workout",
        title: "Home Workout",
        description: "Consistency matters more than location when it comes to fitness success. Home workouts eliminate travel time and common excuses. They make it easier to stay committed despite a busy schedule. Simple routines done regularly deliver powerful long-term results.",
        approach: "Equipment-free or minimal-equipment routines that are simple and effective. Designed to support fat loss and improve overall conditioning. Focused on toning muscles and building endurance gradually. Practical workouts you can follow anywhere with consistency.",
        benefits: " Improved strength, flexibility, and stamina all from the comfort of home.",
        image: "/Gym1.jpg"
    },
    {
        id: "beginner-to-intermediate",
        title: "Beginner to Intermediate",
        description: "Proper progression reduces the risk of injury and over training. Gradual increases in intensity allow the body to adapt safely. Structured growth builds strength, endurance, and stability over time. This steady progress also boosts confidence and long-term commitment.",
        approach: "Step-by-step structured plans designed for safe and effective progress. Strong emphasis on correct technique to prevent injury and improve performance. Gradual overload ensures steady strength and endurance development. Integrated recovery support promotes consistency and long-term results.",
        benefits: "Steady strength improvement, visible body transformation, and sustainable fitness growth.",
        image: "/Gym2.jpg"
    },
    {
        id: "strength-training",
        title: "Strength Training",
        description: "Strength training increases metabolic rate and supports efficient calorie burn. It builds lean muscle, enhancing overall body composition and strength. Regular training improves bone density and joint stability. It also plays an important role in supporting balanced hormonal health.",
        approach: "Personalized resistance training programs tailored to your specific goals. Whether focused on fat loss, muscle gain, or functional strength development. Structured progression ensures safe, measurable improvements. Designed to fit your fitness level, schedule, and long-term vision.",
        benefits: "Higher metabolism, better muscle tone, improved posture, and long-term body composition improvement.",
        image: "/Gym3.jpg"
    },
    {
        id: "stretches-mobility",
        title: "Stretches & Mobility",
        description: "Mobility training helps prevent stiffness caused by prolonged sitting and inactivity. It reduces the risk of injuries by improving joint range and movement control. Regular mobility work supports healthier, pain-free joints. Especially essential for those with sedentary lifestyles.",
        approach: "Targeted flexibility drills designed to improve range of motion and muscle elasticity. Mobility exercises that enhance joint stability and movement efficiency. Combined with recovery - focused routines to reduce soreness and fatigue.Supporting smoother movement, injury prevention, and long- term performance.",
        benefits: "Better movement, reduced pain, improved flexibility, and faster recovery.",
        image: "/Gym4.jpg"
    },
    {
        id: "zumba-fitness",
        title: "Zumba & Fitness",
        description: "Enjoyable workouts make it easier to stay consistent long term. When you enjoy the process, discipline becomes effortless. Regular movement strengthens the heart and improves circulation. This consistency boosts cardiovascular health and overall stamina.",
        approach: "Fun, high-energy dance-based fitness sessions that keep you motivated. Designed to burn calories while improving coordination and stamina. Upbeat routines naturally elevate mood and reduce stress. Making fitness feel exciting, not like a chore.",
        benefits: "Improved heart health, fat loss, stress reduction, and increased motivation.",
        image: "/Gym5.jpg"
    },
    {
        id: "posture-correction",
        title: "Posture Correction Exercises",
        description: "Poor posture places excessive strain on the neck and back. Over time, it can lead to chronic pain and muscle fatigue. Slouched alignment may also reduce breathing efficiency and energy levels.Maintaining proper posture improves comfort, confidence, and overall presence.",
        approach: "Corrective strengthening exercises designed to improve muscular balance. Focused on core activation for better spinal support. Targeted back and shoulder stability drills enhance posture and alignment. Helping reduce pain while improving strength and functional movement.",
        benefits: "Improved posture, reduced pain, stronger core, and enhanced physical presence.",
        image: "/Gym6.jpg"
    },
    {
        id: "desk-job-fitness",
        title: "Desk Job Fitness",
        description: "Long sitting hours reduce metabolic activity and calorie burn. Prolonged inactivity tightens hip flexors and weakens core muscles. It increases strain on the neck, shoulders, and lower back. Regular movement breaks are essential to protect posture and energy levels.",
        approach: "Quick movement breaks that fit easily into busy work schedules. Simple mobility routines to reduce stiffness from prolonged sitting. Targeted strength exercises to support posture and prevent muscle strain. Designed specifically for office professionals seeking practical, sustainable solutions.",
        benefits: "Reduced stiffness, better focus, improved energy, and lower risk of lifestyle disorders.",
        image: "/Gym7.jpg"
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
                        Smart Training Programs for Every Fitness Goal
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        From home workouts to advanced gym routines, our training plans are built to deliver visible results. Train smarter with guided exercises, proper progression, and performance tracking.
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
