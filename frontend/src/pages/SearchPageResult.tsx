import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/search-page.scss";
import { useSearchParams } from "react-router-dom";
import SearchResults from "../components/searchPageResultsComponents/SearchResult";

const SearchPageResult = () => {
  const [params] = useSearchParams();

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [departureTime, setDepartureTime] = useState<Date | null>(null);

  useEffect(() => {
    setDeparture(params.get("departure") || "");
    setArrival(params.get("arrival") || "");
    setPassengers(Number(params.get("passengers") || 1));

    const dateStr = params.get("date");
    const timeStr = params.get("time");

    if (dateStr) setDate(new Date(dateStr));
    if (timeStr) setDepartureTime(new Date(`1970-01-01T${timeStr}:00`));
  }, [params]);

  return (
    <div className="search-route">
      <h1>Les trajets proposés</h1>
      <SearchBar
        departure={departure}
        arrival={arrival}
        date={date}
        passengers={passengers}
        onDepartureChange={(e) => setDeparture(e.target.value)}
        onArrivalChange={(e) => setArrival(e.target.value)}
        onDateChange={setDate}
        onPassengersChange={(e) => setPassengers(Number(e.target.value))}
        departureTime={departureTime}
        onTimeChange={setDepartureTime}
      />
      <SearchResults
        departure={departure}
        arrival={arrival}
        date={date}
        time={departureTime}
      />
    </div>
  );
};

export default SearchPageResult;
