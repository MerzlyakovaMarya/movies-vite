import React, { useState, useEffect, useRef } from 'react';

export function Movie(props) {
  const {
    Title: title,
    Year: year,
    imdbID: id,
    Type: type,
    Poster: poster
  } = props;
  
  const modalRef = useRef(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (window.M && modalRef.current) {
      window.M.Modal.init(modalRef.current);
    }
  }, []);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=af5717ed&i=${id}&plot=full`);
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error("Ошибка при загрузке деталей:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    fetchMovieDetails();
    const instance = window.M.Modal.getInstance(modalRef.current);
    instance.open();
  };

  return (
    <>
    
      <div id={id} className="movie card">
        <div className="card-image waves-effect waves-block waves-light">
          {poster === 'N/A' ? (
            <img className="activator" src={`https://via.placeholder.com/300x400?text=${title}`} alt={title} />
          ) : (
            <img className="activator" src={poster} alt={title} />
          )}
        </div>
        <div className="card-content">
          <span className="card-title activator gray-text">{title}</span>
          <p>{year} <span className="right">{type}</span></p>
        </div>
        
       
        <div className="card-action">
          <button 
            onClick={openModal}
            className="waves-effect red accent-4 btn"
            style={{ marginBottom: '10px' }}
            disabled={loading}
          >
            <btn > Подробнее </btn>
          </button>
        </div>
      </div>

     
      <div ref={modalRef} className="modal">
        <div className="modal-content">
          {loading ? (
            <div className="center">
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h4>{title} ({year})</h4>
              <div className="row">
                <div className="col s12 m5">
                  <img 
                    src={poster === 'N/A' 
                      ? `https://via.placeholder.com/600x900?text=${title}` 
                      : poster} 
                    className="responsive-img"
                    alt={title}
                  />
                </div>
                <div className="col s12 m7">
                  {movieDetails?.Rated && <p><b>Рейтинг:</b> {movieDetails.Rated}</p>}
                  {movieDetails?.Runtime && <p><b>Длительность:</b> {movieDetails.Runtime}</p>}
                  {movieDetails?.Genre && <p><b>Жанр:</b> {movieDetails.Genre}</p>}
                  {movieDetails?.Director && <p><b>Режиссер:</b> {movieDetails.Director}</p>}
                  {movieDetails?.Actors && <p><b>Актеры:</b> {movieDetails.Actors}</p>}
                  {movieDetails?.Country && <p><b>Страна:</b> {movieDetails.Country}</p>}
                  {movieDetails?.imdbRating && <p><b>IMDb:</b> ⭐ {movieDetails.imdbRating}/10</p>}
                </div>
                <div className="col s12">
                  {movieDetails?.Plot && (
                    <>
                      <h5>Описание</h5>
                      <p>{movieDetails.Plot}</p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="modal-footer">
          
          <button className="modal-close waves-effect red accent-4 btn">
            Закрыть
          </button>
        </div>
      </div>
    </>
  );
}