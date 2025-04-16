import { useEffect, useState } from "react";
import {
  X,
  Tickets,
  Tractor,
  User,
  UserCheck,
  ChevronRight,
} from "lucide-react";
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
//import { ApolloError } from "@apollo/client/errors";
import "../styles/trip-cards.scss";
import { GET_CARPOOLS_BY_USER_ID } from "../graphql/queries";
import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";

interface TripCardProps {
  tripDetails: Carpool | Booking;
  tripIndex: number;
  mode: "carpool" | "booking";
  isUpcoming?: boolean;
  carpoolData?: Carpool;
}

export default function TripCard({
  tripDetails,
  mode,
  carpoolData,
}: TripCardProps) {
  const data = getCarpoolData(tripDetails, mode, carpoolData); // Pass the carpool data if mode is booking
  const bookedSeats = getBookedSeats(tripDetails, mode);
  const availableSeats = getAvailableSeats(tripDetails, mode);
  //const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Local state to hide the card once deleted.
  //const [isDeleted, setIsDeleted] = useState(false);

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

  // const [deleteCarpool, { loading: deleteLoading }] = useDeleteCarpoolMutation({
  //   update: (cache) => {
  //     cache.modify({
  //       fields: {
  //         getCarpoolsByUserId(existingCarpools = [], { readField }) {
  //           return existingCarpools.filter((carpoolRef: any) => {
  //             return readField('id', carpoolRef) !== tripDetails.id;
  //           });
  //         },
  //       },
  //     });
  //   },
  
  //   onCompleted: () => {
  //     setIsDeleted(true);
  //     toast.success("Carpool deleted successfully");
  //     navigate("/mytrips/:id");
  //   },
  
  //   onError: (error) => {
  //     console.error("Error deleting carpool:", error);
  //     alert("Failed to delete the carpool.");
  //   },
  // });

  const [deleteCarpool] = useDeleteCarpoolMutation({
    onCompleted: () => {
      toast.success("Carpool deleted successfully");
     // navigate("/mytrips/:id");
    },
    onError: (error: any) => {
      console.error("Error deleting carpool:", error);
      alert("Failed to delete the carpool.");
    },
  });

  const toll = data.toll ? "Avec péage" : "Sans péage";
  const icon = data.toll ? (
    <Tickets color="#ffffff" width={30} strokeWidth={2.5} />
  ) : (
    <Tractor color="#ffffff" width={30} strokeWidth={2.5} />
  );

  const seats = Array.from({ length: availableSeats }).map((_, index) => (
    <User key={index} color="#ffffff" strokeWidth={2.5} />
  ));
  const passengers = Array.from({ length: bookedSeats }).map((_, index) => (
    <UserCheck key={index} color="#999999" strokeWidth={2.5} />
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
                // onClick={handleDeleteClick}
                // disabled={deleteLoading}
                      onClick={
                async (event: React.MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  console.log("delete carpool with id", data.id);
                  if (data.id) {
                    if(window.confirm("Are you sure you want to cancel this trip?")){
                    await deleteCarpool({
                      variables: { id: Number(data.id) },
                      refetchQueries: [GET_CARPOOLS_BY_USER_ID], // refetch the list of carpools after deletion
                      awaitRefetchQueries: true,
                    });
                  }
                }
                }}
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
              src={data.driver.avatar ?? "/public/default-avatar.png"}
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
            {new Date(data.departure_date).getTime() - new Date().getTime() >
              86400000 &&
              mode === "carpool" &&
              window.location.href.includes("/mytrips") && (
                <ChevronRight
                  className="animated"
                  width={60}
                  color="white"
                  strokeWidth={2.5}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}