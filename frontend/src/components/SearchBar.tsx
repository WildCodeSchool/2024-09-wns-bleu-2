import { ChangeEvent } from "react";
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
    const [fetchDepartureCities, { data: departureCities }] = useGetCitiesLazyQuery();
    const [fetchArrivalCities, { data: arrivalCities }] = useGetCitiesLazyQuery();

    // pour éviter de recalculer
    // const cityOptions = useMemo(() => {
    //     return citiesData?.getCities.map((city: { id: string; name: string }) => (
    //         <option key={city.id} value={city.name}>
    //             {city.name}
    //         </option>
    //     ));
    // }, [citiesData]);

    const handleSearch = () => {
        console.log(departureCities)
        console.log(arrivalCities)
        if (!departure || !arrival || !date || !departureTime) {
            toast.warning("Merci de remplir tous les champs !");
            return;
        }
        // Si l'utilisateur entre une ville qui n'existe pas
        const departureExists = departureCities?.getCities?.some(city => city.name === departure);
        const arrivalExists = arrivalCities?.getCities?.some(city => city.name === arrival);

        if (!departureExists) {
            toast.error("La ville de départ n'existe pas.");
            return;
        }

        if (!arrivalExists) {
            toast.error("La ville d'arrivée n'existe pas.");
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
                        placeholder="Départ"
                        className="input-city"
                        onChange={(e) => {
                            console.log(departureCities)
                            onDepartureChange(e);
                            if (e.target.value.trim().length > 0) {
                                fetchDepartureCities({ variables: { city: e.target.value } });
                            }
                        }}
                    />
                    <datalist id="departure-cities">
                        {departureCities?.getCities.map((city) => (
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
                        placeholder="Arrivée"
                        className="input-city"
                        onChange={(e) => {
                            console.log(arrivalCities)
                            onArrivalChange(e);
                            if (e.target.value.trim().length > 0) {
                                fetchArrivalCities({ variables: { city: e.target.value } });
                            }
                        }}
                    />
                    <datalist id="arrival-cities">
                        {arrivalCities?.getCities.map((city) => (
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