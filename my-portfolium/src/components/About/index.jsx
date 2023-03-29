import "./style.css";
import {i18n} from "../../translate/i18n";

const About = () => {
  return (
    <section className="aboutBox" id="about">
      <h2 className="aboutTitle" title="Um pouco sobre mim!">
        {i18n.t("titles.About")}
      </h2>
      <p
        className="aboutText"
        title="Leia com Carinho 🥰"
        data-aos="fade-right"
        data-aos-duration="2000"
      >
        {i18n.t("messages.About")}
      </p>
    </section>
  );
};

export default About;
