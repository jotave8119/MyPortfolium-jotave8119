import "./style.css";
import { FaLinkedinIn } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import {GiClick} from "react-icons/gi";
import { i18n } from "../../translate/i18n";

const Contact = () => {
  return (
    <section className="contactBox" id="contact" data-aos="fade-in" data-aos-duration="1500">
      <h2 className="contactTitle">{i18n.t("titles.Contact")}</h2>
      <div className="socialBox">
        <a
          className="linkedinLink"
          href="https://www.linkedin.com/in/joaoteixeira13/"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="click"><GiClick size={30} /></span>
          <FaLinkedinIn size={60} className="linkedin" /> 
          {i18n.t("messages.Contact")}
        </a>
        <a
          className="githubLink"
          href="https://github.com/jotave8119"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="click"><GiClick size={30} /></span>
          <BsGithub size={70} className="github" /> 
          {i18n.t("messages.Contact1")}
        </a>
        <a
          className="gmailLink"
          href="mailto:teixeirajoaovitor0@gamil.com?subject=Vim pelo portfólio"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="click"><GiClick size={30} /></span>
          <SiGmail size={60} className="gmail" /> 
          {i18n.t("messages.Contact2")}
        </a>
      </div>
    </section>
  );
};

export default Contact;
