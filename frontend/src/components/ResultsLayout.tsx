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
};

const ResultLayout = ({
  departure,
  arrival,
  date,
  passengers,
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
      <button
        className="filters-btn-mobile"
        onClick={() => setOpenFilters(true)}
      >
        FILTRES
      </button>

      <div className="result-layout">
        {openFilters && window.innerWidth < 992 ? (
          <Filters
            sortByPrice={sortByPrice}
            selectedOptions={selectedOptions}
            onSortChange={setSortByPrice}
            onOptionsChange={setSelectedOptions}
            onReset={handleResetFilters}
          />
        ) : (
          window.innerWidth >= 992 && (
            <Filters
              sortByPrice={sortByPrice}
              selectedOptions={selectedOptions}
              onSortChange={setSortByPrice}
              onOptionsChange={setSelectedOptions}
              onReset={handleResetFilters}
            />
          )
        )}

        <CarpoolResults
          departure={departure}
          arrival={arrival}
          date={date}
          passengers={passengers}
          filters={{ sortByPrice, selectedOptions }}
        />
      </div>
    </>
  );
};

export default ResultLayout;
