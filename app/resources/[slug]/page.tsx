'use client';

import { useEffect, useState, use } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { SmoothReveal } from "../../components/SmoothReveal";
import StartYourJourneySection from "../../sucess/StartYourJourneySection";
import LifestyleShiftSection from "../../wellness/LifestyleShiftSection";
import DynamicResourceHero from "./DynamicResourceHero";
import DynamicResourceSteps from "./DynamicResourceSteps";

interface Step {
    id: number;
    title: string;
    description: string;
    points: string[];
    footer?: string;
    image?: string;
}

interface ResourceData {
    id: string;
    title: string;
    slug: string;
    heroTitle: string;
    heroDescription: string;
    heroImage?: string;
    stepsTitle?: string;
    steps?: Step[];
    isActive?: boolean;
}

export default function GenericResourcePage({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    const [resource, setResource] = useState<ResourceData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/resource/slug/${unwrappedParams.slug}`);
                if (res.ok) {
                    const data: ResourceData = await res.json();
                    if (data && data.isActive !== false) {
                        setResource(data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch resource", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResource();
    }, [unwrappedParams.slug]);

    if (loading) {
        return (
            <main className="min-h-screen font-sans bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#023051]"></div>
            </main>
        );
    }

    if (!resource) {
        return (
            <main className="min-h-screen font-sans bg-white">
                <Header />
                <div className="flex items-center justify-center h-[60vh]">
                    <h1 className="text-2xl font-bold text-gray-600">Resource Not Found</h1>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen font-sans bg-white">
            <Header />
            <DynamicResourceHero
                title={resource.heroTitle}
                description={resource.heroDescription}
                image={resource.heroImage}
                resourceTitle={resource.title}
            />

            {resource.steps && resource.steps.length > 0 && (
                <DynamicResourceSteps steps={resource.steps} />
            )}

            <LifestyleShiftSection />
            <StartYourJourneySection />

            <SmoothReveal delay={0.1}>
                <Footer />
            </SmoothReveal>
        </main>
    );
}
