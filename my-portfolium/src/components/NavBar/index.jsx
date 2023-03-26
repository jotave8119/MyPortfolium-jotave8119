import "./style.css";
import { useState } from "react";
import profile from "../../assets/profile.png";
import { Link } from "react-scroll";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Navbar">
     <div className="photoBox">

      <img className="photo" title="João" src={profile} alt="João" />
      <h2 className="name">João</h2>
     </div>
      {/* <span className="nav-logo">DevLHB</span> */}
      <div className={`nav-items ${isOpen && "open"}`}>
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
          Sobre
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
          Projetos
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
          Tecnologias
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
          Contato
        </Link>
        <Link
          to="cv"
          spy={true}
          smooth={true}
          offset={50}
          duration={1000}
          title="Contato"
          className="link"
          onClick={() => setIsOpen(!isOpen)}
        >
          Currículo
        </Link>
      </div>

      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
    // <header>
    //   <div className="photoBox">
    //
    //     <h2 className="name">João</h2>
    //   </div>
    //   <nav className={`nav-items ${isOpen && "open"}`} ref={navRef}>

    // //     <button className="openBtn closeBtn" onClick={showNavbar}>
    // //       <FaTimes size={20} />
    // //     </button>
    // //   </nav>

    // //   <button className="openBtn" onClick={showNavbar}>
    // //     <FaBars size={20} />
    // //   </button>
    // // </header>
  );
};

export default NavBar;
