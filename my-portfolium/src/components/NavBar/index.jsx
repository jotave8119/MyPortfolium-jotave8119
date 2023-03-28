import "./style.css";
import { useState } from "react";
import profile from "../../assets/profile.png";
import { Link } from "react-scroll";
import { i18n }from "../../translate/i18n";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const I18N_STORAGE_KEY = "i18nextLng";
  const [language] = useState(localStorage.getItem(I18N_STORAGE_KEY));

  const handleSelect = (event) => {
    window.localStorage.setItem(I18N_STORAGE_KEY, event.target.value);
    window.location = window.location;
  };

  return (
    <div className="Navbar">
      <div className="photoBox">
        <img className="photo" title="João" src={profile} alt="João" />
        <h2 className="name">João</h2>
      </div>
      <div className={`nav-items ${isOpen && "open"}`}>
        <select className="select" onChange={handleSelect} value={language}>
          <option value="pt-BR">Pt-BR</option>
          <option value="en-US">En-US</option>
        </select>
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={50}
          duration={1000}
          title="Sobre"
          className="link"
          onClick={() => setIsOpen(!isOpen)}
        >
          {i18n.t("titles.NavBar")}
        </Link>
        <Link
          to="projects"
          spy={true}
          smooth={true}
          offset={50}
          duration={1000}
          title="Projetos"
          className="link"
          onClick={() => setIsOpen(!isOpen)}
        >
          {i18n.t("titles.NavBar1")}
        </Link>
        <Link
          to="techs"
          spy={true}
          smooth={true}
          offset={50}
          duration={1000}
          title="Tecnologias"
          className="link"
          onClick={() => setIsOpen(!isOpen)}
        >
         {i18n.t("titles.NavBar2")}
        </Link>
        <Link
          to="contact"
          spy={true}
          smooth={true}
          offset={50}
          duration={1000}
          title="Contato"
          className="link"
          onClick={() => setIsOpen(!isOpen)}
        >
          {i18n.t("titles.NavBar3")}
        </Link>
        <Link
          to="cv"
          spy={true}
          smooth={true}
          offset={50}
          duration={1000}
          title="Currículo"
          className="link"
          onClick={() => setIsOpen(!isOpen)}
        >
          {i18n.t("titles.NavBar4")}
        </Link>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default NavBar;
