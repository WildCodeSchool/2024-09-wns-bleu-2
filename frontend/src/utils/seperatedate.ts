export const separateTripsByDate = (trips: any[]) => {
  const today = Date.now();

  const upcomingTrips: any[] = [];
  const pastTrips: any[] = [];

  for (const trip of trips) {
    const departureDate = new Date(
      trip.carpool?.departure_date || trip.departure_date
    ).getTime();

    if (isNaN(departureDate)) {
      console.warn("Invalid trip format:", trip);
      continue;
    }

    if (departureDate - today > 86400000) {
      upcomingTrips.push(trip);
    } else {
      pastTrips.push(trip);
    }
  }

  return { upcomingTrips, pastTrips };
};
