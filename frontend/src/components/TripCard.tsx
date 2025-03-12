import { X } from "lucide-react";
import {
  calculateArrivalTime,
  formatDate,
  formatDuration,
} from "../utils/dateUtils";

interface TripCardProps {
  trip: {
    departure_date: string;
    departure_time: string;
    duration: number;
    departure_city: string;
    arrival_city: string;
    driver: { avatar: string; firstname: string };
    type_of_road: string;
    num_passenger: number;
    price: number;
  };
  tripIndex: number;
}

// Tableau de classes CSS
const backgroundClasses = ["bg-blue", "bg-green", "bg-red", "bg-yellow"];

export default function TripCard({ trip, tripIndex }: TripCardProps) {
  const bgClass = backgroundClasses[tripIndex % backgroundClasses.length];

  return (
    <div className={`trip-card ${bgClass ? bgClass : "bg-default"}`}>
      <div className="trip-card-header">
        <div className="trip-card-infos-left">
          <div className="trip-card-trip-duration">
            <p className="time">{trip.departure_time}</p>
            <div className="horizontal-line small" />
            <p className="duration">{formatDuration(trip.duration)}</p>
            <div className="horizontal-line small" />
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
          <p>{formatDate(trip.departure_date)}</p>
          <button>
            <X />
          </button>
        </div>
      </div>
      <div className="horizontal-line" />
      <div className="trip-card-bottom">
        <div className="trip-driver">
          <img src={trip.driver.avatar} alt="Avatar" />
          <div className="driver-infos">
            <p>{trip.driver.firstname}</p>
          </div>
        </div>
        <div className="trip-road">
          <p>{trip.type_of_road}</p>
        </div>
        <div className="trip-passengers">
          <p>{trip.num_passenger} passagers</p>
        </div>
        <div className="trip-price">
          <p>{trip.price}€</p>
        </div>
      </div>
    </div>
  );
}
