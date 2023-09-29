import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const api_key = import.meta.env.VITE_APP_TMDB_TOKEN;
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/similar?api_key=${api_key}`
  );

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
