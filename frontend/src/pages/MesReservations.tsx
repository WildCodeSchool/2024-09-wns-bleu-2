// pages/MesReservations.tsx
import { useParams } from "react-router-dom";
import { useGetBookingsForPassengerQuery } from "../generated/graphql-types";
import TripList from "../components/TripList";

export default function MesReservations() {
  const { id } = useParams();
  const { data, loading, error } = useGetBookingsForPassengerQuery({
    variables: { passengerId: id ? parseFloat(id) : 0 },
    skip: !id
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const reservations = data?.getBookingsForPassenger || [];

  return (
    <TripList
      trips={reservations}
      titleUpcoming="Mes réservations à venir"
      titlePast="Mes réservations passées"
      showPublishButton={true}
      mode="booking"
    />
  );
}
