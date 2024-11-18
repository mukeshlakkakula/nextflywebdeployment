// components/ProjectGrid.js
import React, { memo } from "react";
// import ProjectCard from "./ProjectCard";
import { projectsData } from "@/Data/project"; // Update path if needed for Next.js
import ProjectsHomeCard from "@/components/ProjectsHomeCard";

const ProjectGrid = memo(() => {
  // Assuming projectsData is an array of project data objects.
  const projects = projectsData[0];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectsHomeCard
            key={project.title}
            project={project}
            index={index}
            {...project}
          />
        ))}
      </div>
    </div>
  );
});

ProjectGrid.displayName = "ProjectGrid";
export default ProjectGrid;
