import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import screendevducks from "../../assets/screendevducks.png";
import screendevhelp from "../../assets/screendevhelp.png";
import screenkenziehub from "../../assets/screenkenziehub.png";
import screenburguer from "../../assets/screenburguer.png";
import screennukenzie from "../../assets/screennukenzie.png";
import screenweather from "../../assets/screenweather.png";
import { i18n } from "../../translate/i18n";

const MyProjects = () => {
  return (
    <div className="proBox">
      <h2 className="proTitle" id="projects">
        {i18n.t("titles.MyProjects")}
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={{
          "--swiper-navigation-color": "#35baf8",
          "--swiper-pagination-color": "#35baf8",
          "--swiper-pagination-bullet-inactive-color":"#eee6e6"
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
        data-aos="fade-in" data-aos-duration="1500"
      >
        <SwiperSlide className="mySld">
          <a
            href="https://devducksjv.vercel.app/"
            target="_blank"
            title="Ver projeto"
            rel="noreferrer noopener"
          >
            <img
              src={screendevducks}
              className="img"
              alt="devducks"
              loading="lazy"
              title="Ver devducks"
            />
            <span className="show">{i18n.t("messages.MyProjects")}</span>
          </a>
        </SwiperSlide>
        <SwiperSlide className="mySld">
          <a
            href="https://grupo3-front-end-m3.vercel.app/home"
            target="_blank"
            title="Ver projeto"
            rel="noreferrer noopener"
          >
            <img
              src={screendevhelp}
              className="img"
              alt="devhelp"
              loading="lazy"
              title="Ver devhelp"
            />
            <span className="show">{i18n.t("messages.MyProjects")}</span>
          </a>
        </SwiperSlide>
        <SwiperSlide className="mySld">
          <a
            href="https://kezie-hub-kohl.vercel.app/"
            target="_blank"
            title="Ver projeto"
            rel="noreferrer noopener"
          >
            <img
              src={screenkenziehub}
              className="img"
              alt="kenzieHub"
              loading="lazy"
              title="Ver KenizeHub"
            />
            <span className="show">{i18n.t("messages.MyProjects")}</span>
          </a>
        </SwiperSlide>
        <SwiperSlide className="mySld">
          <a
            href="https://hamburgueria-opal-pi.vercel.app/"
            target="_blank"
            title="Ver projeto"
            rel="noreferrer noopener"
          >
            <img
              src={screenburguer}
              className="img"
              alt="KenzieBurguer"
              loading="lazy"
              title="Ver KenzieBurguer"
            />
            <span className="show">{i18n.t("messages.MyProjects")}</span>
          </a>
        </SwiperSlide>
        <SwiperSlide className="mySld">
          <a
            href="https://nukenzie-s130.vercel.app/"
            target="_blank"
            title="Ver projeto"
            rel="noreferrer noopener"
          >
            <img
              src={screennukenzie}
              className="img"
              alt="NuKenzie"
              loading="lazy"
              title=" Ver NuKenzie"
            />
            <span className="show">{i18n.t("messages.MyProjects")}</span>
          </a>
        </SwiperSlide>
        <SwiperSlide className="mySld">
          <a
            href="https://jotave8119.github.io/project-weather/"
            target="_blank"
            title="Ver projeto"
            rel="noreferrer noopener"
          >
            <img
              src={screenweather}
              className="img"
              alt="weatherApp"
              loading="lazy"
              title=" Ver WeatherApp"
            />
            <span className="show">{i18n.t("messages.MyProjects")}</span>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MyProjects;
