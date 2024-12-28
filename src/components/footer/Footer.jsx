// import { Github } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <section className={styles.footer}>
        <h1 className={styles.logo}>PropaTradeX</h1>
        <p> © 2024 PropaTradeX. All rights reserved.</p>
      </section>
      {/* <a href="">
        <Github size={24} />
      </a> */}
    </footer>
  );
};

export default Footer;
