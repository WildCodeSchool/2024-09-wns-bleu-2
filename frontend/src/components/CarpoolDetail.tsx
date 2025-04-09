import { useParams, useNavigate } from "react-router-dom";
import { useGetCarpoolByIdQuery } from "../generated/graphql-types";
import "../styles/carpoolDetails.scss";

const CarpoolDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Récupérer les détails du covoiturage
  const { data, loading, error } = useGetCarpoolByIdQuery({
    variables: { getCarpoolByIdId: parseFloat(id!) },
  });

  if (loading) return <div className="loading-message">Chargement...</div>;
  if (error)
    return <div className="error-message">Erreur : {error.message}</div>;

  const carpoolDetails = data?.getCarpoolById;

  return (
    <div className="carpool-container">
      <h2 className="carpool-title">Détails du Covoiturage {id}</h2>
      <section className="carpool-details">
        <div className="carpool-info">
          <p>
            <strong>Ville d'arrivée :</strong> {carpoolDetails?.arrival_city}
          </p>
          <p>
            <strong>Ville de départ :</strong> {carpoolDetails?.departure_city}
          </p>
          <p>
            <strong>Date de départ :</strong> {carpoolDetails?.departure_date}
          </p>
          <p>
            <strong>Heure de départ :</strong> {carpoolDetails?.departure_time}
          </p>
          <p>
            <strong>Nombre de passagers :</strong>{" "}
            {carpoolDetails?.num_passenger}
          </p>
          <p>
            <strong>Options :</strong> {carpoolDetails?.options}
          </p>
          <p>
            <strong>Prix :</strong> {carpoolDetails?.price} €
          </p>
          <p>
            <strong>Type de route :</strong> {carpoolDetails?.toll}
          </p>
        </div>

        <button className="button-primary" onClick={() => navigate("")}>
          Supprimer
        </button>
      </section>
    </div>
  );
};

export default CarpoolDetails;
