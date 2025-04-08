import { CircleMinus, CirclePlus } from "lucide-react";
import "../../styles/price-selector.scss";

type PriceSelectorProps = {
  price: number;
  setPrice: (Value: number) => void;
};

const PriceSelector: React.FC<PriceSelectorProps> = ({ price, setPrice }) => {
  const MIN_PRICE = 1;
  const MAX_PRICE = 1000;

  const increasePrice = () => {
    if (price < MAX_PRICE) {
      setPrice(price + 1);
    }
  };

  const decreasePrice = () => {
    if (price > MIN_PRICE) {
      setPrice(price - 1);
    }
  };

  return (
    <div className="price-container">
      <h1>Fixez votre prix par place</h1>

      <div className="price-box">
        <div className="price-selector">
          <button
            type="button"
            onClick={decreasePrice}
            aria-label="Réduire le prix"
          >
            <CircleMinus size={28} style={{ color: "#fff" }} />
          </button>

          <span
            className="price-value"
            aria-live="polite"
            data-testid="price-value"
          >
            {price} €
          </span>

          <button
            type="button"
            onClick={increasePrice}
            aria-label="Augmenter le prix"
          >
            <CirclePlus size={28} color="#ffffff" />
          </button>
        </div>

        <div className="separator" />

        <div className="price-info">
          <p>
            <b>Prix conseillé :</b> 32 € – 36 €
          </p>
          <p className="tip">
            Le prix est idéal pour ce grumpy trip ! Vous allez avoir beaucoup de
            voyageurs en un rien de temps !
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceSelector;