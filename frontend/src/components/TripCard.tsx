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
  useGetUserInfoQuery,
} from "../generated/graphql-types";
import { formatTime, formatDate, formatDuration } from "../utils/dateUtils";

import {
  getCarpoolData,
  getBookedSeats,
  getAvailableSeats,
  backgroundClasses,
} from "../utils/tripUtils";
import "../styles/trip-cards.scss";

import { GET_CARPOOLS_BY_USER_ID } from "../graphql/queries";
import { toast } from "react-toastify";

type TripData = Booking | Carpool;

interface TripCardProps {
  tripDetails: TripData;

  mode: "carpool" | "booking";
}

export default function TripCard({ tripDetails, mode }: TripCardProps) {
  const carpool = getCarpoolData(tripDetails, mode);

  const bookedSeats = getBookedSeats(tripDetails, mode);
  const availableSeats = getAvailableSeats(tripDetails, mode);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { data: userData } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo?.id;

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

  const [deleteCarpool] = useDeleteCarpoolMutation({
    onCompleted: () => {
      toast.success("Carpool deleted successfully");
    },
    onError: (error: any) => {
      console.error("Error deleting carpool:", error);
      alert("Failed to delete the carpool.");
    },
  });

  const toll = carpool.toll ? "Avec péage" : "Sans péage";
  const icon = carpool.toll ? (
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
  const bgClass =
    backgroundClasses[Number(carpool.id) % backgroundClasses.length];
  //backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];

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

  console.log("carpool duration", carpool.duration);
  console.log("carpool arrival time", carpool.arrival_time);
  return (
    <div className={`trip-card ${bgClass ? bgClass : "bg-default"}`}>
      <div className="trip-card-header">
        <div className="trip-card-infos-left">
          <div className="trip-card-trip-duration">
            <p className="time">{formatTime(carpool.departure_time)}</p>
            <div className="horizontal-line small departure" />
            <p className="duration">{formatDuration(carpool.duration)}</p>
            <div className="horizontal-line small arrival" />
            <p className="time">{carpool.arrival_time}</p>
          </div>
          <div className="trip-card-cities">
            <p className="city">{carpool.departure_city}</p>
            <p className="city">{carpool.arrival_city}</p>
          </div>
        </div>
        <div className="trip-card-infos-right">
          <p>
            le{" "}
            <span className="date">{formatDate(carpool.departure_date)}</span>
          </p>

          {new Date(
            `${carpool.departure_date}T${carpool.departure_time}`
          ).getTime() >= new Date().getTime() &&
            mode === "carpool" &&
            userId === carpool?.driver.id && (
              <button
                className={`${windowWidth > 885 ? btnClass : ""}`}
                onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  console.log("delete carpool with id", carpool.id);
                  if (carpool.id) {
                    if (
                      window.confirm(
                        "Es-tu sûr de vouloir annuler ce trajet ?\nCette action est irréversible."
                      )
                    ) {
                      await deleteCarpool({
                        variables: { id: Number(carpool.id) },
                        refetchQueries: [GET_CARPOOLS_BY_USER_ID],

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
              src={carpool.driver.avatar ?? "/public/default-avatar.png"}
              alt="Avatar"
            />
            <div className="driver-infos">
              <p>{carpool.driver.firstname}</p>
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
            {passengers}
            {seats}
          </div>
          <div className="vertical-line" />
          <div className="trip-price">
            <p>{carpool.price} €</p>
            {mode === "carpool" &&
              (window.location.href.includes("/mytrips") ||
                window.location.href.includes("/search-page-result")) && (
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
