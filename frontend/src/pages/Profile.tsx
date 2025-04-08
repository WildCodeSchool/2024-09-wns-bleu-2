import "../styles/profile.scss";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../graphql/queries";
import { Pencil } from "lucide-react";

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <div className="principal-profile-container">
      {data?.getUserInfo?.isLoggedIn ? (
        <div className="second-profile-container">
          <h1>
            Bienvenue {data.getUserInfo.firstname} {data.getUserInfo.lastname}
          </h1>
          <div className="separator"></div>
          <div className="profile-content">
            <div className="avatar-container">
              <img src="/avatar.webp" alt="Avatar" className="avatar-user" />
              <p>Modifier</p>
            </div>
            <div className="infos-user-container">
              <div className="sous-infos">
                <p className="number">1</p>
                <p className="infos-user">{data.getUserInfo.lastname}</p>
              </div>
              <div className="sous-infos">
                <p className="number">2</p>
                <p className="infos-user">{data.getUserInfo.firstname}</p>
              </div>
              <div className="sous-infos">
                <p className="number">3</p>
                <p>
                  {new Date(data.getUserInfo.birthdate).toLocaleDateString()}
                </p>
              </div>
              <div className="sous-infos">
                <p className="number">4</p>
                <p>{data.getUserInfo.gender}</p>
              </div>
              <div className="sous-infos">
                <p className="number">5</p>
                <p className="infos-user">
                  {data.getUserInfo.email}{" "}
                  <Pencil size={16} className="edit-icon" />
                </p>
              </div>
              <div className="sous-infos">
                <p className="number">6</p>
                <p>
                  ************ <Pencil size={16} className="edit-icon" />
                </p>
              </div>
            </div>
          </div>

          <div className="vehicle-section">
            <h3>Mon véhicule</h3>
            <div className="vehicle-form">
              <input type="text" placeholder="Modèle" />
              <input type="text" placeholder="Année" />
            </div>
            <button className="validate-btn">Valider</button>
          </div>
        </div>
      ) : (
        <p>Vous n'êtes pas connecté.</p>
      )}
    </div>
  );
};

export default Profile;
