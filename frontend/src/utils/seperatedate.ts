export const separateTripsByDate = (
  trips: any[]
): { sortedUpcomingTrips: any[]; sortedPastTrips: any[] } => {
  const today = new Date().getTime();

  const upcomingTrips: any[] = [];
  const pastTrips: any[] = [];

  for (const trip of trips) {
    const carpool = trip.carpool ?? trip;

    const departureDateStr = carpool.departure_date;
    const departureTimeStr = carpool.departure_time;

    if (!departureDateStr || !departureTimeStr) {
      console.warn("Trip sans date ou heure :", trip);
      continue;
    }

    const departureTimestamp = new Date(
      `${departureDateStr}T${departureTimeStr}`
    ).getTime();

    if (isNaN(departureTimestamp)) {
      console.warn("Format de date invalide :", trip);
      continue;
    }

    if (departureTimestamp >= today) {
      upcomingTrips.push(trip);
    } else {
      pastTrips.push(trip);
    }
  }

  const sortFnAsc = (a: any, b: any) =>
    new Date(
      (a.carpool ?? a).departure_date + "T" + (a.carpool ?? a).departure_time
    ).getTime() -
    new Date(
      (b.carpool ?? b).departure_date + "T" + (b.carpool ?? b).departure_time
    ).getTime();

  const sortFnDesc = (a: any, b: any) =>
    new Date(
      (b.carpool ?? b).departure_date + "T" + (b.carpool ?? b).departure_time
    ).getTime() -
    new Date(
      (a.carpool ?? a).departure_date + "T" + (a.carpool ?? a).departure_time
    ).getTime();

  return {
    sortedUpcomingTrips: upcomingTrips.sort(sortFnAsc),
    sortedPastTrips: pastTrips.sort(sortFnDesc),
  };
};
