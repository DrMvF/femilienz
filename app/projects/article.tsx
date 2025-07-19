import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye } from "lucide-react";

type Props = {
  project: Project;
  views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
  const formattedDate = project.date
    ? Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
        new Date(project.date)
      )
    : "SOON";

  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="group relative flex flex-col justify-between p-6 md:p-8 font-serif rounded-xl border border-zinc-700/50 hover:border-zinc-500 transition-colors bg-zinc-950/20 hover:bg-zinc-900/20">
        <div className="flex justify-between items-center text-xs text-zinc-400 mb-4">
          <time dateTime={project.date ?? new Date().toISOString()}>
            {formattedDate}
          </time>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
        </div>

        <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4 leading-snug group-hover:underline underline-offset-4 decoration-zinc-600">
          {project.title}
        </h2>

        <p className="text-zinc-300 text-sm leading-relaxed mb-2 group-hover:text-zinc-100 transition-colors">
          {project.description}
        </p>

        <span className="mt-auto text-sm text-zinc-500 group-hover:text-zinc-200 underline underline-offset-4">
          Read more →
        </span>
      </article>
    </Link>
  );
};
