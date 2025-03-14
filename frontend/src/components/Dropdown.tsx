import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

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
        Mon compte <ChevronDown size={18} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <Link
            to="/login"
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
            to="/register"
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
