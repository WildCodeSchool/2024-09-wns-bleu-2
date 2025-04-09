import { useSearchCarpoolsQuery } from "../../generated/graphql-types";
import {
  formatDate,
  formatTime,
  formatTimeFromString,
} from "../../utils/format.utils";
import "../../styles/search-result.scss";
import defaultImage from "../../images/default-avatar.png";
import { calculateArrivalTime, formatDuration } from "../../utils/dateUtils";
import { MoveLeft, MoveRight, Tractor, User } from "lucide-react";

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
  const formattedDate = formatDate(date);
  const formattedTime = time ? formatTime(time) : "00:00";

  const { data, loading, error } = useSearchCarpoolsQuery({
    variables: {
      departure,
      arrival,
      date: formattedDate,
      time: formattedTime,
    },
    skip: !departure || !arrival || !date,
  });

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
      {filteredResults?.map((carpool) => (
        <div className="carpool-card" key={carpool.id}>
          <div className="travel-info">
            <div className="travel_hours">
              <p className="hours">
                {formatTimeFromString(carpool.departure_time)}
              </p>

              <MoveRight size={22} />

              <p>{formatDuration(carpool.duration)}</p>

              <MoveLeft size={22} />

              <p className="hours">
                {calculateArrivalTime(carpool.departure_time, carpool.duration)}
              </p>
            </div>

            <div className="travel_cities">
              <p>{carpool.departure_city}</p>
              <p>{carpool.arrival_city}</p>
            </div>
          </div>

          <div className="separator-filter" />

          <div className="flex-div">
            <div className="driver">
              <img
                src={
                  carpool.driver.avatar && carpool.driver.avatar !== "null"
                    ? carpool.driver.avatar
                    : defaultImage
                }
                alt={`Avatar de ${carpool.driver.firstname}`}
              />
              <p>
                {carpool.driver.firstname} {carpool.driver.lastname}
              </p>
            </div>
            <p>{carpool.price} €</p>
          </div>

          <div className="flex-div">
            {carpool.toll && (
              <p>
                <Tractor size={22} style={{ marginRight: "5px" }} /> Autoroute
              </p>
            )}

            {carpool.num_passenger > 0 && (
              <p>
                {Array.from({ length: carpool.num_passenger }).map(
                  (_, index) => (
                    <User
                      key={index}
                      size={22}
                      style={{ marginRight: "5px" }}
                    />
                  )
                )}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
{
  /* <p>Options : {carpool.options.join(", ")}</p> => A personnaliser pour chaque option ? */
}

export default SearchResults;
