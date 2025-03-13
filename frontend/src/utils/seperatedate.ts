export const separateTripsByDate = (carpools: any[]) => {
    const today = new Date().toISOString().split("T")[0];  // Get today's date
  
    const upcomingTrips = carpools.filter(carpool => carpool.departure_date >= today);
    const pastTrips = carpools.filter(carpool => carpool.departure_date < today);
  
    return { upcomingTrips, pastTrips };
  };