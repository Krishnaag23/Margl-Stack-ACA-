"use client";

import { useState } from "react";
import { HackathonData } from "@/types/hackathonData";

interface CreateHackathonFormProps {
  onSubmit: (hackathonData: HackathonData) => void;
  onClose: () => void;
}

const CreateHackathonForm: React.FC<CreateHackathonFormProps> = ({ onSubmit, onClose }) => {
  const [formState, setFormState] = useState<HackathonData>({
    imageUrl: "",
    title: "",
    daysLeft: 0,
    online: true,
    prizeAmount: "",
    participants: 0,
    hostName: "",
    hostLogoUrl: "",
    submissionPeriod: "",
    managedBy: "",
    managedByLogoUrl: "",
    themes: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
  
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked :
               (name === "participants" || name === "daysLeft") ? parseInt(value) || 0 : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch("http://localhost:8000/auth/hackathons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Hackathon created successfully:", result);
        onSubmit(result);
        onClose();
      } else {
        console.error("Error creating hackathon:", result);
      }
    } catch (error) {
      console.error("This is the error:", error);
    }
  };

  return (
    <div className="mx-auto py-4 lg:w-2/3">
      <div className="card-shadow rounded-lg bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <h1 className="text-xl font-semibold">Create Hackathon</h1>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col gap-6 border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="imageUrl">
                Image URL
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Image URL"
                id="imageUrl"
                name="imageUrl"
                value={formState.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Title"
                id="title"
                name="title"
                value={formState.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="daysLeft">
                Days Left
              </label>
              <input
                type="number"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Days Left"
                id="daysLeft"
                name="daysLeft"
                value={formState.daysLeft || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="online">
                Online
              </label>
              <input
                type="checkbox"
                className="box-border rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                id="online"
                name="online"
                checked={formState.online}
                onChange={(e) => setFormState((prevState) => ({ ...prevState, online: e.target.checked }))}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="prizeAmount">
                Prize Amount
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Prize Amount"
                id="prizeAmount"
                name="prizeAmount"
                value={formState.prizeAmount}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="participants">
                Participants
              </label>
              <input
                type="number"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Participants"
                id="participants"
                name="participants"
                value={formState.participants || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="hostName">
                Host Name
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Host Name"
                id="hostName"
                name="hostName"
                value={formState.hostName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="hostLogoUrl">
                Host Logo URL
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Host Logo URL"
                id="hostLogoUrl"
                name="hostLogoUrl"
                value={formState.hostLogoUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="submissionPeriod">
                Submission Period
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Submission Period"
                id="submissionPeriod"
                name="submissionPeriod"
                value={formState.submissionPeriod}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="managedBy">
                Managed By
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Managed By"
                id="managedBy"
                name="managedBy"
                value={formState.managedBy}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="managedByLogoUrl">
                Managed By Logo URL
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Managed By Logo URL"
                id="managedByLogoUrl"
                name="managedByLogoUrl"
                value={formState.managedByLogoUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="pb-2 font-medium leading-[20px]" htmlFor="themes">
                Themes (comma-separated)
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Themes"
                id="themes"
                name="themes"
                value={formState.themes.join(", ")}
                onChange={(e) => setFormState((prevState) => ({ ...prevState, themes: e.target.value.split(", ").map(theme => theme.trim()) }))}
              />
            </div>
          </div>
          <div className="p-6">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
            >
              Create Hackathon
            </button>
            <button
              type="button"
              className="ml-4 rounded bg-gray-500 py-2 px-4 text-white hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathonForm;
