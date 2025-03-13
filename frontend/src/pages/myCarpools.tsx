import { useGetCarpoolsByUserIdQuery } from "../generated/graphql-types"; // Adjust the import based on where the generated file is located.
import { useParams } from "react-router-dom";
import "../styles/mycarpools.scss"; // Import your SCSS file
import TripCart from '../components/TripCard';  // Importing the TripCart component

const SearchCarpoolByUser = () => {
    const { id } = useParams<{ id: string }>(); // Get the userId from the URL
  
    const { data, loading, error } = useGetCarpoolsByUserIdQuery({
      variables: { userId: id ? parseFloat(id) : 0 },
      skip: !id, // Skip the query if the userId is not provided
    });
  
    if (loading) return <div className="loading-message">Chargement...</div>;
    if (error) return <div className="error-message">Erreur : {error.message}</div>;
  
    // Make sure data exists and is an array
    const carpools = data?.getCarpoolsByUserId || [];
  
    return (
        <div className="carpool-list-container">
          <h2>Mes grumpy trips à venir</h2>
          <div className="carpool-main">
            {carpools.length > 0 ? (
              carpools.map((carpool) => (
                <TripCart key={carpool.id} carpool={carpool} />
              ))
            ) : (
              <div className="no-carpools">Aucune voiture trouvée</div>
            )}
          </div>
        </div>
      );
    };
    
  
  export default SearchCarpoolByUser;