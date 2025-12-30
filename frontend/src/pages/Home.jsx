import { useContext} from "react";
import { AppContext } from "../context/AppContext";
import MovieCard from "../components/MovieCard";

const Home = () => {
    const { allMovies, loading, currentPage, setCurrentPage } = useContext(AppContext);

    const moviesPerPage = 12
    const visiblePage = 3

    const lastMovieIndex = currentPage * moviesPerPage
    const firstMovieIndex = lastMovieIndex - moviesPerPage

    const currentMovies = allMovies.slice(firstMovieIndex, lastMovieIndex)
    const totalPages = Math.ceil(allMovies.length / moviesPerPage)

    let btnStartInd = Math.max(1, currentPage -1)
    let btnLastInd = Math.min(totalPages, btnStartInd + visiblePage - 1)

    if ( btnLastInd - btnStartInd < visiblePage-1 ){
      btnStartInd = Math.max(1, btnLastInd - visiblePage + 1)
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center h-[60vh] bg-gray-900">
          <p className="text-gray-400 text-lg">Loading movies...</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-900 min-h-screen px-8 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Top <span className="text-red-500">250</span> Movies from <span className="text-yellow-400">IMDB</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Highest rated movies of all time listed on IMDB plateform
          </p>
        </div>
  
       {currentMovies.length === 0 ? (<h2 className="text-xl text-red-500 text-center ">There are no movies added yet!</h2>) : 
       (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
           
          {currentMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>)
          } 
  
        <div className="flex justify-center mt-14">
          <div className="flex items-center gap-2 text-sm">
            <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer" 
            onClick={()=> {setCurrentPage((prev)=> prev - 1); window.scrollTo({top:0, behavior: "instant"})}} disabled = {currentPage === 1}>
              Prev
            </button>
  
            {Array.from({length: btnLastInd - btnStartInd + 1}, ( _ , ind) => btnStartInd + ind).map((page) => {
               return <button className={`px-3 cursor-pointer py-1 round text-white ${currentPage === page ? "bg-red-500 round" : "" }`}
               onClick={() => {setCurrentPage(page); window.scrollTo({top:0, behavior: "instant"})}}> {page} </button>
            })}
  
            {btnLastInd < totalPages &&  (
              <>
               <p className="text-white font-bold">...</p>
               <button className={`cursor-pointer px-3 py-1 round text-white ${currentPage === totalPages ? "bg-red-500 round" : "" }`}
               onClick={()=> {setCurrentPage(totalPages); window.scrollTo({top:0, behavior: "instant"}) }}>
               {totalPages}</button> 
              </>
              )
            }
            
            <button className="px-3 py-1 cursor-pointer rounded bg-gray-800 text-gray-300 hover:bg-gray-700"
            onClick={()=> {setCurrentPage((prev)=> prev + 1); window.scrollTo({top:0, behavior: "instant"})}} disabled = {currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
  );
};

export default Home;
