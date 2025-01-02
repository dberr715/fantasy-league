// src/app/page.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar"; // Import NavBar

const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(
      "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/768078?view=mTeam&view=mStandings"
    )
      .then((response) => response.json())
      .then((data) => {
        const teamsData = data.teams.map((team) => ({
          name: team.name,
          points: team.points,
          logo: team.logo,
        }));
        setTeams(teamsData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <NavBar /> {/* Add NavBar here */}
      <h1>Fantasy Football League</h1>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>
            <img src={team.logo} alt={`${team.name} logo`} width={50} />
            <span>
              {team.name} - {team.points} points
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
