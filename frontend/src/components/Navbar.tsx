import "../styles/navbar.scss";
import "../styles/dropdown.scss";
import { Link } from "react-router-dom";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Logo from "./Logo";
import Burger from "./responsive/Burger";
import Dropdown from "./Dropdown";
import {
  useGetUserInfoQuery,
  useLogoutMutation,
} from "../generated/graphql-types";
import { useModal } from "../contexts/ModalContext";
import { is } from "date-fns/locale";

export default function Navbar() {
  const [isActive, setIsActive] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { setIsLoginModalOpen } = useModal();

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

  const { data: userData } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo?.id;
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
              {isLoggedIn ? "Rechercher" : "Rechercher un Grumpy Trip"}
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  onClick={() => handleClick("publish")}
                  to="/publish-route"
                  className={`navbar-link ${
                    isActive === "publish" && "is-active"
                  }`}
                >
                  Publier un Grumpy Trip
                </Link>
                <Link
                  onClick={() => handleClick("my-resa")}
                  to={`/myreservations/${userId}`} // Dynamically setting the user ID in the URL
                  className={`navbar-link ${
                    isActive === "my-resa" && "is-active"
                  }`}
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
              </>
            )}
          </div>
          <div className="navbar-right">
            {(windowWidth < 1025 && windowWidth > 884) || isLoggedIn ? (
              <Dropdown
                isActive={isActive}
                handleClick={handleClick}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
            ) : (
              <>
                <Link
                  onClick={() => {
                    handleClick("connexion");
                    setIsLoginModalOpen(true);
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
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
