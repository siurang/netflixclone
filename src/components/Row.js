import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper";
import { Mousewheel, Pagination } from "swiper";

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request :", request);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  const swiperStyle = {
    position: "relative",
    //   width: "752px",
    //   height:"752px",
  };

  //   const [swiper, setSwiper] =  useState(null);

  //   SwiperCore.use([Navigation]);

  //   const swiperParams = {
  //       navigation : true,
  //       onSwiper : setSwiper,
  //   }

  // const swiper = new Swiper('.swiper', {
  //     mousewheel: {
  //       invert: true,
  //     },
  //   });

  // var swiper = new Swiper('.swiper-container', {
  //     pagination: '.swiper-pagination',
  //
  //     slidesPerView: 1,
  //     paginationClickable: true,
  //     spaceBetween: 30,
  //     mousewheelControl: true,
  //     parallax: true,
  //     speed: 600,

  // });

  return (
    <section>
      <h2 className="row">{title}</h2>
      <div class="swiper-container">
        {/* <Swiper {...swiperParams} ref={setSwiper} style={swiperStyle} class="swiper"> */}
        <Swiper
          direction={"horizontal"}
        //   loop={true}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel
          allowSlideNext={true}
          allowTouchMove={true}
          allowSlidePrev={true}
          modules={[Mousewheel]}

        //   mousewheel={{forceToAxis:true}}
        //   pagination={{ clickable: true }}
        //   modules={[Mousewheel, Pagination]}
        //   class="swiper"
        >
          <SwiperSlide className="swiper-slide" direction={"horizontal"}
          loop={true}>
            <div
              className="slider__arrow-left"
              onClick={() => {
                document.getElementById(id).scrollLeft -=
                  window.innerWidth - 80;
              }}
            >
              <span className="arrow">{"<"}</span>
            </div>
            <div id={id} className="row__posters">
              {movies.map((movie) => (
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow} && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  } `}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              ))}
            </div>
            <div
              className="slider__arrow-right"
              onClick={() => {
                document.getElementById(id).scrollLeft +=
                  window.innerWidth - 80;
              }}
            >
              <span className="arrow">{">"}</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
