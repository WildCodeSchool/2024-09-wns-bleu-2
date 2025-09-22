import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/search-page.scss";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);

  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams({
      departure,
      arrival,
      date: date.toISOString().split("T")[0],
      passengers: passengers.toString(),
    });

    navigate(`/search-page-result?${params.toString()}`);
  };

  return (
    <div className="search-route">
      <h1>Trouvez votre Grumpy trip en 1 clic !</h1>
      <SearchBar
        departure={departure}
        arrival={arrival}
        date={date}
        passengers={passengers}
        onDepartureChange={(e) => setDeparture(e.target.value)}
        onArrivalChange={(e) => setArrival(e.target.value)}
        onDateChange={setDate}
        onPassengersChange={(e) => setPassengers(Number(e.target.value))}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchPage;