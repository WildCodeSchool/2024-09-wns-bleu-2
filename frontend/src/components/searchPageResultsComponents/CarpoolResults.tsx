import { Carpool, useSearchCarpoolsQuery } from "../../generated/graphql-types";
import {
  formatDate,
  // formatTime,
  //  formatTimeFromString,
} from "../../utils/format.utils";
import "../../styles/trip-cards.scss";
import "../../styles/search-result.scss";
// import { Tickets, Tractor, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TripCard from "../TripCard";

type SearchResultsProps = {
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
  filters?: {
    sortByPrice: boolean;
    selectedOptions: string[];
  };
};

const CarpoolResults: React.FC<SearchResultsProps> = ({
  departure,
  arrival,
  date,
  filters,
}) => {
  const navigate = useNavigate();

  const formattedDate = formatDate(date);

  const areFieldsValid = departure && arrival && date;

  const { data, loading, error } = useSearchCarpoolsQuery({
    variables: {
      departure,
      arrival,
      date: formattedDate,
      // passengers
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
      filters.selectedOptions.every((opt) => carpool.options?.includes(opt))
    );
  }

  if (filters?.sortByPrice) {
    filteredResults = [...filteredResults].sort((a, b) => a.price - b.price);
  }

  return (
    <div className="results-container">
      {filteredResults?.map((carpool) => {
        return (
          <div
            key={carpool.id}
            className="card-button"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/book/${carpool.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/book/${carpool.id}`);
              }
            }}
          >
            <TripCard tripDetails={carpool as Carpool} mode="carpool" />
          </div>
        );
      })}
    </div>
  );
};

export default CarpoolResults;
