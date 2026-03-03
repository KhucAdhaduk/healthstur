'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface StartApplicationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedProgram?: string;
    amount?: string;
    currency?: string;
}

export default function StartApplicationDialog({ isOpen, onClose, selectedProgram, amount, currency }: StartApplicationDialogProps) {
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
        const loadRazorpayScript = () => {
            if (document.getElementById('razorpay-checkout-js')) return;
            const script = document.createElement('script');
            script.id = 'razorpay-checkout-js';
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
        };
        loadRazorpayScript();
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Unconditionally reset form state when modal opens
            setPaymentSuccessData(null);
            setFormData({ fullName: '', mobileNumber: '', email: '', height: '', weight: '', age: '', medicalCondition: '', allergies: '', goal: '', duration: '', routine: '' });
            setErrors({});
            setIsSubmitting(false);

            // Lock main document scroll
            document.body.style.overflow = 'hidden';

            if (!document.getElementById('dialog-scroll-lock')) {
                const style = document.createElement('style');
                style.id = 'dialog-scroll-lock';
                style.innerHTML = `
                    body, html {
                        overflow: hidden !important;
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            document.body.style.overflow = '';
            const styleNode = document.getElementById('dialog-scroll-lock');
            if (styleNode) styleNode.remove();
        }

        return () => {
            document.body.style.overflow = '';
            const styleNode = document.getElementById('dialog-scroll-lock');
            if (styleNode) styleNode.remove();
        };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [paymentSuccessData, setPaymentSuccessData] = useState<any>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const handleClose = () => {
        onClose();
        // Fallback cleanup for immediate UI visual reset underneath animations
        setTimeout(() => {
            setIsSubmitting(false);
            setPaymentSuccessData(null);
            setPaymentError(null);
        }, 500);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

        const phoneRegex = /^\+?[0-9]{7,15}$/;
        if (!phoneRegex.test(formData.mobileNumber.replace(/\s+/g, ''))) {
            newErrors.mobileNumber = 'Enter a valid mobile number';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        if (!formData.height.trim() || isNaN(Number(formData.height))) {
            newErrors.height = 'Enter a valid numeric height';
        }

        if (!formData.weight.trim() || isNaN(Number(formData.weight))) {
            newErrors.weight = 'Enter a valid numeric weight';
        }

        if (!formData.age.trim() || isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
            newErrors.age = 'Enter a valid numeric age';
        }

        if (!formData.goal.trim()) newErrors.goal = 'Goal is required';
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
        if (!formData.routine.trim()) newErrors.routine = 'Routine description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentError(null);
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            const payload: any = { ...formData, selectedProgram, amount, currency };
            if (!payload.email) {
                delete payload.email;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Failed to submit application');
            }

            if (data.razorpayOrderId) {
                // Payment flow
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_QGdFrCgX1jtz7u',
                    name: 'Healthstur',
                    description: selectedProgram || 'Program Purchase',
                    order_id: data.razorpayOrderId,
                    handler: async function (res: any) {
                        try {
                            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/applications/verify-payment`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: res.razorpay_order_id,
                                    razorpay_payment_id: res.razorpay_payment_id,
                                    razorpay_signature: res.razorpay_signature,
                                    applicationData: payload
                                })
                            });

                            if (verifyRes.ok) {
                                const verifyData = await verifyRes.json();

                                setPaymentSuccessData(verifyData.application || { amount, currency, selectedProgram });
                                setIsSubmitting(false);
                            } else {
                                alert('Payment verification failed. Please contact support.');
                            }
                        } catch (err) {
                            console.error('Payment verification failed', err);
                            alert('An error occurred during payment verification.');
                        }
                    },
                    prefill: {
                        name: formData.fullName,
                        email: formData.email,
                        contact: formData.mobileNumber
                    },
                    theme: {
                        color: '#023051'
                    },
                    modal: {
                        ondismiss: function () {
                            setIsSubmitting(false);
                        }
                    }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.on('payment.failed', function (res: any) {
                    console.error('Payment failed', res);
                    setIsSubmitting(false);
                    const errorMsg = res?.error?.description || res?.error?.reason || res?.description || 'Transaction failed or was canceled.';
                    setPaymentError(`Payment failed: ${errorMsg}`);
                });
                rzp.open();

            } else {

                handleClose();
            }

        } catch (error: any) {
            console.error('Error submitting application:', error);
            alert(`Application Error: ${error.message || 'Please try again.'}`);
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {paymentSuccessData ? (
                            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-[#023051] mb-2">Payment Successful!</h2>
                                <p className="text-gray-500 mb-8 max-w-md">
                                    Thank you for your purchase. We have received your application successfully.
                                </p>

                                <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                        <span className="text-gray-500 font-medium">Program</span>
                                        <span className="text-[#023051] font-bold">{paymentSuccessData.selectedProgram || selectedProgram}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                        <span className="text-gray-500 font-medium">Amount Paid</span>
                                        <span className="text-[#023051] font-bold">{paymentSuccessData.currency || currency} {paymentSuccessData.amount || amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                        <span className="text-gray-500 font-medium">Order ID</span>
                                        <span className="text-[#023051] font-bold text-sm">{paymentSuccessData.razorpayOrderId || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 font-medium">Payment ID</span>
                                        <span className="text-[#023051] font-bold text-sm">{paymentSuccessData.razorpayPaymentId || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                                    <button
                                        onClick={handleClose}
                                        className="bg-[#023051] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#034473] transition-colors flex-1 shadow-lg"
                                    >
                                        Continue
                                    </button>
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/applications/${paymentSuccessData.id}/invoice`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-[#023051] border-2 border-[#023051] font-bold py-4 px-4 rounded-xl hover:bg-gray-50 flex items-center justify-center transition-colors flex-1 shadow-lg text-center"
                                        download
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Invoice
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Header */}
                                <div className="px-8 pt-6 flex items-center justify-between bg-white z-10">
                                    <h2 className="text-2xl md:text-3xl font-bold text-center w-full text-black">Start Your Journey</h2>
                                    <button onClick={handleClose} className="absolute right-6 cursor-pointer top-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
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
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        placeholder="Full name"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.fullName ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                    />
                                                    {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <input
                                                            type="tel"
                                                            name="mobileNumber"
                                                            placeholder="Mobile number"
                                                            value={formData.mobileNumber}
                                                            onChange={handleChange}
                                                            className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                        />
                                                        {errors.mobileNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.mobileNumber}</p>}
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email address"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.email ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                        />
                                                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Body Statistics */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-gray-900">Body Statistics</h3>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="height"
                                                        placeholder="Height ( CM )"
                                                        value={formData.height}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.height ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                    />
                                                    {errors.height && <p className="text-red-500 text-xs mt-1 ml-1">{errors.height}</p>}
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="weight"
                                                        placeholder="Weight ( KG )"
                                                        value={formData.weight}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.weight ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                    />
                                                    {errors.weight && <p className="text-red-500 text-xs mt-1 ml-1">{errors.weight}</p>}
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="age"
                                                        placeholder="Age"
                                                        value={formData.age}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.age ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                    />
                                                    {errors.age && <p className="text-red-500 text-xs mt-1 ml-1">{errors.age}</p>}
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                name="medicalCondition"
                                                placeholder="Medical Condition ( If any )"
                                                value={formData.medicalCondition}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-2xl text-black border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            />
                                            <input
                                                type="text"
                                                name="allergies"
                                                placeholder="Allergies ( If any )"
                                                value={formData.allergies}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-2xl text-black border border-gray-400 focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500"
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="goal"
                                                        placeholder="Goal"
                                                        value={formData.goal}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.goal ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                    />
                                                    {errors.goal && <p className="text-red-500 text-xs mt-1 ml-1">{errors.goal}</p>}
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="duration"
                                                        placeholder="Duration ( Month )"
                                                        value={formData.duration}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.duration ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                    />
                                                    {errors.duration && <p className="text-red-500 text-xs mt-1 ml-1">{errors.duration}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Selected Programs */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-gray-900">Selected Programs</h3>
                                            <input
                                                type="text"
                                                value={selectedProgram || ''}
                                                readOnly
                                                className="w-full px-4 py-3 rounded-2xl border border-gray-400 bg-gray-50 text-gray-600 outline-none"
                                            />
                                        </div>

                                        {/* Routine */}
                                        <div className="space-y-4">
                                            <div>
                                                <textarea
                                                    name="routine"
                                                    placeholder="Describe your routine"
                                                    value={formData.routine}
                                                    onChange={handleChange}
                                                    rows={4}
                                                    className={`w-full px-4 py-3 rounded-2xl text-black border ${errors.routine ? 'border-red-500' : 'border-gray-400'} focus:border-[#023051] focus:ring-1 focus:ring-[#023051] outline-none transition-all placeholder:text-gray-500`}
                                                />
                                                {errors.routine && <p className="text-red-500 text-xs mt-1 ml-1">{errors.routine}</p>}
                                            </div>
                                        </div>

                                        {/* Payment Error Message */}
                                        {paymentError && (
                                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm font-medium border border-red-200">
                                                {paymentError}
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <div className="flex justify-center pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-[#0F172A] cursor-pointer text-white font-medium py-3 px-12 rounded-full hover:bg-[#023051] transition-colors shadow-lg w-full md:w-auto disabled:opacity-75 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
