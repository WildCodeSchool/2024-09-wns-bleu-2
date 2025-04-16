export const separateTripsByDate = (trips: any[]) => {
  const today = new Date().getTime();

  const upcomingTrips: any[] = [];
  const pastTrips: any[] = [];

  for (const trip of trips) {
    //////refacto date format to have date + hours
    const departureDate = new Date(
      `${trip.departure_date}T${trip.departure_time}`
    ).getTime();
    console.log("Departure date:", trip.departure_date, departureDate >= today);
    if (isNaN(departureDate)) {
      console.warn("Invalid trip format:", trip);
      continue;
    }

    if (departureDate >= today) {
      upcomingTrips.push(trip);
    } else {
      pastTrips.push(trip);
    }
  }

  return { upcomingTrips, pastTrips };
};
