import { useParams } from "react-router-dom";
import { useGetCarpoolByIdQuery } from "../generated/graphql-types";
import TripCard from "../components/TripCard";
import { formatDate } from "../utils/dateUtils";
import "../styles/trip-cards.scss";

export default function TripDetails({ tripIndex }: { tripIndex: number }) {
  const { id } = useParams();
  console.log("id", id);

  const { data, loading, error } = useGetCarpoolByIdQuery({
    variables: { getCarpoolByIdId: Number(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data || !data.getCarpoolById) {
    return <p>No data found for the given ID.</p>;
  }

  const tripDetails = {
    ...data.getCarpoolById,
    toll: data.getCarpoolById.options.includes("toll"),
  };

  return (
    <div className="page-container">
      <h1>Mon Grumpy Trip du {formatDate(tripDetails.departure_date)}</h1>
      <TripCard trip={tripDetails} tripIndex={tripIndex} />
    </div>
  );
}
