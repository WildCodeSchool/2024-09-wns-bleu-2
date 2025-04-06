// Function to calculate duration between departure and arrival times
export const calculateDuration = (departure: string, arrival: string): string => {
    const [depH, depM] = departure.split(":").map(Number);
    const [arrH, arrM] = arrival.split(":").map(Number);
  
    let totalMinutes = (arrH * 60 + arrM) - (depH * 60 + depM);
  
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60; // Handles overnight trips
    }
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours}h${minutes > 0 ? minutes : ''}`; // Ex: "2h30" or "2h"
  };
  
  // Function to format time (e.g., 14:30 to "14h30")
  export const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${hours}h${minutes !== "00" ? minutes : ""}`;
  };