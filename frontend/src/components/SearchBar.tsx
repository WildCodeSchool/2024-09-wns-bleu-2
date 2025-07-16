import { ChangeEvent, useMemo } from "react";
import {
    MapPin,
    CalendarDays,
    Users,
    ArrowRightLeft,
    ChevronRight,
    Hourglass,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "../styles/searchBar.scss";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";
import { useGetCitiesLazyQuery } from "../generated/graphql-types";
import { toast } from "react-toastify";

type SearchBarProps = {
    departure: string;
    arrival: string;
    date: Date;
    passengers: number;
    departureTime: Date | null;
    onDepartureChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onArrivalChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (date: Date) => void;
    onTimeChange: (date: Date | null) => void;
    onPassengersChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onSearch?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
    departure,
    arrival,
    date,
    passengers,
    departureTime,
    onDepartureChange,
    onArrivalChange,
    onDateChange,
    onTimeChange,
    onPassengersChange,
    onSearch,
}) => {
     const [fetchCities, { data: citiesData, error }] = useGetCitiesLazyQuery();

    // Pour gérer l'erreur GraphQL personnalisée (optionnel)
    if (error) {
        const code = error.graphQLErrors[0]?.extensions?.code;
        if (code === "CITY_NOT_FOUND") {
            console.log("Aucune ville trouvée pour ce nom");
        } else {
            console.error("Erreur GraphQL:", error);
        }
    }

    // pour éviter de recalculer
    const cityOptions = useMemo(() => {
        return citiesData?.getCities.map((city: { id: string; name: string }) => (
            <option key={city.id} value={city.name}>
                {city.name}
            </option>
        ));
    }, [citiesData]);

    const handleSearch = () => {
        if (!departure || !arrival || !date || !departureTime) {
            toast.warning("Merci de remplir tous les champs !");
            return;
        }
        onSearch?.();
    };

    return (
        <div className="search-bar">
            <div className="search-wrapper">
                <div className="input-container">
                    <MapPin className="icon" size={22} />
                    <input
                        type="text"
                        list="departure-cities"
                        value={departure}
                        placeholder="Ville de départ"
                        onChange={(e) => {
                            onDepartureChange(e);
                            if (e.target.value.trim().length > 0) {
                                fetchCities({ variables: { city: e.target.value } });
                            }
                        }}
                    />
                    <datalist id="departure-cities">
                        {citiesData?.getCities.map((city) => (
                            <option key={city.id} value={city.name} />
                        ))}
                    </datalist>
                </div>

                <ArrowRightLeft size={20} id="hidden-arrow" />
                <div className="separator" id="visible-separator" />

                <div className="input-container">
                    <MapPin className="icon" size={22} />
                    <input
                        type="text"
                        list="arrival-cities"
                        value={arrival}
                        placeholder="Ville d'arrivée"
                        onChange={(e) => {
                            onArrivalChange(e); // met à jour le state dans le parent
                            if (e.target.value.trim().length > 0) {
                                fetchCities({ variables: { city: e.target.value } });
                            }
                        }}
                    />
                    <datalist id="arrival-cities">
                        {citiesData?.getCities.map((city) => (
                            <option key={city.id} value={city.name} />
                        ))}
                    </datalist>
                </div>

                <div className="separator" />

                <div className="input-container">
                    <CalendarDays className="icon" size={22} />
                    <DatePicker
                        selected={date}
                        onChange={(date) => date && onDateChange(date)}
                        dateFormat="dd/MM/yyyy"
                        className="datepicker-input"
                        popperPlacement="bottom-start"
                        locale={fr}
                    />
                </div>

                <div className="separator" />

                <div className="input-container">
                    <Hourglass className="icon" size={22} />
                    <DatePicker
                        selected={departureTime}
                        onChange={(time) => onTimeChange(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Heure"
                        dateFormat="HH:mm"
                        className="datepicker-input"
                        placeholderText="Heure de départ"
                        locale={fr}
                    />
                </div>

                <div className="separator" />

                <div className="flex-container">
                    <div className="select-container">
                        <Users className="icon" size={20} />
                        <label htmlFor="passenger-select" id="sr-only">
                            Nombre de passagers
                        </label>
                        <select
                            id="passenger-select"
                            value={passengers}
                            onChange={onPassengersChange}
                        >
                            {Array.from({ length: 4 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1} {i === 0 ? "Passager" : "Passagers"}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div id="hidden-separator" />

                    <button
                        type="button"
                        className="search-button"
                        onClick={handleSearch}
                        aria-label="Rechercher"
                    >
                        <ChevronRight size={30} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;