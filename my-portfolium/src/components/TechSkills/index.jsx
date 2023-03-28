import "./style.css";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import { SiStyledcomponents } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { i18n } from "../../translate/i18n";

const TechSkills = () => {
  return (
    <div className="boxList" >
      <h2 className="techTitle" id="techs">
        {i18n.t("titles.TechSkills")}
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
         navigation={true}
        modules={[Pagination, Navigation]}
        style={{
          "--swiper-navigation-color": "#35baf8",
          "--swiper-pagination-color": "#35baf8",
          "--swiper-pagination-bullet-inactive-color":"#8a8787"
        }}
        
        className="mySwp"
        data-aos="fade-in" data-aos-duration="1500"
      >
        <SwiperSlide className="swiperslide">
          <div className="htmlIcon" title="HTML">
            <FaHtml5 size={100} className="html" />
            <p className="nameTech">HTML</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="cssIcon" title="CSS">
            <FaCss3Alt size={100} className="css" />
            <p className="nameTech">CSS</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="jsIcon" title="JavaScript">
            <SiJavascript size={100} className="js" />
            <p className="nameTech">JavaScript</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="gitIcon" title="Git">
            <FaGitAlt size={100} className="git" />
            <p className="nameTech">Git</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="reactIcon" title="React Js">
            <RiReactjsLine size={100} className="react" />
            <p className="nameTech">React</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="styIcon" title="Styled Components">
            <SiStyledcomponents size={100} className="sty" />
            <p className="nameTech">Styled Components</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="typeIcon" title="TypeScript">
            <SiTypescript size={100} className="type" />
            <p className="nameTech">TypeScript</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="nodeIcon" title="Node Js">
            <FaNodeJs size={100} className="node"/>
            <p className="nameTech">Node JS</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="exIcon" title="Express Js">
            <SiExpress size={100} className="ex" />
            <p className="nameTech">Express JS</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <div className="sqlIcon" title="PostgreSQL">
            <SiPostgresql size={100} className="sql" />
            <p className="nameTech">PostgreSQL</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TechSkills;
