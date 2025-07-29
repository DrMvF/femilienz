import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

function calculateAge(dateString: string) {
  const birthDate = new Date("1981-04-29");
  const now = new Date(dateString);
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years}y ${months}m ${days}d`;
}

const projectLinks: Record<string, string> = {
  ikigami: "https://www.ikigami.de",
  ikigaistrategist: "https://www.ikigaistrategist.de/start",
  jert: "https://www.jert.us",
  radicalsensitiveleadership: "https://www.radicalsensitiveleadership.com",
};

export default function ProjectsPage() {
  const ikigami = allProjects.find((p) => p.slug === "ikigami")!;
  const strategist = allProjects.find((p) => p.slug === "ikigaistrategist")!;
  const jert = allProjects.find((p) => p.slug === "jert")!;
  const rsl = allProjects.find((p) => p.slug === "radicalsensitiveleadership")!;

  const ordered = [ikigami, strategist, jert, rsl];

  return (
    <div className="relative pb-16 font-serif">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-3xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl tracking-tight text-zinc-100 sm:text-4xl font-serif">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400 font-serif">
            Built in different contexts. United by a deeper intention.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="flex flex-col gap-8">
          {ordered.map((project) => (
            <Card key={project.slug}>
              <a
                href={projectLinks[project.slug]}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <article className="p-4 md:p-8">
                  <div className="text-xs text-zinc-100">
                    {project.date ? (
                      <time dateTime={new Date(project.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(project.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>

                  <h2 className="mt-2 text-2xl font-bold text-zinc-100">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-zinc-400">{project.description}</p>
                  {project.date && (
                    <p className="mt-2 text-xs text-zinc-500">
                      Built with life wisdom of {calculateAge(project.date)}
                    </p>
                  )}
                </article>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
