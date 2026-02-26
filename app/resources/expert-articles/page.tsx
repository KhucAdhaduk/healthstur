"use client";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { SmoothReveal } from "../../components/SmoothReveal";
import Hero from "./Hero";
import ArticlesContent from "./ArticlesContent";

export default function HelpPage() {
    return (
        <main className="min-h-screen font-sans bg-white">
            <Header />
            <Hero />
            <ArticlesContent />
            <SmoothReveal delay={0.1}>
                <Footer />
            </SmoothReveal>
        </main>
    );
}