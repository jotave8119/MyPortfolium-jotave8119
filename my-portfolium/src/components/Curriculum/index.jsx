import { useEffect, useRef, } from "react";
import "./style.css";
import Lottie from "lottie-web"
import BtnDownload from "../BtnDownload";

const Curriculum = () => {

    const container = useRef(null);

    useEffect(()=>{
        Lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path:"https://assets6.lottiefiles.com/packages/lf20_szdrhwiq.json"
        })
        return () => Lottie.destroy();
    },[])

    return(
        <section className="cvBox" id="cv" data-aos="fade-in" data-aos-duration="1500">
            <h2 className="cvTitle">Currículo</h2>
            <div className="animation" ref={container}></div>
            <p className="cvText">Não custa nada dar aquela espiadinha no currículo.
            Faça o download!
            </p>
            <BtnDownload/>
        </section>
    );
};

export default Curriculum;