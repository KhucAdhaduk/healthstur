'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import StartApplicationDialog from '@/app/components/StartApplicationDialog';

interface Solution {
    id: string;
    title: string;
    description: string;
    approach: string;
    benefits: string;
    priceIndia?: string;
    priceUsa?: string;
    priceEurope?: string;
    image: string;
}

interface DynamicSolutionsProps {
    heading: string;
    subtext: string;
    solutions: Solution[];
}

export default function DynamicSolutions({ heading, subtext, solutions }: DynamicSolutionsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [userCountry, setUserCountry] = useState<string | null>(null);

    useEffect(() => {
        // Hydrate initial country from local storage
        const savedCountry = localStorage.getItem('selectedCountry');
        if (savedCountry) {
            setUserCountry(savedCountry);
        }

        // Listen for country changes
        const handleCountryChange = () => {
            setUserCountry(localStorage.getItem('selectedCountry'));
        };

        window.addEventListener('countryChange', handleCountryChange);
        return () => {
            window.removeEventListener('countryChange', handleCountryChange);
        };
    }, []);

    const handleStartNow = (programTitle: string) => {
        setSelectedProgram(programTitle);
        setIsDialogOpen(true);
    };

    const getPriceDisplay = (program: Solution) => {
        if (!userCountry) return 'Start Now';

        if (userCountry === 'india' && program.priceIndia) {
            return `Start Now / ₹${program.priceIndia} Per 12 Week`;
        }
        if (userCountry === 'usa' && program.priceUsa) {
            return `Start Now / $${program.priceUsa} Per 12 Week`;
        }
        if (userCountry === 'europe' && program.priceEurope) {
            return `Start Now / €${program.priceEurope} Per 12 Week`;
        }

        // Fallback default
        return 'Start Now';
    };

    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '');

    return (
        <section id="program-solutions" className="pt-12 md:pt-20 pb-4 md:pb-4 bg-white">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#0F172A]">
                        {heading || "Complete Diet & Nutrition Solutions"}
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg">
                        {subtext || "Simple, safe, and sustainable nutrition plans tailored to your specific lifestyle, health conditions, and fitness goals."}
                    </p>
                </div>

                {/* Programs List */}
                <div className="space-y-8 md:space-y-12">
                    {solutions?.map((program, index) => {
                        if (!program || typeof program !== 'object' || Array.isArray(program) || !program.title) {
                            return null;
                        }

                        const imageUrl = program.image?.startsWith('/uploads/')
                            ? `${backendUrl}${program.image}`
                            : program.image || '/Weight.svg';

                        // Fallback to title based ID or program.id like user requested
                        const programId = program.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || index.toString();


                        return (
                            <motion.div
                                id={programId}
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
                                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                                        <Image
                                            src={imageUrl}
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
                                            {getPriceDisplay(program)}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
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
