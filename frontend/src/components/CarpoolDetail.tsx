import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CARPOOL_BY_ID } from "../graphql/queries";
import { useGetCarpoolByIdQuery } from "../generated/graphql-types";
//import { DELETE_CLOTHE_BY_ID } from "../graphql/mutations";


// Define the GraphQL query to fetch ad details by id



const CarpoolDetails = () => {
  const { id } = useParams(); // Get the id from the URL params
  const navigate = useNavigate(); // Initialize the navigate hook

  // Use Apollo Client's useQuery hook to fetch the ad details
  const { data, loading, error } = useGetCarpoolByIdQuery({
    variables: { getCarpoolByIdId: parseFloat(id!) },
  });

  // Apollo `useMutation` hook to delete an ad by its ID
  //const [deleteClotheById] = useMutation(DELETE_CLOTHE_BY_ID);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract ad details from the query result
  const carpoolDetails = data?.getCarpoolById;

  // Handle delete action
  /*const handleDelete = async () => {
    try {
      // Execute the delete mutation with the specified ad ID
    /*  const { data } = await deleteClotheById({
        variables: { idDelete: parseFloat(id!) },
      });

      // If deletion was successful, display a success message
      if (data.deleteClotheById) {
        alert("Ad deleted successfully!");
        navigate("/"); // Optionally redirect to the ads list after deletion
      } else {
        alert("Failed to delete the ad.");
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("Failed to delete the ad.");
    }
  };*/

  return (
    <div>
      <h2 className="carpool-details-title">
        Carpool Details {id}
      </h2>
      <section className="carpool-details">
        <div className="carpool-details-info">
          <p><strong>Arrival City:</strong> {carpoolDetails?.arrival_city}</p>
          <p><strong>Departure City:</strong> {carpoolDetails?.departure_city}</p>
          <p><strong>Departure Date:</strong> {carpoolDetails?.departure_date}</p>
          <p><strong>Departure Time:</strong> {carpoolDetails?.departure_time}</p>
          <p><strong>Number of Passengers:</strong> {carpoolDetails?.num_passenger}</p>
          <p><strong>Options:</strong> {carpoolDetails?.options}</p>
          <p><strong>Price:</strong> {carpoolDetails?.price} €</p>
          <p><strong>Type of Road:</strong> {carpoolDetails?.type_of_road}</p>

          <button
            className="button button-primary"
            onClick={() => navigate(`/carpool/modify/${id}`)} // Navigate to edit page
          >
            Modify Carpool
          </button>
        </div>
      </section>
    </div>
  );
};

export default CarpoolDetails;