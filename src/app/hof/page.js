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
              allTimeMostWinsInSeason: Math.max(
                acc[owner.owner].allTimeMostWinsInSeason,
                owner.allTimeMostWinsInSeason
              ),
              allTimeMostLossesInSeason: Math.max(
                acc[owner.owner].allTimeMostLossesInSeason,
                owner.allTimeMostLossesInSeason
              ),
              allTimeMostWinsTotal:
                acc[owner.owner].allTimeMostWinsTotal +
                owner.allTimeMostWinsTotal,
              allTimeMostLossesTotal:
                acc[owner.owner].allTimeMostLossesTotal +
                owner.allTimeMostLossesTotal,
              lastPlaceFinishes:
                acc[owner.owner].lastPlaceFinishes + owner.lastPlaceFinishes,
              leastPointsScoredInSeason: Math.min(
                acc[owner.owner].leastPointsScoredInSeason,
                owner.leastPointsScoredInSeason
              ),
              mostPointsScoredInSeason: Math.max(
                acc[owner.owner].mostPointsScoredInSeason,
                owner.mostPointsScoredInSeason
              ),
              allTimeAveragePointsScored:
                (acc[owner.owner].allTimeTotalPointsScored +
                  owner.allTimeTotalPointsScored) /
                (acc[owner.owner].gamesPlayed + owner.gamesPlayed), // Assuming "gamesPlayed" exists in your data for the number of games each owner played
            };
          } else {
            acc[owner.owner] = owner;
          }
          return acc;
        }, {});

        // Set the combined stats data
        setStats(Object.values(combinedStats));
        setLoading(false); // Set loading to false once data is ready
      })
      .catch((error) => {
        console.error("Error fetching allTimeData:", error);
        setLoading(false); // Stop loading if an error occurs
      });
  }, []);

  if (loading) {
    return <div>Loading data...</div>; // Show loading message while data loads
  }

  // Sorting the data for each statistic and getting the top record
  const getTopStats = (statKey) => {
    const sortedStats = [...stats].sort((a, b) => b[statKey] - a[statKey]);

    // Find the highest value
    const highestValue = sortedStats[0][statKey];

    // Return all owners with the highest value (handling ties)
    return sortedStats.filter((stat) => stat[statKey] === highestValue);
  };

  const topStats = {
    firstPlaceFinishes: getTopStats("firstPlaceFinishes"),
    allTimeMostWins: getTopStats("allTimeMostWins"),
    allTimeMostWinsInSeason: getTopStats("allTimeMostWinsInSeason"),
    allTimeTotalPointsScored: getTopStats("allTimeTotalPointsScored"),
    mostPointsScoredInSeason: getTopStats("mostPointsScoredInSeason"),
    allTimeAveragePointsScored: getTopStats("allTimeAveragePointsScored"),
    highestAveragePointsInSeason: getTopStats("highestAveragePointsInSeason"),
  };

  const notGoodStats = {
    lastPlaceFinishes: getTopStats("lastPlaceFinishes"),
    leastPointsScoredInSeason: getTopStats("leastPointsScoredInSeason"),
    allTimeMostLossesInSeason: getTopStats("allTimeMostLossesInSeason"),
    allTimeMostLossesTotal: getTopStats("allTimeMostLossesTotal"),
    allTimeTotalPointsScoredAgainst: getTopStats(
      "allTimeTotalPointsScoredAgainst"
    ),
  };

  // Custom mapping for stat display names
  const statLabelMapping = {
    allTimeAveragePointsScored: "Avg Points Scored (Season)",
    allTimeMostLossesInSeason: "Most Losses (Season)",
    allTimeMostLossesTotal: "Most Losses (AllTime)",
    allTimeMostWins: "Most Wins (AllTime)",
    allTimeMostWinsInSeason: "Most Wins (Season)",
    allTimeTotalPointsScored: "Points Scored (AllTime)",
    allTimeTotalPointsScoredAgainst: "Points Against (AllTime)",
    firstPlaceFinishes: "Championships",
    highestAveragePointsInSeason: "Average Points (Season)",
    lastPlaceFinishes: "Last Place Finishes",
    leastPointsScoredInSeason: "Least Points (Season)",
    mostPointsScoredInSeason: "Most Points (Season)",
  };

  // Static mapping for images for each stat
  const statImageMapping = {
    firstPlaceFinishes: "/images/champ.webp",
    allTimeMostWins: "/images/allWins.webp",
    allTimeMostWinsInSeason: "/images/seasonwins.webp",
    allTimeTotalPointsScored: "/images/pointsalltime.webp",
    mostPointsScoredInSeason: "/images/seasonpoints.webp",
    allTimeAveragePointsScored: "/images/avgseason.webp",
    highestAveragePointsInSeason: "/images/avgpoints.webp",
    lastPlaceFinishes: "/images/lastplace.webp",
    leastPointsScoredInSeason: "/images/leastpoints.webp",
    allTimeMostLossesInSeason: "/images/seasonlosses.webp",
    allTimeMostLossesTotal: "/images/lossalltime.webp",
    allTimeTotalPointsScoredAgainst: "/images/pointsagainst.webp",
  };

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="hof-container">
      <h1 className="text-center">Hall of Fame</h1>

      {/* Records Section */}
      <div className="records-section">
        <h2>Hall of Fame Records</h2>
        <div className="card-row">
          {/* Display all records with sorted top stats */}
          {Object.keys(topStats).map((statKey) => {
            const owners = topStats[statKey];
            const displayName = statLabelMapping[statKey] || statKey; // Use custom label mapping

            return (
              <div key={statKey} className="card">
                <div className="card-icon">
                  {/* Use static image URL based on stat */}
                  <img
                    src={statImageMapping[statKey]} // Get image URL from the mapping
                    alt={statKey}
                    className="card-img"
                  />
                </div>
                <h3 className="stat-value">
                  {formatNumber(owners[0][statKey])}
                </h3>{" "}
                {/* Display the stat value at the top */}
                <h4>{displayName}</h4> {/* Display the stat name */}
                <p>
                  {owners.map((stat, index) => (
                    <span key={index}>
                      {stat.owner}
                      {index < owners.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Not Good Stats Section */}
      <div className="records-section">
        <h2>Not Good Records</h2>
        <div className="card-row">
          {/* Display unwanted records */}
          {Object.keys(notGoodStats).map((statKey) => {
            const owners = notGoodStats[statKey];
            const displayName = statLabelMapping[statKey] || statKey; // Use custom label mapping

            return (
              <div
                key={statKey}
                className={`card ${
                  displayName === "Least Points (Season)" ||
                  displayName === "Most Losses (Season)" ||
                  displayName === "Most Losses (AllTime)" ||
                  displayName === "Points Against (AllTime)"
                    ? "bad-stat"
                    : ""
                }`}
              >
                <div className="card-icon">
                  {/* Use static image URL based on stat */}
                  <img
                    src={statImageMapping[statKey]} // Get image URL from the mapping
                    alt={statKey}
                    className="card-img"
                  />
                </div>
                <h3 className="stat-value">
                  {formatNumber(owners[0][statKey])}
                </h3>{" "}
                {/* Display the stat value at the top */}
                <h4>{displayName}</h4> {/* Display the stat name */}
                <p>
                  {owners.map((stat, index) => (
                    <span key={index}>
                      {stat.owner}
                      {index < owners.length - 1 ? ", " : ""}
                    </span>
                  ))}
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
