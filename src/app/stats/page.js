"use client";

import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { leagueData } from "../data/leagueData"; // Importing the correct data

const StatsPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(2024);
  const [stats, setStats] = useState(leagueData[2024]); // Set default to 2024

  const handleSeasonChange = (e) => {
    const year = parseInt(e.target.value, 10);
    setSelectedSeason(year);
    setStats(leagueData[year]); // Update the stats based on selected season
  };

  const topFinishers = stats.slice(0, 3); // Get the top 3 teams

  return (
    <div className="p-4 bg-gray-900 text-white">
      <NavBar />
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Fantasy Football Stats
      </h1>

      {/* Podium for Top 3 Finishers */}
      <div className="flex justify-center items-center space-x-12 mb-6">
        {/* 2nd Place */}
        <div className="flex flex-col items-center w-52">
          <div className="flex justify-center items-center p-8 bg-gray-500 rounded-full w-40 h-40">
            <img
              src="/images/trophy.png" /// Trophy icon
              alt="2nd place trophy"
              className="w-20 h-20"
            />
          </div>
          <p className="text-md font-semibold text-center">
            {topFinishers[1].teamName}
          </p>
          <p className="text-sm text-center">{topFinishers[1].owner}</p>
        </div>
        {/* 1st Place */}
        <div className="flex flex-col items-center w-60">
          <div className="flex justify-center items-center p-8 bg-yellow-500 rounded-full w-48 h-48 relative">
            <img
              src="/images/trophy.png" // Trophy icon
              alt="1st place trophy"
              className="w-24 h-24"
            />
          </div>
          <p className="text-xl font-semibold text-center">
            {topFinishers[0].teamName}
          </p>
          <p className="text-lg text-center">{topFinishers[0].owner}</p>
        </div>
        {/* 3rd Place */}
        <div className="flex flex-col items-center w-52">
          <div className="flex justify-center items-center p-8 bg-orange-500 rounded-full w-40 h-40">
            <img
              src="/images/trophy.png" // Trophy icon
              alt="3rd place trophy"
              className="w-20 h-20"
            />
          </div>
          <p className="text-md font-semibold text-center">
            {topFinishers[2].teamName}
          </p>
          <p className="text-sm text-center">{topFinishers[2].owner}</p>
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

      {/* Display Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-700 text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-6 py-3 text-left">Rank</th>
            <th className="px-6 py-3 text-left">Team Name</th>
            <th className="px-6 py-3 text-left">Owner</th>
            <th className="px-6 py-3 text-left">Record</th>
            <th className="px-6 py-3 text-left">Points For</th>
            <th className="px-6 py-3 text-left">Points Against</th>
            <th className="px-6 py-3 text-left">Points For Per Game</th>
            <th className="px-6 py-3 text-left">Points Against Per Game</th>
            <th className="px-6 py-3 text-left">Points Difference</th>
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
                <td className="px-6 py-4 border-b">{stat.record}</td>
                <td className="px-6 py-4 border-b">
                  {stat.pointsFor.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b">
                  {stat.pointsAgainst.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b">
                  {stat.pointsForPerGame.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b">
                  {stat.pointsAgainstPerGame.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b">
                  {stat.pointsDifference.toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-6 py-4 border-b text-center">
                No data available for this season
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPage;
