import { ChangeEvent, useState } from "react";
import { MapPin, CalendarDays, Users, ChevronRight, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "../styles/searchBar.scss";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";
import { useGetCitiesLazyQuery } from "../generated/graphql-types";
import { toast } from "react-toastify";

type SearchBarProps = {
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
  departureTime?: Date | null;
  showTime?: boolean;
  showButton?: boolean;
  showKm?: boolean;
  onKmChange?: (km: number) => void;
  onDepartureChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onArrivalChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date) => void;
  onTimeChange?: (date: Date | null) => void;
  onPassengersChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSearch?: () => void;
  hasResults?: boolean;
  setOpenFilters?: (value: boolean) => void;
};

// Gestion d'erreur pour les champs de formulaire requis (villes + date)
type SearchErrors = {
  departure?: string;
  arrival?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  departure,
  arrival,
  date,
  passengers,
  departureTime,
  showTime,
  showButton = true,
  showKm = false,
  onKmChange,
  onDepartureChange,
  onArrivalChange,
  onDateChange,
  onTimeChange,
  onPassengersChange,
  onSearch,
  hasResults,
  setOpenFilters,
}) => {
  const [fetchDepartureCities, { data: departureCities }] =
    useGetCitiesLazyQuery();
  const [fetchArrivalCities, { data: arrivalCities }] = useGetCitiesLazyQuery();

  const [km, setKm] = useState(0);

  const today = new Date();

  const [errors, setErrors] = useState<SearchErrors>({});

  const handleSearch = () => {
    const newErrors: SearchErrors = {};

    if (!departure) newErrors.departure = "Ce champ est requis.";
    if (!arrival) newErrors.arrival = "Ce champ est requis.";

    setErrors(newErrors);

    // Si l'utilisateur entre une ville qui n'existe pas
    const departureExists = departureCities?.getCities?.some(
      (city) => city.name === departure
    );
    const arrivalExists = arrivalCities?.getCities?.some(
      (city) => city.name === arrival
    );

    if (!departureExists) {
      toast.error("La ville de départ n'existe pas.");
      return;
    }

    if (!arrivalExists) {
      toast.error("La ville d'arrivée n'existe pas.");
      return;
    }

    onSearch?.();
  };

  return (
    <>
      <div className="search-bar">
        <div className="search-wrapper">
          <div className="input-container">
            <MapPin className="icon" size={26} />
            <input
              type="text"
              list="departure-cities"
              title="Entrer la ville de départ"
              aria-label="Ville de départ"
              value={departure}
              placeholder="Départ"
              className="input-city"
              onChange={(e) => {
                console.log(departureCities);
                onDepartureChange(e);
                if (e.target.value.trim().length > 0) {
                  fetchDepartureCities({ variables: { city: e.target.value } });
                }
              }}
            />
            {errors.departure && (
              <span className="error">{errors.departure}</span>
            )}
            <datalist id="departure-cities">
              {departureCities?.getCities.map((city) => (
                <option key={city.id} value={city.name} />
              ))}
            </datalist>
          </div>

          <div className="input-container">
            <MapPin className="icon" size={26} />
            <input
              name="arrival-city"
              type="text"
              list="arrival-cities"
              title="Entrer la ville d'arrivée"
              aria-label="Ville d'arrivée"
              value={arrival}
              placeholder="Arrivée"
              className="input-city"
              onChange={(e) => {
                console.log(arrivalCities);
                onArrivalChange(e);
                if (e.target.value.trim().length > 0) {
                  fetchArrivalCities({ variables: { city: e.target.value } });
                }
              }}
            />
            {errors.arrival && <span className="error">{errors.arrival}</span>}
            <datalist id="arrival-cities">
              {arrivalCities?.getCities.map((city) => (
                <option key={city.id} value={city.name} />
              ))}
            </datalist>
          </div>

          <div className="input-container date">
            <CalendarDays className="icon" size={26} />
            <DatePicker
              selected={date}
              onChange={(date) => date && onDateChange(date)}
              dateFormat="dd/MM/yyyy"
              minDate={today}
              className="datepicker-input"
              popperPlacement="bottom-start"
              locale={fr}
              aria-label="Date de départ"
              title="Choisir la date de départ"
            />
          </div>

          {showTime && (
            <div className="input-container">
              <Clock className="icon" size={26} />
              <DatePicker
                selected={departureTime}
                onChange={(time) => onTimeChange && onTimeChange(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Heure"
                dateFormat="HH:mm"
                placeholderText="08:30"
                locale={fr}
                className="datepicker-input"
              />
            </div>
          )}
          <div className="input-container">
            <Users className="icon" size={26} />
            <select
              id="passenger-select"
              title="Choisir le nombre de passagers"
              aria-label="Nombre de passagers"
              value={passengers}
              onChange={onPassengersChange}
            >
              {Array.from({ length: 4 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? "passager" : "passagers"}
                </option>
              ))}
            </select>
          </div>
          {showButton && (
            <div className="input-container button-container">
              <button
                type="button"
                className="search-button"
                onClick={handleSearch}
                aria-label="Rechercher"
              >
                <ChevronRight size={30} />
              </button>
            </div>
          )}
        </div>
      </div>
      {hasResults && (
        <button
          className="filters-btn-mobile"
          onClick={() => {
            setOpenFilters && setOpenFilters(true);
          }}
        >
          FILTRER PAR
        </button>
      )}
      {showKm && (
        <div className="kilometer">
          <p>
            Dans un rayon de
            <select
              value={km}
              onChange={(e) => {
                const newKm = parseInt(e.target.value);
                setKm(newKm);
                onKmChange?.(newKm);
              }}
            >
              <option value={0}>0</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
            km
          </p>
        </div>
      )}
    </>
  );
};

export default SearchBar;
