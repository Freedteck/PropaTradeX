import { useNavigate, useParams } from "react-router-dom";
import styles from "./Monetize.module.css";
import { useState } from "react";
import Button from "../../../../components/button/Button";
import useSetToRent from "../../../../hooks/useSetToRent";
import useSetForSale from "../../../../hooks/useSetForSale";
import { toast, ToastContainer } from "react-toastify";

const Monetize = () => {
  const { protectedDataAddress } = useParams();
  const [choice, setChoice] = useState("rent");
  const [isForRent, setIsForRent] = useState(true);
  const [isForSale, setIsForSale] = useState(false);
  const [priceInRLC, setPriceInRLC] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { onSubmitRent } = useSetToRent({
    protectedDataAddress,
    priceInRLC,
    durationInDays,
  });

  const { onSubmitSale } = useSetForSale({ protectedDataAddress, priceInRLC });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = toast.loading("Submitting ...", {
      position: "top-center",
    });
    if (isForRent) {
      await onSubmitRent();
      setIsLoading(false);
      toast.update(
        id,
        {
          render: "Property listed for rent",
          type: "success",
          isLoading: false,
        },
        {
          position: "top-center",
        }
      );

      navigate("/manage/properties");
    } else if (isForSale) {
      await onSubmitSale();
      setIsLoading(false);
      toast.update(
        id,
        {
          render: "Property listed for sale",
          type: "success",
          isLoading: false,
        },
        {
          position: "top-center",
        }
      );

      navigate("/manage/properties");
    } else {
      console.log(isForRent, isForSale);
    }
  };

  return (
    <>
      <ToastContainer />
      <form className={styles.monetize}>
        <fieldset className={styles.fieldset}>
          <h2>Monetize your content</h2>

          <div className={styles.choices}>
            <label className={styles.choice}>
              <input
                type="radio"
                name="choice"
                value="rent"
                checked={choice === "rent"}
                onChange={() => {
                  setChoice("rent");
                  setIsForRent(true);
                  setIsForSale(false);
                }}
              />
              <p>
                Rent
                <small>List Property for rent</small>
              </p>
            </label>
            <label className={styles.choice}>
              <input
                type="radio"
                name="choice"
                value="sale"
                checked={choice === "sale"}
                onChange={() => {
                  setChoice("sale");
                  setIsForSale(true);
                  setIsForRent(false);
                }}
              />
              <p>
                Sale
                <small>List Property for sale</small>
              </p>
            </label>
          </div>

          <label className={styles.inputLabel}>
            Price
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={priceInRLC}
                onChange={(e) => setPriceInRLC(e.target.value)}
                required
              />
              RLC
            </div>
          </label>
          {choice === "rent" && (
            <label className={styles.inputLabel}>
              Duration
              <div>
                <input
                  type="number"
                  name="duration"
                  placeholder="Days"
                  value={durationInDays}
                  onChange={(e) => setDurationInDays(e.target.value)}
                  required
                />
                Days
              </div>
            </label>
          )}

          {isLoading && <Button label={"Submitting ..."} btnClass="primary" />}
          {!isLoading && (
            <Button
              label="Confirm &rarr;"
              btnClass="primary"
              handleClick={handleSubmit}
            />
          )}
        </fieldset>
      </form>
    </>
  );
};

export default Monetize;
