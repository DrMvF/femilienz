import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye } from "lucide-react";

type Props = {
  project: Project;
  views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="no-underline hover:no-underline"
    >
      <article className="p-4 md:p-8 font-serif">
        <div className="flex justify-between gap-2 items-center">
          <span className="text-xs text-zinc-200">
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.date)
                )}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
          <span className="text-zinc-500 text-xs flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
        </div>
        <h2 className="mt-2 text-xl lg:text-3xl text-zinc-100">
          {project.title}
        </h2>
        <p className="mt-4 text-sm text-zinc-400">
          {project.description}
        </p>
      </article>
    </Link>
  );
};
