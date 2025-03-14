import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/publishRoute.scss";


const PublishRoute = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="publish-route">
      <h1>Publier une Route</h1>
      <SearchBar
        departure={departure}
        arrival={arrival}
        date={date}
        passengers={passengers}
        onDepartureChange={(e) => setDeparture(e.target.value)}
        onArrivalChange={(e) => setArrival(e.target.value)}
        onDateChange={setDate}
        onPassengersChange={(e) => setPassengers(Number(e.target.value))}
      />
    </div>
  );
};

export default PublishRoute;