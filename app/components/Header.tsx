"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, User, Languages, ChevronRight, ChevronDown, BookOpen } from 'lucide-react';

import ConsultationDialog from './ConsultationDialog';

const programsData = [
    {
        name: 'Diet & Nutrition',
        icon: '/Header/Diet.svg',
        href: '/programs/diet',
        subItems: [
            { name: 'Weight Loss', href: '/programs/diet#weight-loss' },
            { name: 'Muscle Gain', href: '/programs/diet#muscle-gain' },
            { name: '3 Meals a day Veg/Non Veg', href: '/programs/diet#3-meals-a-day' },
            { name: 'Busy Routine Meals', href: '/programs/diet#busy-routine-hacks' },
            { name: 'Healthy Snacking', href: '/programs/diet#healthy-snacking' },
            { name: 'PCOS/PCOD Friendly', href: '/programs/diet#pcos-pcod-friendly' },
            { name: 'Thyroid Friendly', href: '/programs/diet#thyroid-friendly' },
            { name: 'Diabetes Friendly', href: '/programs/diet#diabetes-friendly' },
            { name: 'Meals For Busy Professionals', href: '/programs/diet#meals-for-busy-professionals' },
        ]
    },
    {
        name: 'Age Group Specific',
        icon: '/Header/Age.svg',
        href: '/programs/age',
        subItems: [
            { name: 'Childrens  (Ages 5 - 12)', href: '/programs/age#children' },
            { name: 'Teenagers (Ages 13 - 19)', href: '/programs/age#teenagers' },
            { name: 'Young Adults (20 - 30)', href: '/programs/age#young-adults' },
            { name: 'Adults (31 - 45)', href: '/programs/age#adults' },
            { name: 'Middle Aged (46 - 60)', href: '/programs/age#middle-aged' },
            { name: 'Seniors (60+)', href: '/programs/age#seniors' },
        ]
    },
    {
        name: 'Gym & Workouts',
        icon: '/Header/Gym.svg',
        href: '/programs/gym',
        subItems: [
            { name: 'Home Workout', href: '/programs/gym#home-workout' },
            { name: 'Beginner To Intermediate', href: '/programs/gym#beginner-to-intermediate' },
            { name: 'Strength Training', href: '/programs/gym#strength-training' },
            { name: 'Stretches & Mobility', href: '/programs/gym#stretches-mobility' },
            { name: 'Zumba & Fitness', href: '/programs/gym#zumba-fitness' },
            { name: 'Posture Correction Exercises', href: '/programs/gym#posture-correction' },
            { name: 'Desk Job Fitness', href: '/programs/gym#desk-job-fitness' },
        ]
    },
    {
        name: 'Corporate Wellness',
        icon: '/Header/Corporate.svg',
        href: '/programs/corporate',
        subItems: [
            { name: 'Desk Job Fitness Routine', href: '/programs/corporate#desk-job-fitness' },
            { name: 'Meal Planing For Professionals', href: '/programs/corporate#meal-planning-for-professionals' },
            { name: 'Office Stretches & Eye Care', href: '/programs/corporate#office-stretches-eye-care' },
            { name: 'Mental Health At Workplace', href: '/programs/corporate#mental-health-at-workplace' },
        ]
    },
    {
        name: 'Woman’s Health',
        icon: '/Header/Woman.svg',
        href: '/programs/woman-health',
        subItems: [
            { name: 'Managing PCOS/PCOD Naturally', href: '/programs/woman-health#pcos' },
            { name: 'Menopause Wellness', href: '/programs/woman-health#menopause' },
            { name: 'Postnatal Fitness & Nutrition Guide', href: '/programs/woman-health#postnatal' },
        ]
    },
    {
        name: 'Health Specific Programs',
        icon: '/Header/Health.svg',
        href: '/programs/health-programs',
        subItems: [
            { name: 'Thyroid Disorders', href: '/programs/health-programs#thyroid-disorders' },
            { name: 'Joint Pain Relief & Mobility', href: '/programs/health-programs#joint-pain' },
            { name: 'Hypertension Therapy', href: '/programs/health-programs#hypertension-therapy' },
            { name: 'Beginners & Intermediate', href: '/programs/health-programs#beginners' },
            { name: 'Special Guide', href: '/programs/health-programs#special-guide' },
            { name: 'Healing, Exercises & Regular Practices', href: '/programs/health-programs#healing-exercises' },
        ]
    },
    {
        name: 'Lifestyle Habits',
        icon: '/Header/LifeStyle.svg',
        href: '/programs/lifestyle',
        subItems: [
            { name: '28 Days Wellness Challenge (Habit Building)', href: '/programs/lifestyle#wellness-challenge' },
            { name: 'Sleep Screen time & Productivity', href: '/programs/lifestyle#sleep-screen-time-productivity' },
            { name: 'Weekend Detox', href: '/programs/lifestyle#weekend-detox' },
            { name: 'Healthy Routine Set up ', href: '/programs/lifestyle#healthy-routine-setup' },
        ]
    },
    {
        name: 'Ayurveda',
        icon: '/Header/Ayurveda.svg',
        href: '/programs/ayurveda',
        subItems: [
            { name: 'Immunity Boosting Herbs', href: '/programs/ayurveda#immunity-boosting' },
            { name: 'Ayurvedic Morning Routine', href: '/programs/ayurveda#ayurvedic-morning' },
            { name: 'Seasonal Detox', href: '/programs/ayurveda#seasonal-detox' },
        ]
    },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);

    // Mobile menu state
    const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
    const [expandedProgramCategory, setExpandedProgramCategory] = useState<string | null>(null);

    const pathname = usePathname();

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'PROGRAMS', href: '#' },
        { name: 'RESOURCES', href: '#' },
        { name: 'ABOUT US', href: '/about' },
        { name: 'CONTACT', href: '/contact' },
    ];

    const toggleMobileSection = (sectionName: string) => {
        setExpandedMobileSection(expandedMobileSection === sectionName ? null : sectionName);
    };

    const toggleProgramCategory = (categoryName: string) => {
        setExpandedProgramCategory(expandedProgramCategory === categoryName ? null : categoryName);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-md py-2">
            <div className="container mx-auto flex  items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex items-center justify-center overflow-hidden">
                            <Image
                                src="/Logo.svg"
                                alt="Healthstur Logo"
                                width={55}
                                height={60}
                                className="object-cover"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <div
                                key={link.name}
                                className="relative group"
                            >
                                <Link
                                    href={link.href}
                                    className={`relative z-10 text-[13px] lg:text-[14px] font-bold transition-colors tracking-wide flex items-center gap-1 ${isActive ? 'text-[#023051]' : 'text-gray-500 hover:text-[#023051]'
                                        }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-[2px] bg-[#023051] transition-transform duration-300 origin-left ${isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                                            }`}
                                    />
                                </Link>

                                {/* Programs Dropdown */}
                                {link.name === 'PROGRAMS' && (
                                    <div className="absolute top-8 left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[280px]">
                                        <div className="bg-white shadow-xl border border-gray-100">
                                            <div className="flex flex-col gap-1 relative">
                                                {programsData.map((item) => (
                                                    <div key={item.name} className="relative group/item">
                                                        <Link
                                                            href={item.href}
                                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors relative overflow-hidden"
                                                        >
                                                            {/* Hover sidebar accent */}
                                                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#023051] opacity-0 group-hover/item:opacity-100 transition-opacity" />

                                                            <div
                                                                className="w-6 h-6 bg-black transition-colors duration-300 group-hover/item:bg-[#023051]"
                                                                style={{
                                                                    maskImage: `url(${item.icon})`,
                                                                    maskSize: 'contain',
                                                                    maskRepeat: 'no-repeat',
                                                                    maskPosition: 'center',
                                                                    WebkitMaskImage: `url(${item.icon})`,
                                                                    WebkitMaskSize: 'contain',
                                                                    WebkitMaskRepeat: 'no-repeat',
                                                                    WebkitMaskPosition: 'center'
                                                                }}
                                                            />

                                                            <span className="text-[14px] font-medium text-black group-hover/item:text-[#023051] transition-colors flex-1">
                                                                {item.name}
                                                            </span>
                                                            <ChevronRight className="w-4 h-4 text-black opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-[#023051] transition-all duration-300" />
                                                        </Link>

                                                        {/* Nested Submenu */}
                                                        {item.subItems && (
                                                            <div className="absolute top-0 left-full hidden group-hover/item:block w-[260px] z-50">
                                                                <div className="bg-white shadow-[2px_2px_6px_-2px_rgba(0,0,0,0.15)]">
                                                                    <div className="flex flex-col gap-1">
                                                                        {item.subItems.map((subItem) => (
                                                                            <Link
                                                                                key={subItem.name}
                                                                                href={subItem.href}
                                                                                className="group/subitem relative flex items-center gap-3 px-3 py-2.5 rounded-md transition-all hover:bg-slate-50 overflow-hidden"
                                                                            >
                                                                                {/* Left Blue Bar */}
                                                                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#023051] opacity-0 group-hover/subitem:opacity-100 transition-opacity duration-200" />

                                                                                {/* Dot */}
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#023051] opacity-0 group-hover/subitem:opacity-100 transition-opacity duration-200 shrink-0" />

                                                                                {/* Text */}
                                                                                <span className="text-[14px] font-medium text-black group-hover/subitem:text-[#023051] group-hover/subitem:font-medium transition-colors flex-1">
                                                                                    {subItem.name}
                                                                                </span>
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Resources Dropdown */}
                                {link.name === 'RESOURCES' && (
                                    <div className="absolute top-8 left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[240px]">
                                        <div className="bg-white shadow-lg border border-gray-100 overflow-hidden">
                                            <div className="flex flex-col gap-1">
                                                <Link href="/wellness" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#023051] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                    <BookOpen className="w-6 h-6 text-gray-500 group-hover/item:text-[#023051] transition-colors" />
                                                    <span className="text-[14px] font-medium text-gray-700 group-hover/item:text-[#023051]">Wellness Guides</span>
                                                </Link>
                                                <Link href="/articals" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#023051] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                    <User className="w-6 h-6 text-gray-500 group-hover/item:text-[#023051] transition-colors" />
                                                    <span className="text-[14px] font-medium text-gray-700 group-hover/item:text-[#023051]">Expert Articles</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-2">
                    <button className="text-[#023051] cursor-pointer hover:text-[#023051]/90 transition-colors" aria-label="Search">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button className="p-2 text-[#023051] cursor-pointer hover:text-[#023051]/90 transition-colors" aria-label="Language">
                        <Languages className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                        onClick={() => setIsConsultationOpen(true)}
                        className="hidden sm:flex items-center gap-2 cursor-pointer rounded-full bg-[#023051] px-4 lg:px-5 py-2 text-[14px] lg:text-[15px] font-medium text-white transition-all hover:bg-[#023051]/90 shadow-md"
                    >
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        Consult Now
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto">
                    <nav className="flex flex-col py-6 px-4 gap-2">
                        {navLinks.map((link) => {
                            // Handle PROGRAMS separately
                            if (link.name === 'PROGRAMS') {
                                return (
                                    <div key={link.name}>
                                        <button
                                            onClick={() => toggleMobileSection('PROGRAMS')}
                                            className="w-full flex items-center justify-between text-base font-bold text-gray-800 hover:text-[#023051] transition-colors px-4 py-3 rounded-lg hover:bg-gray-50"
                                        >
                                            {link.name}
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedMobileSection === 'PROGRAMS' ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Programs Categories */}
                                        <div className={`overflow-hidden transition-all duration-300 ${expandedMobileSection === 'PROGRAMS' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="bg-gray-50/50 rounded-lg mx-2 border border-blue-50/50">
                                                {programsData.map((category) => (
                                                    <div key={category.name} className="border-b border-gray-100 last:border-0">
                                                        <button
                                                            onClick={() => toggleProgramCategory(category.name)}
                                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:text-[#023051]"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className="w-5 h-5 bg-gray-600"
                                                                    style={{
                                                                        maskImage: `url(${category.icon})`,
                                                                        maskSize: 'contain',
                                                                        maskRepeat: 'no-repeat',
                                                                        maskPosition: 'center',
                                                                        WebkitMaskImage: `url(${category.icon})`,
                                                                        WebkitMaskSize: 'contain',
                                                                        WebkitMaskRepeat: 'no-repeat',
                                                                        WebkitMaskPosition: 'center'
                                                                    }}
                                                                />
                                                                {category.name}
                                                            </div>
                                                            {category.subItems && (
                                                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedProgramCategory === category.name ? 'rotate-180' : ''}`} />
                                                            )}
                                                        </button>

                                                        {/* Category Subitems */}
                                                        {category.subItems && (
                                                            <div className={`overflow-hidden transition-all duration-300 ${expandedProgramCategory === category.name ? 'max-h-[500px]' : 'max-h-0'}`}>
                                                                <div className="bg-white pl-8 pr-4 py-2 space-y-1 border-t border-gray-100">
                                                                    {category.subItems.map((subItem) => (
                                                                        <Link
                                                                            key={subItem.name}
                                                                            href={subItem.href}
                                                                            onClick={() => setIsMenuOpen(false)}
                                                                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#023051] border-l-2 border-transparent hover:border-[#023051] transition-colors"
                                                                        >
                                                                            {subItem.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Handle RESOURCES separately
                            if (link.name === 'RESOURCES') {
                                return (
                                    <div key={link.name}>
                                        <button
                                            onClick={() => toggleMobileSection('RESOURCES')}
                                            className="w-full flex items-center justify-between text-base font-bold text-gray-800 hover:text-[#023051] transition-colors px-4 py-3 rounded-lg hover:bg-gray-50"
                                        >
                                            {link.name}
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedMobileSection === 'RESOURCES' ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Resources Subitems */}
                                        <div className={`overflow-hidden transition-all duration-300 ${expandedMobileSection === 'RESOURCES' ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="bg-gray-50/50 rounded-lg mx-2 p-2 border border-blue-50/50">
                                                <Link
                                                    href="/wellness"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors"
                                                >
                                                    <BookOpen className="w-5 h-5 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-700">Wellness Guides</span>
                                                </Link>
                                                <Link
                                                    href="/articals"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors"
                                                >
                                                    <User className="w-5 h-5 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-700">Expert Articles</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Default Link
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-base font-bold text-gray-800 hover:text-[#023051] transition-colors px-4 py-3 rounded-lg hover:bg-gray-50 block"
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        <div className="px-4 mt-4 pb-12">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsConsultationOpen(true);
                                }}
                                className="w-full flex sm:hidden items-center justify-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-gray-800 shadow-md"
                            >
                                <User className="w-5 h-5" />
                                Consult Now
                            </button>
                        </div>
                    </nav>
                </div>
            )}
            {/* Consultation Dialog */}
            <ConsultationDialog isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
        </header>
    );
};

export default Header;
