import { useEffect, useState } from "react";
import { X, Tickets, Tractor, User, UserCheck } from "lucide-react";
import { Carpool, Booking } from "../generated/graphql-types";
import {
  formatTime,
  calculateArrivalTime,
  formatDate,
  formatDuration,
} from "../utils/dateUtils";
import {
  getCarpoolData,
  getBookedSeats,
  getAvailableSeats,
} from "../utils/tripUtils";

interface TripCardProps {
  tripDetails: Carpool | Booking;
  tripIndex: number;
  mode: "carpool" | "booking";
}

export default function TripCard({
  tripDetails,
  tripIndex,
  mode,
}: TripCardProps) {
  const data = getCarpoolData(tripDetails, mode);
  const bookedSeats = getBookedSeats(tripDetails, mode);
  const availableSeats = getAvailableSeats(tripDetails, mode);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  console.log("tripDetails", tripDetails, "mode", mode);
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

  const toll = data.toll ? "Avec péage" : "Sans péage";
  const icon = data.toll ? (
    <Tickets color="#ffffff" width={30} strokeWidth={1.5} />
  ) : (
    <Tractor color="#ffffff" width={30} strokeWidth={1.5} />
  );

  const seats = Array.from({ length: availableSeats }).map((_, index) => (
    <User key={index} color="#ffffff" strokeWidth={1.5} />
  ));
  const passengers = Array.from({ length: bookedSeats }).map((_, index) => (
    <UserCheck key={index} color="#999999" strokeWidth={1.5} />
  ));

  //console.log("seats", seats, "passengers", passengers);
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
            <p className="time">{formatTime(data.departure_time)}</p>
            <div className="horizontal-line small departure" />
            <p className="duration">{formatDuration(data.duration)}</p>
            <div className="horizontal-line small arrival" />
            <p className="time">
              {calculateArrivalTime(data.departure_time, data.duration)}
            </p>
          </div>
          <div className="trip-card-cities">
            <p className="city">{data.departure_city}</p>
            <p className="city">{data.arrival_city}</p>
          </div>
        </div>
        <div className="trip-card-infos-right">
          <p>
            le <span className="date">{formatDate(data.departure_date)}</span>
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
            <img src={data.driver.avatar} alt="Avatar" />
            <div className="driver-infos">
              <p>{data.driver.firstname}</p>
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
            {data.bookings ? passengers : ""}
            {seats}
          </div>
          <div className="vertical-line" />
          <div className="trip-price">
            <p>{data.price}€</p>
          </div>
        </div>
      </div>
    </div>
  );
}
