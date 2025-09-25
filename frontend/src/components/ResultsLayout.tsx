import Filters from "./searchPageResultsComponents/Filters";
import CarpoolResults from "./searchPageResultsComponents/CarpoolResults";

type Props = {
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
  sortByPrice: boolean;
  selectedOptions: string[];
  openFilters: boolean;
  setSortByPrice: (value: boolean) => void;
  setSelectedOptions: (value: string[]) => void;
  setOpenFilters: (value: boolean) => void;
  handleResetFilters: () => void;
  radiusKm: number;
};

const ResultLayout = ({
  departure,
  arrival,
  date,
  passengers,
  radiusKm,
  sortByPrice,
  selectedOptions,
  openFilters,
  setSortByPrice,
  setSelectedOptions,
  setOpenFilters,
  handleResetFilters,
}: Props) => {
  return (
    <>
      <div className="result-layout">
        <Filters
          sortByPrice={sortByPrice}
          selectedOptions={selectedOptions}
          onSortChange={setSortByPrice}
          onOptionsChange={setSelectedOptions}
          onReset={handleResetFilters}
          isOpen={openFilters}
          setIsOpen={setOpenFilters}
        />

        <CarpoolResults
          departure={departure}
          arrival={arrival}
          date={date}
          passengers={passengers}
          radiusKm={radiusKm}
          filters={{ sortByPrice, selectedOptions }}
        />
      </div>
    </>
  );
};

export default ResultLayout;
