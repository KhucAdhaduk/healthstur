'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';

interface FeedbackDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FeedbackDialog({ isOpen, onClose }: FeedbackDialogProps) {
    const [formData, setFormData] = useState({
        orderId: '',
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [rating, setRating] = useState(0);

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
        console.log('Form submitted:', { ...formData, rating });
        // Add your submission logic here
        onClose();
        setFormData({
            orderId: '',
            fullName: '',
            email: '',
            subject: '',
            message: ''
        });
        setRating(0);
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
                            className="bg-[#f0f2f5] w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 relative"
                        >

                            <div className="flex justify-between items-center mb-6">
                                {/* Header */}
                                <h2 className="text-2xl md:text-3xl font-bold text-black">
                                    Share Your Feedback
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Order ID */}
                                    <div>
                                        <input
                                            type="text"
                                            name="orderId"
                                            value={formData.orderId}
                                            onChange={handleChange}
                                            placeholder="Order ID"
                                            className="w-full bg-white rounded-xl px-4 py-3.5 text-black font-medium placeholder:text-black/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1c2c]/20 border-none shadow-sm"
                                            required
                                        />
                                    </div>

                                    {/* Full Name */}
                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full bg-white rounded-xl px-4 py-3.5 text-black font-medium placeholder:text-black/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1c2c]/20 border-none shadow-sm"
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
                                            placeholder="Email"
                                            className="w-full bg-white rounded-xl px-4 py-3.5 text-black font-medium placeholder:text-black/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1c2c]/20 border-none shadow-sm"
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
                                            className="w-full bg-white rounded-xl px-4 py-3.5 text-black font-medium placeholder:text-black/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1c2c]/20 border-none shadow-sm"
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
                                        rows={6}
                                        className="w-full bg-white rounded-xl px-4 py-3.5 text-black font-medium placeholder:text-black/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1c2c]/20 border-none shadow-sm resize-none"
                                        required
                                    />
                                </div>

                                {/* Rating */}
                                <div className="bg-white rounded-xl px-4 py-4 md:py-5 flex items-center gap-2 shadow-sm">
                                    <span className="text-black font-medium text-sm mr-2">Give Rating -</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-6 h-6 cursor-pointer transition-colors ${star <= rating
                                                        ? 'fill-[#FACC15] text-[#FACC15]'
                                                        : 'text-gray-300 fill-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="bg-[#0b1c2c] cursor-pointer text-white font-medium py-3 px-6 rounded-lg text-sm hover:bg-[#023051] transition-colors shadow-lg"
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
