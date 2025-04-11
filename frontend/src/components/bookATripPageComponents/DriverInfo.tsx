import { Carpool } from "../../generated/graphql-types";
import defaultAvatar from "/default-avatar.png";
import { Cigarette, PawPrint, Music, Car } from "lucide-react";
import "../../styles/driver-info.scss";

type DriverInfoProps = {
  carpool: Carpool;
};

const DriverInfo: React.FC<DriverInfoProps> = ({ carpool }) => {
  const { driver, options } = carpool;

  const avatarSrc =
    driver.avatar && driver.avatar !== "null" ? driver.avatar : defaultAvatar;

  const preferenceOptions = [
    {
      label: "Les fumeurs ne me dérangent pas",
      value: "Fumeur",
      icon: <Cigarette width={20} />,
    },
    {
      label: "Je préfère ne pas voyager en compagnie d’animaux",
      value: "Animaux",
      icon: <PawPrint width={20} />,
    },
    {
      label: "Musique dans la voiture",
      value: "Musique",
      icon: <Music width={20} />,
    },
  ];

  return (
    <div className="driver-info">
      <div className="driver-header">
        <img id="default-img" src={avatarSrc} alt="Avatar du conducteur" />
        <div className="driver-infos">
          <p>{driver.firstname}</p>
        </div>
      </div>

      <ul className="preferences">
        {preferenceOptions.map(
          (opt) =>
            options.includes(opt.value) && (
              <li key={opt.value}>
                {opt.icon} {opt.label}
              </li>
            )
        )}
      </ul>

      {driver.car && (
        <div className="driver-car">
          <Car size={20} />
          <p>
            {driver.car.brand} – {driver.car.color}
          </p>
        </div>
      )}
    </div>
  );
};

export default DriverInfo;
