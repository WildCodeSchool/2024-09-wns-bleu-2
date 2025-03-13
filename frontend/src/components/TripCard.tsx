import { useEffect, useState } from "react";
import { X, Tickets, Tractor, User, UserCheck } from "lucide-react";
import { Carpool } from "../generated/graphql-types";
import {
  formatTime,
  calculateArrivalTime,
  formatDate,
  formatDuration,
} from "../utils/dateUtils";

interface TripCardProps {
  tripDetails: Carpool;
  tripIndex: number;
}

export default function TripCard({ tripDetails, tripIndex }: TripCardProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  ////to dynamicaly get the window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]);

  const toll = tripDetails.toll ? "Avec péage" : "Sans péage";
  const icon = tripDetails.toll ? (
    <Tickets color="#ffffff" width={30} strokeWidth={1.5} />
  ) : (
    <Tractor color="#ffffff" width={30} strokeWidth={1.5} />
  );
  //sum the numbers of booked seats
  const bookedSeats = tripDetails.bookings
    ? tripDetails.bookings.reduce(
        (sum, booking) => sum + booking.numPassenger,
        0
      )
    : 0;

  // calculate the number of available seats ans ensure we don't have - number
  const availableSeats = Math.max(
    0,
    tripDetails.num_passenger - (isNaN(bookedSeats) ? 0 : bookedSeats)
  );
  console.log("bookedSeats", [tripDetails.bookings]);
  const seats = Array.from({ length: availableSeats }).map((_, index) => (
    <User key={index} color="#ffffff" strokeWidth={1.5} />
  ));
  const passengers = Array.from({ length: bookedSeats }).map((_, index) => (
    <UserCheck key={index} color="#999999" strokeWidth={1.5} />
  ));
  console.log("seats", seats, "passengers", passengers);
  //CSS classes for  background colors
  const backgroundClasses = ["bg-red", "bg-yellow", "bg-green", "bg-blue"];
  const bgClass = backgroundClasses[tripIndex % backgroundClasses.length];
  const btnClasses = ["btn-yellow", "btn-red", "btn-blue", "btn-green"];
  const btnClass = btnClasses[tripIndex % btnClasses.length];

  return (
    <div className={`trip-card ${bgClass ? bgClass : "bg-default"}`}>
      <div className="trip-card-header">
        <div className="trip-card-infos-left">
          <div className="trip-card-trip-duration">
            <p className="time">{formatTime(tripDetails.departure_time)}</p>
            <div className="horizontal-line small departure" />
            <p className="duration">{formatDuration(tripDetails.duration)}</p>
            <div className="horizontal-line small arrival" />
            <p className="time">
              {calculateArrivalTime(
                tripDetails.departure_time,
                tripDetails.duration
              )}
            </p>
          </div>
          <div className="trip-card-cities">
            <p className="city">{tripDetails.departure_city}</p>
            <p className="city">{tripDetails.arrival_city}</p>
          </div>
        </div>
        <div className="trip-card-infos-right">
          <p>
            le{" "}
            <span className="date">
              {formatDate(tripDetails.departure_date)}
            </span>
          </p>
          <button className={`${windowWidth > 885 ? btnClass : ""}`}>
            {windowWidth > 885 ? "ANNULER" : <X />}
          </button>
        </div>
      </div>
      <div className="horizontal-line" />
      <div className="trip-card-bottom">
        <div className="trip-bottom-left">
          <div className="trip-driver ">
            <img src={tripDetails.driver.avatar} alt="Avatar" />
            <div className="driver-infos">
              <p>{tripDetails.driver.firstname}</p>
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
            {tripDetails.bookings ? passengers : ""}
            {seats}
          </div>
          <div className="vertical-line" />
          <div className="trip-price">
            <p>{tripDetails.price}€</p>
          </div>
        </div>
      </div>
    </div>
  );
}
