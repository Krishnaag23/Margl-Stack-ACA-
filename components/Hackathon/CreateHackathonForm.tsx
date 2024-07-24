"use client";

import { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { HackathonData } from "@/types/hackathonData";

const themesOptions = [
  // Define theme options here if needed, similar to predefinedRoles in CreateProjectForm
];

interface CreateHackathonFormProps {
  onHackathonCreated: (hackathonData: HackathonData) => void;
  onClose: () => void;
}

const CreateHackathonForm: React.FC<CreateHackathonFormProps> = ({
  onHackathonCreated,
  onClose,
}) => {
  const [hackathonData, setHackathonData] = useState<{
    imageUrl: string;
    title: string;
    daysLeft: number;
    online: boolean;
    prizeAmount: string;
    participants: number;
    hostName: string;
    hostLogoUrl: string;
    submissionPeriod: string;
    managedBy: string;
    managedByLogoUrl: string;
    themes: string[];
  }>({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setHackathonData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThemesChange = (newValue: any) => {
    setHackathonData((prevData) => ({
      ...prevData,
      themes: newValue ? newValue.map((theme: any) => theme.value) : [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const payload = {
        image_url: hackathonData.imageUrl,
        title: hackathonData.title,
        days_left: hackathonData.daysLeft.toString(),
        online: hackathonData.online,
        prize_amount: hackathonData.prizeAmount,
        participants: hackathonData.participants.toString(),
        host_name: hackathonData.hostName,
        host_logo_url: hackathonData.hostLogoUrl,
        submission_period: hackathonData.submissionPeriod,
        managed_by: hackathonData.managedBy,
        managed_by_logo_url: hackathonData.managedByLogoUrl,
        themes: hackathonData.themes,
      };

      const response = await fetch("http://localhost:8000/auth/hackathons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        console.log("Hackathon created successfully:", result);
        onClose();
        onHackathonCreated(result);
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
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="imageUrl"
              >
                Image URL
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Image URL"
                id="imageUrl"
                name="imageUrl"
                value={hackathonData.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Title"
                id="title"
                name="title"
                value={hackathonData.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="daysLeft"
              >
                Days Left
              </label>
              <input
                type="number"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Days Left"
                id="daysLeft"
                name="daysLeft"
                value={hackathonData.daysLeft}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="online"
              >
                Online
              </label>
              <input
                type="checkbox"
                className="box-border rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                id="online"
                name="online"
                checked={hackathonData.online}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="prizeAmount"
              >
                Prize Amount
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Prize Amount"
                id="prizeAmount"
                name="prizeAmount"
                value={hackathonData.prizeAmount}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="participants"
              >
                Participants
              </label>
              <input
                type="number"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Participants"
                id="participants"
                name="participants"
                value={hackathonData.participants}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="hostName"
              >
                Host Name
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Host Name"
                id="hostName"
                name="hostName"
                value={hackathonData.hostName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="hostLogoUrl"
              >
                Host Logo URL
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Host Logo URL"
                id="hostLogoUrl"
                name="hostLogoUrl"
                value={hackathonData.hostLogoUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="submissionPeriod"
              >
                Submission Period
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Submission Period"
                id="submissionPeriod"
                name="submissionPeriod"
                value={hackathonData.submissionPeriod}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="managedBy"
              >
                Managed By
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Managed By"
                id="managedBy"
                name="managedBy"
                value={hackathonData.managedBy}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="managedByLogoUrl"
              >
                Managed By Logo URL
              </label>
              <input
                type="text"
                className="box-border w-full rounded-[4px] border border-[#DEE2E6] bg-[#F8F9FA] p-2 text-sm leading-[20px] outline-none transition-all focus:border-[#495057] focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-500 dark:focus:bg-gray-700"
                placeholder="Managed By Logo URL"
                id="managedByLogoUrl"
                name="managedByLogoUrl"
                value={hackathonData.managedByLogoUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-2 font-medium leading-[20px]"
                htmlFor="themes"
              >
                Themes
              </label>
              <CreatableSelect
                isMulti
                options={themesOptions}
                value={hackathonData.themes.map((theme) => ({
                  value: theme,
                  label: theme,
                }))}
                onChange={handleThemesChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          <div className="p-6">
            <button
              type="submit"
              className="box-border rounded-[4px] bg-blue-600 px-4 py-2 text-sm leading-[20px] text-white hover:bg-blue-700"
            >
              Create Hackathon
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 box-border rounded-[4px] bg-gray-600 px-4 py-2 text-sm leading-[20px] text-white hover:bg-gray-700"
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
