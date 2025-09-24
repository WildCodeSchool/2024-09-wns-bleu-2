import { Carpool } from "../../generated/graphql-types";
import { formatLongDate, formatTime } from "../../utils/dateUtils";
import defaultAvatar from "/default-avatar.png";
import "../../styles/booking-summary-card.scss";
import { ChevronRight } from "lucide-react";

type Props = {
  carpool: Carpool;
  numPassengers: number;
  onBook: () => void;
};

const BookingSummaryCard = ({ carpool, numPassengers, onBook }: Props) => {
  return (
    <div className="booking-summary-card">
      <div className="summary-header">
        <h3>{formatLongDate(carpool.departure_date)}</h3>
        <div className="horizontal-line" />
      </div>
      <ul className="timing">
        <li>
          <span>{formatTime(carpool.departure_time)}</span> –{" "}
          {carpool.departure_city}
        </li>
        <li>
          <span>{carpool.arrival_time}</span> – {carpool.arrival_city}
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
      <div className="horizontal-line" />
      <div className="summary-footer">
        <div className="row">
          <p className="passengers">
            {numPassengers} passager{numPassengers > 1 ? "s" : ""}
          </p>
          <p className="price">{carpool.price.toFixed(2)}€</p>
        </div>
        <button type="button" className="submit-button" onClick={onBook}>
          <ChevronRight width={30} color="white" />
          Réserver mon voyage
        </button>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
