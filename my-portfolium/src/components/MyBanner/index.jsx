import TypeWriterEffect from "react-typewriter-effect";
import profile from "../../assets/profile.png";
import "./style.css";

const MyBanner = () => {
  return (
    <section className="bannerBox">
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
            "Olá!",
            "Sou João Teixeira!",
            "Dev Front End!",
            "Bem-vindo(a)!",
          ]}
          multiTextDelay={1000}
          typeSpeed={40}
          multiTextLoop
        />
      </h1>
      <img className="profileImg" loading="lazy" src={profile} alt="João" />
    </section>
  );
};

export default MyBanner;
