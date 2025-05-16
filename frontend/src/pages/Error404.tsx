import { Link } from "react-router-dom";
import "../styles/Error404.scss";

const Error404 = () => {
  return (
    <div className="notfound-container">
      <div className="card-error">
        <h1>Error 404</h1>
        <p>Oups... Cette page n'existe pas.</p>
        <Link to="/">Retour à l'accueil</Link>
      </div>
    </div>
  );
};

export default Error404;
