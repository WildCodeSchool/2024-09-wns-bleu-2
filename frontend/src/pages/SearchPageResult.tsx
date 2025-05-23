import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/search-page.scss";
import "../styles/trip-cards.scss";
import { useSearchParams } from "react-router-dom";
import SearchResults from "../components/searchPageResultsComponents/SearchResult";
import Filters from "../components/searchPageResultsComponents/Filters";

const SearchPageResult = () => {
  const [params] = useSearchParams();

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [departureTime, setDepartureTime] = useState<Date | null>(null);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setDeparture(params.get("departure") || "");
    setArrival(params.get("arrival") || "");
    setPassengers(Number(params.get("passengers") || 1));

    const dateStr = params.get("date");
    const timeStr = params.get("time");

    if (dateStr) setDate(new Date(dateStr));
    if (timeStr) setDepartureTime(new Date(`1970-01-01T${timeStr}:00`));
  }, [params]);

  const handleResetFilters = () => {
    setSortByPrice(false);
    setSelectedOptions([]);
  };

  return (
    <div className="page-container">
      <div className="page-wrapper">
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

        <div className="result-layout">
          <Filters
            sortByPrice={sortByPrice}
            selectedOptions={selectedOptions}
            onSortChange={setSortByPrice}
            onOptionsChange={setSelectedOptions}
            onReset={handleResetFilters}
          />

          <SearchResults
            departure={departure}
            arrival={arrival}
            date={date}
            time={departureTime}
            filters={{ sortByPrice, selectedOptions }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPageResult;
