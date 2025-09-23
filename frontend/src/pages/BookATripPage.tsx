import { useNavigate, useParams } from "react-router-dom";
import {
  Carpool,
  useCreateBookingMutation,
  useGetCarpoolByIdQuery,
  useGetUserInfoQuery,
} from "../generated/graphql-types";
import { useModal } from "../contexts/ModalContext";

import TripCard from "../components/TripCard";
import "../styles/book-a-trip-page.scss";
import { formatLongDate } from "../utils/dateUtils";
import DriverInfo from "../components/bookATripPageComponents/DriverInfo";
import BookingSummaryCard from "../components/bookATripPageComponents/BookingSummaryCard";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";

const BookATripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsLoginModalOpen, setRedirectAfterLogin } = useModal();

  const { data, loading, error } = useGetCarpoolByIdQuery({
    variables: { getCarpoolByIdId: Number(id) },
  });

  const { data: userData } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo.id;

  const [creatBooking] = useCreateBookingMutation();

  const handleBooking = async () => {
    if (!userId) {
      toast.error("Vous devez être connecté pour réserver un trajet.");

      setRedirectAfterLogin(`/book/${id}`); //on stocke le carpool piur que l'utilisateur ne perde pas sa page de réservation
      setIsLoginModalOpen(true);

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
      const apolloError = error as ApolloError;
      const graphQLError = apolloError.graphQLErrors[0];
      const code = graphQLError?.extensions?.code;
      if (code === "CARPOOL_ALREADY_LEFT") {
        toast.error("Ce covoiturage est déjà parti.");
      } else {
        toast.error("Erreur lors de la réservation.");
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error || !data?.getCarpoolById)
    return <p>Erreur ou aucun trajet trouvé</p>;

  return (
    <>
      <h1>{formatLongDate(data.getCarpoolById.departure_date)}</h1>
      <div className="wrapper">
        <div className="container-left">
          <TripCard
            tripDetails={data.getCarpoolById as Carpool}
            mode={"carpool"}
          />
          <DriverInfo carpool={data.getCarpoolById as Carpool} />
        </div>
        <div className="container-right">
          <BookingSummaryCard
            carpool={data.getCarpoolById as Carpool}
            numPassengers={1}
            onBook={handleBooking}
          />
        </div>
      </div>
    </>
  );
};

export default BookATripPage;
