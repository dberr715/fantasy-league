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

  return (
    <div>
      <NavBar />
      <h1>Fantasy Football Stats</h1>

      {/* Season Dropdown */}
      <select
        value={selectedSeason}
        onChange={handleSeasonChange}
        style={styles.filterInput}
      >
        {Object.keys(leagueData).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Display Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Owner</th>
            <th>Record</th>
            <th>Points For</th>
            <th>Points Against</th>
            <th>Points For Per Game</th>
            <th>Points Against Per Game</th>
            <th>Points Difference</th>
          </tr>
        </thead>
        <tbody>
          {stats.length > 0 ? (
            stats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.rank}</td>
                <td>{stat.teamName}</td>
                <td>{stat.owner}</td>
                <td>{stat.record}</td>
                <td>{stat.pointsFor.toFixed(2)}</td>
                <td>{stat.pointsAgainst.toFixed(2)}</td>
                <td>{stat.pointsForPerGame.toFixed(2)}</td>
                <td>{stat.pointsAgainstPerGame.toFixed(2)}</td>
                <td>{stat.pointsDifference.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available for this season</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  filterInput: {
    padding: "10px",
    marginBottom: "20px",
    width: "200px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
};

export default StatsPage;
