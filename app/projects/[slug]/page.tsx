import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published === true)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) return notFound();

  const views =
    (await redis.get<number>(`pageviews:projects:${slug}`)) ?? 0;

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen pb-32">
      <Header project={project} views={views} />
      <ReportView slug={slug} />
      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless prose-p:text-justify prose-p:leading-relaxed max-w-prose font-serif">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
