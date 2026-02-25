'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const steps = [
    {
        id: 1,
        title: "Deep Goal & Lifestyle Assessment",
        description: "Our experts conduct a detailed evaluation covering:",
        points: [
            "Body metrics & health history",
            "Daily routine & work schedule",
            "Food preferences & dietary habits",
            "Stress levels & sleep patterns",
            "Personal fitness goals"
        ],
        footer: "This ensures we create a plan that is realistic, sustainable, and customized not generic.",
        image: "/Wellness1.svg"
    },
    {
        id: 2,
        title: "Personalized Nutrition Blueprint",
        description: "Our certified nutrition experts design meal plans tailored to:",
        points: [
            "Caloric & macronutrient requirements",
            "Medical conditions ( PCOS, thyroid )",
            "Food preferences & dietary habits",
            "Cultural & vegetarian preferences",
            "Busy professional lifestyles"
        ],
        footer: "No crash diets. No extreme restrictions. Just structured nourishment.",
        image: "/Wellness2.svg"
    },
    {
        id: 3,
        title: "Smart Fitness Programming",
        description: "Our fitness trainers develop goal-specific workout strategies:",
        points: [
            "Fat loss & body toning",
            "Muscle gain & strength building",
            "Postnatal recovery programs",
            "Low-impact knee-friendly workouts",
            "Beginner to advanced training levels"
        ],
        footer: "We ensure steady, safe, and measurable progress.",
        image: "/Wellness3.svg"
    },
    {
        id: 4,
        title: "Continuous Monitoring & Adjustments",
        description: "Progress isn't linear and that's okay. Our experts:",
        points: [
            "Track weekly progress",
            "Adjust calories and workouts",
            "Monitor strength, endurance & measurements",
            "Provide motivation and accountability"
        ],
        footer: "Your plan evolves as your body evolves.",
        image: "/Wellness4.svg"
    },
    {
        id: 5,
        title: "Mindset & Habit Transformation",
        description: "Sustainable success comes from mindset shifts. We guide clients to:",
        points: [
            "Build discipline without burnout",
            "Develop healthy routines",
            "Improve sleep & stress management",
            "Stay consistent even during busy phases"
        ],
        footer: "Because real results come from lifestyle change not temporary effort.",
        image: "/Wellness5.svg"
    }
];

export default function WellnessStepsSection() {
    return (
        <section className="py-12 md:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="space-y-12 md:space-y-18">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-10 lg:gap-16`}
                        >
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex-1 lg:flex-[1.4] space-y-5"
                            >
                                <div className="space-y-2">
                                    <span className="text-sm font-bold tracking-widest text-black uppercase">
                                        Step - {step.id}
                                    </span>
                                    <br />
                                    <span className="text-3xl md:text-4xl spanx-0 font-extrabold text-black leading-tight">
                                        {step.title}
                                    </span>
                                </div>

                                <p className="text-black text-lg leading-relaxed font-medium">
                                    {step.description}
                                </p>

                                <ul className="space-y-3">
                                    {step.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                                            <span className="text-black font-semibold">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-black text-sm font-medium pt-2">
                                    {step.footer}
                                </p>
                            </motion.div>

                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex-1 w-full relative flex justify-center items-center"
                            >
                                <div className="relative w-full aspect-[4/4] md:aspect-[4/5] lg:aspect-square max-w-[350px] sm:max-w-[450px] md:max-w-[450px] overflow-hidden rounded-3xl">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
