import { useParams } from "react-router-dom";
import { Carpool, useGetCarpoolByIdQuery } from "../generated/graphql-types";
import TripCard from "../components/TripCard";
import { formatDate } from "../utils/dateUtils";
import "../styles/trip-details.scss";
import { getBookedSeats } from "../utils/tripUtils";
import { ChevronRight } from "lucide-react";
import avatar from "../../public/avatar.webp";

export default function TripDetails({ tripIndex }: { tripIndex: number }) {
  const { id } = useParams();
  console.log("id", id);
  console.log("coucou");
  const { data, loading, error } = useGetCarpoolByIdQuery({
    variables: { getCarpoolByIdId: Number(id) },
  });

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log("trip", data);
    return <p>Error : {error.message}</p>;
  }
  if (!data || !data.getCarpoolById) {
    return <p>No data found for the given ID.</p>;
  }

  const tripDetails = data.getCarpoolById;
  const mode = "carpool";
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
          <h2>{getBookedSeats(tripDetails as Carpool, mode)} Passagers</h2>
          <div className="horizontal-line" />
          <div className="passengers-wrapper">
            {tripDetails.bookings.map((booking, index) => (
              <>
                <div className="passenger" key={index}>
                  <div className="row">
                    <div className="trip-user">
                      <img
                        src={booking.passenger.avatar ?? avatar}
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
                  <button type="button" className="submit-button">
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
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
