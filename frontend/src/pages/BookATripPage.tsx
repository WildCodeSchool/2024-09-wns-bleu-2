import { useParams } from "react-router-dom";
import { Carpool, useGetCarpoolByIdQuery } from "../generated/graphql-types";

import "../styles/trip-cards.scss";
import TripSingleCard from "../components/TripSingleCard";
import { formatLongDate } from "../utils/dateUtils";
import DriverInfo from "../components/bookATripPageComponents/DriverInfo";
import BookingSummaryCard from "../components/bookATripPageComponents/BookingSummaryCard";

const BookATripPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useGetCarpoolByIdQuery({
    variables: { getCarpoolByIdId: Number(id) },
  });

  if (loading) return <p>Chargement...</p>;
  if (error || !data?.getCarpoolById)
    return <p>Erreur ou aucun trajet trouvé</p>;

  return (
    <div className="page-container">
      <div className="page-wrapper">
        <h1>{formatLongDate(data.getCarpoolById.departure_date)}</h1>
        <TripSingleCard carpool={data.getCarpoolById as Carpool} />
        <DriverInfo carpool={data.getCarpoolById as Carpool} />
        <BookingSummaryCard
          carpool={data.getCarpoolById as Carpool}
          numPassengers={1}
          onBook={() => console.log("Réservation confirmée !")}
        />
      </div>
    </div>
  );
};

export default BookATripPage;
