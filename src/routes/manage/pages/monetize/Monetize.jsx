import styles from "./Monetize.module.css";

const Monetize = () => {
  return (
    <form className={styles.monetize}>
      <fieldset className={styles.fieldset}>
        <legend>Monetize your content</legend>

        <label htmlFor="price" className={styles.choice}>
          Price
          <input type="number" id="price" name="price" />
        </label>

        <label htmlFor="currency">
          Currency
          <select id="currency" name="currency">
            <option value="RLC">RLC</option>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
          </select>
        </label>

        <label htmlFor="paymentMethod">
          Payment Method
          <select id="paymentMethod" name="paymentMethod">
            <option value="stripe">Stripe</option>
            <option value="paypal">Paypal</option>
            <option value="wallet">Wallet</option>
          </select>
        </label>

        <button type="submit">Monetize</button>
      </fieldset>
    </form>
  );
};

export default Monetize;
