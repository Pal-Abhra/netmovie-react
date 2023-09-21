import {useState} from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/switchTabs/SwitchTab'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {
    const api_key = import.meta.env.VITE_APP_TMDB_TOKEN
    const [endpoint, setEndpoint] = useState("day")
    const {data, loading} =useFetch(`/trending/all/${endpoint}?api_key=${api_key}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    }

  return (
      <div className='carouselSection'>
          <ContentWrapper>
              <span className='carouselTitle'>Trending</span>
              <SwitchTab data={["Day", "Week"]} onTabChange={ onTabChange} />
          </ContentWrapper>
          <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending