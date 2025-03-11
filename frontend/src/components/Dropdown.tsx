import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dropdown({
  isActive,
  handleClick,
}: {
  isActive: string;
  handleClick: (section: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Mon compte{" "}
        <svg
          width="18"
          height="19"
          viewBox="0 0 26 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect
            x="0.308472"
            y="0.445068"
            width="25.0597"
            height="17.5995"
            fill="url(#pattern0_30_1031)"
          />
          <defs>
            <pattern
              id="pattern0_30_1031"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_30_1031"
                transform="matrix(0.011705 0 0 0.0166667 0.148849 0)"
              />
            </pattern>
            <image
              id="image0_30_1031"
              width="60"
              height="60"
              preserveAspectRatio="none"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA40lEQVR4nO3Y7QrCIBiG4bszrFjsRx19ERR9nMCCReAgwmil01d7LthffW+EgYKIiIiIiIiIyD9aAWdgD8yxZwEcgCvQhi42A05A774uxqIRtW6mYb6LmznI8WlBS9Gvsb2bNdjSs3DuaF9s52aNovFscAM25Pmn+GZZx96oMRCdLNZCdPLYnNHZYnNEZ49NGW0mNkW0udgpo83GThFtPjZmdDGxMaKLiw2JLjb2l+jiY7+JriZ2THR1sZ/urtbu2JOfdHUnOza6yth30VXHDh5PvTtga/TZV0RERERERESEstwBDz/tLnlfvSoAAAAASUVORK5CYII="
            />
          </defs>
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <Link
            to="/"
            onClick={() => {
              handleClick("connexion");
              setIsOpen(!isOpen);
            }}
            className={`dropdown-item ${
              isActive === "connexion" && "is-active absolute"
            }`}
          >
            Se connecter
          </Link>
          <Link
            to="/"
            onClick={() => {
              handleClick("register");
              setIsOpen(!isOpen);
            }}
            className={`dropdown-item ${
              isActive === "register" && "is-active absolute"
            }`}
          >
            S'inscrire
          </Link>
        </div>
      )}
    </div>
  );
}
