export const separateTripsByDate = (
  trips: any[]
): { sortedUpcomingTrips: any[]; sortedPastTrips: any[] } => {
  const today = new Date().getTime();

  const upcomingTrips: any[] = [];
  const pastTrips: any[] = [];

  for (const trip of trips) {
    const tripData = trip.carpool ?? trip; // si carpool existe, on l’utilise, sinon trip

    const departureDate = new Date(
      `${tripData.departure_date}T${tripData.departure_time}`
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
      new Date(
        (a.carpool ?? a).departure_date + "T" + (a.carpool ?? a).departure_time
      ).getTime() -
      new Date(
        (b.carpool ?? b).departure_date + "T" + (b.carpool ?? b).departure_time
      ).getTime()
  );

  const sortedPastTrips = [...pastTrips].sort(
    (a, b) =>
      new Date(
        (b.carpool ?? b).departure_date + "T" + (b.carpool ?? b).departure_time
      ).getTime() -
      new Date(
        (a.carpool ?? a).departure_date + "T" + (a.carpool ?? a).departure_time
      ).getTime()
  );

  return { sortedUpcomingTrips, sortedPastTrips };
};
