import useEmblaCarousel from "embla-carousel-react";
import "../styles/carousel.scss";
import "../styles/trip-cards.scss";

import { useGetCarpoolsQuery } from "../generated/graphql-types";
import { separateTripsByDate } from "../utils/seperatedate.ts";
import { getUniqueTripsByCity, backgroundClasses } from "../utils/tripUtils";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false });

  const { data, loading, error } = useGetCarpoolsQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { sortedUpcomingTrips } = separateTripsByDate(data?.getCarpools ?? []);
  const uniqueTrips = getUniqueTripsByCity(sortedUpcomingTrips);

  const navigate = useNavigate();
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {uniqueTrips.map((carpool, index) => {
          const bgClass = backgroundClasses[index % backgroundClasses.length];
          return (
            <div
              key={carpool.id}
              className={`trip-card embla__slide ${bgClass}`}
            >
              <div className="trip-card-header">
                <div className="trip-card-cities">
                  <p className="city">{carpool.departure_city}</p>

                  <ArrowRight width={25} height={25} />
                  <p className="city">{carpool.arrival_city}</p>
                </div>
              </div>
              <div className="horizontal-line" />
              <div className="trip-card-bottom">
                <div className="trip-price">
                  <p>
                    Dès <span>{carpool.price}€</span>
                  </p>
                </div>
                <button
                  className="trip-booking animated"
                  onClick={() => navigate("/search-page")}
                >
                  <ChevronRight
                    className="animated"
                    width={20}
                    color="#BCC6AD"
                    strokeWidth={2.5}
                  />{" "}
                  Je réserve
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
