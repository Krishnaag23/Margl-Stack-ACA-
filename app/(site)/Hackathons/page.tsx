"use client"
import { useState } from "react";
import HackathonCard from "@/components/Hackathon/HackathonCard";
import CreateHackathonForm, {
  HackathonData,
} from "@/components/Hackathon/CreateHackathonForm";

const HackathonsPage: React.FC = () => {
  const [hackathons, setHackathons] = useState<HackathonData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateHackathon = (hackathonData: HackathonData) => {
    setHackathons((prevHackathons) => [...prevHackathons, hackathonData]);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen py-36">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="mb-6 mt-12 text-2xl font-semibold">
              Upcoming Hackathons
            </h2>
            <button
              onClick={openModal}
              className="rounded bg-primary px-4 py-2 text-white hover:bg-[#6fd680] dark:bg-green-500 dark:hover:bg-green-400"
            >
              Add Hackathon
            </button>
          </div>

          {hackathons.map((hackathon, index) => (
            <HackathonCard
              key={index}
              imageUrl={hackathon.imageUrl}
              title={hackathon.title}
              daysLeft={hackathon.daysLeft}
              online={hackathon.online}
              prizeAmount={hackathon.prizeAmount}
              participants={hackathon.participants}
              hostName={hackathon.hostName}
              hostLogoUrl={hackathon.hostLogoUrl}
              submissionPeriod={hackathon.submissionPeriod}
              managedBy={hackathon.managedBy}
              managedByLogoUrl={hackathon.managedByLogoUrl}
              themes={hackathon.themes}
            />
          ))}

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
                  <CreateHackathonForm
                    onSubmit={handleCreateHackathon}
                    onClose={closeModal}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HackathonsPage;
