export const separateTripsByDate = (trips: any[]) => {
  const today = new Date().toISOString().split("T")[0];

  return trips.reduce(
    (acc, trip) => {
      // Use trip.carpool.departure_date for bookings; otherwise, use trip.departure_date for carpools.
      const departureDate = trip.carpool?.departure_date || trip.departure_date;
      if (!departureDate) {
        console.warn("Invalid trip format:", trip);
        return acc;
      }

      if (departureDate >= today) {
        acc.upcomingTrips.push(trip);
      } else {
        acc.pastTrips.push(trip);
      }
      return acc;
    },
    { upcomingTrips: [] as any[], pastTrips: [] as any[] }
  );
};
