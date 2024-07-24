import React from "react";

interface HackathonCardProps {
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

const HackathonCard: React.FC<HackathonCardProps> = ({
  imageUrl,
  title,
  daysLeft,
  online,
  prizeAmount,
  participants,
  hostName,
  hostLogoUrl,
  submissionPeriod,
  managedBy,
  managedByLogoUrl,
  themes,
}) => {
  let parsedThemes: string[] = [];

  try {
    if (typeof themes === "string") {
      parsedThemes = JSON.parse(themes);
    } else if (Array.isArray(themes)) {
      parsedThemes = themes;
    }
  } catch (error) {
    console.error("Error parsing themes:", error);
  }

  // Ensure parsedThemes is always an array
  if (!Array.isArray(parsedThemes)) {
    parsedThemes = [];
  }

  return (
    <div className="hackathon-card mb-6 flex transform flex-col rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800 md:flex-row">
      <img
        src={imageUrl}
        alt={title}
        className="hackathon-thumbnail mb-4 w-full rounded-lg md:mb-0 md:mr-6 md:w-1/4"
      />
      <div className="content flex flex-grow flex-col justify-between">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <div className="mb-6 flex items-center">
            <div className="hackathon-status mr-4">
              <div
                className={`status-label rounded-full px-3 py-1 text-white ${
                  daysLeft > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {daysLeft > 0 ? `${daysLeft} days left` : "Closed"}
              </div>
            </div>
            <div className="flex items-center">
              <i className="fas fa-globe mr-2 text-blue-500"></i>
              <span>{online ? "Online" : "Offline"}</span>
            </div>
          </div>
          <div className="mb-6 flex flex-wrap items-center">
            <div className="prize mb-3 mr-4">
              <span className="prize-amount text-lg font-bold text-yellow-600">
                ${prizeAmount}
              </span>{" "}
              in prizes
            </div>
            <div className="participants mb-3 mr-4 text-gray-700 dark:text-gray-300">
              <strong>{participants}</strong> participants
            </div>
          </div>
        </div>
        <div className="side-info">
          <div className="host mb-4">
            <div className="info-with-icon flex items-center">
              <i className="fas fa-flag mr-2 text-red-500"></i>
              <span className="label round host-label inline-flex items-center">
                <i className="far fa-check-circle checkmark mr-2 text-green-500"></i>{" "}
                {hostName}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <div className="info-with-icon flex items-center">
              <i className="fas fa-calendar mr-2 text-purple-500"></i>
              <span>{submissionPeriod}</span>
            </div>
          </div>
          <div className="managed-by-devpost mb-4 flex items-center">
            <img
              src={managedByLogoUrl}
              alt={managedBy}
              className="mr-2 h-6 rounded-full"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Managed by {managedBy}
            </span>
          </div>
          <div className="themes flex flex-wrap">
            {parsedThemes.map((theme, index) => (
              <span
                key={index}
                className="label theme-label mb-2 mr-2 inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                <i className="far fa-check-square checkmark mr-2 text-blue-500"></i>{" "}
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
