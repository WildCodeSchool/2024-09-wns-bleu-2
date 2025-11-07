import "../styles/homepage.scss";
import { MessageCircleOff, CigaretteOff, Cat } from "lucide-react";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";
import { useSearch } from "../contexts/SearchContext";

const Home = () => {
  const {
    departure,
    arrival,
    date,
    passengers,
    departureTime,
    setDeparture,
    setArrival,
    setDate,
    setPassengers,
    setDepartureTime,
    handleSearch,
  } = useSearch();

  return (
    <>
      <div className="homepage-first-content">
        <h1 className="home-title">Réservez votre trajet dès maintenant !</h1>
        <img
          src="/newheader.png"
          alt="Image en homepage"
          className="background-image"
        />
      </div>
      <SearchBar
        departure={departure}
        arrival={arrival}
        date={date}
        passengers={passengers}
        showKm={false}
        onDepartureChange={(e) => setDeparture(e.target.value)}
        onArrivalChange={(e) => setArrival(e.target.value)}
        onDateChange={setDate}
        onPassengersChange={(e) => setPassengers(Number(e.target.value))}
        departureTime={departureTime}
        onTimeChange={setDepartureTime}
        onSearch={() => handleSearch(true)}
      />
      <div className="homepage-second-content">
        <h2 className="title-second-content">
          Besoin de voyager sans être dérangé ?
        </h2>
        <h3 className="subtitle-second-content">
          Avec Grumpy Car, nous avons LA solution !
        </h3>

        <div className="homepage-container-desktop">
          <div className="content-p">
            <MessageCircleOff size={36} color="#000000" />
            <p className="text-second-content">
              Vous ne voulez discuter ? Cochez tout simplement l'option "Ne pas
              discuter" lors de votre réservation, Nos conducteurs se feront un
              plaisir de ne pas vous embêter !
            </p>
          </div>
          <div className="content-p">
            <CigaretteOff size={36} color="#000000" />
            <p className="text-second-content">
              Vous n'êtes pas fumeur ? Ce n'est pas un soucis, recherchez
              directement un conducteur qui ne vous rendra pas Grumpy suite à de
              mauvaises odeurs...
            </p>
          </div>
          <div className="content-p">
            <Cat size={36} color="#000000" />
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
    </>
  );
};

export default Home;
