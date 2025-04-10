import "../../styles/filters.scss";

type FiltersProps = {
  sortByPrice: boolean;
  selectedOptions: string[];
  onSortChange: (value: boolean) => void;
  onOptionsChange: (options: string[]) => void;
  onReset: () => void;
};

const allOptions = ["Fumeur", "Animaux", "Musique", "Max. 2 à l'arrière"];

const Filters: React.FC<FiltersProps> = ({
  sortByPrice,
  selectedOptions,
  onSortChange,
  onOptionsChange,
  onReset,
}) => {
  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      onOptionsChange(selectedOptions.filter((o) => o !== option));
    } else {
      onOptionsChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="filters">
      <div className="filter-title-button">
        <h3>Filtrer par</h3>

        <button type="button" onClick={onReset}>
          Tout effacer
        </button>
      </div>

      <div className="separator-filter" />

      <label>
        <input
          type="checkbox"
          checked={sortByPrice}
          onChange={() => onSortChange(!sortByPrice)}
        />
        Prix le plus bas
      </label>

      <h4>Préférences du voyageur</h4>

      <div className="separator-filter" />

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
  );
};

export default Filters;
