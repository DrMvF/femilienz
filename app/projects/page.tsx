import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;

function calculateAge(dateString: string) {
  const birthDate = new Date("1981-04-29");
  const createdDate = new Date(dateString);
  let age = createdDate.getFullYear() - birthDate.getFullYear();
  const m = createdDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && createdDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find((project) => project.slug === "jert")!;
  const top2 = allProjects.find((project) => project.slug === "ikigami")!;
  const top3 = allProjects.find((project) => project.slug === "ikigaistrategist")!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16 font-serif">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl tracking-tight text-zinc-100 sm:text-4xl font-serif">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400 font-serif">
            Built in different contexts. United by a deeper intention.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {/* JERT */}
          <Card>
            <a
              href="https://www.jert.us"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.date ? (
                      <>
                        <time dateTime={new Date(featured.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(featured.date))}
                        </time>
                        {" – Built at age " + calculateAge(featured.date)}
                      </>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                </div>
                <h2 className="mt-4 text-3xl font-bold text-zinc-100 sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 text-zinc-400">
                  {featured.description}
                </p>
              </article>
            </a>
          </Card>

          {/* Ikigami & Ikigai Strategist */}
          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <a
                  href={
                    project.slug === "ikigami"
                      ? "https://www.ikigami.de"
                      : "https://www.ikigaistrategist.de/start"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  <article className="p-4 md:p-8">
                    <div className="text-xs text-zinc-100 mb-2">
                      {project.date ? (
                        <>
                          <time dateTime={new Date(project.date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, {
                              dateStyle: "medium",
                            }).format(new Date(project.date))}
                          </time>
                          {" – Built at age " + calculateAge(project.date)}
                        </>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-100">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-zinc-400">{project.description}</p>
                  </article>
                </a>
              </Card>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <div className="space-y-8 mt-8">
          {sorted.map((project) => (
            <Card key={project.slug}>
              <a
                href="https://www.radicalsensitiveleadership.com"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <article className="p-4 md:p-8">
                  <div className="text-xs text-zinc-100 mb-2">
                    {project.date ? (
                      <>
                        <time dateTime={new Date(project.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(project.date))}
                        </time>
                        {" – Built at age " + calculateAge(project.date)}
                      </>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-100">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-zinc-400">{project.description}</p>
                </article>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}