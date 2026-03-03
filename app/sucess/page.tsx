import type { Metadata } from "next";
import SuccessStoriesContent from "./SuccessStoriesContent";

export const metadata: Metadata = {
    title: "Success Stories - Transformation Journeys | Healthstur",
    description: "Be inspired by the real transformations of the Healthstur community. Read about their journey to better health and wellness.",
};

export default function SuccessStoriesPage() {
    return <SuccessStoriesContent />;
}