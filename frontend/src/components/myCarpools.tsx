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

  return (
    <div className="carpool-list-container">
    <h2>Mes grumpy trips à venir </h2>
    {data && data.getCarpoolsByUserId.length > 0 ? (
      <div>
      {data.getCarpoolsByUserId.map((carpool) => (
        <div key={carpool.id} className="carpool-item">
          <div className="carpool-header">
            {carpool.departure_date} à {carpool.departure_time} |{" "}
            {carpool.arrival_city} | {carpool.price}€
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

