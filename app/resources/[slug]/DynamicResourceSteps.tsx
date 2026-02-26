'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Step {
    id: number;
    title: string;
    description: string;
    points: string[];
    footer?: string;
    image?: string;
}

interface DynamicResourceStepsProps {
    steps: Step[];
}

export default function DynamicResourceSteps({ steps }: DynamicResourceStepsProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <section className="py-12 md:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="space-y-12 md:space-y-18">
                    {steps.map((step, index) => {
                        const defaultImage = "/Wellness1.svg"; // Fallback
                        const stepImage = step.image
                            ? (step.image.startsWith('http') ? step.image : `${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')}${step.image}`)
                            : defaultImage;

                        return (
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
                                            Step - {index + 1}
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
                                        {(step.points || []).map((point, idx) => (
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
                                    <div className="relative w-full aspect-[4/4] md:aspect-[4/5] lg:aspect-square max-w-[350px] sm:max-w-[450px] md:max-w-[450px] flex items-center justify-center">
                                        <Image
                                            src={stepImage}
                                            alt={step.title}
                                            fill
                                            unoptimized
                                            className="object-cover rounded-3xl"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
