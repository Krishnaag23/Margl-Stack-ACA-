"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import HackathonCard from "@/components/Hackathon/HackathonCard";
import CreateHackathonForm from "@/components/Hackathon/CreateHackathonForm";
import { HackathonData } from "@/types/hackathonData";

const HackathonsPage: React.FC = () => {
  const [hackathons, setHackathons] = useState<HackathonData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchHackathons = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/auth/hackathons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched hackathons:", response.data);
      setHackathons(response.data);
    } catch (error) {
      console.error("Failed to fetch hackathons", error);
      setError("Failed to fetch hackathons");
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  useEffect(() => {
    console.log("Updated hackathons state:", hackathons);
  }, [hackathons]);

  const handleCreateHackathon = async (hackathonData: HackathonData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/hackathons",
        hackathonData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Created hackathon:", response.data);
      setHackathons((prevHackathons) => [...prevHackathons, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create hackathon", error);
      setError("Failed to create hackathon");
    }
  };

  const filteredHackathons = hackathons.filter((hackathon) => {
    console.log("Filtering hackathon:", hackathon);
    const title = hackathon.title?.toLowerCase() || '';
    const hostName = hackathon.hostName?.toLowerCase() || '';
    const themes = hackathon.themes || [];

    const titleMatch = title.includes(searchQuery.toLowerCase());
    const hostNameMatch = hostName.includes(searchQuery.toLowerCase());
    const themesMatch = themes.some((theme) =>
      theme.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log({
      titleMatch,
      hostNameMatch,
      themesMatch,
      searchQuery
    });

    return titleMatch || hostNameMatch || themesMatch;
  });

  console.log('Filtered hackathons:', filteredHackathons);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen py-30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <input
              type="text"
              className="rounded border border-gray-300 p-2"
              placeholder="Search hackathons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={openModal}
              className="rounded bg-primary px-4 py-2 text-white hover:bg-[#6fd680] dark:bg-green-500 dark:hover:bg-green-400"
            >
              Add Hackathon
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <p>Number of filtered hackathons: {filteredHackathons.length}</p>
          {filteredHackathons.length === 0 ? (
            <p>No hackathons found</p>
          ) : (
            filteredHackathons.map((hackathon, index) => (
              <HackathonCard
                key={index}
                imageUrl={hackathon.imageUrl}
                title={hackathon.title} // Adjust based on your data
                daysLeft={hackathon.daysLeft}
                online={hackathon.online}
                prizeAmount={hackathon.prizeAmount}
                participants={hackathon.participants}
                hostName={hackathon.hostName} // Adjust based on your data
                hostLogoUrl={hackathon.hostLogoUrl} // Adjust based on your data
                submissionPeriod={hackathon.submissionPeriod} // Adjust based on your data
                managedBy={hackathon.managedBy} // Adjust based on your data
                managedByLogoUrl={hackathon.managedByLogoUrl} // Adjust based on your data
                themes={hackathon.themes || []} // Adjust based on your data
              />
            ))
          )}

          {isModalOpen && (
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto my-15">
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
