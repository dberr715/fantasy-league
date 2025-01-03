"use client"; // Mark as a client-side component
import React, { useState, useEffect } from "react";

const HallOfFame = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch the static JSON data from the public folder
    fetch("/allTimeData.json")
      .then((response) => response.json())
      .then((data) => {
        // Combine stats for each owner (if there are duplicates)
        const combinedStats = Object.values(data).reduce((acc, owner) => {
          if (acc[owner.owner]) {
            // Combine stats for the same owner
            acc[owner.owner] = {
              ...acc[owner.owner],
              allTimeMostWins:
                acc[owner.owner].allTimeMostWins + owner.allTimeMostWins,
              allTimeTotalPointsScored:
                acc[owner.owner].allTimeTotalPointsScored +
                owner.allTimeTotalPointsScored,
              allTimeTotalPointsScoredAgainst:
                acc[owner.owner].allTimeTotalPointsScoredAgainst +
                owner.allTimeTotalPointsScoredAgainst,
              firstPlaceFinishes:
                acc[owner.owner].firstPlaceFinishes + owner.firstPlaceFinishes,
              highestAveragePointsInSeason: Math.max(
                acc[owner.owner].highestAveragePointsInSeason,
                owner.highestAveragePointsInSeason
              ),
              // Add other stats aggregation logic as needed
            };
          } else {
            acc[owner.owner] = owner;
          }
          return acc;
        }, {});

        setStats(Object.values(combinedStats)); // Set the combined stats data
        setLoading(false); // Set loading to false once data is ready
      })
      .catch((error) => {
        console.error("Error fetching allTimeData:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading data...</div>; // Show loading message while data loads
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
  };

  return (
    <div className="hof-container">
      <h1 className="text-center">Hall of Fame</h1>

      {/* Top Records Section */}
      <div className="top-records">
        <h2>Top Records</h2>
        <div className="card-row">
          {/* Display the top record for each category */}
          {Object.keys(topStats).map((statKey) => {
            const stat = topStats[statKey];
            const displayName = statKey
              .replace(/([A-Z])/g, " $1")
              .toLowerCase(); // Convert camelCase to a human-readable name

            return (
              <div key={`${stat.owner}-${statKey}`} className="card">
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
    </div>
  );
};

export default HallOfFame;
