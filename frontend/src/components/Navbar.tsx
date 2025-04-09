import "../styles/navbar.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import Burger from "./responsive/Burger";
import Dropdown from "./Dropdown";
import {
  useGetUserInfoQuery,
  useLogoutMutation,
} from "../generated/graphql-types";

export default function Navbar() {
  const [isActive, setIsActive] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { data, refetch } = useGetUserInfoQuery();
  const [logout] = useLogoutMutation();

  const isLoggedIn = data?.getUserInfo?.isLoggedIn;

  const handleLogout = async () => {
    await logout();
    await refetch();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (url: string) => {
    setIsActive(url);
  };

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {windowWidth < 885 ? (
        <Burger isActive={isActive} handleClick={handleClick} />
      ) : (
        <div className="navbar-container closed">
          <div className="navbar-left">
            <Link
              onClick={() => handleClick("search")}
              to="/search-page"
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
              to="/myreservations/1"
              className={`navbar-link ${isActive === "my-resa" && "is-active"}`}
            >
              Mes réservations
            </Link>
            <Link
              onClick={() => handleClick("my-trips")}
              to="/mytrips/1"
              className={`navbar-link ${
                isActive === "my-trips" && "is-active"
              }`}
            >
              Mes Grumpy Trips
            </Link>
          </div>
          <div className="navbar-right">
            {windowWidth < 1025 && windowWidth > 884 ? (
              <Dropdown
                isActive={isActive}
                handleClick={handleClick}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
            ) : (
              <>
                {!isLoggedIn ? (
                  <>
                    <Link
                      onClick={() => handleClick("connexion")}
                      to="/login"
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
                      className={`navbar-link ${
                        isActive === "account" && "is-active"
                      }`}
                    >
                      Mon compte
                    </Link>
                    <button
                      className="navbar-link logout-button"
                      onClick={handleLogout}
                    >
                      Déconnexion
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}