"use client"
import React, { useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { ProjectData } from '@/types/projectData';

const predefinedRoles = [
  { value: 'backend-developer', label: 'Back-end developer' },
  { value: 'frontend-developer', label: 'Front-end developer' },
  { value: 'fullstack-developer', label: 'Full stack developer' },
  { value: 'uiux-designer', label: 'UI/UX designer' },
  { value: 'devops-engineer', label: 'DevOps engineer' },
  { value: 'graphic-designer', label: 'Graphic designer' },
  { value: 'mobile-app-developer', label: 'Mobile app developer' },
  { value: 'desktop-app-developer', label: 'Desktop app developer' },
  { value: 'data-scientist', label: 'Data scientist' },
  { value: 'audio-producer', label: 'Audio producer' },
  { value: 'composer', label: 'Composer' },
  { value: '3d-artist', label: '3D artist' },
  { value: 'animator', label: 'Animator' },
  { value: 'marketing-specialist', label: 'Marketing specialist' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'video-producer', label: 'Video producer' },
];

interface CreateProjectFormProps {
  onProjectCreated: (project: ProjectData) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onProjectCreated }) => {
  const [projectData, setProjectData] = useState<{
    name: string;
    description: string;
    roles: string[];
    tags: string[];
  }>({
    name: '',
    description: '',
    roles: [],
    tags: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRolesChange = (selectedOptions: any) => {
    setProjectData((prevData) => ({
      ...prevData,
      roles: selectedOptions
        ? selectedOptions.map((option: any) => option.value)
        : [],
    }));
  };

  const handleTagsChange = (newValue: any, actionMeta: any) => {
    setProjectData((prevData) => ({
      ...prevData,
      tags: newValue ? newValue.map((tag: any) => tag.value) : [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage or other storage
      console.log("this is the tocken",token)
      if (!token) {
        console.error('No token found');
        return;
    }
      const response = await fetch('http://localhost:8000/auth/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include authorization headers
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();
      console.log('printing ', result);

      if (response.ok) {
        console.log('Project created successfully:', result);
        onProjectCreated(result); // Call the prop function to handle project creation
      } else {
        console.error('Error creating project:', result);
      }
    } catch (error) {
      console.log('This is the error:', error);
    }
  };

  return (
    <div className="mx-auto py-4 lg:w-2/3">
      <div className="card-shadow rounded-lg bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <h1 className="text-xl font-semibold">Create Project</h1>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col gap-6 border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="name">
                Project Name
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Project name"
                id="name"
                name="name"
                value={projectData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Write about your project..."
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="roles"
              >
                Roles
              </label>
              <Select
                isMulti
                options={predefinedRoles}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleRolesChange}
                value={predefinedRoles.filter((role) =>
                  projectData.roles.includes(role.value),
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="tags">
                Tags
              </label>
              <CreatableSelect
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleTagsChange}
                value={projectData.tags.map((tag) => ({
                  value: tag,
                  label: tag,
                }))}
                placeholder="Enter tags..."
              />
            </div>
          </div>
          <div className="flex gap-2 p-6">
            <button
              className="box-border cursor-pointer rounded-md bg-primary px-4 py-2 text-center font-medium leading-5 text-white transition-colors hover:bg-[#6fd680] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 dark:bg-green-500 dark:text-gray-900 dark:hover:bg-green-400"
              type="submit"
            >
              Save Project
            </button>
            <button
              className="box-border cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-center font-medium leading-5 text-gray-800 transition-colors hover:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              type="button"
              onClick={() => {
                // Add functionality to cancel or close the form here if needed
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
