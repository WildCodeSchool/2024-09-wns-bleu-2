import React from 'react';
import { Users, Landmark, BadgeEuro } from 'lucide-react';
import { calculateDuration, formatTime } from '../utils/dateUtils'; // Importing utils

interface TripCartProps {
    carpool: {
      id: string;
      departure_time: string;
      arrival_time: string;
      departure_city: string;
      arrival_city: string;
      departure_date: string;
      driver: { firstname: string };
      num_passenger: number;
      type_of_road: string;
      price: number;
    };
    isUpcoming: boolean; // New prop to indicate if the trip is upcoming or past
  }

  const TripCart: React.FC<TripCartProps> = ({ carpool, isUpcoming }) => {
    return (
      <div key={carpool.id} className="carpool-item">
      <div className="top-row">
        <div className="info-container">
          <div className="departure-info">
            <span className="time">{formatTime(carpool.departure_time)}</span>
            <span className="city">{carpool.departure_city}</span>
          </div>

          {/* Duration Calculation */}
          <div className="duration">
            <div className="circle"></div>
            <div className="line"></div>
            <div className="time">{calculateDuration(carpool.departure_time, carpool.arrival_time)}</div>
            <div className="line"></div>
            <div className="circle"></div>
          </div>

          <div className="arrival-info">
            <span className="time">{formatTime(carpool.arrival_time)}</span>
            <span className="city">{carpool.arrival_city}</span>
          </div>
        </div>

        {isUpcoming && (
          <div>
            <button className="delete-button">ANNULER</button>
          </div>
        )}
      </div>

      {/* Separator line between top-row and down-row */}
      <div className="separator-line"></div>

      <div className="down-row">
        <div className="carpool-details">
          <div className="driver">
            <img
              src="https://yt3.googleusercontent.com/qGrcViAdsmfdL8NhR03s6jZVi2AP4A03XeBFShu2M4Jd88k1fNXDnpMEmHU6CvNJuMyA2z1maA0=s900-c-k-c0x00ffffff-no-rj"
              alt="Avatar"
              className="driver-avatar"
            />
            <span className="driver-name">{carpool.driver.firstname}</span>
          </div>
          <div className="seats">
            {Array.from({ length: 4 }).map((_, index) => (
              <Users
                key={index}
                className={`passenger-icon ${index < carpool.num_passenger ? 'available' : 'unavailable'}`}
              />
            ))}
          </div>
          <div className="road-type">
            {carpool.type_of_road !== 'National Road' && (
              <span className="toll-icon">
                <Landmark size={16} color="#6a6a6a" />
              </span>
            )}
          </div>
        </div>
        <div className="price">
          <span className="price-value">{carpool.price}</span>
          <span className="price-icon">
            <BadgeEuro size={18} />
          </span>
        </div>
      </div>
    </div>
  );
};
  
  export default TripCart;