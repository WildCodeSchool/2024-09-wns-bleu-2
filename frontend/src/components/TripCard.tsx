import { X, Tickets, Tractor, User, UserCheck } from "lucide-react";
import { Carpool } from "../generated/graphql-types";
import {
  formatTime,
  calculateArrivalTime,
  formatDate,
  formatDuration,
} from "../utils/dateUtils";

interface TripCardProps {
  trip: Carpool;
  tripIndex: number;
}

//CSS classes for the background color of the trip card
const backgroundClasses = ["bg-blue", "bg-green", "bg-red", "bg-yellow"];
export default function TripCard({ trip, tripIndex }: TripCardProps) {
  const toll = trip.toll ? "Avec péage" : "Sans péage";
  const icon = trip.toll ? (
    <Tickets color="#ffffff" width={30} strokeWidth={1.5} />
  ) : (
    <Tractor color="#ffffff" width={30} strokeWidth={1.5} />
  );
  //sum the numbers of booked seats
  const bookedSeats = trip.bookings
    ? trip.bookings.reduce((sum, booking) => sum + booking.numPassenger, 0)
    : 0;

  // calculate the number of available seats ans ensure we don't have - number
  const availableSeats = Math.max(
    0,
    trip.num_passenger - (isNaN(bookedSeats) ? 0 : bookedSeats)
  );

  const seats = Array.from({ length: availableSeats }).map((_, index) => (
    <User key={index} color="#ffffff" strokeWidth={1.5} />
  ));
  const passengers = Array.from({ length: availableSeats }).map((_, index) => (
    <UserCheck key={index} color="#999999" strokeWidth={1.5} />
  ));

  const bgClass = backgroundClasses[tripIndex % backgroundClasses.length];

  return (
    <div className={`trip-card ${bgClass ? bgClass : "bg-default"}`}>
      <div className="trip-card-header">
        <div className="trip-card-infos-left">
          <div className="trip-card-trip-duration">
            <p className="time">{formatTime(trip.departure_time)}</p>
            {/*  <div className="departure">
              <Locate width={10} /> */}
            <div className="horizontal-line small departure" />
            {/*  </div> */}
            <p className="duration">{formatDuration(trip.duration)}</p>
            <div className="horizontal-line small arrival" />
            <p className="time">
              {calculateArrivalTime(trip.departure_time, trip.duration)}
            </p>
          </div>
          <div className="trip-card-cities">
            <p className="city">{trip.departure_city}</p>
            <p className="city">{trip.arrival_city}</p>
          </div>
        </div>
        <div className="trip-card-infos-right">
          <p>
            le <span className="date">{formatDate(trip.departure_date)}</span>
          </p>
          <button>
            <X />
          </button>
        </div>
      </div>
      <div className="horizontal-line" />
      <div className="trip-card-bottom">
        <div className="trip-bottom-left">
          <div className="trip-driver ">
            <img src={trip.driver.avatar} alt="Avatar" />
            <div className="driver-infos">
              <p>{trip.driver.firstname}</p>
            </div>
          </div>
          <div className="vertical-line" />
          <div className="trip-road">
            {icon}
            <p>{toll}</p>
          </div>
        </div>
        <div className="vertical-line" />
        <div className="trip-right">
          <div className="trip-passengers">
            {trip.bookings ? passengers : ""}
            {seats}
          </div>
          <div className="vertical-line" />
          <div className="trip-price">
            <p>{trip.price}€</p>
          </div>
        </div>
      </div>
    </div>
  );
}
