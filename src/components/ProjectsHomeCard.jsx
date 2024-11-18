// ProjectCard.jsx
import React, { memo } from "react";
import { motion } from "framer-motion";
import ProjectContent from "./ProjectContent";

const ProjectsHomeCard = memo(({ project, index }) => {
  //console.log(project);

  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col mx-4"
    >
      <div className="relative overflow-hidden rounded-t-lg bg-[#1a1a2e]">
        <div className="aspect-w-16 aspect-h-9 transform transition-transform duration-700 group-hover:scale-105">
          <ProjectContent project={project} index={index} />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#913bfe] text-white px-6 py-2 rounded-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#7b32d7]"
              >
                View Project
              </a>
            )}
          </div>
        </div>
        <div className="absolute top-4 left-4 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div className="bg-[#0c0d2c] p-6 rounded-b-lg">
        <h3 className="text-[#b0b5d2] text-xl font-medium mb-2">
          {project.title}
        </h3>
        <p className="text-white text-lg line-clamp-2 font-display">
          {project.description}
        </p>

        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
          <div className="flex space-x-2">
            <span className="text-xs px-3 py-1 rounded-full bg-[#913bfe]/10 text-[#913bfe]">
              {project.image ? "Static Preview" : "Live Preview"}
            </span>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#913bfe] hover:text-[#7b32d7] transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectsHomeCard;
