import { useGetCarpoolsByUserIdQuery } from "../generated/graphql-types"; // Adjust the import based on where the generated file is located.
import { useParams } from "react-router-dom";
import "../styles/mycarpools.scss"; // Import your SCSS file


const SearchCarpoolByUser = () => {
const { id } = useParams<{ id: string }>(); // Get the userId from the URL

  const { data, loading, error } = useGetCarpoolsByUserIdQuery({
    variables: { userId: id ? parseFloat(id) : 0 },
    skip: !id, // Skip the query if the userId is not provided
  });

  if (loading) return <div className="loading-message">Chargement...</div>;
  if (error) return <div className="error-message">Erreur : {error.message}</div>;

  const calculateDuration = (departure: any, arrival: any) => {
    const [depH, depM] = departure.split(":").map(Number);
    const [arrH, arrM] = arrival.split(":").map(Number);
  
    let totalMinutes = (arrH * 60 + arrM) - (depH * 60 + depM);
    
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60; // Handles overnight trips
    }
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours}h${minutes > 0 ? minutes : ""}`; // Ex: "2h30" or "2h"
  };

  return (
    <div className="carpool-list-container">
    <h2>Mes grumpy trips à venir </h2>
    {data && data.getCarpoolsByUserId.length > 0 ? (
      <div>
      {data.getCarpoolsByUserId.map((carpool) => (
        <div key={carpool.id} className="carpool-item">
           <div className="info-container">
              <div className="departure-info">
                <span className="time">{carpool.departure_time.split(":")[0] + "h"+ (carpool.departure_time.split(":")[1] !== "00" ? carpool.departure_time.split(":")[1] : "")}</span>
                <span className="city">{carpool.departure_city}</span>
              </div>

              {/* Duration Calculation */}
              <div className="duration">
                  <div className="circle"></div>
                <div className="line"></div>
                <div className="time">{calculateDuration(carpool.departure_time, carpool.arrival_time)}</div>
                <div className="line"></div>
                <div className="circle"></div>
              </div>

              <div className="arrival-info">
                <span className="time">{carpool.arrival_time.split(":")[0] + "h"+ (carpool.arrival_time.split(":")[1] !== "00" ? carpool.arrival_time.split(":")[1] : "")}</span>
                <span className="city">{carpool.arrival_city}</span>
              </div>
            </div>
          <div className="carpool-details">
            Conducteur: {carpool.driver.firstname} | Nombre de places: {carpool.num_passenger} | Type de route: {carpool.type_of_road}
          </div>
        </div>
      ))}
      </div>
    ) : (
      <p>Aucun covoiturage trouvé pour cet utilisateur.</p>
    )}
  </div>
);
};

export default SearchCarpoolByUser;

