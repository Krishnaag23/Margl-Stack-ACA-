"use client";
import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/Project/ProjectCard';
import { ProjectData } from '@/types/projectData';
import CreateProjectForm from '@/components/Project/CreateProjectForm';

const CreateProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch('http://localhost:8000/auth/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data: ProjectData[] = await response.json();
      console.log('Fetched projects:', data); // Log fetched data for debugging
      setProjects(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log("Updated projects state:", projects);
  }, [projects]);

  const handleProjectCreated = async (projectData: ProjectData) => {
    try {
      await fetchProjects(); // Refetch projects after creation
      setIsModalOpen(false);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const filteredProjects = projects.filter((project) => {
    console.log("Filtering project:", project);
    const nameMatch = project.Name?.toLowerCase().includes(searchQuery.toLowerCase());
    const descriptionMatch = project.Description?.toLowerCase().includes(searchQuery.toLowerCase());
    const rolesMatch = JSON.parse(project.Roles)?.some((role: string) =>
      role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const tagsMatch = JSON.parse(project.Tags)?.some((tag: string) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    console.log({
      nameMatch,
      descriptionMatch,
      rolesMatch,
      tagsMatch,
      searchQuery
    });

    return nameMatch || descriptionMatch || rolesMatch || tagsMatch;
  });

  console.log('Filtered projects:', filteredProjects); // Log filtered projects for debugging

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="min-h-screen py-30">
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

          {error && <p className="text-red-500">{error}</p>}
          <p>Number of filtered projects: {filteredProjects.length}</p>
          {filteredProjects.length === 0 ? (
            <p>No projects found</p>
          ) : (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.Name || 'No Title'}
                description={project.Description || 'No Description'}
                skills={JSON.parse(project.Roles)?.join(', ') || 'No Skills'}
                timestamp="a few seconds ago"
                tags={JSON.parse(project.Tags) || []}
              />
            ))
          )}

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
                  <CreateProjectForm onProjectCreated={handleProjectCreated} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateProjectPage;
