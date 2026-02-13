import React from 'react'
import Image from "../assets/null.jpg"

function Movie({ movie }) {

    // const { Year, Poster , Title, Type, Plot} = movie;
  return (
    <div className="movie flex flex-col rounded-2xl contain-content shadow-2xl bg-black object-cover justify-between relative w-[220px]">

                    <div className="top absolute flex w-full justify-between py-1 bg-[#000] z-20">
                      <p  className=' ml-2 font-light'>{movie?.Year}</p>
                      <p  className=' mr-2 font-light'>{movie?.Type}</p>
                    </div>
                  
                    <div className="image aspect-auto top-0">
                      <img loading='Lazy' src={movie.Poster === "N/A" ? 'https://placehold.co/400' : movie.Poster || 'https://placehold.co/400'  }  
                        alt={movie.Title + " image"} />
                    </div>

                    <div className="detail  p-2">
                      <h1 className=' font-medium'>{movie.Title}</h1>
                      <p className=' font-light'>{movie.Released}</p>
                    </div>

    </div>
  )
}

export default Movie