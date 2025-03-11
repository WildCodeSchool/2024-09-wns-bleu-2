import { Spin as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Burger({
  isActive,
  handleClick,
}: {
  isActive: string;
  handleClick: (section: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  /* useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]); */

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
            <Link
              onClick={() => handleClick("connexion")}
              to="/"
              className={`navbar-link ${
                isActive === "connexion" && "is-active"
              }`}
            >
              Se connecter
            </Link>
            <Link
              onClick={() => handleClick("register")}
              to="/"
              className={`navbar-link ${
                isActive === "register" && "is-active"
              }`}
              id="last-link"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
