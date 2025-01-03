import { calculateAllTimeStats } from "../../utils/calculateAllTimeStats"; // or the correct path

const allTimeStats = calculateAllTimeStats(); // Calculate stats

console.log("All Time Stats:", allTimeStats); // Log to confirm data

export const allTimeData = allTimeStats; // Ensure it's exported like this
