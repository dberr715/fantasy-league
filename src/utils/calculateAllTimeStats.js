// utils/calculateAllTimeStats.js
export const calculateAllTimeStats = (leagueData) => {
  const allTimeStats = {};

  // Loop over all years in leagueData
  Object.keys(leagueData).forEach((year) => {
    leagueData[year].forEach((team) => {
      const owner = team.owner;

      // Initialize owner stats if not already present
      if (!allTimeStats[owner]) {
        allTimeStats[owner] = {
          championships: 0,
          wins: 0,
          losses: 0,
          pointsFor: 0,
          pointsAgainst: 0,
          pointsPerGame: 0,
          totalGames: 0, // To calculate average points per game
        };
      }

      // Calculate total wins and losses, and points
      const [wins, losses] = team.record.split("-").map(Number);
      const pointsFor = team.pointsFor;
      const pointsAgainst = team.pointsAgainst;

      allTimeStats[owner].wins += wins;
      allTimeStats[owner].losses += losses;
      allTimeStats[owner].pointsFor += pointsFor;
      allTimeStats[owner].pointsAgainst += pointsAgainst;
      allTimeStats[owner].totalGames += wins + losses; // Total number of games played
      allTimeStats[owner].championships += wins === 1 ? 1 : 0; // Count championship wins
    });
  });

  // Now calculate the points per game for each owner
  for (const owner in allTimeStats) {
    const stats = allTimeStats[owner];
    stats.pointsPerGame = stats.pointsFor / stats.totalGames; // Calculate average points per game
  }

  // Return the stats in an array sorted by the number of championships
  return Object.values(allTimeStats).sort(
    (a, b) => b.championships - a.championships
  );
};
