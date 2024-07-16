"use client";
import { useState } from "react";

interface CreateHackathonFormProps {
  onSubmit: (hackathonData: HackathonData) => void;
  onClose: () => void;
}

export interface HackathonData {
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
}

const CreateHackathonForm: React.FC<CreateHackathonFormProps> = ({
  onSubmit,
  onClose,
}) => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formState.imageUrl}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formState.title}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <input
        type="number"
        name="daysLeft"
        placeholder="Days Left"
        value={formState.daysLeft}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <div className="flex items-center">
        <input
          type="checkbox"
          name="online"
          checked={formState.online}
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              online: e.target.checked,
            }))
          }
          className="mr-2"
        />
        <label>Online</label>
      </div>
      <input
        type="text"
        name="prizeAmount"
        placeholder="Prize Amount"
        value={formState.prizeAmount}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <input
        type="number"
        name="participants"
        placeholder="Participants"
        value={formState.participants}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        name="hostName"
        placeholder="Host Name"
        value={formState.hostName}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        name="hostLogoUrl"
        placeholder="Host Logo URL"
        value={formState.hostLogoUrl}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        name="submissionPeriod"
        placeholder="Submission Period"
        value={formState.submissionPeriod}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        name="managedBy"
        placeholder="Managed By"
        value={formState.managedBy}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        name="managedByLogoUrl"
        placeholder="Managed By Logo URL"
        value={formState.managedByLogoUrl}
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      <textarea
        name="themes"
        placeholder="Themes (comma-separated)"
        value={formState.themes.join(", ")}
        onChange={(e) =>
          setFormState((prevState) => ({
            ...prevState,
            themes: e.target.value.split(",").map((theme) => theme.trim()),
          }))
        }
        className="block w-full rounded border border-gray-300 p-2"
      />
      <button
        type="submit"
        className="rounded bg-primary px-4 py-2 text-white hover:bg-[#6fd680]"
      >
        Add Hackathon
      </button>
    </form>
  );
};

export default CreateHackathonForm;
