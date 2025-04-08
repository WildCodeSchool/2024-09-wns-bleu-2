// pages/MesGrumpyTrips.tsx
import { useParams } from "react-router-dom";
import { useGetCarpoolsByUserIdQuery } from "../generated/graphql-types";
import TripList from "../components/TripList";

export default function MesGrumpyTrips() {
  const { id } = useParams();
  const { data, loading, error } = useGetCarpoolsByUserIdQuery({
    variables: { userId: id ? parseFloat(id) : 0 },
    skip: !id
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const carpools = data?.getCarpoolsByUserId || [];

  return (
    <TripList
      trips={carpools}
      titleUpcoming="Mes grumpy trips à venir"
      titlePast="Mes Grumpy Trips passés"
      showPublishButton={true}
      mode="carpool"
    />
  );
}
