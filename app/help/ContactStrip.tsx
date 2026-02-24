'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const contactDetails = [
    {
        icon: Phone,
        title: "Call Us",
        text: "+91 99981 17873",
        color: "#69C2E3"
    },
    {
        icon: Mail,
        title: "Email",
        text: "care.healthstur@gmail.com",
        color: "#06A76C"
    },
    {
        icon: Clock,
        title: "Working Hours",
        text: "MON-SAT: 9:30 AM - 6:30 PM",
        color: "#B779E6"
    },
    {
        icon: MapPin,
        title: "Address",
        text: "Ahmedabad",
        color: "#E49A34"
    }
];

export default function ContactStrip() {
    return (
        <section className="py-16 bg-[#0F2942]"> {/* Using dark blue */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contactDetails.map((detail, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4 transition-all duration-300 group-hover:bg-white group-hover:text-[#0F2942]">
                                <detail.icon className="w-6 h-6" style={{ color: detail.color }} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {detail.title}
                            </h3>
                            <p className="text-gray-300 font-medium text-sm">
                                {detail.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
