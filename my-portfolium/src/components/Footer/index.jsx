import "./style.css";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-scroll";
import { i18n } from "../../translate/i18n";
import profileInsta from "../../assets/profileInsta.jpeg";
import gitProfile from "../../assets/gitProfile.jpeg";
import profileLinkedin from "../../assets/profileLinkedin.png";

const Footer = () => {
  return (
    <footer className="footBox">
      <div className="social">
        <a
          href="https://www.instagram.com/joaovitor_ts13/"
          target="_blank"
          rel="noreferrer noopener"
          className="insta"
        >
          <AiFillInstagram size={40}/>
          <span className="showUp">@joaovitor_ts13 <img className="footImgInsta" src={profileInsta} alt="joão"/></span>
        </a>
        <a
          href="https://github.com/jotave8119"
          target="_blank"
          rel="noreferrer noopener"
          className="gthub"
        >
          <BsGithub size={37} />
          <span className="showUp">jotave8119 <img className="footImg" src={gitProfile} alt="joão"/></span>
        </a>
        <a
          href="https://www.linkedin.com/in/joaoteixeira13/"
          target="_blank"
          rel="noreferrer noopener"
          className="lin"
        >
          <FaLinkedinIn size={35}/>
          <span className="showUp">João Teixeira <img className="footImg" src={profileLinkedin} alt="joão"/></span>
        </a>
      </div>
      <Link
        className="toTop"
        to="banner"
        spy={true}
        smooth={true}
        offset={50}
        duration={1000}
        title="Voltar para o Topo"
      >
        {i18n.t("titles.Footer")}
      </Link>
      <span className="copy">
        João Teixeira 2023 <AiFillCopyrightCircle size={15} />
      </span>
    </footer>
  );
};

export default Footer;
