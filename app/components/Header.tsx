"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, User, Languages, ChevronRight, ChevronDown, BookOpen } from 'lucide-react';

import ConsultationDialog from './ConsultationDialog';
import SearchDialog from './SearchDialog';
import * as LucideIcons from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';

interface SubItem {
    name: string;
    href: string;
}

interface ProgramData {
    id?: string;
    name: string;
    icon: string;
    href: string;
    subItems?: (SubItem | any)[];
    solutions?: { title: string }[];
    isActive?: boolean;
    iconColor?: string;
}

interface ResourceData {
    id: string;
    title: string;
    slug: string;
    isActive: boolean;
}

const Header = () => {
    const [programsData, setProgramsData] = useState<ProgramData[]>([]);
    const [resourcesData, setResourcesData] = useState<ResourceData[]>([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/programs`);
                if (res.ok) {
                    const data: ProgramData[] = await res.json();
                    if (data && data.length > 0) {
                        const activePrograms = data.filter(p => p.isActive !== false);
                        setProgramsData(activePrograms);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch programs", error);
            }
        };

        const fetchResources = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/resource`);
                if (res.ok) {
                    const data: ResourceData[] = await res.json();
                    if (data && data.length > 0) {
                        setResourcesData(data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch resources", error);
            }
        };

        fetchPrograms();
        fetchResources();
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Mobile menu state
    const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
    const [expandedProgramCategory, setExpandedProgramCategory] = useState<string | null>(null);

    // Desktop hover state for Programs Mega Menu
    const [hoveredProgramId, setHoveredProgramId] = useState<string | null>(null);

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
                        let isActive = pathname === link.href;
                        if (link.name === 'PROGRAMS') {
                            isActive = pathname.startsWith('/programs') || programsData.some(p => p.href && p.href !== '/' && p.href !== '#' && pathname.startsWith(p.href.split('#')[0]));
                        } else if (link.name === 'RESOURCES') {
                            isActive = pathname.startsWith('/resources');
                        } else if (link.href !== '/' && pathname.startsWith(link.href)) {
                            isActive = true;
                        }

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
                                    <div className="absolute top-8 left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[600px] ">
                                        <div className="bg-white shadow-xl border border-gray-100 flex min-h-[350px] overflow-hidden ">
                                            {/* Left Column - Programs List */}
                                            <div className="flex flex-col gap-1 w-[280px] shrink-0 border-r border-gray-100 ">
                                                {programsData.map((item, index) => {
                                                    const itemId = item.id || `${item.name}-${index}`;
                                                    const isHovered = hoveredProgramId === itemId || (!hoveredProgramId && index === 0);
                                                    return (
                                                        <div
                                                            key={itemId}
                                                            className="relative group/item"
                                                            onMouseEnter={() => setHoveredProgramId(itemId)}
                                                        >
                                                            <Link
                                                                href={item.href}
                                                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors relative overflow-hidden ${isHovered ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                                                                style={{ '--hover-color': item.iconColor || '#023051' } as React.CSSProperties}
                                                            >
                                                                {/* Hover sidebar accent */}
                                                                <div className={`absolute left-0 top-0 bottom-0 w-[4px] transition-opacity bg-[var(--hover-color)] ${isHovered ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`} />

                                                                <div className="w-6 h-6 flex items-center justify-center text-[color:var(--hover-color)] transition-colors duration-300">
                                                                    <DynamicIcon name={item.icon || 'Activity'} className="w-full h-full" />
                                                                </div>

                                                                <span className={`text-[14px] font-[500] transition-colors flex-1 ${isHovered ? 'text-[color:var(--hover-color)]' : 'text-gray-600 group-hover/item:text-[color:var(--hover-color)]'}`}>
                                                                    {item.name}
                                                                </span>
                                                                <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0 text-[color:var(--hover-color)]' : 'text-gray-400 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-[color:var(--hover-color)]'}`} />
                                                            </Link>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            {/* Right Column - Hovered Program Submenu */}
                                            <div className="flex-1 bg-gray-50/50 p-4 relative z-0">
                                                {(() => {
                                                    const activeId = hoveredProgramId || (programsData.length > 0 ? (programsData[0].id || `${programsData[0].name}-0`) : null);
                                                    const activeProgram = programsData.find((p, idx) => (p.id || `${p.name}-${idx}`) === activeId);

                                                    if (!activeProgram || !activeProgram.solutions || activeProgram.solutions.length === 0) {
                                                        return (
                                                            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                                                                No submenu available
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
                                                            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-2 px-3 opacity-80" style={{ color: activeProgram.iconColor || '#023051' }}>
                                                                {activeProgram.name} Options
                                                            </h4>
                                                            {activeProgram.solutions.map((sol: any, index) => {
                                                                if (!sol || typeof sol !== 'object' || Array.isArray(sol) || !sol.title || sol.isActive === false) return null;
                                                                const name = sol.title || 'Unnamed';
                                                                const slugId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                                                const href = `${activeProgram.href}#${slugId}`;
                                                                return (
                                                                    <Link
                                                                        key={`${name}-${index}`}
                                                                        href={href}
                                                                        className="group/subitem relative flex items-center gap-3 px-3 py-2.5 rounded-md transition-all hover:bg-white hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden"
                                                                        style={{ '--sub-hover-color': activeProgram.iconColor || '#023051' } as React.CSSProperties}
                                                                    >
                                                                        {/* Left Vertical Bar */}
                                                                        <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover/subitem:opacity-100 transition-opacity duration-200 bg-[var(--sub-hover-color)]" />

                                                                        {/* Dot Tracker */}
                                                                        <div className="w-1.5 h-1.5 rounded-full opacity-0 group-hover/subitem:opacity-100 transition-opacity duration-200 shrink-0 bg-[var(--sub-hover-color)]" />

                                                                        {/* Title */}
                                                                        <span className="text-[14px] font-medium text-gray-600 group-hover/subitem:text-[color:var(--sub-hover-color)] group-hover/subitem:font-bold transition-colors flex-1">
                                                                            {name}
                                                                        </span>
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Resources Dropdown */}
                                {link.name === 'RESOURCES' && (
                                    <div className="absolute top-8 left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[240px]">
                                        <div className="bg-white shadow-xl border border-gray-100 overflow-hidden">
                                            <div className="flex flex-col gap-1 ">
                                                {resourcesData.map(resource => (
                                                    <Link key={resource.id} href={`/resources/${resource.slug}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item relative overflow-hidden">
                                                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#023051] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                        <BookOpen className="w-6 h-6 text-gray-500 group-hover/item:text-[#023051] transition-colors" />
                                                        <span className="text-[14px] font-[500] text-gray-700 group-hover/item:text-[#023051] transition-colors">{resource.title}</span>
                                                    </Link>
                                                ))}
                                                <Link href="/resources/expert-articles" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#023051] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                    <User className="w-6 h-6 text-gray-500 group-hover/item:text-[#023051] transition-colors" />
                                                    <span className="text-[14px] font-[500] text-gray-700 group-hover/item:text-[#023051] transition-colors">Expert Articles</span>
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
                <div className="flex items-center gap-4 sm:gap-2">
                    <button onClick={() => setIsSearchOpen(true)} className="text-[#023051] cursor-pointer hover:text-[#023051]/90 transition-colors" aria-label="Search">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
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
                            let isActive = pathname === link.href;
                            if (link.name === 'PROGRAMS') {
                                isActive = pathname.startsWith('/programs') || programsData.some(p => p.href && p.href !== '/' && p.href !== '#' && pathname.startsWith(p.href.split('#')[0]));
                            } else if (link.name === 'RESOURCES') {
                                isActive = pathname.startsWith('/resources');
                            } else if (link.href !== '/' && pathname.startsWith(link.href)) {
                                isActive = true;
                            }

                            // Handle PROGRAMS separately
                            if (link.name === 'PROGRAMS') {
                                return (
                                    <div key={link.name}>
                                        <button
                                            onClick={() => toggleMobileSection('PROGRAMS')}
                                            className={`w-full flex items-center justify-between text-base font-bold transition-colors px-4 py-3 rounded-lg hover:bg-gray-50 ${isActive ? 'text-[#023051]' : 'text-gray-800 hover:text-[#023051]'}`}
                                        >
                                            {link.name}
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedMobileSection === 'PROGRAMS' ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Programs Categories */}
                                        <div className={`overflow-hidden transition-all duration-300 ${expandedMobileSection === 'PROGRAMS' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="bg-gray-50/50 rounded-lg mx-2 border border-blue-50/50">
                                                {programsData.map((category, index) => (
                                                    <div key={category.id || `${category.name}-mobile-${index}`} className="border-b border-gray-100 last:border-0 relative">
                                                        <button
                                                            onClick={() => toggleProgramCategory(category.name)}
                                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:text-[color:var(--hover-color)] transition-colors group/mobileitem"
                                                            style={{ '--hover-color': category.iconColor || '#023051' } as React.CSSProperties}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-5 h-5 flex items-center justify-center text-[color:var(--hover-color)] transition-colors">
                                                                    <DynamicIcon name={category.icon || 'Activity'} className="w-full h-full" />
                                                                </div>
                                                                {category.name}
                                                            </div>
                                                            {category.solutions && category.solutions.length > 0 && (
                                                                <ChevronDown className={`w-4 h-4 text-gray-400 group-hover/mobileitem:text-[color:var(--hover-color)] transition-all duration-300 ${expandedProgramCategory === category.name ? 'rotate-180' : ''}`} />
                                                            )}
                                                        </button>

                                                        {/* Category Subitems */}
                                                        {category.solutions && category.solutions.length > 0 && (
                                                            <div className={`overflow-hidden transition-all duration-300 ${expandedProgramCategory === category.name ? 'max-h-[500px]' : 'max-h-0'}`}>
                                                                <div className="bg-white pl-8 pr-4 py-2 space-y-1 border-t border-gray-100">
                                                                    {category.solutions.map((sol: any, index) => {
                                                                        if (!sol || typeof sol !== 'object' || Array.isArray(sol) || !sol.title || sol.isActive === false) { return null; }
                                                                        const name = sol.title || 'Unnamed';
                                                                        const slugId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                                                        const href = `${category.href}#${slugId}`;
                                                                        return (
                                                                            <Link
                                                                                key={`${name}-${index}`}
                                                                                href={href}
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                                className="block px-4 py-2 text-sm text-gray-600 hover:text-[#023051] border-l-2 border-transparent hover:border-[#023051] transition-colors"
                                                                            >
                                                                                {name}
                                                                            </Link>
                                                                        );
                                                                    })}
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
                                            className={`w-full flex items-center justify-between text-base font-bold transition-colors px-4 py-3 rounded-lg hover:bg-gray-50 ${isActive ? 'text-[#023051]' : 'text-gray-800 hover:text-[#023051]'}`}
                                        >
                                            {link.name}
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedMobileSection === 'RESOURCES' ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Resources Subitems */}
                                        <div className={`overflow-hidden transition-all duration-300 ${expandedMobileSection === 'RESOURCES' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="bg-gray-50/50 rounded-lg mx-2 p-2 border border-blue-50/50">
                                                {resourcesData.map(resource => (
                                                    <Link
                                                        key={resource.id}
                                                        href={`/resources/${resource.slug}`}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors"
                                                    >
                                                        <BookOpen className="w-5 h-5 text-gray-500" />
                                                        <span className="text-sm font-medium text-gray-700">{resource.title}</span>
                                                    </Link>
                                                ))}
                                                <Link
                                                    href="/resources/expert-articles"
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
                                    className={`text-base font-bold transition-colors px-4 py-3 rounded-lg hover:bg-gray-50 block ${isActive ? 'text-[#023051]' : 'text-gray-800 hover:text-[#023051]'}`}
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
            <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} programs={programsData} resources={resourcesData} />
        </header>
    );
};

export default Header;
