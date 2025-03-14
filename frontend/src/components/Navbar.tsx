import "../styles/navbar.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import Burger from "./responsive/Burger";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const [isActive, setIsActive] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  ////to dynamicaly get the window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]);

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
      {/* 885 for galaxy Fold (===884px) */}
      {windowWidth < 885 ? (
        <Burger isActive={isActive} handleClick={handleClick} />
      ) : (
        <div className="navbar-container closed">
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
              to="/"
              className={`navbar-link ${isActive === "publish" && "is-active"}`}
            >
              Publier un Grumpy Trip
            </Link>
            <Link
              onClick={() => handleClick("my-resa")}
              to="/"
              className={`navbar-link ${isActive === "my-resa" && "is-active"}`}
            >
              Mes réservations
            </Link>
            <Link
              onClick={() => handleClick("my-trips")}
              to="/"
              className={`navbar-link ${
                isActive === "my-trips" && "is-active"
              }`}
            >
              Mes Grumpy Trips
            </Link>
          </div>
          <div className="navbar-right">
            {/* TODO edit when logged */}
            {windowWidth < 1025 && windowWidth > 884 ? (
              <Dropdown isActive={isActive} handleClick={handleClick} />
            ) : (
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
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
