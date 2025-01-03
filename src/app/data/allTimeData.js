import { calculateAllTimeStats } from "../../utils/calculateAllTimeStats";

const allTimeStats = calculateAllTimeStats(); // This will run the calculations and provide the data structure

console.log("All Time Stats:", allTimeStats); // Log the all time data to ensure it's calculated correctly

export const allTimeData = allTimeStats; // Assign the result to be used in the HOF page


