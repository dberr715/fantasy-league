"use client"; // Mark as a client-side component
import React, { useState, useEffect } from "react";
import { allTimeData } from "../data/allTimeData"; // Import all-time data

const HallOfFame = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (allTimeData && allTimeData.owners && allTimeData.owners.length > 0) {
      setStats(allTimeData.owners); // Populate stats with owners data
      setLoading(false); // Set loading to false when data is ready
    }
  }, [allTimeData]); // Dependency on allTimeData

  // Show loading message while data is still loading
  if (loading || stats.length === 0) {
    return (
      <div className="hof-container">
        <h1 className="text-center">Hall of Fame</h1>

        {/* Top Records Section with placeholders */}
        <div className="top-records">
          <h2>Top Records</h2>
          <div className="card-row">
            {/* Placeholder for each stat */}
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="card placeholder-card">
                <div className="image-placeholder"></div>
                <h3>Loading...</h3>
                <p>Loading...</p>
              </div>
            ))}
          </div>
        </div>

        {/* Unwanted Records Section with placeholders */}
        <div className="unwanted-records">
          <h2>Unwanted Records</h2>
          <div className="card-row">
            {/* Placeholder for unwanted records */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="card placeholder-card">
                <div className="image-placeholder"></div>
                <h3>Loading...</h3>
                <p>Loading...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sorting the data for each statistic and getting the top record
  const topStats = {
    allTimeAveragePointsScored: stats.sort(
      (a, b) => b.allTimeAveragePointsScored - a.allTimeAveragePointsScored
    )[0],
    allTimeMostLossesInSeason: stats.sort(
      (a, b) => b.allTimeMostLossesInSeason - a.allTimeMostLossesInSeason
    )[0],
    allTimeMostLossesTotal: stats.sort(
      (a, b) => b.allTimeMostLossesTotal - a.allTimeMostLossesTotal
    )[0],
    allTimeMostWins: stats.sort(
      (a, b) => b.allTimeMostWins - a.allTimeMostWins
    )[0],
    allTimeMostWinsInSeason: stats.sort(
      (a, b) => b.allTimeMostWinsInSeason - a.allTimeMostWinsInSeason
    )[0],
    allTimeMostWinsTotal: stats.sort(
      (a, b) => b.allTimeMostWinsTotal - a.allTimeMostWinsTotal
    )[0],
    allTimeTotalPointsScored: stats.sort(
      (a, b) => b.allTimeTotalPointsScored - a.allTimeTotalPointsScored
    )[0],
    allTimeTotalPointsScoredAgainst: stats.sort(
      (a, b) =>
        b.allTimeTotalPointsScoredAgainst - a.allTimeTotalPointsScoredAgainst
    )[0],
    firstPlaceFinishes: stats.sort(
      (a, b) => b.firstPlaceFinishes - a.firstPlaceFinishes
    )[0],
    highestAveragePointsInSeason: stats.sort(
      (a, b) => b.highestAveragePointsInSeason - a.highestAveragePointsInSeason
    )[0],
    lastPlaceFinishes: stats.sort(
      (a, b) => b.lastPlaceFinishes - a.lastPlaceFinishes
    )[0],
    leastPointsScoredInSeason: stats.sort(
      (a, b) => a.leastPointsScoredInSeason - b.leastPointsScoredInSeason
    )[0],
    mostPointsScoredInSeason: stats.sort(
      (a, b) => b.mostPointsScoredInSeason - a.mostPointsScoredInSeason
    )[0],
  };

  return (
    <div className="hof-container">
      <h1 className="text-center">Hall of Fame</h1>

      {/* Top Records Section */}
      <div className="top-records">
        <h2>Top Records</h2>
        <div className="card-row">
          {/* Display each stat as a card */}
          {Object.keys(topStats).map((statKey) => {
            const stat = topStats[statKey];
            const displayName = statKey
              .replace(/([A-Z])/g, " $1")
              .toLowerCase(); // Convert camelCase to a human-readable name

            return (
              <div key={stat.owner} className="card">
                <img src="/images/trophy.png" alt={stat.owner + "'s Team"} />
                <h3>{stat.owner}</h3>
                <p>
                  {displayName.replace(/^\w/, (c) => c.toUpperCase())}:{" "}
                  {stat[statKey]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unwanted Records Section */}
      <div className="unwanted-records">
        <h2>Unwanted Records</h2>
        <div className="card-row">
          {/* Display unwanted records */}
          <div key={topStats.lastPlaceFinishes.owner} className="card">
            <img src="/images/trophy.png" alt="Last Place Finishes" />
            <h3>{topStats.lastPlaceFinishes.owner}</h3>
            <p>
              Most Last Place Finishes:{" "}
              {topStats.lastPlaceFinishes.lastPlaceFinishes}
            </p>
          </div>
          <div key={topStats.leastPointsScoredInSeason.owner} className="card">
            <img src="/images/trophy.png" alt="Least Points Scored" />
            <h3>{topStats.leastPointsScoredInSeason.owner}</h3>
            <p>
              Least Points Scored in a Season:{" "}
              {topStats.leastPointsScoredInSeason.leastPointsScoredInSeason}
            </p>
          </div>
          <div key={topStats.mostPointsScoredInSeason.owner} className="card">
            <img src="/images/trophy.png" alt="Most Points Scored" />
            <h3>{topStats.mostPointsScoredInSeason.owner}</h3>
            <p>
              Most Points Scored in a Season:{" "}
              {topStats.mostPointsScoredInSeason.mostPointsScoredInSeason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
