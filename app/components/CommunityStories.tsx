'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    image: string | null;
    quote: string;
    stars: number;
}

export default function CommunityStories() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
                const response = await fetch(`${apiUrl}/testimonial`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setTestimonials(data);
                    }
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading || testimonials.length === 0) {
        return null; // Render nothing while loading or if no stories
    }

    // Duplicate for marquee effect
    const marqueeTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="pb-12 md:pb-24 pt-12 md:pt-18 bg-[#023051] text-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] mb-4 uppercase opacity-80">COMMUNITY STORIES</h3>
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        Don't Just Take Our Word For It.
                    </h2>
                </motion.div>
            </div>

            {/* Marquee Wrapper */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative w-full flex flex-col gap-8 marquee-container"
            >
                {/* Gradient Masks for fading edges */}
                <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#023051] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#023051] to-transparent z-10 pointer-events-none" />

                {/* Top Row - Scroll Left */}
                <div className="flex overflow-hidden">
                    <div
                        className="flex gap-6 md:gap-8 pl-4 animate-scroll"
                        style={{ width: "max-content" }}
                    >
                        {marqueeTestimonials.map((testimonial, index) => (
                            <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
                        ))}
                    </div>
                </div>

                {/* Bottom Row - Scroll Right (using reverse animation for variety if needed, or just left with offset) */}
                <div className="flex overflow-hidden">
                    <div
                        className="flex gap-6 md:gap-8 pl-4 animate-scroll-reverse"
                        style={{ width: "max-content" }}
                    >
                        {/* Reverse the list so it looks different */}
                        {[...marqueeTestimonials].reverse().map((testimonial, index) => (
                            <TestimonialCard key={`bottom-${index}`} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const imageUrl = testimonial.image?.startsWith('http')
        ? testimonial.image
        : `${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')}${testimonial.image}`;

    console.log(imageUrl, 'imageUrl')

    return (
        <div className="w-[300px] md:w-[400px] flex-shrink-0 bg-[#00284D]/60 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-3xl hover:bg-[#00284D] transition-colors duration-300 cursor-pointer">
            {/* Header: Avatar + Info + Stars */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                        {testimonial.image ? (
                            <Image
                                src={imageUrl}
                                alt={testimonial.name}
                                fill
                                unoptimized
                                className="object-cover rounded-full border border-white/10"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                <Star className="w-5 h-5 text-white/50" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm md:text-base leading-tight">{testimonial.name}</h4>
                        <p className="text-[10px] md:text-xs text-gray-400 font-medium tracking-wider uppercase mt-1">
                            {testimonial.role}
                        </p>
                    </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                    {[...Array(testimonial.stars || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-white fill-white" />
                    ))}
                </div>
            </div>

            {/* Quote */}
            <p className="text-sm md:text-base text-gray-300 leading-relaxed italic opacity-90">
                "{testimonial.quote}"
            </p>
        </div>
    );
}
