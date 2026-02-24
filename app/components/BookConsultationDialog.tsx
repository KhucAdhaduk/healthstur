'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BookConsultationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    // Keeping selectedProgram for compatibility if we want to pre-fill later, but optional
    selectedProgram?: string;
}

export default function BookConsultationDialog({ isOpen, onClose, selectedProgram }: BookConsultationDialogProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        height: '',
        weight: '',
        age: '',
        medicalCondition: '',
        allergies: '',
        goal: '',
        duration: '',
        routine: ''
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
        console.log('Consultation request submitted:', { ...formData, selectedProgram });
        onClose();
        // Reset form?
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="px-8 pt-6 flex items-center justify-between bg-white z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-center w-full text-black">Start Your Application</h2>
                            <button onClick={onClose} className="absolute cursor-pointer right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Basic Personal Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900">Basic Personal Details</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            required
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="tel"
                                                name="mobileNumber"
                                                placeholder="Mobile number"
                                                value={formData.mobileNumber}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                                required
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email address ( Optional )"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Body Statistics */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900">Body Statistics</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            name="height"
                                            placeholder="Height ( CM )"
                                            value={formData.height}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="weight"
                                            placeholder="Weight ( KG )"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="age"
                                            placeholder="Age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="medicalCondition"
                                        placeholder="Medical Condition ( If any )"
                                        value={formData.medicalCondition}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                    />
                                    <input
                                        type="text"
                                        name="allergies"
                                        placeholder="Allergies ( If any )"
                                        value={formData.allergies}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="goal"
                                            placeholder="Goal"
                                            value={formData.goal}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="duration"
                                            placeholder="Duration ( Month )"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Routine */}
                                <div className="space-y-4">
                                    <textarea
                                        name="routine"
                                        placeholder="Describe your routine"
                                        value={formData.routine}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center pt-2">
                                    <button
                                        type="submit"
                                        className="bg-[#0F172A] cursor-pointer text-white font-medium py-3 px-12 rounded-full hover:bg-[#023051] transition-colors shadow-lg w-full md:w-auto"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
