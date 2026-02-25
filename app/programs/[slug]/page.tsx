"use client";

import { useEffect, useState, use } from 'react';
import CommunityStories from "../../components/CommunityStories";
import FAQSection from "../../components/FAQSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PricingSection from "../../components/PricingSection";
import { SmoothReveal } from "../../components/SmoothReveal";
import DynamicHero from "./DynamicHero";
import DynamicSolutions from "./DynamicSolutions";

interface Solution {
    id: string;
    title: string;
    description: string;
    approach: string;
    benefits: string;
    image: string;
}

interface ProgramData {
    id: string;
    name: string;
    heading: string;
    subtext: string;
    background?: string;
    href: string;
    solutionsHeading?: string;
    solutionsSubtext?: string;
    solutions?: Solution[];
}

export default function GenericProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    const [program, setProgram] = useState<ProgramData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                // Determine finding the specific program via fetch all first as a simple fallback
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/programs`);
                if (res.ok) {
                    const data: ProgramData[] = await res.json();

                    // Match the slug with the program's href. 
                    // e.g. /programs/diet -> slug is "diet"
                    const matchingProgram = data.find(p => p.href === `/programs/${unwrappedParams.slug}`);

                    if (matchingProgram) {
                        setProgram(matchingProgram);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch program", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProgram();
    }, [unwrappedParams.slug]);

    useEffect(() => {
        if (!loading && program && typeof window !== 'undefined' && window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [loading, program]);

    if (loading) {
        return (
            <main className="min-h-screen font-sans bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#023051]"></div>
            </main>
        );
    }

    if (!program) {
        return (
            <main className="min-h-screen font-sans bg-white">
                <Header />
                <div className="flex items-center justify-center h-[60vh]">
                    <h1 className="text-2xl font-bold text-gray-600">Program Not Found</h1>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen font-sans bg-white">
            <Header />
            <DynamicHero
                heading={program.heading}
                subtext={program.subtext}
                background={program.background}
                programName={program.name}
            />
            <DynamicSolutions
                heading={program.solutionsHeading || `Complete ${program.name} Solutions`}
                subtext={program.solutionsSubtext || `Simple, safe, and sustainable plans tailored for ${program.name.toLowerCase()} goals.`}
                solutions={program.solutions || []}
            />
            <SmoothReveal delay={0.1}>
                <PricingSection />
            </SmoothReveal>
            <SmoothReveal delay={0.1}>
                <CommunityStories />
            </SmoothReveal>
            <SmoothReveal delay={0.1}>
                <FAQSection />
            </SmoothReveal>
            <SmoothReveal delay={0.1}>
                <Footer />
            </SmoothReveal>
        </main>
    );
}
