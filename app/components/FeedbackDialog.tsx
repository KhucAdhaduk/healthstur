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
            setIsSubmitted(false);
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, rating })
            });
            if (!response.ok) throw new Error('Failed to submit feedback');

            setIsSubmitted(true);
            setFormData({
                orderId: '',
                fullName: '',
                email: '',
                subject: '',
                message: ''
            });
            setRating(0);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
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
                            {/* Form or Success Message */}
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Feedback Received!</h3>
                                    <p className="text-gray-600 mb-8 max-w-sm">
                                        Thank you for your valuable feedback. We appreciate you taking the time to share your experience with us.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="bg-[#0b1c2c] cursor-pointer text-white font-bold py-3 px-10 rounded-lg hover:bg-[#023051] transition-colors shadow-lg"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
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
                                            disabled={isSubmitting}
                                            className={`bg-[#0b1c2c] cursor-pointer text-white font-medium py-3 px-6 rounded-lg text-sm hover:bg-[#023051] transition-colors shadow-lg flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
