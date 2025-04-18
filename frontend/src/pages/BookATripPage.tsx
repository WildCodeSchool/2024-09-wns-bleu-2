import { useNavigate, useParams } from "react-router-dom";
import {
  Carpool,
  useCreateBookingMutation,
  useGetCarpoolByIdQuery,
  useGetUserInfoQuery,
} from "../generated/graphql-types";

import "../styles/trip-cards.scss";
import TripSingleCard from "../components/TripSingleCard";
import { formatLongDate } from "../utils/dateUtils";
import DriverInfo from "../components/bookATripPageComponents/DriverInfo";
import BookingSummaryCard from "../components/bookATripPageComponents/BookingSummaryCard";
import { toast } from "react-toastify";

const BookATripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useGetCarpoolByIdQuery({
    variables: { getCarpoolByIdId: Number(id) },
  });

  const { data: userData } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo.id;

  const [creatBooking] = useCreateBookingMutation();

  const handleBooking = async () => {
    if (!userId) {
      toast.error("Vous devez être connecté pour réserver un trajet.");
      return;
    }

    const alreadyBooked = data?.getCarpoolById.bookings.some(
      (booking) => booking.passenger.id === userId
    );

    if (alreadyBooked) {
      toast.error("Vous avez déjà réservé ce trajet.");
      return;
    }

    try {
      await creatBooking({
        variables: {
          data: {
            carpool_id: Number(id),
            passenger_id: userId,
            numPassenger: 1,
            reservedAt: new Date().toISOString(),
          },
        },
      });
      toast.success("Réservation réussie !");
      navigate(`/myreservations/${userId}`);
    } catch (error) {
      toast.error("Erreur lors de la réservation.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error || !data?.getCarpoolById)
    return <p>Erreur ou aucun trajet trouvé</p>;

  return (
    <>
      <h1>{formatLongDate(data.getCarpoolById.departure_date)}</h1>
      <TripSingleCard carpool={data.getCarpoolById as Carpool} />
      <DriverInfo carpool={data.getCarpoolById as Carpool} />
      <BookingSummaryCard
        carpool={data.getCarpoolById as Carpool}
        numPassengers={1}
        onBook={handleBooking}
      />
    </>
  );
};

export default BookATripPage;
