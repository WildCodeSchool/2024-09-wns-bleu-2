import { useEffect, useState } from "react";
import { X, Tickets, Tractor, User, UserCheck } from "lucide-react";
import {
  Booking,
  Carpool,
  useDeleteCarpoolMutation,
} from "../generated/graphql-types";
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
import { ApolloError } from "@apollo/client/errors";

interface TripCardProps {
  tripDetails: Carpool | Booking;
  tripIndex: number;
  mode: "carpool" | "booking";

  isUpcoming?: boolean;
  carpoolData?: Carpool; // Optional prop to pass in carpool data when the mode is "booking"
}

export default function TripCard({
  tripDetails,
  mode,
  carpoolData, // Optionally pass the carpool data
}: TripCardProps) {
  const data = getCarpoolData(tripDetails, mode, carpoolData); // Pass the carpool data if mode is booking
  const bookedSeats = getBookedSeats(tripDetails, mode);
  const availableSeats = getAvailableSeats(tripDetails, mode);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Local state to hide the card once deleted.
  const [isDeleted, setIsDeleted] = useState(false);

  console.log("tripDetails", tripDetails, "mode", mode, "data", data);
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

  // Use the codegen generated hook.
  const [deleteCarpool, { loading: deleteLoading }] = useDeleteCarpoolMutation({
    // Optionally, you can update the Apollo cache here
    onCompleted: () => {
      setIsDeleted(true);
    },
    onError: (error: ApolloError) => {
      console.error("Error deleting carpool:", error);
      alert("Failed to delete the carpool.");
    },
  });

  // Handler for delete button click.
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this carpool?")) {
      deleteCarpool({
        variables: { id: Number(tripDetails.id) },
      });
    }
  };

  if (isDeleted) return null;

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

  ////CSS classes for  background colors
  const backgroundClasses = ["bg-red", "bg-yellow", "bg-green", "bg-blue"];
  const bgClass =
    backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];

  const btnClass =
    bgClass === "bg-red"
      ? "btn-yellow"
      : bgClass === "bg-yellow"
      ? "btn-red"
      : bgClass === "bg-green"
      ? "btn-blue"
      : bgClass === "bg-blue"
      ? "btn-green"
      : "";

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

          {new Date(data.departure_date).getTime() - new Date().getTime() >
            86400000 &&
            mode === "carpool" && (
              <button
                className={`${windowWidth > 885 ? btnClass : ""}`}
                onClick={handleDeleteClick}
                disabled={deleteLoading}
              >
                {windowWidth > 885 ? "ANNULER" : <X />}
              </button>
            )}

        </div>
      </div>
      <div className="horizontal-line" />
      <div className="trip-card-bottom">
        <div className="trip-bottom-left">
          <div className="trip-user ">
            <img
              src={data.driver.avatar ?? "/public/avatarr.webp"}
              alt="Avatar"
            />
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
            <p>{data.price} €</p>
          </div>
        </div>
      </div>
    </div>
  );
}
