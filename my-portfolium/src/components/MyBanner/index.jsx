import TypeWriterEffect from "react-typewriter-effect";
import jvphoto from "../../assets/jvphoto.png";
import "./style.css";
import { i18n } from "../../translate/i18n";

const MyBanner = () => {
  return (
    <section className="bannerBox" id="banner">
      <h1 className="apresentation">
        <TypeWriterEffect
          textStyle={{
            fontFamily: "inter",
            color: "#ffffff",
            fontWeight: 700,
          }}
          startDelay={1000}
          cursorColor="#ffffff"
          multiText={[
            i18n.t("titles.MyBanner"),
            i18n.t("titles.MyBanner1"),
            i18n.t("titles.MyBanner2"),
            i18n.t("titles.MyBanner3"),
          ]}
          multiTextDelay={1000}
          typeSpeed={40}
          multiTextLoop
        />
      </h1>
      <img className="profileImg" loading="lazy" src={jvphoto} alt="João" />
    </section>
  );
};

export default MyBanner;
