import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/search-page.scss";
import "../styles/trip-cards.scss";
import { useSearchParams } from "react-router-dom";
import ResultsLayout from "../components/ResultsLayout";

const SearchPage = () => {
  ///////////page qui contient toute la logique state url et callbacks
  ///////////on passe tout à ResultLayout qui ne sert plus qu'a afficher les résultats

  const [params, setParams] = useSearchParams();

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [departureTime, setDepartureTime] = useState<Date | null>(null);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    const departureParam = params.get("departure");
    const arrivalParam = params.get("arrival");
    const dateStr = params.get("date");
    const timeStr = params.get("time");

    if (departureParam) setDeparture(departureParam);
    if (arrivalParam) setArrival(arrivalParam);
    if (dateStr) setDate(new Date(dateStr));
    if (timeStr) setDepartureTime(new Date(`1970-01-01T${timeStr}:00`));
    if (params.get("passengers")) {
      setPassengers(Number(params.get("passengers")));
    }
  }, [params]);

  const handleSearch = () => {
    const newParams = new URLSearchParams({
      departure,
      arrival,
      date: date.toISOString().split("T")[0],
      passengers: passengers.toString(),
    });
    setParams(newParams); ////// met à jour l’URL
  };

  const handleResetFilters = () => {
    setSortByPrice(false);
    setSelectedOptions([]);
  };

  const hasResults = params.get("departure") && params.get("arrival");

  return (
    <div className="search-route">
      <h1>Trouvez votre Grumpy trip en 1 clic !</h1>
      <SearchBar
        departure={departure}
        arrival={arrival}
        date={date}
        passengers={passengers}
        showKm={true}
        onDepartureChange={(e) => setDeparture(e.target.value)}
        onArrivalChange={(e) => setArrival(e.target.value)}
        onDateChange={setDate}
        onPassengersChange={(e) => setPassengers(Number(e.target.value))}
        departureTime={departureTime}
        onTimeChange={setDepartureTime}
        onSearch={handleSearch}
      />

      {hasResults && (
        <ResultsLayout
          departure={departure}
          arrival={arrival}
          date={date}
          passengers={passengers}
          sortByPrice={sortByPrice}
          selectedOptions={selectedOptions}
          openFilters={openFilters}
          setSortByPrice={setSortByPrice}
          setSelectedOptions={setSelectedOptions}
          setOpenFilters={setOpenFilters}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
};

export default SearchPage;
