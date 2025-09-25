import "../../styles/filters.scss";

type FiltersProps = {
  sortByPrice: boolean;
  selectedOptions: string[];
  onSortChange: (value: boolean) => void;
  onOptionsChange: (options: string[]) => void;
  onReset: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const allOptions = ["Fumeur", "Animaux", "Musique", "Max. 2 à l'arrière"];

const Filters: React.FC<FiltersProps> = ({
  sortByPrice,
  selectedOptions,
  onSortChange,
  onOptionsChange,
  onReset,
  isOpen,
  setIsOpen,
}) => {
  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      onOptionsChange(selectedOptions.filter((o) => o !== option));
    } else {
      onOptionsChange([...selectedOptions, option]);
    }
  };

  return (
    <div className={`filters ${isOpen ? "open-mobile" : "closed-mobile"}`}>
      <button
        className="close-mobile"
        onClick={() => setIsOpen(false)}
      ></button>
      <div className="filter-by">
        <div className="filter-title-button">
          <h3>Filtrer par</h3>

          <button type="button" onClick={onReset}>
            Tout effacer
          </button>
        </div>

        <label>
          <input
            type="checkbox"
            checked={sortByPrice}
            onChange={() => onSortChange(!sortByPrice)}
          />
          Prix le plus bas
        </label>
      </div>
      <div className="trip-preferences">
        <h3>Préférences du voyageur</h3>

        {allOptions.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(opt)}
              onChange={() => handleOptionToggle(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
