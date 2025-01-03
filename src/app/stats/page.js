"use client"; // Mark as a client-side component

import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { leagueData } from "../data/leagueData"; // Import your league data
import { calculateAllTimeStats } from "../../utils/calculateAllTimeStats"; // Import the function

const StatsPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(2024);
  const [stats, setStats] = useState(leagueData[selectedSeason]); // Set default to 2024
  const [allTimeStats, setAllTimeStats] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState("");

  // Calculate all-time stats from league data
  useEffect(() => {
    const stats = calculateAllTimeStats(leagueData);
    setAllTimeStats(stats);
  }, []);

  // Handle season change
  const handleSeasonChange = (e) => {
    const year = parseInt(e.target.value, 10);
    setSelectedSeason(year);
    setStats(leagueData[year]); // Update the stats based on selected season
  };

  // Handle owner selection
  const handleOwnerChange = (e) => {
    setSelectedOwner(e.target.value);
  };

  // Find selected owner's stats for the current season
  const selectedOwnerStats = stats.find((stat) => stat.owner === selectedOwner);

  // Helper function to format numbers with commas
  const formatNumber = (number) => {
    return number.toLocaleString(); // Using JavaScript's built-in toLocaleString for formatting
  };

  const topFinishers = stats.slice(0, 3); // Get the top 3 teams

  // Helper function to find highest stats for the selected season
  const findHighestStat = (statName) => {
    return Math.max(...stats.map((stat) => stat[statName]));
  };

  const highestPointsFor = findHighestStat("pointsFor");
  const highestPointsAgainst = findHighestStat("pointsAgainst");
  const highestPointsPerGame = findHighestStat("pointsForPerGame");
  const highestPointsDifference = findHighestStat("pointsDifference");

  return (
    <div className="p-4 bg-gray-900 text-white">
      <NavBar />
      <h1 className="text-2xl font-semibold my-4 text-center">
        {selectedSeason} Season Stats
      </h1>

      {/* Podium for Top 3 Finishers */}
      <div className="flex flex-col items-center sm:flex-row sm:space-x-6 justify-center mb-6">
        {/* 1st Place (on its own row) */}
        <div className="flex flex-col items-center w-32 sm:w-40 mb-4 sm:mb-0">
          <div className="flex justify-center items-center p-4 sm:p-6 bg-yellow-500 rounded-full w-32 h-32 sm:w-36 sm:h-36 relative">
            <img
              src="/images/trophy.png" // Local trophy image for 1st place
              alt="1st place trophy"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-center truncate max-w-full">
            {topFinishers[0]?.teamName}
          </p>
          <p className="text-xs sm:text-sm text-center">
            {topFinishers[0]?.owner}
          </p>
        </div>

        {/* 2nd and 3rd Place (in a row below 1st place on small screens) */}
        <div className="flex flex-row sm:justify-center sm:space-x-6 w-full sm:w-auto justify-between sm:justify-start">
          {/* 2nd Place */}
          <div className="flex flex-col items-center w-32 sm:w-40 mb-4 sm:mb-0 sm:ml-4">
            <div className="flex justify-center items-center p-4 sm:p-6 bg-gray-500 rounded-full w-32 h-32 sm:w-36 sm:h-36">
              <img
                src="/images/trophy.png" // Local trophy image for 2nd place
                alt="2nd place trophy"
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-center truncate max-w-full">
              {topFinishers[1]?.teamName}
            </p>
            <p className="text-xs sm:text-sm text-center">
              {topFinishers[1]?.owner}
            </p>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center w-32 sm:w-40 sm:mr-4">
            <div className="flex justify-center items-center p-4 sm:p-6 bg-orange-500 rounded-full w-32 h-32 sm:w-36 sm:h-36">
              <img
                src="/images/trophy.png" // Local trophy image for 3rd place
                alt="3rd place trophy"
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-center truncate max-w-full">
              {topFinishers[2]?.teamName}
            </p>
            <p className="text-xs sm:text-sm text-center">
              {topFinishers[2]?.owner}
            </p>
          </div>
        </div>
      </div>

      {/* Season Dropdown */}
      <div className="mb-4 text-center">
        <select
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="p-2 border border-gray-700 rounded text-black"
        >
          {Object.keys(leagueData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Display Table - Only Rank, Team Name, and Owner */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-700 text-sm mb-8">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Team Name</th>
              <th className="px-6 py-3 text-left">Owner</th>
            </tr>
          </thead>
          <tbody>
            {stats.length > 0 ? (
              stats.map((stat, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 cursor-pointer"
                >
                  <td className="px-6 py-4 border-b">{stat.rank}</td>
                  <td className="px-6 py-4 border-b">{stat.teamName}</td>
                  <td className="px-6 py-4 border-b">{stat.owner}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 border-b text-center">
                  No data available for this season
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Individual Season Stats Header */}
      <h2 className="text-xl font-semibold mb-4 text-center">
        Select Individual Season Statistics
      </h2>

      {/* Hall of Fame Dropdown */}
      <div className="text-center mb-4">
        <select
          value={selectedOwner}
          onChange={handleOwnerChange}
          className="p-2 border border-gray-700 rounded text-black"
        >
          <option value="">Select Owner</option>
          {stats.map((stat) => (
            <option key={stat.owner} value={stat.owner}>
              {stat.owner}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Owner Stats */}
      {/* Display Selected Owner Stats */}
      {selectedOwnerStats ? (
        <div className="flex flex-col items-center m-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80 mx-auto">
          <p className="text-xl font-semibold">{selectedOwnerStats.owner}</p>
          <div className="flex justify-between w-full mb-2">
            <p className="text-lg font-semibold">Rank</p>
            <p className="text-lg">{selectedOwnerStats.rank}</p>
          </div>
          <div className="flex justify-between w-full mb-2">
            <p className="text-lg font-semibold">Record</p>
            <p
              className={`text-lg ${
                selectedOwnerStats.wins === highestPointsFor
                  ? "font-bold text-blue-500"
                  : ""
              }`}
            >
              {selectedOwnerStats.record}
            </p>
          </div>
          <div className="flex justify-between w-full mb-2">
            <p className="text-lg font-semibold">Points For</p>
            <p
              className={`text-lg ${
                selectedOwnerStats.pointsFor === highestPointsFor
                  ? "font-bold text-blue-500"
                  : ""
              }`}
            >
              {formatNumber(selectedOwnerStats.pointsFor)}
            </p>
          </div>
          <div className="flex justify-between w-full mb-2">
            <p className="text-lg font-semibold">Points Against</p>
            <p
              className={`text-lg ${
                selectedOwnerStats.pointsAgainst === highestPointsAgainst
                  ? "font-bold text-blue-500"
                  : ""
              }`}
            >
              {formatNumber(selectedOwnerStats.pointsAgainst)}
            </p>
          </div>
          <div className="flex justify-between w-full mb-2">
            <p className="text-lg font-semibold">Points Per Game</p>
            <p
              className={`text-lg ${
                selectedOwnerStats.pointsForPerGame === highestPointsPerGame
                  ? "font-bold text-blue-500"
                  : ""
              }`}
            >
              {selectedOwnerStats.pointsForPerGame.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-lg font-semibold">Points Difference</p>
            <p
              className={`text-lg ${
                selectedOwnerStats.pointsDifference === highestPointsDifference
                  ? "font-bold text-blue-500"
                  : ""
              } ${
                selectedOwnerStats.pointsDifference >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {selectedOwnerStats.pointsDifference.toFixed(2)}
            </p>
          </div>

          {/* Note about Blue Font */}
          <p className="text-xs text-center mt-4 text-blue-500">
            *Blue font indicates the highest value in the league for that stat.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center m-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80 mx-auto">
          <p className="text-xl font-semibold">
            Select a season owner to see stats
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
