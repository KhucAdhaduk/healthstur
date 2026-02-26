"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const COUNTRIES = [
    {
        id: 'india',
        name: 'India',
        flag: 'https://flagcdn.com/in.svg',
    },
    {
        id: 'usa',
        name: 'USA',
        flag: 'https://flagcdn.com/us.svg',
    },
    {
        id: 'europe',
        name: 'Europe',
        flag: 'https://flagcdn.com/eu.svg',
    }
];

export default function CountrySelectDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    useEffect(() => {
        // Check localStorage on mount
        const savedCountry = localStorage.getItem('selectedCountry');
        if (!savedCountry) {
            setIsOpen(true);
        }
    }, []);

    // Handle body scroll locking
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleConfirm = () => {
        if (selectedCountry) {
            localStorage.setItem('selectedCountry', selectedCountry);
            setIsOpen(false);

            // Notify other components if needed
            window.dispatchEvent(new Event('countryChange'));
        }
    };

    // We are deliberately removing handleClose to force selection

    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[12px] w-full max-w-[500px] p-8 relative shadow-2xl"
                        >
                            {/* Header */}
                            <div className="text-center mb-10 mt-2 relative">
                                <h2 className="text-xl md:text-2xl font-bold text-[#023051] inline-block relative">
                                    Select Your Country
                                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#005bb5]"></div>
                                </h2>
                            </div>

                            {/* Country Options */}
                            <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
                                {COUNTRIES.map((country, index) => {
                                    const isSelected = selectedCountry === country.id;

                                    return (
                                        <React.Fragment key={country.id}>
                                            <button
                                                onClick={() => setSelectedCountry(country.id)}
                                                className={`relative p-4 md:px-6 md:py-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-200 min-w-[100px] md:min-w-[120px]
                          ${isSelected
                                                        ? 'border border-[#023051] bg-white text-[#023051]'
                                                        : 'border border-transparent bg-transparent text-black hover:bg-gray-50'
                                                    }
                        `}
                                            >
                                                {/* Selected Checkmark Badge */}
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#023051] rounded-full flex items-center justify-center shadow-sm text-white z-10">
                                                        <Check className="w-3 h-3" strokeWidth={3} />
                                                    </div>
                                                )}

                                                {/* Flag SVG Circle */}
                                                <div className="w-20 h-20 rounded-full overflow-hidden shadow-md flex-shrink-0 relative bg-gray-100 flex items-center justify-center transition-transform duration-300">
                                                    <img
                                                        src={country.flag}
                                                        alt={country.name}
                                                        className={`w-full h-full object-cover ${country.id === 'india' ? 'scale-[1.35]' : 'scale-[1.15]'}`}
                                                    />
                                                </div>

                                                {/* Country Name */}
                                                <span className={`font-bold text-base md:text-lg`}>
                                                    {country.name}
                                                </span>
                                            </button>

                                            {/* Divider between USA and Europe based on screenshot */}
                                            {index !== COUNTRIES.length - 1 && (
                                                <div className="w-[1px] h-16 bg-gray-300 shrink-0 mx-2" />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleConfirm}
                                    className={`
                    px-10 py-2.5 rounded-3xl font-bold text-sm transition-all duration-200
                    bg-[#023051] text-white hover:bg-[#023051]/90 hover:shadow-lg active:scale-95
                  `}
                                >
                                    Confirm {/* Explicitly using Confirm per user request though image says 'Conform' */}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
}
