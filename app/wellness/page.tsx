import type { Metadata } from "next";
import WellnessContent from "./WellnessContent";

export const metadata: Metadata = {
    title: "Wellness Programs & Corporate Solutions | Healthstur",
    description: "Explore our holistic wellness solutions designed for individuals and organizations. Start your lifestyle shift today.",
};

export default function WellnessPage() {
    return <WellnessContent />;
}