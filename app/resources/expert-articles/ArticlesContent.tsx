'use client';

import { motion } from 'framer-motion';
import {
    Activity, Clock, User, Leaf, Dumbbell, BrainCircuit, CheckCircle2,
    TrendingUp, ShieldCheck, Plus, Smartphone, Sun, Moon, Brain,
    ClipboardList, CalendarCheck, MessageCircle, Infinity
} from 'lucide-react';

export default function ArticlesContent() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* 1. Expert-Designed Nutrition */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
                        Expert-Designed Nutrition: Precision Over Restriction
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Most people fail because they follow generic diet plans. At Healthstur, we design nutrition based on:
                    </p>

                    {/* Grid */}
                    <div className="bg-[#F3F5F6] border border-[#023051] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-10">
                        {[
                            "Body type & metabolic rate",
                            "Lifestyle & work schedule",
                            "Medical conditions",
                            "Food preferences"
                        ].map((text, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-[#023051] flex-shrink-0 stroke-[1.5]" />
                                <span className="font-semibold text-[#023051] text-lg">{text}</span>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Our Core Nutrition Principles:</h3>

                    {/* Badges Grid */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {[
                            "Balanced macronutrient distribution",
                            "Anti-inflammatory food combinations",
                            "Smart snacking strategies",
                            "Gut-health focused meal planning",
                            "Busy-professional friendly meal planning"
                        ].map((text, idx) => (
                            <span key={idx} className="flex items-center gap-3 bg-[#eef1f6] text-[#023051] px-6 py-4 rounded-xl text-base font-semibold shadow-sm">
                                <CheckCircle2 className="w-6 h-6 fill-[#023051] text-white" />
                                {text}
                            </span>
                        ))}
                    </div>

                    <p className="text-black font-medium">
                        Instead of crash diets, we focus on metabolic reset and habit formation.
                    </p>
                </div>

                {/* 2. Structured Training */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
                        Structured Training for Real Results
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Exercise without structure leads to burnout or injury. Healthstur experts design customized workout plans based on:
                    </p>

                    {/* Grid */}
                    <div className="bg-[#F3F5F6] border border-[#023051] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-10">
                        {[
                            "Fitness level (Beginner to Advance)",
                            "Goal (Fat Loss / Muscle Gain / Mobility)",
                            "Joint conditions & mobility limitations",
                            "Available time & environment"
                        ].map((text, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-[#023051] flex-shrink-0 stroke-[1.5]" />
                                <span className="font-semibold text-[#023051] text-lg">{text}</span>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">We combine:</h3>

                    {/* Badges Grid */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {[
                            "Strength training", "Functional workouts", "Yoga & recovery sessions",
                            "Cardio optimization", "Mobility drills"
                        ].map((text, idx) => (
                            <span key={idx} className="flex items-center gap-3 bg-[#eef1f6] text-[#023051] px-6 py-4 rounded-xl text-base font-semibold shadow-sm">
                                <CheckCircle2 className="w-6 h-6 fill-[#023051] text-white" />
                                {text}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-700 font-medium">
                        Our programs ensure consistency, progression, and injury prevention.
                    </p>
                </div>

                {/* 3. Lifestyle Correction */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
                        Lifestyle Correction: The Missing Link
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Transformation is incomplete without lifestyle alignment. Healthstur focuses on:
                    </p>

                    <div className="flex flex-wrap gap-4 mb-10">
                        {[
                            { icon: Smartphone, text: "Screen time regulation" },
                            { icon: Sun, text: "Circadian rhythm support" },
                            { icon: Moon, text: "Sleep optimization" },
                            { icon: Brain, text: "Stress management" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-[#eef1f6] text-[#023051] px-6 py-4 rounded-xl text-base font-semibold shadow-sm">
                                <item.icon className="w-6 h-6 text-[#023051]" />
                                <span className="font-semibold">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#023051] text-white p-8 rounded-2xl shadow-lg">
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-center">
                            Habit building through our structured 30-Day Wellness Model. Because true health is not built in the gym; it's built in daily habits.
                        </p>
                    </div>
                </div>

                {/* 4. Specialized Health Programs */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
                        Specialized Health Programs
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Healthstur experts provide condition-specific structured programs for:
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        {[
                            "PCOS / PCOD Natural Management",
                            "Joint Pain Relief & Mobility Therapy",
                            "Thyroid-Friendly Nutrition & Metabolic Balance",
                            "Hypertension Lifestyle Therapy",
                            "Women's Health (Menopause & Postnatal Care)"
                        ].map((text, idx) => (
                            <span key={idx} className="flex items-center gap-3 bg-[#eef1f6] text-[#023051] px-6 py-4 rounded-xl text-base font-semibold shadow-sm">
                                <ShieldCheck className="w-6 h-6 fill-[#023051] text-white" />
                                {text}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-700 font-medium">
                        Each program integrates clinical understanding with practical lifestyle execution.
                    </p>
                </div>

                {/* 5. The Healthstur Difference */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
                        The Healthstur Difference
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Unlike random fitness platforms, Healthstur provides:
                    </p>

                    <div className="flex flex-wrap gap-4 mb-10">
                        {[
                            { icon: ClipboardList, text: "Personalized assessment" },
                            { icon: CalendarCheck, text: "Accountability & habit tracking" },
                            { icon: MessageCircle, text: "Continuous expert guidance" },
                            { icon: TrendingUp, text: "Structured progress measurement" },
                            { icon: Infinity, text: "Long-term sustainability focus" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-[#eef1f6] text-[#023051] px-6 py-4 rounded-xl text-base font-semibold shadow-sm">
                                <item.icon className="w-6 h-6 text-[#023051]" />
                                <span className="font-semibold">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <p className="text-gray-600 text-lg">We don't just help you lose weight.</p>
                        <p className="text-gray-800 font-semibold text-lg">We help you build a system that keeps you healthy for life.</p>
                    </div>
                </div>

                {/* 6. Conclusion */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
                        Conclusion: Wellness Is a Commitment, Not a Shortcut
                    </h2>
                    <p className="text-black text-lg mb-6 leading-relaxed">
                        At Healthstur, we believe health is peak physical strength, mental clarity, emotional balance, and metabolic resilience. Through expert guidance, structured planning, and sustainable strategies, we help individuals transform not just their bodies but their lifestyles.
                    </p>
                    <p className="text-black text-xl font-semibold">
                        Because real wellness isn't temporary; it's a lifelong asset.
                    </p>
                </div>

            </div>
        </section>
    );
}
