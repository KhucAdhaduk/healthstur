'use client';

import { Check, Star, Zap, Crown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const plansData = {
    '3 Months': [
        {
            name: "Basic",
            description: "Disciplined individuals who just need a structured roadmap.",
            price: "79",
            features: [
                "Personalized Diet Plan",
                "Customized Workout Plan",
                "Lifestyle Habit Guide",
                "Supplement Suggestions",
                "PDF/Tracker Access",
                "One-Time Expert Assessment"
            ],
            support: [
                "No weekly calls",
                "Email/chat support (limited)"
            ],
            positioning: [
                "Affordable entry program",
                "High scalability",
                "Low operational effort"
            ],
            icon: Star,
            highlighted: false,
            buttonText: "BUY NOW",
            image: "/Pricing1.png"
        },
        {
            name: "Pro",
            description: "People who need accountability and adjustments.",
            price: "149",
            features: [
                "Weekly Check in",
                "Plan Adjustments",
                "Habit Tracking Monitoring",
                "Priority Chat Support",
                "Monthly Body Composition Review"
            ],
            support: [
                "Weekly review feedback",
                "Faster response time"
            ],
            positioning: [
                "Most popular package",
                "Balanced automation + human support"
            ],
            icon: Zap,
            highlighted: true,
            buttonText: "BUY NOW",
            image: "/Pricing2.jpg"
        },
        {
            name: "Elite",
            description: "Busy professionals, serious transformations, medical cases.",
            price: "299",
            features: [
                "Dedicated 1:1 Coach",
                "Weekly Video Consultation",
                "Real-Time Plan Modifications",
                "Deep Lifestyle Optimization",
                "Stress & Mindset Coaching",
                "Priority WhatsApp Support",
                "Custom Supplement & Recovery Strategy"
            ],
            support: [
                "Direct coach access",
                "High accountability",
                "Close progress monitoring"
            ],
            positioning: [
                "Premium transformation",
                "High-touch service",
                "High-ticket offering"
            ],
            icon: Crown,
            highlighted: false,
            buttonText: "BUY NOW",
            image: "/Pricing3.png"
        }
    ],
    '6 Months': [
        {
            name: "Basic",
            description: "Commit to a 6-month journey for better consistency.",
            price: "69",
            features: [
                "Personalized Diet Plan",
                "Customized Workout Plan",
                "Lifestyle Habit Guide",
                "Supplement Suggestions",
                "PDF/Tracker Access",
                "Two Expert Assessments"
            ],
            support: [
                "Monthly check-in call",
                "Email/chat support"
            ],
            positioning: [
                "Better value for money",
                "Medium term commitment",
                "Consistent progress"
            ],
            icon: Star,
            highlighted: false,
            buttonText: "BUY NOW",
            image: "/Pricing1.png"
        },
        {
            name: "Pro",
            description: "Serious results with sustained accountability.",
            price: "129",
            features: [
                "Weekly Check in",
                "Bi-Weekly Plan Adjustments",
                "Habit Tracking Monitoring",
                "Priority Chat Support",
                "Monthly Depth Review"
            ],
            support: [
                "Weekly review feedback",
                "Faster response time"
            ],
            positioning: [
                "Most popular for transformation",
                "Sustainable results"
            ],
            icon: Zap,
            highlighted: true,
            buttonText: "BUY NOW",
            image: "/Pricing2.jpg"
        },
        {
            name: "Elite",
            description: "Total lifestyle overhaul with dedicated support.",
            price: "279",
            features: [
                "Dedicated 1:1 Coach",
                "Weekly Video Consultation",
                "Real-Time Plan Modifications",
                "Deep Lifestyle Optimization",
                "Stress & Mindset Coaching",
                "Priority WhatsApp Support",
                "Specific Event Prep"
            ],
            support: [
                "Direct coach access",
                "High accountability",
                "Close progress monitoring"
            ],
            positioning: [
                "Premium transformation",
                "High-touch service",
                "High-ticket offering"
            ],
            icon: Crown,
            highlighted: false,
            buttonText: "BUY NOW",
            image: "/Pricing3.png"
        }
    ],
    '12 Months': [
        {
            name: "Basic",
            description: "A full year of structured guidance for discipline.",
            price: "59",
            features: [
                "Personalized Diet Plan",
                "Customized Workout Plan",
                "Lifestyle Habit Guide",
                "Supplement Suggestions",
                "PDF/Tracker Access",
                "Quarterly Expert Assessment"
            ],
            support: [
                "Quarterly check-in call",
                "Email/chat support"
            ],
            positioning: [
                "Best long-term value",
                "High scalability",
                "Lifestyle integration"
            ],
            icon: Star,
            highlighted: false,
            buttonText: "BUY NOW",
            image: "/Pricing1.png"
        },
        {
            name: "Pro",
            description: "The ultimate accountability for a year of change.",
            price: "109",
            features: [
                "Weekly Check in",
                "Plan Adjustments",
                "Habit Tracking Monitoring",
                "Priority Chat Support",
                "Quarterly Deep Dive Review"
            ],
            support: [
                "Weekly review feedback",
                "Faster response time"
            ],
            positioning: [
                "Complete transformation",
                "Year-round support"
            ],
            icon: Zap,
            highlighted: true,
            buttonText: "BUY NOW",
            image: "/Pricing2.jpg"
        },
        {
            name: "Elite",
            description: "Executive level coaching for peak performance.",
            price: "249",
            features: [
                "Dedicated 1:1 Coach",
                "Weekly Video Consultation",
                "Real-Time Plan Modifications",
                "Deep Lifestyle Optimization",
                "Stress & Mindset Coaching",
                "Priority WhatsApp Support",
                "Annual Health Roadmap"
            ],
            support: [
                "Direct coach access",
                "High accountability",
                "Close progress monitoring"
            ],
            positioning: [
                "Premium transformation",
                "VIP Service",
                "High-ticket offering"
            ],
            icon: Crown,
            highlighted: false,
            buttonText: "BUY NOW",
            image: "/Pricing3.png"
        }
    ]
};

export default function PricingSection() {
    const [duration, setDuration] = useState<'3 Months' | '6 Months' | '12 Months'>('3 Months');
    const durations: ('3 Months' | '6 Months' | '12 Months')[] = ['3 Months', '6 Months', '12 Months'];

    const currentPlans = plansData[duration];

    return (
        <section className="pb-18 md:pb-28 pt-10 md:pt-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h5 className="text-[#023051] font-bold tracking-widest uppercase text-sm mb-3">FLEXIBLE PRICING</h5>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#023051] mb-6">Invest In Your Health.</h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
                        Choose the plan that fits your goals. Transparency is our policy.
                    </p>
                </div>

                {/* Duration Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white rounded-full border border-gray-300 p-1 relative">
                        {durations.map((d) => (
                            <button
                                key={d}
                                onClick={() => setDuration(d)}
                                className={`relative z-10 px-6 py-3 rounded-full cursor-pointer text-base font-bold transition-colors duration-300 ${duration === d ? 'text-white' : 'text-[#023051] hover:text-[#023051]/80'
                                    }`}
                            >
                                {d}
                                {duration === d && (
                                    <motion.div
                                        layoutId="activeDuration"
                                        className="absolute inset-0 bg-[#023051] rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 items-stretch max-w-7xl mx-auto">
                    {currentPlans.map((plan, index) => (
                        <motion.div
                            key={`${duration}-${index}`} // Key change triggers animation re-mount for smooth transition
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-[32px] p-6 md:p-8 flex flex-col border transition-all duration-300 bg-white text-[#023051] border-gray-300 z-0 hover:text-white hover:border-transparent hover:shadow-xl`}
                        >
                            {/* Hover Background Image */}
                            <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${plan.image})` }}
                                />
                                <div className="absolute inset-0 bg-[#023051]/75" />
                            </div>

                            {/* Most Popular Badge */}
                            {plan.highlighted && (
                                <div className="absolute top-0 right-0 bg-[#023051] text-white px-5 py-2 rounded-bl-xl rounded-tr-[31px] text-xs font-bold uppercase tracking-widest shadow-sm z-20 group-hover:bg-white group-hover:text-[#023051] transition-colors duration-300">
                                    MOST POPULAR
                                </div>
                            )}

                            {/* Icon */}
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 bg-[#F0F4F9] text-[#023051] group-hover:bg-white/10 group-hover:text-white">
                                <plan.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                            </div>

                            {/* Plan Info */}
                            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 transition-colors duration-300 text-[#023051] group-hover:text-white">{plan.name}</h3>
                            <p className="text-sm md:text-base mb-6 leading-relaxed transition-colors duration-300 text-gray-500 group-hover:text-gray-300">
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl md:text-5xl font-extrabold mr-2 transition-colors duration-300 text-[#023051] group-hover:text-white">${plan.price}</span>
                                <span className="text-sm font-semibold transition-colors duration-300 text-gray-400 group-hover:text-gray-300">/Monthly</span>
                            </div>

                            <hr className="mb-6 transition-colors duration-300 border-gray-200 group-hover:border-white/30" />

                            <div className="flex-grow">
                                {/* What's Included */}
                                <h4 className="font-bold text-base mb-4 transition-colors duration-300 text-[#023051] group-hover:text-white">What’s Included:</h4>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="rounded-full p-0.5 mt-0.5 shrink-0 transition-colors duration-300 bg-[#023051] text-white group-hover:bg-white group-hover:text-[#023051]">
                                                <Check className="w-3 h-3" strokeWidth={3} />
                                            </div>
                                            <span className="text-sm font-semibold leading-tight transition-colors duration-300 text-[#023051] group-hover:text-white">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Support Level */}
                                {plan.support && (
                                    <>
                                        <h4 className="font-bold text-base mb-4 transition-colors duration-300 text-[#023051] group-hover:text-white">Support Level:</h4>
                                        <ul className="space-y-3 mb-6">
                                            {plan.support.map((item, idx) => (
                                                <li key={idx} className="text-sm font-medium leading-tight transition-colors duration-300 text-gray-600 group-hover:text-gray-300">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/* Positioning */}
                                {plan.positioning && (
                                    <>
                                        <h4 className="font-bold text-base mb-4 transition-colors duration-300 text-[#023051] group-hover:text-white">Positioning:</h4>
                                        <ul className="space-y-3 mb-8">
                                            {plan.positioning.map((item, idx) => (
                                                <li key={idx} className="text-sm font-medium leading-tight transition-colors duration-300 text-gray-600 group-hover:text-gray-300">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>

                            {/* Button */}
                            <button className="w-full py-4 rounded-xl font-bold cursor-pointer text-sm tracking-wider uppercase transition-all duration-300 mt-auto bg-[#eff5fc] text-[#023051] hover:bg-[#E2E8F0] group-hover:bg-white group-hover:text-[#023051] group-hover:hover:bg-gray-100">
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

