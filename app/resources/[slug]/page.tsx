import type { Metadata } from "next";
import ResourceContent from "./ResourceContent";

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
                return {
                    title: `${resource.title} | Wellness Resources`,
                    description: resource.heroDescription,
                    openGraph: {
                        title: `${resource.title} | Wellness Resources | Healthstur`,
                        description: resource.heroDescription,
                        images: resource.heroImage ? [{ url: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '') + resource.heroImage.replace('/uploads/', '/public/') }] : [],
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
