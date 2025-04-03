import { ChangeEvent, useMemo, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Users,
  ArrowRightLeft,
  ChevronRight,
  Hourglass,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "../styles/searchBar.scss";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";
import {
  useSearchCarpoolsLazyQuery,
  useGetCitiesQuery,
} from "../generated/graphql-types";
import { toast } from "react-toastify";

type SearchBarProps = {
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
  departureTime: Date | null;
  onDepartureChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onArrivalChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onDateChange: (date: Date) => void;
  onTimeChange: (date: Date | null) => void;
  onPassengersChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  departure,
  arrival,
  date,
  passengers,
  departureTime,
  onDepartureChange,
  onArrivalChange,
  onDateChange,
  onTimeChange,
  onPassengersChange,
}) => {
  const [results, setResults] = useState<any[]>([]);

  const {
    data: cityData,
    loading: loadingCities,
    error: errorCities,
  } = useGetCitiesQuery();

  if (errorCities) {
    console.error("Erreur GraphQL GET_CITIES:", errorCities);
  }

  const [searchCarpools] = useSearchCarpoolsLazyQuery({
    onCompleted: (data) => setResults(data.searchCarpools),
  });

  // pour éviter de recalculer
  const cityOptions = useMemo(() => {
    return cityData?.getCities.map((city: { id: string; name: string }) => (
      <option key={city.id} value={city.name}>
        {city.name}
      </option>
    ));
  }, [cityData]);

  const handleSearch = () => {
    if (!departure || !arrival || !date || !departureTime) {
      toast.warning("Merci de remplir tous les champs !");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = departureTime
      ? departureTime.toTimeString().split(" ")[0]
      : "00:00:00";

    console.log("🔍 Recherche envoyée avec :", {
      departure,
      arrival,
      date: formattedDate,
      time: formattedTime,
      passengers,
    });

    searchCarpools({
      variables: {
        departure,
        arrival,
        date: formattedDate,
        time: formattedTime,
      },
    });
  };

  return (
    <div className="search-bar">
      {/* Ville de départ */}
      <div className="input-container">
        <MapPin className="icon" size={22} />
        {loadingCities ? (
          <p>Chargement des villes...</p>
        ) : errorCities ? (
          <p>Erreur de chargement</p>
        ) : (
          <select value={departure} onChange={onDepartureChange}>
            <option value="">Choisissez une ville</option>
            {cityOptions}
          </select>
        )}
      </div>

      <ArrowRightLeft size={20} id="hidden-arrow" />
      <div className="separator" id="visible-separator" />

      {/* Ville d'arrivée */}
      <div className="input-container">
        <MapPin className="icon" size={22} />
        {loadingCities ? (
          <p>Chargement des villes...</p>
        ) : errorCities ? (
          <p>Erreur de chargement</p>
        ) : (
          <select value={arrival} onChange={onArrivalChange}>
            <option value="">Choisissez une ville</option>
            {cityOptions}
          </select>
        )}
      </div>

      <div className="separator" />

      {/* Calendrier */}
      <div className="input-container">
        <CalendarDays className="icon" size={22} />
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

      {/* Heure de départ */}
      <div className="input-container">
        <Hourglass className="icon" size={22} />
        <DatePicker
          selected={departureTime}
          onChange={(time) => onTimeChange(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Heure"
          dateFormat="HH:mm"
          className="datepicker-input"
          placeholderText="Heure de départ"
          locale={fr}
        />
      </div>

      <div className="separator" />

      {/* Sélection de passagers */}
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

        <div id="hidden-separator" />

        <button
          type="button"
          className="search-button"
          onClick={handleSearch}
          aria-label="Rechercher"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Pour affichage des résultats, pour le test,à enlever quand elle sera utilisée*/}
      {results.length > 0 && (
        <div className="results-container">
          <h3>Résultats :</h3>
          <ul>
            {results.map((carpool) => (
              <li key={carpool.id}>
                {carpool.departure_city} ➝ {carpool.arrival_city} -{" "}
                {carpool.price}€ -{carpool.driver.firstname}{" "}
                {carpool.driver.lastname}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
