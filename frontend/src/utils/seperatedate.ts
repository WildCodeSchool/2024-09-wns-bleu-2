export const separateTripsByDate = (trips: any[]) => {
  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const upcomingTrips: any[] = [];
  const pastTrips: any[] = [];

  for (const trip of trips) {
    const departureDate = new Date(trip.departure_date);

    if (isNaN(departureDate.getTime())) {
      console.warn("Invalid trip format:", trip);
      continue;
    }

    ///// Set the time to midnight for the departure date
    const departureMidnight = new Date(
      departureDate.getFullYear(),
      departureDate.getMonth(),
      departureDate.getDate()
    );

    if (departureMidnight.getTime() >= todayMidnight.getTime()) {
      upcomingTrips.push(trip);
    } else {
      pastTrips.push(trip);
    }
  }

  return { upcomingTrips, pastTrips };
};
