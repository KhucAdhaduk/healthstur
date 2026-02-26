'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Send } from 'lucide-react';
import Link from 'next/link';
import { useCompanyInfo } from '@/context/CompanyInfoContext';

export default function ContactFormSection() {
    const { info } = useCompanyInfo();
    
    // Check if any socials exist to render the Follow On section
    const hasSocials = info?.instagramUrl || info?.facebookUrl || info?.twitterUrl || info?.youtubeUrl;

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="space-y-2 flex flex-col items-center mb-10">
                    <h3 className="text-[#023051] text-xl font-bold uppercase tracking-wider">Contact Us</h3>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#023051] leading-tight">
                        Let's Start A Conversation Together
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-between h-full"
                    >


                        <div className="space-y-6">
                            {/* Phone Card */}
                            {info?.phone && (
                                <div className="flex items-center p-4 border border-[#023051]/30 rounded-2xl hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-[#023051] rounded-full flex items-center justify-center text-white mr-5 flex-shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-lg">Contact No</p>
                                        <a href={`tel:${info.phone.replace(/[^0-9+]/g, '')}`} className="text-gray-600 hover:text-[#023051] transition-colors font-medium">
                                            {info.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Email Card */}
                            {info?.email && (
                                <div className="flex items-center p-4 border border-[#023051]/30 rounded-2xl hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-[#023051] rounded-full flex items-center justify-center text-white mr-5 flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-lg">Email Address</p>
                                        <a href={`mailto:${info.email}`} className="text-gray-600 hover:text-[#023051] transition-colors font-medium">
                                            {info.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Address Card */}
                            {info?.address && (
                                <div className="flex items-center p-4 border border-[#023051]/30 rounded-2xl hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-[#023051] rounded-full flex items-center justify-center text-white mr-5 flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-lg">Office Address</p>
                                        <p className="text-gray-600 font-medium whitespace-pre-line">
                                            {info.address}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {hasSocials && (
                            <div className="pt-6">
                                <h4 className="text-[#023051] font-bold text-lg mb-4">Follow On:</h4>
                                <div className="flex gap-4">
                                    {info?.instagramUrl && (
                                        <Link href={info.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#023051] rounded-full flex items-center justify-center text-[#023051] hover:bg-[#023051] hover:text-white transition-all duration-300">
                                            <Instagram className="w-5 h-5" />
                                        </Link>
                                    )}
                                    {info?.facebookUrl && (
                                        <Link href={info.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#023051] rounded-full flex items-center justify-center text-[#023051] hover:bg-[#023051] hover:text-white transition-all duration-300">
                                            <Facebook className="w-5 h-5" />
                                        </Link>
                                    )}
                                    {info?.twitterUrl && (
                                        <Link href={info.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#023051] rounded-full flex items-center justify-center text-[#023051] hover:bg-[#023051] hover:text-white transition-all duration-300">
                                            <Twitter className="w-5 h-5" />
                                        </Link>
                                    )}
                                    {info?.youtubeUrl && (
                                        <Link href={info.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#023051] rounded-full flex items-center justify-center text-[#023051] hover:bg-[#023051] hover:text-white transition-all duration-300">
                                            <Youtube className="w-5 h-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#F4F4F4] p-6 md:p-8 rounded-2xl"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-[#023051] mb-8">
                            Bring Your Vision to Life
                        </h3>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        id="fullName"
                                        placeholder="Full Name"
                                        className="w-full bg-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#023051]/20 text-gray-700 placeholder-gray-500 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="sr-only">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Your Email"
                                        className="w-full bg-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#023051]/20 text-gray-700 placeholder-gray-500 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="contactNo" className="sr-only">Your Contact no.</label>
                                    <input
                                        type="tel"
                                        id="contactNo"
                                        placeholder="Your Contact no."
                                        className="w-full bg-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#023051]/20 text-gray-700 placeholder-gray-500 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="sr-only">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        placeholder="Subject"
                                        className="w-full bg-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#023051]/20 text-gray-700 placeholder-gray-500 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="sr-only">Your Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Your Message"
                                    className="w-full bg-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#023051]/20 text-gray-700 placeholder-gray-500 font-medium resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-8 py-2 bg-[#0F2942] text-white font-bold rounded-lg hover:bg-[#023051] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
