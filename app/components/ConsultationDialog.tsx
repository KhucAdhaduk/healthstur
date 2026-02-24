'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ConsultationDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConsultationDialog({ isOpen, onClose }: ConsultationDialogProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNo: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your submission logic here
        onClose();
        setFormData({
            fullName: '',
            email: '',
            contactNo: '',
            subject: '',
            message: ''
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#F5F7FA] w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 relative"
                        >

                            <div className="flex justify-between items-center mb-6">
                                {/* Header */}
                                <h2 className="text-2xl md:text-3xl font-bold text-black">
                                    Bring Your Vision to Life
                                </h2>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full bg-white rounded-xl px-4 py-3 text-gray-700 font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023051]/20 border-none shadow-sm"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                            className="w-full bg-white rounded-xl px-4 py-3 text-gray-700 font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023051]/20 border-none shadow-sm"
                                            required
                                        />
                                    </div>

                                    {/* Contact No */}
                                    <div>
                                        <input
                                            type="tel"
                                            name="contactNo"
                                            value={formData.contactNo}
                                            onChange={handleChange}
                                            placeholder="Your Contact no."
                                            className="w-full bg-white rounded-xl px-4 py-3 text-gray-700 font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023051]/20 border-none shadow-sm"
                                            required
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Subject"
                                            className="w-full bg-white rounded-xl px-4 py-3 text-gray-700 font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023051]/20 border-none shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your Message"
                                        rows={5}
                                        className="w-full bg-white rounded-xl px-4 py-3 text-gray-700 font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023051]/20 border-none shadow-sm resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-[#0b1c2c] cursor-pointer text-white font-bold py-3 px-8 rounded-lg hover:bg-[#023051] transition-colors shadow-lg"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
