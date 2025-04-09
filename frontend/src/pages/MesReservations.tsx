import { useGetUserInfoQuery, useGetBookingsForPassengerQuery } from "../generated/graphql-types";
import TripList from "../components/TripList";

export default function MesReservations() {
  const { data: userData } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo?.id;

  console.log("userId", userId);

  const { data, loading, error } = useGetBookingsForPassengerQuery({
    variables: { passengerId: userId ?? 0 },
    skip: !userId,
    fetchPolicy: 'network-only', // Add this line to always fetch fresh data
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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