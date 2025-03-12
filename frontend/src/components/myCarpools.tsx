import { useGetCarpoolsByUserIdQuery } from "../generated/graphql-types"; // Adjust the import based on where the generated file is located.
import { useParams } from "react-router-dom";

const SearchCarpoolByUser = () => {
const { id } = useParams<{ id: string }>(); // Get the userId from the URL

  const { data, loading, error } = useGetCarpoolsByUserIdQuery({
    variables: { userId: id ? parseFloat(id) : 0 },
    skip: !id, // Skip the query if the userId is not provided
  });

  if (loading) return <div className="loading-message">Chargement...</div>;
  if (error) return <div className="error-message">Erreur : {error.message}</div>;

  return (
    <div>
    <h2>Mes grumpy trips à venir </h2>
    {data && data.getCarpoolsByUserId.length > 0 ? (
      <ul>
        {data.getCarpoolsByUserId.map((carpool) => (
          <li key={carpool.id}>
            {carpool.departure_date} à {carpool.departure_time} | {carpool.arrival_city} | {carpool.price}€
            <br />
            Conducteur: {carpool.driver.firstname}
            <br />
            Type de route: {carpool.type_of_road} {/* Display type_of_road */}
            <br />
            Nombre de places: {carpool.num_passenger} {/* Display the number of places */}
          </li>
        ))}
      </ul>
    ) : (
      <p>Aucun covoiturage trouvé pour cet utilisateur.</p>
    )}
  </div>
);
};

export default SearchCarpoolByUser;

