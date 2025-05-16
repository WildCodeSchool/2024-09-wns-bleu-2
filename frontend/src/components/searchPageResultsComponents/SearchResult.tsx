import { useSearchCarpoolsQuery } from "../../generated/graphql-types";
import {
  formatDate,
  formatTime,
  formatTimeFromString,
} from "../../utils/format.utils";
import "../../styles/trip-cards.scss";
import "../../styles/search-result.scss";
import defaultImage from "../../../public/default-avatar.png";
import { calculateArrivalTime, formatDuration } from "../../utils/dateUtils";
import { Tickets, Tractor, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SearchResultsProps = {
  departure: string;
  arrival: string;
  date: Date;
  time: Date | null;
  filters?: {
    sortByPrice: boolean;
    selectedOptions: string[];
  };
};

const SearchResults: React.FC<SearchResultsProps> = ({
  departure,
  arrival,
  date,
  time,
  filters,
}) => {
  const navigate = useNavigate();

  const formattedDate = formatDate(date);
  const formattedTime = time ? formatTime(time) : "00:00";

  const areFieldsValid = departure && arrival && date;

  const { data, loading, error } = useSearchCarpoolsQuery({
    variables: {
      departure,
      arrival,
      date: formattedDate,
      time: formattedTime,
    },
    skip: !areFieldsValid,
  });

  if (!areFieldsValid) {
    return (
      <>
        <p>Veuillez remplir tous les champs pour effectuer une recherche.</p>
      </>
    );
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data?.searchCarpools.length) return <p>Aucun trajet trouvé.</p>;

  let filteredResults = data.searchCarpools;

  if (filters?.selectedOptions.length) {
    filteredResults = filteredResults.filter((carpool) =>
      filters.selectedOptions.every((opt) => carpool.options.includes(opt))
    );
  }

  if (filters?.sortByPrice) {
    filteredResults = [...filteredResults].sort((a, b) => a.price - b.price);
  }

  return (
    <div className="results-container">
      {filteredResults?.map((carpool, index) => {
        const toll = carpool.toll ? "Avec péage" : "Sans péage";
        const icon = carpool.toll ? (
          <Tickets color="#ffffff" width={30} strokeWidth={1.5} />
        ) : (
          <Tractor color="#ffffff" width={30} strokeWidth={1.5} />
        );

        const seats = Array.from({ length: carpool.num_passenger }).map(
          (_, i) => <User key={i} color="#ffffff" strokeWidth={1.5} />
        );

        const bgClasses = ["bg-red", "bg-yellow", "bg-green", "bg-blue"];
        const bg = bgClasses[index % bgClasses.length];

        return (
          <div
            className={`trip-card ${bg}`}
            key={carpool.id}
            onClick={() => navigate(`/book/${carpool.id}`)}
          >
            <div className="trip-card-header">
              <div className="trip-card-infos-left">
                <div className="trip-card-trip-duration">
                  <p className="time">
                    {formatTimeFromString(carpool.departure_time)}
                  </p>
                  <div className="horizontal-line small departure" />
                  <p className="duration">{formatDuration(carpool.duration)}</p>
                  <div className="horizontal-line small arrival" />
                  <p className="time">
                    {calculateArrivalTime(
                      carpool.departure_time,
                      carpool.duration
                    )}
                  </p>
                </div>
                <div className="trip-card-cities">
                  <p className="city">{carpool.departure_city}</p>
                  <p className="city">{carpool.arrival_city}</p>
                </div>
              </div>
            </div>

            <div className="horizontal-line" />

            <div className="trip-card-bottom">
              <div className="trip-bottom-left">
                <div className="trip-user">
                  <img
                    src={
                      carpool.driver.avatar && carpool.driver.avatar !== "null"
                        ? carpool.driver.avatar
                        : defaultImage
                    }
                    alt={`Avatar de ${carpool.driver.firstname}`}
                  />
                  <div className="driver-infos">
                    <p>{carpool.driver.firstname}</p>
                  </div>
                </div>

                <div className="vertical-line" />

                <div className="trip-road">
                  {icon}
                  <p>{toll}</p>
                </div>
              </div>

              <div className="vertical-line" />

              <div className="trip-right">
                <div className="trip-passengers">{seats}</div>

                <div className="vertical-line" />

                <div className="trip-price">
                  <p>{carpool.price} €</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
