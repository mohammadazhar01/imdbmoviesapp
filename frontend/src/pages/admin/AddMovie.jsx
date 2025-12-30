import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddMovie = () => {
    window.scrollTo(top)
    const {Navigate, fetchMovies} = useContext(AppContext)
    const [movieDetails, setMovieDetails] = useState({
      title: '',
      description: '',
      rating: '',
      duration: '',
      releaseDate: '',
    })
    const [poster, setPoster] = useState(null)
    const [adding, setAdding] = useState(false)


    const formData = new FormData()
    formData.append('movieDetails', JSON.stringify(movieDetails))

    formData.append('poster', poster)

    const submitHandle = async(e) => {
      e.preventDefault()
      setAdding(true)
      try {
        const {data} = await axios.post('/movies',formData)
        if(data.success){
          fetchMovies()
          toast.success(data.message)
          Navigate('/')
        } else {
          setAdding(false)
          toast.error(data.message)
        } 
       console.log(movieDetails)
       
      } catch(err){
        console.log(err)
      }
    }

  return (
    <div className="bg-gray-900 min-h-screen px-6 py-10 flex justify-center">
      <div className="w-full max-w-3xl">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Add New Movie
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Add a movie to the IMDb Top 250 collection
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={(e)=> submitHandle(e)}>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Movie Title
              </label>
              <input
                type="text"
                value={movieDetails.title}
                onChange={(e)=> setMovieDetails({...movieDetails, title:e.target.value})}
                placeholder="Enter movie title"
                className="w-full px-4 py-2.5 rounded bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"/>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Description
              </label>
              <textarea rows="4"
                placeholder="Enter movie description"
                value={movieDetails.description}
                onChange={(e)=> setMovieDetails({...movieDetails, description:e.target.value})}
                className="w-full px-4 py-2.5 rounded bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500 resize-none"/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="8.5"
                  value={movieDetails.rating}
                  onChange={(e)=> setMovieDetails({...movieDetails, rating:Number(e.target.value)})}
                  className="w-full px-4 py-2.5 rounded bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"/>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Duration (min)
                </label>
                <input type="number" placeholder="150"
                  value={movieDetails.duration}
                  onChange={(e)=> setMovieDetails({...movieDetails, duration:e.target.value})}
                  className="w-full px-4 py-2.5 rounded bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"/>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Release Date
                </label>
                <input type="date" value={movieDetails.releaseDate}
                  onChange={(e)=> setMovieDetails({...movieDetails, releaseDate:e.target.value})}
                  className="w-full px-4 py-2.5 rounded bg-gray-900 text-white outline-none focus:ring-2 focus:ring-red-500"/>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Movie Poster
              </label>
              <input type="file" onChange={(e)=> setPoster(e.target.files[0])}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-500 file:text-white
                  hover:file:bg-red-600 cursor-pointer"/>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button type="button"
                onClick={()=> Navigate('/')}
                className="px-6 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition cursor-pointer">
                Cancel
              </button>

              <button type="submit"
                className={`px-6 py-2 rounded ${adding ? "bg-gray-500" :"bg-red-500  hover:bg-red-600"} text-white font-medium transition cursor-pointer`}>
                {adding ? "Adding...":" Add Movie"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMovie
