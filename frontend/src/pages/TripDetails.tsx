import { useParams } from "react-router-dom";
import {
  Carpool,
  useDeleteBookingMutation,
  useGetCarpoolByIdQuery,
} from "../generated/graphql-types";
import TripCard from "../components/TripCard";
import { formatDate } from "../utils/dateUtils";
import "../styles/trip-details.scss";
import { getBookedSeats } from "../utils/tripUtils";
import { ChevronRight, HeartCrack } from "lucide-react";
import avatar from "/public/avatar.webp";
import { toast } from "react-toastify";
import React from "react";

export default function TripDetails({ tripIndex }: { tripIndex: number }) {
  const { id } = useParams();

  const { data, loading, error, refetch } = useGetCarpoolByIdQuery({
    variables: { getCarpoolByIdId: Number(id) },
  });
  const [deletePassenger] = useDeleteBookingMutation({});

  if (loading) return <p>Loading...</p>;

  if (error) {
    return <p>Error : {error.message}</p>;
  }
  if (!data || !data.getCarpoolById) {
    return <p>No data found for the given ID.</p>;
  }

  const tripDetails = data.getCarpoolById;
  const mode = "carpool";

  const handleDeletePassenger = async (
    passengerId: number,
    carpoolId: number
  ) => {
    try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce passager?")) {
        await deletePassenger({
          variables: {
            passengerId: passengerId,
            carpoolId: carpoolId,
          },
        });
      }
      await refetch();
      toast.success("Passager supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du passager :", error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="page-container">
      <div className="page-wrapper">
        <h1>Mon Grumpy Trip du {formatDate(tripDetails.departure_date)}</h1>
        <TripCard
          tripDetails={tripDetails as Carpool}
          tripIndex={tripIndex}
          mode="carpool"
        />
        <div className="passengers-card">
          <h2>
            {getBookedSeats(tripDetails as Carpool, mode) !== 0 ? (
              getBookedSeats(tripDetails as Carpool, mode) + " Passagers"
            ) : (
              <>
                Tu n'as encore aucun passager <HeartCrack />
              </>
            )}
          </h2>
          <div className="horizontal-line" />
          <div className="passengers-wrapper">
            {tripDetails.bookings.map((booking, index) => (
              <React.Fragment key={index}>
                <div className="passenger">
                  <div className="row">
                    <div className="trip-user">
                      <img
                        src={
                          !booking.passenger.avatar ||
                          booking.passenger.avatar === ""
                            ? avatar
                            : booking.passenger.avatar
                        }
                        alt="Avatar"
                      />
                      <div className="driver-infos">
                        <p>{booking.passenger.firstname}</p>
                      </div>
                    </div>
                    <small className="seats">
                      {booking.numPassenger} place réservée
                    </small>
                  </div>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={() =>
                      handleDeletePassenger(
                        booking.passenger.id,
                        Number(tripDetails.id)
                      )
                    }
                  >
                    <ChevronRight width={15} color="white" /> Supprimer
                  </button>
                </div>
                {index < tripDetails.bookings.length - 1 && (
                  <div
                    className={
                      innerWidth < 885
                        ? "horizontal-line small"
                        : "vertical-line"
                    }
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
