// utils/calculateAllTimeStats.js

import { leagueData } from "../app/data/leagueData"; // Import league data

export const calculateAllTimeStats = () => {
  const allTimeStats = {};

  // Loop over each season in leagueData
  Object.keys(leagueData).forEach((season) => {
    leagueData[season].forEach((team) => {
      const owner = team.owner.toLowerCase(); // Normalize owner names to lowercase

      // If owner doesn't exist, initialize with default values
      if (!allTimeStats[owner]) {
        allTimeStats[owner] = {
          owner: team.owner, // Store the original case
          firstPlaceFinishes: 0,
          allTimeMostWins: 0,
          mostPointsScoredInSeason: 0,
          highestAveragePointsInSeason: 0,
          allTimeTotalPointsScored: 0,
          allTimeTotalPointsScoredAgainst: 0,
          pointsScoredAgainstInSeason: 0,
          allTimeAveragePointsScored: 0,
          allTimeMostWinsInSeason: 0,
          allTimeMostLossesInSeason: 0,
          allTimeMostWinsTotal: 0,
          allTimeMostLossesTotal: 0,
          lastPlaceFinishes: 0,
          leastPointsScoredInSeason: Infinity,
          seasonsPlayed: 0, // Add this to track the number of seasons for averaging
        };
      }

      // Update stats for each owner
      const ownerStats = allTimeStats[owner];

      // First Place Finishes
      if (team.rank === 1) {
        ownerStats.firstPlaceFinishes++;
      }

      // Total Wins
      const [wins, losses] = team.record.split("-").map((val) => parseInt(val));
      if (!isNaN(wins)) {
        ownerStats.allTimeMostWins += wins;
      }

      // Points Scored in Season
      ownerStats.allTimeTotalPointsScored += team.pointsFor;

      // Points Scored Against in Season
      ownerStats.allTimeTotalPointsScoredAgainst += team.pointsAgainst;

      // Most Points Scored in a Season
      ownerStats.mostPointsScoredInSeason = Math.max(
        ownerStats.mostPointsScoredInSeason,
        team.pointsFor
      );

      // Highest Average Points Scored in a Season
      ownerStats.highestAveragePointsInSeason = Math.max(
        ownerStats.highestAveragePointsInSeason,
        team.pointsForPerGame
      );

      // All-Time Average Points Scored
      ownerStats.seasonsPlayed++;
      ownerStats.allTimeAveragePointsScored =
        ownerStats.allTimeTotalPointsScored / ownerStats.seasonsPlayed;

      // Most Wins in a Season
      ownerStats.allTimeMostWinsInSeason = Math.max(
        ownerStats.allTimeMostWinsInSeason,
        wins
      );

      // Most Losses in a Season
      ownerStats.allTimeMostLossesInSeason = Math.max(
        ownerStats.allTimeMostLossesInSeason,
        losses
      );

      // Total Wins and Losses
      ownerStats.allTimeMostWinsTotal += wins;
      ownerStats.allTimeMostLossesTotal += losses;

      // Last Place Finishes
      if (team.rank === leagueData[season].length) {
        ownerStats.lastPlaceFinishes++;
      }

      // Least Points Scored in Season
      ownerStats.leastPointsScoredInSeason = Math.min(
        ownerStats.leastPointsScoredInSeason,
        team.pointsFor
      );
    });
  });

  // Clean up unused fields after calculation
  Object.keys(allTimeStats).forEach((owner) => {
    const stats = allTimeStats[owner];
    // Make sure points are not incorrectly set
    if (stats.allTimeMostWins === NaN) stats.allTimeMostWins = 0;
    if (stats.mostPointsScoredInSeason === NaN)
      stats.mostPointsScoredInSeason = 0;
    if (stats.allTimeTotalPointsScored === NaN)
      stats.allTimeTotalPointsScored = 0;
  });

  return allTimeStats;
};
