// utils/tripUtils.ts

import { Carpool, Booking } from "../generated/graphql-types";

export const getCarpoolData = (
  tripDetails: Carpool | Booking,
  mode: "carpool" | "booking"
) => {
  return mode === "carpool"
    ? (tripDetails as Carpool)
    : (tripDetails as Booking).carpool;
};

//sum the numbers of booked seats
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

// calculate the number of available seats ans ensure we don't have - number
export const getAvailableSeats = (
  tripDetails: Carpool | Booking,
  mode: "carpool" | "booking"
) => {
  const carpoolData = getCarpoolData(tripDetails, mode);
  const bookedSeats = getBookedSeats(tripDetails, mode);
  return Math.max(0, carpoolData.num_passenger - bookedSeats);
};