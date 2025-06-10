import "../styles/homepage.scss";
import { MessageCircleOff, CigaretteOff, Cat } from "lucide-react";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div className="container-principal">
      <div className="homepage-first-content">
        <h1 className="home-title">Réservez votre trajet dès maintenant !</h1>
        <img
          src="/homepage_cat.webp"
          alt="Image en homepage"
          className="background-image"
        />
      </div>
      <div className="homepage-second-content">
        <h2 className="title-second-content">
          Besoin de voyager sans être dérangé ?
        </h2>
        <h3 className="subtitle-second-content">
          Avec Grumpy Car, nous avons LA solution !
        </h3>
        <div className="homepage-container-desktop">
          <div className="content-p">
            <MessageCircleOff size={36} color="#ffffff" />
            <p className="text-second-content">
              Vous ne voulez discuter ? Cochez tout simplement l'option "Ne pas
              discuter" lors de votre réservation, Nos conducteurs se feront un
              plaisir de ne pas vous embêter !
            </p>
          </div>
          <div className="content-p">
            <CigaretteOff size={36} color="#ffffff" />
            <p className="text-second-content">
              Vous n'êtes pas fumeur ? Ce n'est pas un soucis, recherchez
              directement un conducteur qui ne vous rendra pas Grumpy suite à de
              mauvaises odeurs...
            </p>
          </div>
          <div className="content-p">
            <Cat size={36} color="#ffffff" />
            <p className="text-second-content">
              Vous adorez les animaux et vous ne vous sentez pas de partir en
              voyage sans votre petite boule de poil ? N'attendez plus et
              réservez le covoiturage parfait pour vous !
            </p>
          </div>
        </div>
      </div>
      <div className="homepage-third-content">
        <h2 className="title-third-content">
          Psst... découvre ici les trajets les plus récents !
        </h2>
        <p className="text-third-content">
          Peut-être que tu trouveras directement ton GrumpyCar préféré !
        </p>
        <Carousel />
      </div>
    </div>
  );
};

export default Home;
