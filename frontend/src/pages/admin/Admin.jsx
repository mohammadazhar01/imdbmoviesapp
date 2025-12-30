import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import placeHolderPoster from '../../assets/no-image-placeholder.jpg'

const Admin = () => {
  const {Navigate, fetchMovies,getAdminMovies, user, adminMovies, adminLoading} = useContext(AppContext)

  const deleteMovie = async(movieId) => {
    try {
      const {data} = await axios.delete(`/movies/${movieId}`)
      console.log(data)
      if(data.success){
        fetchMovies()
        getAdminMovies(user.id)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    if(user){
      getAdminMovies(user.id)
    }
  }, [user])

  return (
    <div className="bg-gray-900 min-h-screen px-6 py-10">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your movies
          </p>
        </div>

        <Link
          to="/admin/addmovie"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-5 py-2.5 rounded-full font-medium">
          <FiPlus />
          Add New Movie
        </Link>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {adminLoading ? (
        <h2 className="text-center text-gray-400 py-6">Loading...</h2>) : adminMovies.length === 0 ? (
        <h2 className="text-center text-gray-400 py-6">
          No movie added yet...</h2>) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="text-left px-6 py-4">Movie</th>
                <th className="text-left px-6 py-4 hidden md:table-cell">
                  Rating
                </th>
                <th className="text-left px-6 py-4 hidden lg:table-cell">
                  Release Date
                </th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>

            {adminMovies.map((movie) => (
              <tr
                key={movie._id}
                className="border-t border-gray-700 hover:bg-gray-700/40 transition">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={movie.poster || placeHolderPoster}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"/>
                  <div>
                    <p className="text-white font-medium">
                      {movie.title}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {movie.duration} min
                    </p>
                  </div>
                </td>
        
                <td className="px-6 py-4 text-gray-300 hidden md:table-cell">
                  <FaStar />{movie.rating}
                </td>
        
                <td className="px-6 py-4 text-gray-300 hidden lg:table-cell">
                  {movie.releaseDate?.slice(0, 10)}
                </td>
        
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button onClick={()=> Navigate(`/admin/updatemovie/${movie._id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-gray-600 hover:bg-gray-500 text-white transition">
                      <FiEdit size={14} />
                      Edit
                    </button>
        
                    <button onClick={()=> deleteMovie(movie._id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white transition">
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>))}
          </tbody>
         </table>)}
      </div>
    </div>
  );
}

export default Admin
