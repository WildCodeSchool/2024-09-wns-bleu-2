import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useModal } from "../contexts/ModalContext";

export default function Dropdown({
  isActive,
  handleClick,
  isLoggedIn,
  handleLogout,
}: {
  isActive: string;
  handleClick: (action: string) => void; // Argument d'action : register, login ...
  isLoggedIn: boolean | undefined;
  handleLogout: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { setIsLoginModalOpen } = useModal();
  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Mon compte <ChevronDown size={18} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {!isLoggedIn ? (
            <>
              <Link
                to="#"
                onClick={() => {
                  handleClick("login");
                  setIsOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className={`dropdown-item ${
                  isActive === "login" && "is-active absolute"
                }`}
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                onClick={() => {
                  handleClick("register");
                  setIsOpen(false);
                }}
                className={`dropdown-item ${
                  isActive === "register" && "is-active absolute"
                }`}
              >
                S'inscrire
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => {
                  handleClick("account");
                  setIsOpen(false);
                }}
                className={`dropdown-item ${
                  isActive === "account" && "is-active absolute"
                }`}
              >
                Mon profil
              </Link>
              <button
                className="dropdown-item logout-button logout-button-dropdown"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
