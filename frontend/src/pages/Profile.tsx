import "../styles/profile.scss";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../graphql/queries";
import { Pencil } from "lucide-react";

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  const user = data?.getUserInfo;

  return (
    <div className="principal-profile-container">
      {user?.isLoggedIn ? (
        <div className="second-profile-container">
          <h1>
            Bienvenue {user.firstname} {user.lastname}
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
                <p className="infos-user">{user.lastname}</p>
              </div>
              <div className="sous-infos">
                <p className="number">2</p>
                <p className="infos-user">{user.firstname}</p>
              </div>
              <div className="sous-infos">
                <p className="number">3</p>
                <p>{new Date(user.birthdate).toLocaleDateString()}</p>
              </div>
              <div className="sous-infos">
                <p className="number">4</p>
                <p>{user.gender}</p>
              </div>
              <div className="sous-infos">
                <p className="number">5</p>
                <p className="infos-user">
                  {user.email} <Pencil size={16} className="edit-icon" />
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
            {user.car ? (
              <div className="vehicle-form">
                <input
                  type="text"
                  placeholder="Modèle"
                  defaultValue={user.car.brand || ""}
                />
                <input
                  type="text"
                  placeholder="Année"
                  defaultValue={user.car.year || ""}
                />
                <input
                  type="text"
                  placeholder="Couleur"
                  defaultValue={user.car.color || ""}
                />
                <button className="validate-btn">Valider</button>
              </div>
            ) : (
              <>
                <p>Vous n'avez pas rempli d'information sur votre véhicule.</p>
                <div className="vehicle-form">
                  <input type="text" placeholder="Modèle" />
                  <input type="text" placeholder="Année" />
                  <input type="text" placeholder="Couleur" />
                  <button className="validate-btn">Valider</button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Vous n'êtes pas connecté.</p>
      )}
    </div>
  );
};

export default Profile;
