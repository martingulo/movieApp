import { useState } from 'react'
import './App.css'
import Panda from './assets/panda.png'
import Movie from './components/Movie';
import axios from 'axios';

function App() {

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [Inputerror, setInputError] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (title) =>{
    if(title.trim() == ""){
      setInputError("Invalid input!");
      setMovies([]);

      setTimeout(() =>{
        setInputError("");
      }, 3000);
      return 0;
    };

    const URL = "http://www.omdbapi.com";
    const Apikey = import.meta.env.VITE_MOVIE_API_KEY;
  
    setLoading(true);
    axios.get(`${URL}?apikey=${Apikey}&s=${title}`)
    .then( (response) => {
      setMovies(response.data.Search);
      setLoading(false);
      console.log(response.data.Search);
    })
    .catch( (error) => {
      setError(error.message);
      setLoading(false);

       setTimeout(() =>{
          setError('');
        }, 3000);

    });

    
  } 
    

  const searchBtn = () =>{
    handleSearch(search);
  }
  const reset = () =>{
    setInputError(" ");
  }

  if(loading){
    return <div className=' w-full gap-9  flex-col flex items-center text-3xl justify-center align-middle h-screen'>
      <div className="  w-[150px] h-[150px]  rounded-full animate-spin  border-t-2"> </div>
      <p>loading...</p>
    </div>
  }

  return (
    <div className = " w-full  h-screen  justify-center align-middle items-center">
        <div className="div fixed backdrop-blur-sm z-50 top-0  w-full pt-10 justify-center flex flex-col">
            <h1 className = ' text-5xl md:text-6xl text-center font-bold '>Movie world</h1>
             {Inputerror && <div className='mt-4 -mb-3 m-auto w-[80%] bg-red-500 pl-2'>{Inputerror}</div>}
             {error && <div className='mt-4 -mb-3 m-auto w-[80%] bg-red-500 pl-2'> {error}</div>}

            <div className="search mt-6 w-[80%] md:w-[50%] m-auto relative  flex items-center justify-center">

              <input type="text" 
                name="search-field" 
                value={search}
                onKeyUp={reset}
                onChange={ (e) => {
                  setSearch(e.target.value)
                }}
                className=' py-4 px-4 bg-black shadow-2xl w-[100%]  rounded-3xl outline-0'
                placeholder='Search any movie' 
                id="" />
                <h3 onClick={searchBtn} 
                  className=' absolute right-3 pl-4 bg-black cursor-pointer hover:text-amber-100'>
                    Search
                </h3>
            </div>
        </div>


        <div className="list flex flex-wrap justify-center gap-4 m-2 mt-10 pb-30 pt-40  ">

          {
            movies?.length > 0 
            ? (
              movies.map( (movie) => (
                  <Movie movie = {movie} key ={movie.imdbID}/>
              ))
            )
            : (
              <div className='m-auto  md:mt-9 w-[80%] md:w-[50%] text-center bg-black rounded-2xl p-3'>No movies found</div>
            )
          }
        </div>


        <div className="footer flex justify-center align-middle items-center fixed bottom-0 w-full text-center text-[14px] md:text-[14px] py-4 md:py-2 bg-black">
          &copy; {new Date().getFullYear()} MovieWorld. All rights reserved. 
          <img className=' size-10' src={Panda} alt="" />
        </div>
    </div>
  )
}

export default App
