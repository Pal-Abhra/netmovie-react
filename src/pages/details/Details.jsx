import React from "react";
import "./style.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
  const api_key = import.meta.env.VITE_APP_TMDB_TOKEN;
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(
    `/${mediaType}/${id}/videos?api_key=${api_key}`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits?api_key=${api_key}`
  );
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />{" "}
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
