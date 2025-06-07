// components/TripList.tsx
import TripCard from "./TripCard";
import { separateTripsByDate } from "../utils/seperatedate";
import "../styles/trip-cards.scss";
import "../styles/mycarpools.scss";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type TripListProps = {
  trips: any[];
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
  const { sortedUpcomingTrips, sortedPastTrips } = separateTripsByDate(trips);
  const navigate = useNavigate();

  const buttonLabel =
    mode === "carpool" ? "Publier un trajet" : "Réserver un trajet";
  const buttonRedirect = mode === "carpool" ? "/publish-route" : "/search-page";

  return (
    <div className="page-container">
      <div className="page-wrapper">
        {/* Upcoming Trips */}
        <div className="carpool-section">
          <h2>{titleUpcoming}</h2>
          <div className="carpool-main">
            {sortedUpcomingTrips.length > 0 ? (
              sortedUpcomingTrips.map((trip: any) => (
                <div
                  key={trip.id}
                  className="card-button"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/trip/${trip.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/trip/${trip.id}`);
                    }
                  }}
                >
                  <TripCard
                    tripDetails={trip}
                    isUpcoming={true}
                    mode={mode}
                    carpoolData={mode === "booking" ? trip.carpool : undefined}
                    tripIndex={trip.id}
                  />
                </div>
              ))
            ) : (
              <p>Aucun trajet trouvé</p>
            )}
          </div>
        </div>

        {/* Past Trips */}
        <div className="carpool-section">
          <h2>{titlePast}</h2>
          <div className="carpool-main">
            {sortedPastTrips.length > 0 ? (
              sortedPastTrips.map((trip: any) => (
                <TripCard
                  key={trip.id}
                  tripDetails={trip}
                  isUpcoming={false}
                  mode={mode}
                  carpoolData={mode === "booking" ? trip.carpool : undefined}
                  tripIndex={trip.id}
                />
              ))
            ) : (
              <p>Aucun voyage passé</p>
            )}
          </div>
        </div>
      </div>

      {showPublishButton && (
        <div className="publish-trip-button-container">
          <button
            className="submit-button"
            onClick={() => navigate(buttonRedirect)}
          >
            <ChevronRight width={30} color="white" /> {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
}
