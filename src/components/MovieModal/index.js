import React, { useRef, useEffect } from "react";
import "./MovieModal.css";

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
  modalOpen,
}) {

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };

}, []);

  const wrapperRef = useRef();
  const handleClickOutside = (e) => {
    console.log('modalOpen');
    console.log(setModalOpen);
    console.log('wrapperRef.current');
    console.log(wrapperRef.current);
    console.log('e.target');
    console.log(e.target);
    if(setModalOpen && (!wrapperRef.current.contains(e.target)))
    setModalOpen(false)
     };
    

  return (
    
    <div className="presentation" >
      <div className="wrapper-modal"  onClick={(e) => handleClickOutside}>
        <div className="modal" ref={wrapperRef}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          />

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_perc">100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>

            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview"> 평점: {vote_average}</p>
            <p className="modal__overview"> {overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
