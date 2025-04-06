import { useNavigate, useParams } from "react-router-dom";
import { useGetCarpoolsByUserIdQuery } from "../generated/graphql-types";
import TripCard from "../components/TripCard";
import "../styles/trip-cards.scss";
import "../styles/mycarpools.scss";
import { separateTripsByDate } from "../utils/seperatedate";

export default function SearchCarpoolByUser() {
  const { id } = useParams();

  const navigate = useNavigate(); // Hook to navigate

  const { data, loading, error } = useGetCarpoolsByUserIdQuery({
    variables: { userId: id ? parseFloat(id) : 0 },
    skip: !id, // Skip the query if the userId is not provided
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const carpools = data?.getCarpoolsByUserId || [];

 // Filter upcoming and past trips based on departure date
 const { upcomingTrips, pastTrips } = separateTripsByDate(carpools);

  return (
    <div className="overall-container">
            <div className="carpool-list-container">
              {/* Upcoming Trips Section */}
              <div className="carpool-section">
                <h2>Mes grumpy trips à venir</h2>
                <div className="carpool-main">
                  {upcomingTrips.length > 0 ? (
                    upcomingTrips.map((carpool, tripIndex) => (
                      <TripCard 
                      key={carpool.id}
                      tripDetails={carpool}
                      isUpcoming={true} // Set the isUpcoming prop to true
                      tripIndex={tripIndex} // Pass the index for background classes
                      mode="carpool" // Set the mode to "carpool" 
                       />
                    ))
                  ) : (
                    <div className="no-carpools">Aucune voiture trouvée</div>
                  )}
                </div>
              </div>
    
              {/* Past Trips Section */}
              <div className="carpool-section-2">
                <h2>Mes Grumpy Trips passés</h2>
                <div className="carpool-main">
                  {pastTrips.length > 0 ? (
                    pastTrips.map((carpool,tripIndex) => (
                      <TripCard 
                      key={carpool.id}
                      tripDetails={carpool}
                      isUpcoming={false} // Set the isUpcoming prop to true
                      tripIndex={tripIndex} // Pass the index for background classes
                      mode="carpool" // Set the mode to "carpool" 
                      />
                    ))
                  ) : (
                    <div className="no-carpools">Aucun voyage passé</div>
                  )}
                </div>
              </div>
            </div>
          
            {/* Button to navigate to "Publier un trajet"*/}
            <div className="publish-trip-button-container">
              <button 
                className="publish-trip-button" 
                onClick={() => navigate('/publier-un-trajet')} // Navigate to the desired route
              >
                Publier un trajet
              </button>
            </div>
          </div>
  );
}2