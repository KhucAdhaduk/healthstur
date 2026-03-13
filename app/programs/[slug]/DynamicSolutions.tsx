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
    focusOn?: string[];
    prices?: Record<string, { price4Week: string; price8Week: string; price12Week: string }>;
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
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [userCountry, setUserCountry] = useState<string | null>(null);

    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const [selectedPricingSolution, setSelectedPricingSolution] = useState<Solution | null>(null);

    const [countries, setCountries] = useState<any[]>([]);

    useEffect(() => {
        // Hydrate initial country from local storage
        const savedCountry = localStorage.getItem('selectedCountry');
        if (savedCountry) {
            setUserCountry(savedCountry);
        }

        const fetchCountries = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
                const response = await fetch(`${apiBaseUrl}/countries/active`);
                if (response.ok) {
                    const data = await response.json();
                    setCountries(data);
                }
            } catch (error) {
                console.error('Failed to fetch countries:', error);
            }
        };
        fetchCountries();

        // Listen for country changes
        const handleCountryChange = () => {
            setUserCountry(localStorage.getItem('selectedCountry'));
        };

        window.addEventListener('countryChange', handleCountryChange);
        return () => {
            window.removeEventListener('countryChange', handleCountryChange);
        };
    }, []);

    const handleStartNow = (program: Solution) => {
        setSelectedPricingSolution(program);
        setIsPricingOpen(true);
    };

    const handleBuyNow = (solution: Solution, duration: '4Week' | '8Week' | '12Week') => {
        let displayPrice = '---';
        let actCurrency = 'USD';

        if (userCountry) {
            const countryP = solution.prices?.[userCountry];
            const countryInfo = countries.find(c => c.id === userCountry);

            if (countryP && countryInfo) {
                displayPrice = countryP[`price${duration}` as keyof typeof countryP] || '---';
                actCurrency = countryInfo.currencyCode;
            }
        }

        const cleanPrice = displayPrice.toString().replace(/^[^\d.]+/, '').trim();
        const durationText = duration === '4Week' ? '4 Week' : duration === '8Week' ? '8 Week' : '12 Week';

        setIsPricingOpen(false);
        setSelectedProgram(`${solution.title} - ${durationText}`);
        setSelectedAmount(cleanPrice);
        setSelectedCurrency(actCurrency);
        setIsDialogOpen(true);
    };

    const getPrice = (solution: Solution, duration: '4Week' | '8Week' | '12Week') => {
        if (!userCountry) return '---';
        const country = countries.find(c => c.id === userCountry);
        const countryPrices = solution.prices?.[userCountry];

        if (!country || !countryPrices) return '---';

        const rawPrice = countryPrices[`price${duration}` as keyof typeof countryPrices] || '';
        if (!rawPrice) return '---';

        // Ensure the currency symbol isn't duplicated (in case admin typed it in the input)
        const cleanPrice = rawPrice.replace(/^[^\d]+/, '').trim();
        return `${country.currencySymbol}${cleanPrice}`;
    };

    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '');

    return (
        <section id="program-solutions" className="pt-12 md:pt-20 pb-4 md:pb-4 bg-white mb-12">
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

                        const imagePath = program.image?.replace('/uploads/', '/public/');
                        const imageUrl = imagePath?.startsWith('/public/')
                            ? `${backendUrl}${imagePath}`
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
                                            <h4 className="font-bold text-[#0F172A] text-sm md:text-base mb-1">Healthstur's Approach:</h4>
                                            <p className="text-gray-600 text-sm">{program.approach}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0F172A] text-sm md:text-base mb-1">Results:</h4>
                                            <p className="text-gray-600 text-sm">{program.benefits}</p>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={() => handleStartNow(program)}
                                            className="bg-[#023051] cursor-pointer text-white px-6 py-2 rounded-full font-bold hover:bg-[#023051]/90 transition-all shadow-lg text-xs md:text-sm"
                                        >
                                            Start Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            {/* Pricing Modal */}
            {isPricingOpen && selectedPricingSolution && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-[24px] w-full max-w-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <button
                            onClick={() => setIsPricingOpen(false)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="p-8 md:p-10 flex flex-col flex-1 overflow-y-auto">
                            <h2 className="text-3xl font-bold text-center mb-8 text-[#0F172A]">
                                {selectedPricingSolution.title}
                            </h2>

                            {selectedPricingSolution.focusOn && (
                                <div className="mb-10">
                                    <h3 className="text-lg font-bold mb-4 text-[#0F172A]">Focus On :</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                                        {selectedPricingSolution.focusOn.filter(b => b.trim()).map((b, i) => (
                                            <li key={i} className="flex items-start text-[#0F172A] text-sm md:text-base font-medium">
                                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-[#0F172A] rounded-full flex-shrink-0"></span>
                                                {b.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="border-t border-gray-200 my-4"></div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                                {/* 4 Week */}
                                <div className="flex flex-col items-center sm:border-r border-gray-200 last:border-0 pb-6 sm:pb-0 border-b sm:border-b-0 last:border-b-0">
                                    <h4 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-2">4 Week</h4>
                                    <p className="text-xl font-medium text-[#0F172A] mb-4">
                                        {getPrice(selectedPricingSolution, '4Week')}
                                    </p>
                                    <button
                                        onClick={() => handleBuyNow(selectedPricingSolution, '4Week')}
                                        className="bg-[#023051] text-white px-8 py-2.5 rounded-full font-bold text-sm hover:bg-[#023051]/90 transition-all cursor-pointer shadow-md"
                                    >
                                        Buy Now
                                    </button>
                                </div>

                                {/* 8 Week */}
                                <div className="flex flex-col items-center sm:border-r border-gray-200 last:border-0 pb-6 sm:pb-0 border-b sm:border-b-0 last:border-b-0">
                                    <h4 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-2">8 Week</h4>
                                    <p className="text-xl font-medium text-[#0F172A] mb-4">
                                        {getPrice(selectedPricingSolution, '8Week')}
                                    </p>
                                    <button
                                        onClick={() => handleBuyNow(selectedPricingSolution, '8Week')}
                                        className="bg-[#023051] text-white px-8 py-2.5 rounded-full font-bold text-sm hover:bg-[#023051]/90 transition-all cursor-pointer shadow-md"
                                    >
                                        Buy Now
                                    </button>
                                </div>

                                {/* 12 Week */}
                                <div className="flex flex-col items-center pb-0 border-b-0">
                                    <h4 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-2">12 Week</h4>
                                    <p className="text-xl font-medium text-[#0F172A] mb-4">
                                        {getPrice(selectedPricingSolution, '12Week')}
                                    </p>
                                    <button
                                        onClick={() => handleBuyNow(selectedPricingSolution, '12Week')}
                                        className="bg-[#023051] text-white px-8 py-2.5 rounded-full font-bold text-sm hover:bg-[#023051]/90 transition-all cursor-pointer shadow-md"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            <StartApplicationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                selectedProgram={selectedProgram}
                amount={selectedAmount}
                currency={selectedCurrency}
            />
        </section>
    );
}
