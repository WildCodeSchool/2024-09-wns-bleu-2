import { useSearchCarpoolsQuery } from "../../generated/graphql-types";
import { formatDate, formatTime } from "../../utils/format.utils";

type SearchResultsProps = {
  departure: string;
  arrival: string;
  date: Date;
  time: Date | null;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  departure,
  arrival,
  date,
  time,
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
    skip: !departure || !arrival || !date || !time,
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data?.searchCarpools.length) return <p>Aucun trajet trouvé.</p>;

  return (
    <div>
      <h2>Résultats</h2>
      <ul>
        {data?.searchCarpools.map((carpool) => (
          <li key={carpool.id}>
            <p>
              <strong>{carpool.departure_city}</strong> →{" "}
              <strong>{carpool.arrival_city}</strong>
            </p>
            <p>
              {carpool.departure_date} à {carpool.departure_time}
            </p>
            <p>Prix : {carpool.price} €</p>
            <p>
              Conducteur : {carpool.driver.firstname} {carpool.driver.lastname}
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
