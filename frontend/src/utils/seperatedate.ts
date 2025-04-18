export const separateTripsByDate = (
  trips: any[]
): { sortedUpcomingTrips: any[]; sortedPastTrips: any[] } => {
  const today = new Date().getTime();

  const upcomingTrips: any[] = [];
  const pastTrips: any[] = [];

  for (const trip of trips) {
    //////refacto date format to have date + hours
    const departureDate = new Date(
      `${trip.departure_date}T${trip.departure_time}`
    ).getTime();

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
  const sortedUpcomingTrips = [...upcomingTrips].sort(
    (a, b) =>
      new Date(a.departure_date + "T" + a.departure_time).getTime() -
      new Date(b.departure_date + "T" + b.departure_time).getTime()
  );

  const sortedPastTrips = [...pastTrips].sort(
    (a, b) =>
      new Date(b.departure_date + "T" + b.departure_time).getTime() -
      new Date(a.departure_date + "T" + a.departure_time).getTime()
  );

  return { sortedUpcomingTrips, sortedPastTrips };
};
