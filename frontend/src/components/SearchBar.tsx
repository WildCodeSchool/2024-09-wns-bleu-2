import { ChangeEvent, useMemo, useState } from "react";
import { MapPin, CalendarDays, Users, ArrowRightLeft } from "lucide-react";
import DatePicker from "react-datepicker";
import styles from "../styles/searchBar.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchCarpoolsLazyQuery, useGetCitiesQuery } from "../generated/graphql-types";

type SearchBarProps = {
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
  onDepartureChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onArrivalChange: (event: ChangeEvent<HTMLSelectElement>) => void;
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
  const [results, setResults] = useState<any[]>([]);
  
  const { data: cityData, loading: loadingCities, error: errorCities } = useGetCitiesQuery();

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
    if (!departure || !arrival || !date) {
      console.error("Veuillez sélectionner une ville de départ, d'arrivée et une date.");
      return;
    }

    searchCarpools({
      variables: {
        departure,
        arrival,
        date: date.toISOString().split("T")[0],
      },
    });
  };

  return (
    <div className={styles["search-bar"]}>
    {/* Ville de départ */}
    <div className={styles["input-container"]}>
      <MapPin className={styles.icon} size={20} />
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

    <ArrowRightLeft className={styles.icon} size={20} />

    {/* Ville d'arrivée */}
    <div className={styles["input-container"]}>
      <MapPin className={styles.icon} size={20} />
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

    <div className={styles.separator} />

    {/* Sélecteur de date */}
    <div className={styles["input-container"]}>
      <CalendarDays className={styles.icon} size={30} />
      <DatePicker
        selected={date}
        onChange={(date) => date && onDateChange(date)}
        dateFormat="dd/MM/yyyy"
        className={styles["datepicker-input"]}
        popperPlacement="bottom-start"
      />
    </div>

    <div className={styles.separator} />

    {/* Sélecteur de passagers */}
    <div className={styles["select-container"]}>
      <Users className={styles.icon} size={20} />
      <label htmlFor="passenger-select" className="sr-only">Nombre de passagers</label>
      <select id="passenger-select" value={passengers} onChange={onPassengersChange}>
        {[...Array(4)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} Passager{i > 0 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>

    <button type="button" className={styles["search-button"]} onClick={handleSearch}>
      ➝
    </button>

      {/* Affichage des résultats */}
      {results.length > 0 && (
        <div className={styles["results-container"]}>
          <h3>Résultats :</h3>
          <ul>
            {results.map((carpool) => (
              <li key={carpool.id}>
                {carpool.departure_city} ➝ {carpool.arrival_city} - {carpool.price}€ - 
                {carpool.driver.firstname} {carpool.driver.lastname}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;