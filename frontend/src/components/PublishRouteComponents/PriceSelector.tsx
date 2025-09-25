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
      <h2>Fixez votre prix par place</h2>

      <div className="price-box">
        <div className="price-selector">
          <button
            type="button"
            onClick={decreasePrice}
            aria-label="Réduire le prix"
            title="Réduire le prix"
          >
            <CircleMinus size={55} color="#ffffff" />
          </button>

          <div className="price-input-wrapper">
            <input
              type="text"
              value={isNaN(price) ? "" : `${price} €`}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/[^\d]/g, "");
                const val = Number(inputValue);
                if (val >= MIN_PRICE && val <= MAX_PRICE) {
                  setPrice(val);
                }
              }}
              onBlur={() => {
                if (!price || isNaN(price)) {
                  setPrice(MIN_PRICE);
                }
              }}
              aria-label="Prix par place"
              data-testid="price-value"
            />
          </div>

          <button
            type="button"
            onClick={increasePrice}
            aria-label="Augmenter le prix"
            title="Augmenter le prix"
          >
            <CirclePlus size={55} color="#ffffff" />
          </button>
        </div>

        <div className="price-info">
          <p>
            <strong>Prix conseillé :</strong> 32 € – 36 €
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