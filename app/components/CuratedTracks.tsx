'use client';

import Image from 'next/image';
import { Target, ArrowUpRight, Heart, User, Sun, Activity, Leaf, Flower } from 'lucide-react';
import { motion } from 'framer-motion';
import { DynamicIcon } from './DynamicIcon';
import { getImageUrl } from '../utils/image.util';
import { useState, useEffect } from 'react';

export interface CuratedTrack {
    id: string;
    isActive?: boolean;
    isCurated?: boolean;
    href: string;

    // Curated fields mapped from Program
    curatedTitle?: string;
    curatedDescription?: string;
    curatedImage?: string;
    curatedIcon?: string;
    curatedIconWidth?: number;
    curatedIconHeight?: number;
    curatedLinkText?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut" as const
        }
    }
};

export default function CuratedTracks() {
    const [cards, setCards] = useState<CuratedTrack[]>([]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const res = await fetch(`${API_URL}/programs`);
                const data: CuratedTrack[] = await res.json();

                // Filter to only active programs that are marked as curated
                const curatedPrograms = data.filter(p => p.isActive !== false && p.isCurated === true);
                setCards(curatedPrograms);
            } catch (error) {
                console.error('Error fetching curated tracks:', error);
            }
        };
        fetchTracks();
    }, []);

    if (cards.length === 0) return null;

    return (
        <section className="pb-16 md:pb-24 pt-14 md:pt-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-600 mb-4 uppercase">Our Curated Tracks</h3>
                    <h2 className="text-2xl md:text-5xl font-extrabold text-[#023051] uppercase">Discover Your Path To Glory</h2>
                </motion.div>

                {/* Grid */}
                <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            layout
                            variants={cardVariants}
                            key={index}
                            onClick={() => window.location.href = card.href || '#'}
                            className={`group relative h-[400px] md:h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500`}
                        >
                            {/* Background Image */}
                            <Image
                                src={getImageUrl(card.curatedImage)}
                                alt={card.curatedTitle || 'Curated Track'}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-700 group-hover:scale-104"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#023051] via-[#023051]/60 to-transparent opacity-90 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-90" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-100 md:opacity-0 transition-all duration-300 translate-y-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                                {/* Top Icon */}
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#023051] shadow-md flex-shrink-0 transform group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    <DynamicIcon
                                        name={card.curatedIcon || 'Activity'}
                                        style={{ width: (card.curatedIconWidth || 30) + 'px', height: (card.curatedIconHeight || 30) + 'px' }}
                                    />
                                </div>

                                {/* Bottom Content */}
                                <div className="flex flex-col justify-end h-full">
                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                                        {card.curatedTitle}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-6 border-b border-white/20 pb-6">
                                        {card.curatedDescription}
                                    </p>

                                    {/* Footer Link */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-white">{card.curatedLinkText || 'Start Transformation'}</span>
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#023051] transition-transform duration-300 hover:scale-110">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
