// components/TripList.tsx
import TripCard from "./TripCard";
import { separateTripsByDate } from "../utils/seperatedate";
import "../styles/trip-cards.scss";
import "../styles/mycarpools.scss";
import { useNavigate } from "react-router-dom";

type TripListProps = {
    trips: any[]; // Remplace `any` par le type correct si tu en as un
    titleUpcoming: string;
    titlePast: string;
    showPublishButton?: boolean;
    mode: "carpool" | "booking";
  };

  export default function TripList({
    trips,
    titleUpcoming,
    titlePast,
    showPublishButton = false,
    mode,
  }: TripListProps) {
    const { upcomingTrips, pastTrips } = separateTripsByDate(trips);
    const navigate = useNavigate();

    const buttonLabel =
    mode === "carpool" ? "Publier un trajet" : "Réserver un autre trajet";
    const buttonRedirect =
    mode === "carpool" ? "/publish-route" : "/search-page";

    return (
        <div className="overall-container">
          <div className="carpool-list-container">
            {/* Upcoming Trips */}
            <div className="carpool-section">
              <h2>{titleUpcoming}</h2>
              <div className="carpool-main">
                {upcomingTrips.length > 0 ? (
                  upcomingTrips.map((trip: any, index: number) => (
                    <TripCard
                      key={trip.id}
                      tripDetails={trip}
                      isUpcoming={true}
                      tripIndex={index}
                      mode={mode}
                      carpoolData={mode === "booking" ? trip.carpool : undefined}
                    />
                  ))
                ) : (
                  <div className="no-carpools">Aucun trajet trouvé</div>
                )}
              </div>
            </div>
    
            {/* Past Trips */}
            <div className="carpool-section-2">
              <h2>{titlePast}</h2>
              <div className="carpool-main">
                {pastTrips.length > 0 ? (
                  pastTrips.map((trip:any, index: number) => (
                    <TripCard
                      key={trip.id}
                      tripDetails={trip}
                      isUpcoming={false}
                      tripIndex={index}
                      mode={mode}
                      carpoolData={mode === "booking" ? trip.carpool : undefined}
                    />
                  ))
                ) : (
                  <div className="no-carpools">Aucun voyage passé</div>
                )}
              </div>
            </div>
          </div>
    
          {showPublishButton && (
        <div className="publish-trip-button-container">
          <button
            className="publish-trip-button"
            onClick={() => navigate(buttonRedirect)}
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
}