import placeHolderPoster from '../assets/no-image-placeholder1.jpg'
import { FaStar } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { BiStopwatch } from "react-icons/bi";

const MovieCard = ({ movie }) => {
  let movieDuration = ''
  if(movie.duration){
    const durationInHrs = Math.floor(movie.duration / 60)
    const durationInMints = movie.duration % 60
    movieDuration = `${durationInHrs}hrs ${durationInMints}min` 
  } else {
    movieDuration = '—'
  }
  
  return (
    <div className="bg-white rounded-xl cursor-pointer hover:opacity-80 overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <img
        src={movie.poster || placeHolderPoster}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-semibold leading-snug">
            {movie.title}
          </h3>

          <span className="text-sm font-medium text-yellow-600 whitespace-nowrap">
            {movie.rating || "N/A"}<FaStar className="inline mb-1" />
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
          <span className='text-red-500'>
            <BiStopwatch className="inline" />
            {movieDuration}
          </span>
          <span>
            <SlCalender className="inline"/> 
            {movie.releaseDate ? (new Date(movie.releaseDate).getFullYear()) : "—"}
          </span>
        </div>

        <p className="text-sm text-gray-600 ">  {/*leading-relaxed line-clamp-3 (for raping desc)  */}
          {movie.description}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
