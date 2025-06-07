export const separateTripsByDate = (
  trips: any[]
): { sortedUpcomingTrips: any[]; sortedPastTrips: any[] } => {
  const today = new Date().getTime();

  const upcomingTrips: any[] = [];
  const pastTrips: any[] = [];

  for (const trip of trips) {

     // Si c'est un booking, prends la date depuis trip.carpool
     const source = trip.departure_date ? trip : trip.carpool;

     if (!source || !source.departure_date || !source.departure_time) {
       console.warn("Invalid trip format:", trip);
       continue;
     }
  
    //////refacto date format to have date + hours
    const departureDate = new Date(
      `${source.departure_date}T${source.departure_time}`
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
  const getTime = (trip: any) => {
    const source = trip.departure_date ? trip : trip.carpool;
    return new Date(`${source.departure_date}T${source.departure_time}`).getTime();
  };

  const sortedUpcomingTrips = [...upcomingTrips].sort(
    (a, b) => getTime(a) - getTime(b)
  );

  const sortedPastTrips = [...pastTrips].sort(
    (a, b) => getTime(b) - getTime(a)
  );

  return { sortedUpcomingTrips, sortedPastTrips };
};
