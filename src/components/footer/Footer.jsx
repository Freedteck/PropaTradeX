// import { Github } from "lucide-react";
import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <section className={styles.footer}>
        <Link to={"/"} className={styles.logo}>
          <img src={logo} alt="logo" width={28} />
          PropaTradeX
        </Link>
        <p> © 2024 PropaTradeX. All rights reserved.</p>
      </section>
      {/* <a href="">
        <Github size={24} />
      </a> */}
    </footer>
  );
};

export default Footer;
