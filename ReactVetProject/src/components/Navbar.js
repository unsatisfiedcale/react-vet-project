import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Nav.css";
import logo from "../images/vetlogo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3>
        <img src={logo} alt="logo" />
      </h3>
      <nav ref={navRef}>
        <a href="/#" target="_blank">Ana Sayfa</a>
        <a href="/#" target="_blank">Hakkımızda</a>
        <a href="/#" target="_blank">Blog</a>
        <a href="/#" target="_blank">İletişim</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
      <a href="/signin" target="_blank" rel="noopener noreferrer">
      <button className="sign-btn">Kayıt Ol</button>
      </a>
      <a href="/login" target="_blank" rel="noopener noreferrer">
        <button className="login-btn">Giriş Yap</button>
      </a>
    </header>
  );
}

export default Navbar;
