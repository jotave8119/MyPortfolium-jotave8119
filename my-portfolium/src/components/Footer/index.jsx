import "./style.css";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-scroll";

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
          <span className="showUp">@joaovitor_ts13</span>
        </a>
        <a
          href="https://github.com/jotave8119"
          target="_blank"
          rel="noreferrer noopener"
          className="gthub"
        >
          <BsGithub size={37} />
          <span className="showUp">jotave8119</span>
        </a>
        <a
          href="https://www.linkedin.com/in/joaoteixeira13/"
          target="_blank"
          rel="noreferrer noopener"
          className="lin"
        >
          <FaLinkedinIn size={35}/>
          <span className="showUp">João Teixeira</span>
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
        Voltar ao Início
      </Link>
      <span className="copy">
        João Teixeira 2023 <AiFillCopyrightCircle size={15} />
      </span>
    </footer>
  );
};

export default Footer;
