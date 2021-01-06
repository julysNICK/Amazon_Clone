import React from "react";
import "./Home.css";
import Product from "../Product/Product";
function Home() {
  return (
    <div classname="home">
      <div className="home__container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
      </div>

      <div className="home_row">
        <Product
          id="1211232"
          title="livro"
          price={29.33}
          image="https://m.media-amazon.com/images/I/51N-u8AsmdL._SY346_.jpg"
          rating={5}
        />
        <Product
          id="122211232"
          title="alexa"
          price={298.33}
          image="https://m.media-amazon.com/images/I/41GZCWFJB1L._AC_UY327_FMwebp_QL65_.jpg"
          rating={5}
        />
      </div>
      <div className="home_row">
        <Product
          id="1211333232"
          title="HyperX Teclado Gamer HyperX Alloy"
          price={298.33}
          image="https://m.media-amazon.com/images/I/61nYRNCUCwL._AC_UL480_FMwebp_QL65_.jpg"
          rating={3}
        />
        <Product
          id="121122232"
          title="MOUSE GAMER HYPERX PULSEFIRE CORE"
          price={298.33}
          image="https://m.media-amazon.com/images/I/61QiYTxJ3UL._AC_UL480_FMwebp_QL65_.jpg"
          rating={3}
        />
        <Product
          id="1211232232"
          title="PLACA DE VIDEO NVIDIA GEFORCE GTX 1660 OC DUAL-FAN GDDR5 6GB 192 BITS - GRAFFITI SERIES - PPOC166019206G5"
          price={298.33}
          image="https://m.media-amazon.com/images/I/51rpKALlyDL._AC_UL480_FMwebp_QL65_.jpg"
          rating={5}
        />
      </div>
      <div className="home_row">
        <Product
          id="122323411232"
          title="Smart TV LED 43 Full HD AOC ROKU TV FHD 43S5195/78G Wi-Fi 3 HDMI, 1 USB, Wif, Conversor Digital"
          price={298.33}
          image="https://m.media-amazon.com/images/I/61nrHxbuYAL._AC_UL480_FMwebp_QL65_.jpg"
          rating={5}
        />
      </div>
    </div>
  );
}

export default Home;
