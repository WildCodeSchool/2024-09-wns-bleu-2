import { ChangeEvent } from "react";
import { MapPin, Calendar, Users, ArrowRightLeft } from 'lucide-react';
import DatePicker from "react-datepicker";
import styles from "../styles/SearchBar.module.scss";

type SearchBarProps = {
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
  onDepartureChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onArrivalChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date) => void;
  onPassengersChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  departure,
  arrival,
  date,
  passengers,
  onDepartureChange,
  onArrivalChange,
  onDateChange,
  onPassengersChange,
}) => {
    return (
        <div className={styles["search-bar"]}>
        {/* Ville de départ */}
        <div className={styles["input-container"]}>
        <MapPin className={styles.icon} size={20} />
          <input
            type="text"
            placeholder="Paris, France"
            value={departure}
            onChange={onDepartureChange}
          />
        </div>
  
        <ArrowRightLeft className={styles.icon} size={20} />
  
        {/* Ville d'arrivée */}
        <div className={styles["input-container"]}>
          <MapPin className="text-red-400" size={20} />
          <input
            type="text"
            placeholder="Lyon, France"
            value={arrival}
            onChange={onArrivalChange}
          />
        </div>

        <div className={styles.separator} />

        {/* Sélecteur de date */}
        <div className={styles["input-container"]}>
          <Calendar className={styles.icon} size={20} />
          <DatePicker
            selected={date}
            onChange={(date) => date && onDateChange(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
  
        <div className={styles.separator} />
  
        {/* Sélecteur de passagers */}
        <div className={styles["select-container"]}>
        <Users className={styles.icon} size={20} />
        <label htmlFor="passenger-select" className="sr-only">
            Nombre de passagers
        </label>
        <select 
        id="passenger-select"
        value={passengers}
        onChange={onPassengersChange}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Passager{i > 0 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
  
        <button className={styles["search-button"]}>➝</button>
      </div>
    );
  };

export default SearchBar;