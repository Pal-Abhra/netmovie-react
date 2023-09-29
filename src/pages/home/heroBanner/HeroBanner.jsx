import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Typewriter from "typewriter-effect";

const HeroBanner = () => {
  const api_key = import.meta.env.VITE_APP_TMDB_TOKEN;
  const [background, setBackground] = useState("");
  const [movieName, setMovieName] = useState("");
  const [query, setquery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch(`/movie/upcoming?api_key=${api_key}`);
  useEffect(() => {
    const movie = data?.results?.[Math.floor(Math.random(0) * 20)];
    const bg = url.backdrop + movie?.backdrop_path;
    setBackground(bg);
    setMovieName(movie?.title);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const searchQueryHandlerbyClick = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">
            <Typewriter
              options={{
                strings: ["WELCOME", movieName],
                autoStart: true,
                loop: true,
                cursor: "",
              }}
            />
          </span>
          <span className="subTitle">
            Millons of movies, TV shows and people to discover, Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or TV show..."
              onChange={(e) => setquery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchQueryHandlerbyClick}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
