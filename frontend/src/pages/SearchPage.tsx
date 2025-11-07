import "../styles/search-page.scss";
import "../styles/trip-cards.scss";
import SearchBar from "../components/SearchBar";
import ResultsLayout from "../components/ResultsLayout";
import { useSearch } from "../contexts/SearchContext";

const SearchPage = () => {
  const {
    departure,
    arrival,
    date,
    passengers,
    departureTime,
    sortByPrice,
    selectedOptions,
    openFilters,
    setSortByPrice,
    setSelectedOptions,
    setOpenFilters,
    handleSearch,
    handleResetFilters,
    hasResults,
    setDeparture,
    setArrival,
    setDate,
    setPassengers,
    setDepartureTime,
  } = useSearch();

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
        onSearch={() => handleSearch(false)} // met à jour l'URL sans rediriger
        hasResults={hasResults}
        setOpenFilters={setOpenFilters}
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
