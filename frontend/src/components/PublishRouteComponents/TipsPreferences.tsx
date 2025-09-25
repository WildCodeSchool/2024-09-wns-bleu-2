import "../../styles/trips-preferences.scss";

type TripPreferencesProps = {
  options: string[];
  setOptions: (options: string[]) => void;
};

const availableOptions = [
  "Fumeur",
  "Musique",
  "Animal Friendly",
  "Deux passagers max à l’arrière",
  "Autoroute",
];

const labelMap: Record<string, string> = {
  Fumeur: "J’accepte les fumeurs",
  Musique: "Ok pour écouter de la Grumpy’RNB",
  "Animal Friendly": "Oui, je peux prendre des animaux",
  "Deux passagers max à l’arrière":
    "Je ne peux prendre que 2 personnes à l’arrière",
  Autoroute: "Je prends l’autoroute",
};

const TripPreferences: React.FC<TripPreferencesProps> = ({
  options,
  setOptions,
}) => {
  const toggleOption = (option: string) => {
    if (options.includes(option)) {
      setOptions(options.filter((o) => o !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  return (
    <div className="trip-preferences">
      <h2>Quelles sont vos préférences de voyage ? <span>(Optionnel)</span></h2>

      <div className="preferences-box">
        {availableOptions.map((option) => (
          <div key={option} className="preference-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                value={option}
                checked={options.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {labelMap[option]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TripPreferences;