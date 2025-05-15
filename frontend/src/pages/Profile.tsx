import "../styles/profile.scss";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER_INFO,
  GET_CAR_BRANDS,
  GET_CAR_COLORS,
  GET_CAR_YEARS,
} from "../graphql/queries";
import { UPDATE_CAR_INFOS } from "../graphql/mutations";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_USER_INFO);
  const { data: brandsData } = useQuery<{ getCarBrands: string[] }>(
    GET_CAR_BRANDS
  );
  const { data: colorsData } = useQuery<{ getCarColors: string[] }>(
    GET_CAR_COLORS
  );
  const { data: yearsData } = useQuery<{ getCarYears: number[] }>(
    GET_CAR_YEARS
  );

  const [updateCarInfos] = useMutation(UPDATE_CAR_INFOS);

  const [editMode, setEditMode] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  const user = data?.getUserInfo;

  const handleValidate = async () => {
    try {
      await updateCarInfos({
        variables: {
          userId: user.id,
          brand: selectedBrand,
          year: parseInt(selectedYear),
          color: selectedColor,
        },
      });
      toast.success("Véhicule mis à jour avec succès");
      setEditMode(false);
      refetch();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const VehicleForm = () => (
    <div className="edit-vehicle-form">
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
      >
        <option value="">Choisir la marque</option>
        {brandsData?.getCarBrands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Choisir l'année</option>
        {yearsData?.getCarYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        <option value="">Choisir la couleur</option>
        {colorsData?.getCarColors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <button className="validate-btn" onClick={handleValidate}>
        Valider
      </button>
    </div>
  );

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
                <p className="infos-user">{user.email}</p>
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
              {user.car ? (
                <>
                  <div className="car-info-row">
                    <p>
                      <strong>Modèle :</strong> {user.car.brand}
                    </p>
                    <p>
                      <strong>Année :</strong> {user.car.year}
                    </p>
                    <p>
                      <strong>Couleur :</strong> {user.car.color}
                    </p>
                    <button
                      className="validate-btn"
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? "Annuler" : "Modifier"}
                    </button>
                  </div>
                  {editMode && <VehicleForm />}
                </>
              ) : (
                <>
                  <p>Vous n'avez pas renseigné de véhicule.</p>
                  {!editMode && (
                    <button
                      className="validate-btn"
                      onClick={() => setEditMode(true)}
                    >
                      Ajouter une voiture
                    </button>
                  )}
                  {editMode && <VehicleForm />}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Vous n'êtes pas connecté.</p>
      )}
    </div>
  );
};

export default Profile;
