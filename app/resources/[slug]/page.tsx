import type { Metadata } from "next";
import ResourceContent from "./ResourceContent";
import { getImageUrl } from "../../utils/image.util";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/resource/slug/${slug}`);
        if (res.ok) {
            const resource = await res.json();
            if (resource) {
                const imageUrl = getImageUrl(resource.heroImage);
                return {
                    title: `${resource.title} | Wellness Resources`,
                    description: resource.heroDescription,
                    openGraph: {
                        title: `${resource.title} | Wellness Resources | Healthstur`,
                        description: resource.heroDescription,
                        images: imageUrl ? [{ url: imageUrl }] : [],
                    }
                };
            }
        }
    } catch (error) {
        console.error("Error generating metadata:", error);
    }

    return {
        title: "Wellness Resource",
        description: "Explore our expert wellness articles and guides.",
    };
}

export default async function GenericResourcePage({ params }: Props) {
    const slug = (await params).slug;
    return <ResourceContent slug={slug} />;
}
