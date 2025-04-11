import { Carpool } from "../generated/graphql-types";
import { formatDuration, calculateArrivalTime } from "../utils/dateUtils";
import { formatTimeFromString } from "../utils/format.utils";
import { Tickets, Tractor, User } from "lucide-react";
import defaultImage from "/default-avatar.png";

type TripSingleCardProps = {
  carpool: Carpool;
  index?: number;
};

const TripSingleCard: React.FC<TripSingleCardProps> = ({
  carpool,
  index = 0,
}) => {
  const toll = carpool.toll ? "Avec péage" : "Sans péage";
  const icon = carpool.toll ? (
    <Tickets color="#ffffff" width={30} strokeWidth={1.5} />
  ) : (
    <Tractor color="#ffffff" width={30} strokeWidth={1.5} />
  );

  const seats = Array.from({ length: carpool.num_passenger }).map((_, i) => (
    <User key={i} color="#ffffff" strokeWidth={1.5} />
  ));

  const bgClasses = ["bg-red", "bg-yellow", "bg-green", "bg-blue"];
  const bg = bgClasses[index % bgClasses.length];

  return (
    <div className={`trip-card ${bg}`}>
      <div className="trip-card-header">
        <div className="trip-card-infos-left">
          <div className="trip-card-trip-duration">
            <p className="time">
              {formatTimeFromString(carpool.departure_time)}
            </p>
            <div className="horizontal-line small departure" />
            <p className="duration">{formatDuration(carpool.duration)}</p>
            <div className="horizontal-line small arrival" />
            <p className="time">
              {calculateArrivalTime(carpool.departure_time, carpool.duration)}
            </p>
          </div>
          <div className="trip-card-cities">
            <p className="city">{carpool.departure_city}</p>
            <p className="city">{carpool.arrival_city}</p>
          </div>
        </div>
      </div>

      <div className="horizontal-line" />

      <div className="trip-card-bottom">
        <div className="trip-bottom-left">
          <div className="trip-user">
            <img
              src={
                carpool.driver.avatar && carpool.driver.avatar !== "null"
                  ? carpool.driver.avatar
                  : defaultImage
              }
              alt={`Avatar de ${carpool.driver.firstname}`}
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
          <div className="trip-passengers">{seats}</div>
          <div className="vertical-line" />
          <div className="trip-price">
            <p>{carpool.price}€</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSingleCard;
