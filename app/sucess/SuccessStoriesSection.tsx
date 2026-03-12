'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessStoriesSection() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
                const [categoriesRes, storiesRes] = await Promise.all([
                    fetch(`${API_URL}/success-story-category`),
                    fetch(`${API_URL}/success-story`)
                ]);

                const categoriesData = await categoriesRes.json();
                const storiesData = await storiesRes.json();

                setCategories(categoriesData);
                setStories(storiesData);
            } catch (error) {
                console.error('Failed to fetch success stories data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const categoryNames = ["All", ...categories.map(c => c.name)];

    const filteredStories = selectedCategory === "All"
        ? stories
        : stories.filter(story => story.category?.name === selectedCategory);

    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '');

    return (
        <section className="pb-16 md:pb-24 pt-10 md:pt-18 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header and Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#023051] leading-tight mb-4">
                            Choose Your <br /> Path
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-3 justify-start lg:justify-end max-w-3xl"
                    >
                        {categoryNames.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${selectedCategory === category
                                    ? "bg-[#023051] text-white border-[#023051]"
                                    : "bg-white text-[#023051] border-[#023051] hover:bg-[#023051]/5"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Grid */}
                {filteredStories.length === 0 && !loading ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16 md:py-24 bg-gray-50 rounded-3xl border border-gray-100/50"
                    >
                        <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-5">
                            <span className="text-4xl" role="img" aria-label="sparkles">✨</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#023051] mb-3">More Stories Coming Soon</h3>
                        <p className="text-gray-500 max-w-md mx-auto text-lg">
                            We are continuously updating our success stories. Check back later to see more amazing transformations!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {filteredStories.map((story) => (
                                <motion.div
                                    key={story.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 md:h-72 w-full bg-gray-200">
                                        {story.image && (
                                            <Image
                                                src={story.image.startsWith('http') ? story.image : `${backendUrl}${story.image}`}
                                                alt={story.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover"
                                                unoptimized
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                        <div className="absolute bottom-4 left-4 text-white">
                                            <span className="bg-[#023051]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                                {story.category?.name || 'Unknown'}
                                            </span>
                                            <h3 className="text-xl font-bold">{story.name}</h3>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                                        <h4 className="text-lg md:text-xl font-bold text-[#023051] mb-6 leading-snug">
                                            "{story.quote}"
                                        </h4>

                                        <div className="space-y-3 mb-8 flex-1">
                                            {(story.achievements || []).map((achievement: string, idx: number) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="mt-1 min-w-[20px]">
                                                        <CheckCircle2 className="w-5 h-5 text-[#023051]" strokeWidth={1.5} />
                                                    </div>
                                                    <span className="text-gray-700 font-medium text-sm md:text-base">
                                                        {achievement}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-2">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                The Healthstur Shift
                                            </p>
                                            <p className="text-sm text-black leading-relaxed">
                                                "{story.shift}"
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
}
