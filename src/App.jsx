import { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfiguration} from "./store/homeSlice"
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/pageNoteFound"
import Footer from './components/footer/footer'
import Header from './components/header/Header'



function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home)
  console.log(url);
  useEffect(() => {
    fetchApiConfig()
    
  }, []);

  const api_key = import.meta.env.VITE_APP_TMDB_TOKEN
  
  const fetchApiConfig = () => {
    fetchDataFromApi(`/configuration?api_key=${api_key}`)
      
      //correct this.. api key is visible
      .then((res) => {
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",

        };
          
        dispatch(getApiConfiguration(url));
      })
  }

  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":mediaType/:id" element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
