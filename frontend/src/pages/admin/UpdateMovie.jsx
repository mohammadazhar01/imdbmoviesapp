import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

const UpdateMovie = () => {
  const { Navigate, fetchMovies } = useContext(AppContext);
  const { id } = useParams();

  console.log(id)

  const [loading, setLoading] = useState(true);
  const [existingPoster, setExistingPoster] = useState(null);
  const [updating, setUpdating] = useState(false)

  const [movieDetails, setMovieDetails] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
    releaseDate: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setUpdating(true)
        const { data } = await axios.get(`/movies/${id}`);

        if (data.success) {
          const movie = data.movie;

          setMovieDetails({
            title: movie.title || "",
            description: movie.description || "",
            rating: movie.rating || "",
            duration: movie.duration || "",
            releaseDate: movie.releaseDate?.slice(0, 10) || "",
          });

          setExistingPoster(movie.poster);
        } else {
          toast.error("Movie not found");
          Navigate("/admin");
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load movie");
        Navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, Navigate]);

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/movies/${id}`,movieDetails)

      if (data.success) {
        toast.success("Movie updated successfully")
        fetchMovies()
        Navigate("/admin");
      } else {
        setUpdating(false)
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading movie...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen px-6 py-10 flex justify-center">
      <div className="w-full max-w-3xl">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Update Movie
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Edit movie details (poster cannot be changed)
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={submitHandle}>

            {existingPoster && (
              <div className="text-center mb-6">
                <p className="text-sm text-gray-400 mb-2">
                  Movie Poster
                </p>
                <img
                  src={existingPoster}
                  alt="Movie Poster"
                  className="mx-auto w-40 h-60 object-cover rounded-lg border border-gray-700"/>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Movie Title
              </label>
              <input
                type="text"
                value={movieDetails.title}
                onChange={(e) =>
                  setMovieDetails({
                    ...movieDetails,
                    title: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded bg-gray-900 text-white outline-none focus:ring-2 focus:ring-red-500"/>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Description
              </label>
              <textarea
                rows="4"
                value={movieDetails.description}
                onChange={(e) =>
                  setMovieDetails({
                    ...movieDetails,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded bg-gray-900 text-white outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={movieDetails.rating}
                onChange={(e) =>
                  setMovieDetails({...movieDetails,rating: Number(e.target.value)})
                }
                className="px-4 py-2.5 rounded bg-gray-900 text-white outline-none focus:ring-2 focus:ring-red-500" />

              <input
                type="number"
                placeholder="Duration (min)"
                value={movieDetails.duration}
                onChange={(e) => setMovieDetails({...movieDetails, duration: e.target.value})
                }
                className="px-4 py-2.5 rounded bg-gray-900 text-white outline-none focus:ring-2 focus:ring-red-500"/>

              <input
                type="date"
                value={movieDetails.releaseDate}
                onChange={(e) =>
                  setMovieDetails({...movieDetails,releaseDate: e.target.value})
                }
                className="px-4 py-2.5 rounded bg-gray-900 text-white outline-none focus:ring-2 focus:ring-red-500"/>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => Navigate("/admin")} 
                className="px-6 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-pointer transition">
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-600 cursor-pointer transition">
                {updating ? "Updating" : "Update Movie"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateMovie
