import { fr } from "date-fns/locale";
import {
  ArrowRightLeft,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Hourglass,
} from "lucide-react";
import { ChangeEvent } from "react";
import DatePicker from "react-datepicker";

type PublishTripBarProps = {
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
  onDepartureChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onArrivalChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onDateChange: (date: Date) => void;
  onPassengersChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  cityData: { id: string; name: string }[];
  loadingCities: boolean;
  errorCities: boolean;
  departureTime: Date | null;
  onTimeChange: (date: Date | null) => void;
  hours: number;
  minutes: number;
  onHourChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onMinuteChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const PublishTripBar: React.FC<PublishTripBarProps> = ({
  departure,
  arrival,
  date,
  passengers,
  onDepartureChange,
  onArrivalChange,
  onDateChange,
  onPassengersChange,
  cityData,
  loadingCities,
  errorCities,
  departureTime,
  onTimeChange,
  hours,
  minutes,
  onHourChange,
  onMinuteChange,
}) => {
  // const [fetchDepartureCities, { data: departureCities }] = useGetCitiesLazyQuery();
  // const [fetchArrivalCities, { data: arrivalCities }] = useGetCitiesLazyQuery();

  const cityOptions = cityData?.map((city) => (
    <option key={city.id} value={city.name}>
      {city.name}
    </option>
  ));

  return (
    <div className="search-bar">
      <div className="search-wrapper">
        <div className="input-container">
          <MapPin className="icon" size={26} />
          {loadingCities ? (
            <p>Chargement...</p>
          ) : errorCities ? (
            <p>Erreur</p>
          ) : (
            <select value={departure} onChange={onDepartureChange}>
              <option value="">Adresse de départ</option>
              {cityOptions}
            </select>
          )}
        </div>

        <ArrowRightLeft size={20} id="hidden-arrow" />
        <div className="separator" />

        <div className="input-container">
          <MapPin className="icon" size={26} />
          {loadingCities ? (
            <p>Chargement...</p>
          ) : errorCities ? (
            <p>Erreur</p>
          ) : (
            <select value={arrival} onChange={onArrivalChange}>
              <option value="">Adresse d'arrivée</option>
              {cityOptions}
            </select>
          )}
        </div>

        <div className="separator" />

        <div className="input-container">
          <CalendarDays className="icon" size={26} />
          <DatePicker
            selected={date}
            onChange={(date) => date && onDateChange(date)}
            dateFormat="dd/MM/yyyy"
            className="datepicker-input"
            popperPlacement="bottom-start"
            locale={fr}
          />
        </div>

        <div className="separator" />

        <div className="input-container">
          <Clock className="icon" size={26} />
          <DatePicker
            data-testid="departure-time-picker"
            selected={departureTime}
            onChange={(time) => onTimeChange(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Heure"
            dateFormat="HH:mm"
            placeholderText="00:00"
            locale={fr}
            customInput={<input data-testid="departure-time-picker" />}
          />
        </div>

        <div className="separator" />

        <div className="input-container">
          <Hourglass className="icon" size={26} />
          <div className="duration-selects">
            <select value={hours} onChange={onHourChange}>
              {Array.from({ length: 25 }, (_, i) => (
                <option key={i} value={i}>
                  {i} h
                </option>
              ))}
            </select>
            <select value={minutes} onChange={onMinuteChange}>
              {Array.from({ length: 60 }, (_, min) => (
                <option key={min} value={min}>
                  {min} min
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="separator" />

        <div className="flex-container">
          <div className="select-container">
            <Users className="icon" size={20} />
            <label htmlFor="passenger-select" id="sr-only">
              Nombre de passagers
            </label>
            <select
              id="passenger-select"
              value={passengers}
              onChange={onPassengersChange}
            >
              {Array.from({ length: 4 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? "Passager" : "Passagers"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishTripBar;