// components/ProjectCard.tsx
"use client"
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  skills: string;
  timestamp: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  skills,
  timestamp,
  tags,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="border-b border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex items-start justify-between">
        <div className="mr-4">
          <a
            href="/projects/83"
            className="text-[15px] font-semibold text-black hover:underline dark:text-white"
          >
            {title}
          </a>
          <p className="mt-1 text-gray-700 dark:text-gray-300">{description}</p>
          <p className="mt-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="#51CF66"
              height="22px"
              width="22px"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="ml-2">{skills}</span>
          </p>
        </div>
        <div className="actions">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
          <a href="/projects/83/edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </a>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="mr-3 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="rounded bg-gray-200 px-2 py-0.5 font-light text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          <span className="whitespace-nowrap text-sm">{timestamp}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
