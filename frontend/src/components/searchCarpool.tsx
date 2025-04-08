import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_CARPOOLS } from "../graphql/queries";

const SearchCarpool = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");

  const [searchCarpools, { data, loading, error }] = useLazyQuery(SEARCH_CARPOOLS);

  const handleSearch = () => {
    if (!departure || !arrival || !date) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    searchCarpools({ variables: { departure, arrival, date } });
  };

  return (
    <div>
      <h2>Rechercher un covoiturage</h2>
      <input type="text" placeholder="Ville de départ" value={departure} onChange={(e) => setDeparture(e.target.value)} />
      <input type="text" placeholder="Ville d'arrivée" value={arrival} onChange={(e) => setArrival(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleSearch}>Rechercher</button>

      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error.message}</p>}
      {data && data.searchCarpools.length > 0 ? (
        <ul>
          {data.searchCarpools.map((carpool: any) => (
            <li key={carpool.id}>
              {carpool.departure_city} → {carpool.arrival_city} ({carpool.departure_date} à {carpool.departure_time}) | {carpool.price}€
              <br />
              Conducteur: {carpool.driver.firstname} {carpool.driver.lastname}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun covoiturage trouvé.</p>
      )}
    </div>
  );
};

export default SearchCarpool;
