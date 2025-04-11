import { Carpool } from "../../generated/graphql-types";
import {
  calculateArrivalTime,
  formatLongDate,
  formatTime,
} from "../../utils/dateUtils";
import defaultAvatar from "/default-avatar.png";
import "../../styles/booking-summary-card.scss";

type Props = {
  carpool: Carpool;
  numPassengers: number;
  onBook: () => void;
};

const BookingSummaryCard = ({ carpool, numPassengers, onBook }: Props) => {
  return (
    <div className="booking-summary-card">
      <h3>{formatLongDate(carpool.departure_date)}</h3>

      <ul className="timing">
        <li>
          <span>{formatTime(carpool.departure_time)}</span> –{" "}
          {carpool.departure_city}
        </li>
        <li>
          <span>
            {calculateArrivalTime(carpool.departure_time, carpool.duration)}
          </span>{" "}
          – {carpool.arrival_city}
        </li>
      </ul>

      <div className="driver">
        <img
          id="booking-img"
          src={carpool.driver.avatar || defaultAvatar}
          alt={carpool.driver.firstname}
        />
        <p>{carpool.driver.firstname}</p>
      </div>

      <p className="passengers">
        {numPassengers} passager{numPassengers > 1 ? "s" : ""}
      </p>
      <p className="price">{carpool.price.toFixed(2)}€</p>

      <button type="button" className="book-button" onClick={onBook}>
        Réserver mon voyage
      </button>
    </div>
  );
};

export default BookingSummaryCard;
