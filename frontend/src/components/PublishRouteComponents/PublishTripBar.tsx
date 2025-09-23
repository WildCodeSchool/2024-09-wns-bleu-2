import { useState } from "react";
import SearchBar from "../SearchBar";

type PublishTripBarProps = {};

const PublishTripBar: React.FC<PublishTripBarProps> = () => {
  // Local state
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [departureTime, setDepartureTime] = useState<Date | null>(null);

  return (
    <SearchBar
      departure={departure}
      arrival={arrival}
      date={date}
      passengers={passengers}
      departureTime={departureTime}
      onDepartureChange={(e) => setDeparture(e.target.value)}
      onArrivalChange={(e) => setArrival(e.target.value)}
      onDateChange={setDate}
      onPassengersChange={(e) => setPassengers(Number(e.target.value))}
      onTimeChange={setDepartureTime}
    />
  );
};

export default PublishTripBar;