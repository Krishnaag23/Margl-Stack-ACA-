"use client";
import { useState } from "react";
import ProjectCard from "@/components/Project/ProjectCard";
import { ProjectData } from "@/types/projectData";
import CreateProjectForm from "@/components/Project/CreateProjectForm";


const CreateProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateProject = (projectData: ProjectData) => {
    setProjects((prevProjects) => [...prevProjects, projectData]);
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.roles.some((role) =>
        role.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen  py-30 ">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <input
              type="text"
              className="rounded border border-gray-300 p-2"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={openModal}
              className="rounded bg-primary px-4 py-2 text-white hover:bg-[#6fd680] dark:bg-green-500 dark:hover:bg-green-400"
            >
              Add Your Project
            </button>
          </div>

          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.name}
              description={project.description}
              skills={project.roles.join(", ")}
              timestamp="a few seconds ago"
              tags={project.tags}
            />
          ))}

          
          {/* Add more HackathonCard components as needed */}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="relative mx-auto w-4/5 rounded-lg bg-white p-6 dark:bg-gray-800">
                <button
                  onClick={closeModal}
                  className="absolute right-0 top-0 m-2 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Close
                </button>
                <CreateProjectForm onSubmit={handleCreateProject} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateProjectPage;
