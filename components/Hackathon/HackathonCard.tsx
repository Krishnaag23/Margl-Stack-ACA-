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
    <div className="hackathon-card mb-6 flex flex-col rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 md:flex-row">
      <a href="#" className="featured-tab align-items-center">
        <div>Featured</div>
      </a>
      <div className="main-content flex flex-grow flex-col justify-between md:flex-row">
        <img
          src={imageUrl}
          alt={title}
          className="hackathon-thumbnail mb-4 w-full rounded-lg md:mb-0 md:mr-4 md:w-1/4"
        />
        <div className="content flex flex-grow flex-col justify-between">
          <div>
            <h3 className="mb-4 text-xl font-semibold">{title}</h3>
            <div className="justify-content-start mb-6 flex-row">
              <div className="hackathon-status mr-4">
                <div
                  className={`status-label round label mr-4 ${
                    daysLeft > 0 ? "open bg-green-500" : "closed bg-red-500"
                  }`}
                >
                  {daysLeft > 0 ? `${daysLeft} days left` : "Closed"}
                </div>
              </div>
              <div className="info-with-icon">
                <i className="fas fa-globe mr-2"></i>
                <div className="info">
                  <span>{online ? "Online" : "Offline"}</span>
                </div>
              </div>
            </div>
            <div className="justify-content-start align-items-center prizes-and-participants flex-row flex-wrap">
              <div className="prize mb-3 mr-4">
                <span className="prize-amount text-lg font-bold">
                  ${prizeAmount}
                </span>{" "}
                in prizes
              </div>
              <div className="participants mb-3 mr-4">
                <strong>{participants}</strong> participants
              </div>
            </div>
          </div>
          <div className="side-info">
            <div className="host mb-4">
              <div className="info-with-icon">
                <i className="fas fa-flag mr-2"></i>
                <div className="info">
                  <span className="label round host-label inline-flex items-center">
                    <i className="far fa-check-circle checkmark mr-2"></i>
                    {hostName}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="info-with-icon">
                <i className="fas fa-calendar mr-2"></i>
                <div className="info">
                  <span className="submission-period">{submissionPeriod}</span>
                </div>
              </div>
            </div>
            <div className="managed-by-devpost mb-4 flex items-center">
              <img
                src={managedByLogoUrl}
                alt={managedBy}
                className="mr-2 h-6"
              />
              <span>Managed by {managedBy}</span>
            </div>
            <div className="themes flex flex-wrap">
              <div className="info-with-icon">
                <i className="fas fa-tags mr-2"></i>
                <div className="info">
                  {parsedThemes.map((theme, index) => (
                    <span
                      key={index}
                      className="label theme-label mb-2 mr-2 inline-flex items-center rounded-full bg-gray-200 px-2 py-1 text-sm"
                    >
                      <i className="far fa-check-square checkmark mr-2"></i>
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab">
        <i className="fas fa-angle-right" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default HackathonCard;
