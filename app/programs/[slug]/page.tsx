import type { Metadata } from "next";
import ProgramContent from "./ProgramContent";
import { getImageUrl } from "../../utils/image.util";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/programs`);
        if (res.ok) {
            const data = await res.json();
            const program = data.find((p: any) => p.href === `/programs/${slug}`);
            if (program) {
                const imageUrl = getImageUrl(program.background);
                return {
                    title: program.name,
                    description: program.subtext,
                    openGraph: {
                        title: `${program.name} | Healthstur`,
                        description: program.subtext,
                        images: imageUrl ? [{ url: imageUrl }] : [],
                    }
                };
            }
        }
    } catch (error) {
        console.error("Error generating metadata:", error);
    }

    return {
        title: "Program Details",
        description: "Explore our personalized fitness and wellness programs.",
    };
}

export default async function GenericProgramPage({ params }: Props) {
    const slug = (await params).slug;
    return <ProgramContent slug={slug} />;
}
