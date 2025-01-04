"use client"; // Mark as a client-side component
import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar"; // Import the NavBar component

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

  const allStats = {
    firstPlaceFinishes: getTopStats("firstPlaceFinishes"),
    allTimeMostWins: getTopStats("allTimeMostWins"),
    allTimeMostWinsInSeason: getTopStats("allTimeMostWinsInSeason"),
    allTimeTotalPointsScored: getTopStats("allTimeTotalPointsScored"),
    mostPointsScoredInSeason: getTopStats("mostPointsScoredInSeason"),
    allTimeAveragePointsScored: getTopStats("allTimeAveragePointsScored"),
    highestAveragePointsInSeason: getTopStats("highestAveragePointsInSeason"),
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
   <div>
     <NavBar /> {/* Add the NavBar component */}
     {/* Hall of Fame Header Section */}
     <div className="hof-container">
       <div className="halloffame">Hall of Fame</div>

       {/* Display all stats in a single section */}
       <div className="card-row">
         {Object.keys(allStats).map((statKey) => {
           const owners = allStats[statKey];
           const displayName = statLabelMapping[statKey] || statKey;

           return (
             <div
               key={statKey}
               className="card"
               style={{
                 backgroundImage: `url(${statImageMapping[statKey]})`,
                 backgroundSize: "cover", // Ensure the image doesn't stretch out of proportions
                 backgroundPosition: "center center", // Center the image
                 position: "relative", // To allow the overlay to be placed above the image
               }}
             >
               {/* Overlay for better text readability */}
               <div className="card-overlay"></div>

               <h3 className="stat-value">
                 {formatNumber(owners[0][statKey])}
               </h3>
               <h4>{displayName}</h4>
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
;

};

export default HallOfFame;
