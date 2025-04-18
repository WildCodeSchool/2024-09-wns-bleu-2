import { Carpool, Booking } from "../generated/graphql-types";

export const getCarpoolData = (
  tripDetails: Carpool | Booking,
  mode: "carpool" | "booking",
  carpoolData?: Carpool
): Carpool => {
  if (mode === "carpool") {
    return tripDetails as Carpool; // Directly return Carpool data when mode is "carpool"
  }

  const booking = tripDetails as Booking;

  // Fallback: If carpoolData is not passed, try to return booking.carpool if it exists.
  if (!carpoolData) {
    if (booking.carpool) {
      return booking.carpool;
    }
    throw new Error("Carpool data is required for booking mode.");
  }

  // Otherwise, return the provided carpool data.
  return carpoolData;
};

//////sum the numbers of booked seats
export const getBookedSeats = (
  tripDetails: Carpool | Booking,
  mode: "carpool" | "booking"
) => {
  if (mode === "carpool") {
    return (
      (tripDetails as Carpool).bookings?.reduce(
        (sum, booking) => sum + booking.numPassenger,
        0
      ) || 0
    );
  } else {
    return (tripDetails as Booking).numPassenger;
  }
};

////// calculate the number of available seats ans ensure we don't have - number
export const getAvailableSeats = (
  tripDetails: Carpool | Booking,
  mode: "carpool" | "booking"
) => {
  const carpoolData = getCarpoolData(tripDetails, mode);
  const bookedSeats = getBookedSeats(tripDetails, mode);
  return Math.max(0, carpoolData.num_passenger - bookedSeats);
};

////// filter trips by destination + price
export const getUniqueTripsByCity = (trips: any[]) => {
  const uniqueTrips = new Map();

  trips.forEach((trip) => {
    const key = `${trip.departure_city}-${trip.arrival_city}`;
    if (!uniqueTrips.has(key) || trip.price < uniqueTrips.get(key).price) {
      uniqueTrips.set(key, trip);
    }
  });

  return Array.from(uniqueTrips.values());
};

/////bg classes
export const backgroundClasses = ["bg-red", "bg-yellow", "bg-green", "bg-blue"];
