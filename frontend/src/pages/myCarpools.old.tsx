import { useGetCarpoolsByUserIdQuery } from "../generated/graphql-types"; // Adjust the import based on where the generated file is located.
import { useParams } from "react-router-dom";
import "../styles/mycarpools.scss"; // Import your SCSS file
import { Users, Landmark, BadgeEuro } from "lucide-react"; 


const SearchCarpoolByUser = () => {
const { id } = useParams<{ id: string }>(); // Get the userId from the URL

  const { data, loading, error } = useGetCarpoolsByUserIdQuery({
    variables: { userId: id ? parseFloat(id) : 0 },
    skip: !id, // Skip the query if the userId is not provided
  });

  if (loading) return <div className="loading-message">Chargement...</div>;
  if (error) return <div className="error-message">Erreur : {error.message}</div>;

  const calculateDuration = (departure: string, arrival: string) => {
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
      <div className="carpool-main">
      {data.getCarpoolsByUserId.map((carpool) => (
        <div key={carpool.id} className="carpool-item">
          <div className="top-row">
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

            <div className="date">
                {carpool.departure_date}
            </div>
          
            <div>
              <button className="delete-button">ANNULER</button>
            </div>
            </div>
            
            {/* Separator line between top-row and down-row */}
            <div className="separator-line"></div>
            
            <div className="down-row">
              <div className="carpool-details">
              <div className="driver">
                <img src="https://yt3.googleusercontent.com/qGrcViAdsmfdL8NhR03s6jZVi2AP4A03XeBFShu2M4Jd88k1fNXDnpMEmHU6CvNJuMyA2z1maA0=s900-c-k-c0x00ffffff-no-rj" alt="Avatar" className="driver-avatar" />
                <span className="driver-name">{carpool.driver.firstname}</span>
              </div>
              <div className="seats"> 
                {Array.from({ length: 4 }).map((_, index) => (
                  <Users key={index} 
                  className={`passenger-icon ${index < carpool.num_passenger ? "available" : "unavailable"}`} />
                ))}
              </div>
                <div className="road-type">
                {carpool.type_of_road !== "National Road" && (
                      <span className="toll-icon">
                        <Landmark size={16} color="#f39c12" />
                      </span>
                    )}
                </div>
              </div>
              <div className="price">
                <span className="price-value">{carpool.price}</span>
                <span className="price-icon">
                  <BadgeEuro size={16} />
                </span>
              </div>
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

