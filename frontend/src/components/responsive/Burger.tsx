import { Spin as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  useGetUserInfoQuery,
  useLogoutMutation,
} from "../../generated/graphql-types";

export default function Burger({
  isActive,
  handleClick,
  setIsLoginModalOpen,
}: {
  isActive: string;
  handleClick: (section: string) => void;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, refetch } = useGetUserInfoQuery();
  const [logout] = useLogoutMutation();

  const isLoggedIn = data?.getUserInfo?.isLoggedIn;

  const handleLogout = async () => {
    await logout();
    await refetch();
  };
  const { data: userData } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo?.id;

  return (
    <>
      <Hamburger rounded toggled={isOpen} toggle={setIsOpen} />
      {isOpen && (
        <div className="navbar-container burger ">
          <div className="navbar-left">
            <Link
              onClick={() => handleClick("search")}
              to="/"
              className={`navbar-link ${isActive === "search" && "is-active"}`}
            >
              Rechercher
            </Link>
            <Link
              onClick={() => handleClick("publish")}
              to="/publish-route"
              className={`navbar-link ${isActive === "publish" && "is-active"}`}
            >
              Publier un Grumpy Trip
            </Link>
            <Link
              onClick={() => handleClick("my-resa")}
              to={`/myreservations/${userId}`}
              className={`navbar-link ${isActive === "my-resa" && "is-active"}`}
            >
              Mes réservations
            </Link>
            <Link
              onClick={() => handleClick("my-trips")}
              to={`/mytrips/${userId}`}
              className={`navbar-link ${
                isActive === "my-trips" && "is-active"
              }`}
            >
              Mes Grumpy Trips
            </Link>
          </div>
          <div className="navbar-right">
            {!isLoggedIn ? (
              <>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoginModalOpen(true);
                    setIsOpen(false);
                  }}
                  to="#"
                  className={`navbar-link ${
                    isActive === "connexion" && "is-active"
                  }`}
                >
                  Se connecter
                </Link>
                <Link
                  onClick={() => handleClick("register")}
                  to="/register"
                  className={`navbar-link ${
                    isActive === "register" && "is-active"
                  }`}
                  id="last-link"
                >
                  S'inscrire
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => handleClick("account")}
                  className={`navbar-link ${
                    isActive === "account" && "is-active"
                  }`}
                >
                  Mon compte
                </Link>
                <button
                  onClick={handleLogout}
                  className="navbar-link logout-button"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
