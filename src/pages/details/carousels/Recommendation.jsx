import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
  const api_key = import.meta.env.VITE_APP_TMDB_TOKEN;
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations?api_key=${api_key}`
  );

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
