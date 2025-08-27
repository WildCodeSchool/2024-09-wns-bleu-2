import { useState } from "react";
import "../styles/publish-route.scss";
import PublishTripBar from "../components/PublishRouteComponents/PublishTripBar";
import {
  useCreateCarpoolMutation,
  useGetCitiesQuery,
  useGetUserInfoQuery,
} from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
import PriceSelector from "../components/PublishRouteComponents/PriceSelector";
import TripPreferences from "../components/PublishRouteComponents/TipsPreferences";
import { ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../utils/format.utils";

const PublishRoute = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [price, setPrice] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [departureTime, setDepartureTime] = useState<Date | null>(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [createCarpool] = useCreateCarpoolMutation();

  const {
    data: cityData,
    loading: loadingCities,
    error: errorCities,
  } = useGetCitiesQuery();

  const { data: userData } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo?.id;

  const handleDeparture = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setDeparture(e.target.value);

  const handleArrival = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setArrival(e.target.value);

  const handleDate = (date: Date) => setDate(date);

  const handlePassengers = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPassengers(Number(e.target.value));

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setHours(Number(e.target.value));

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setMinutes(Number(e.target.value));

  const handlePublish = () => {
    if (!departure || !arrival || !price || passengers <= 0 || !date) {
      toast.warning("Merci de remplir tous les champs !");
      return;
    }

    const departure_date = formatDate(date);
    const departure_time = formatTime(departureTime);

    const toll = options.includes("Autoroute");
    const duration = hours * 60 + minutes;

    if (!userId) {
      toast.error("Vous devez être connecté pour publier un trajet.");
      return;
    }

    createCarpool({
      variables: {
        data: {
          departure_city: departure,
          arrival_city: arrival,
          departure_date,
          departure_time,
          num_passenger: passengers,
          price,
          toll,
          duration,
          options,
          driver_id: userId,
        },
      },
      onCompleted: () => {
        toast.success("Trajet bien publié !");
        setTimeout(() => {
          navigate("/mytrips/:id");
        }, 500);
      },
      onError: (error) => {
        console.error("Erreur de publication :", error.message);
      },
    });
    console.log("Données envoyées :", {
      departure,
      arrival,
      departure_date,
      departure_time,
      duration,
      passengers,
      price,
      options,
      toll,
    });
  };

  return (
    <div className="publish-route">
      <h1>Proposez votre Grumpy Trip</h1>
      <PublishTripBar
        departure={departure}
        arrival={arrival}
        date={date}
        passengers={passengers}
        departureTime={departureTime}
        onDepartureChange={handleDeparture}
        onArrivalChange={handleArrival}
        onDateChange={handleDate}
        onTimeChange={setDepartureTime}
        onPassengersChange={handlePassengers}
        hours={hours}
        minutes={minutes}
        onHourChange={handleHourChange}
        onMinuteChange={handleMinuteChange}
        cityData={cityData?.getCities || []}
        loadingCities={loadingCities}
        errorCities={!!errorCities}
      />

      <PriceSelector price={price} setPrice={setPrice} />

      <TripPreferences options={options} setOptions={setOptions} />

      <button type="button" className="submit-button" onClick={handlePublish}>
        <ChevronRight size={30} />
        Publier mon trajet
      </button>
    </div>
  );
};

export default PublishRoute;
