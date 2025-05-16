import {
  useGetUserInfoQuery,
  useGetCarpoolsByUserIdQuery,
} from "../generated/graphql-types";
import TripList from "../components/TripList";

export default function MyGrumpyTrips() {
  const { data: userData } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo?.id;

  const {
    data: carpoolsData,
    loading: carpoolsLoading,
    error: carpoolsError,
  } = useGetCarpoolsByUserIdQuery({
    variables: { userId: userId ?? 0 }, // Pass the userId to the query
    fetchPolicy: 'network-only', // Add this line to always fetch fresh data
  });
  if (carpoolsLoading) return <p>Loading trips...</p>;
  if (carpoolsError) return <p>Error: {carpoolsError.message}</p>;

  // Now you have the carpools data for the logged-in user
  const carpools = carpoolsData?.getCarpoolsByUserId || [];

  return (
    <TripList
      trips={carpools}
      titleUpcoming="Mes Grumpy trips à venir"
      titlePast="Mes Grumpy Trips passés"
      showPublishButton={true}
      mode="carpool"
    />
  );
}
