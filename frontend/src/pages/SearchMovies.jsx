import { useContext, useState,useEffect } from "react"
import { AppContext } from "../context/AppContext"
import MovieCard from "../components/MovieCard"


const SearchMovies = () => {
    const {searchResults, loading} = useContext(AppContext)
    const [currentPage, setCurrentPage] = useState(1)
  
    const moviesPerPage = 12
    const visiblePage = 3
  
    const lastMovieIndex = currentPage * moviesPerPage
    const firstMovieIndex = lastMovieIndex - moviesPerPage
  
    const currentMovies = searchResults.slice(firstMovieIndex, lastMovieIndex)
    const totalPages = Math.ceil(searchResults.length / moviesPerPage)
  
    let btnStartInd = Math.max(1, currentPage -1)
    let btnLastInd = Math.min(totalPages, btnStartInd + visiblePage - 1)
  
    if ( btnLastInd - btnStartInd < visiblePage-1 ){
      btnStartInd = Math.max(1, btnLastInd - visiblePage + 1)
    }

    useEffect(()=> {
      setCurrentPage(1)
    }, [searchResults])
  
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[60vh] bg-gray-900">
          <p className="text-gray-400 text-lg">Loading movies...</p>
        </div>
      );
    }
  
    return (
      <div className="bg-gray-900 min-h-screen px-8 py-10">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Search <span className="text-red-500">results...</span>
          </h1>
        </div>
  
       {currentMovies.length === 0 ? (<h2 className="text-2xl text-red-500 text-center">No Movies found!</h2>) : 
       (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>)}
  
        <div className="flex justify-center mt-14">
          <div className="flex items-center gap-2 text-sm">
            <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700" 
            onClick={()=> setCurrentPage((prev)=> prev - 1)} disabled = {currentPage === 1}>
              Prev
            </button>
  
            {Array.from({length: btnLastInd - btnStartInd + 1}, ( _ , ind) => btnStartInd + ind).map((page) => {
               return <button className={`px-3 py-1 round text-white ${currentPage === page ? "bg-red-500 round" : "" }`}
               onClick={() => setCurrentPage(page) }> {page} </button>
            })}
  
            {btnLastInd < totalPages &&  (
              <>
               <p className="text-white font-bold">...</p>
               <button className={`px-3 py-1 round text-white ${currentPage === totalPages ? "bg-red-500 round" : "" }`}
               onClick={()=> setCurrentPage(totalPages)}>
               {totalPages}</button> 
              </>)
            }
  
            <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700"
            onClick={()=> {setCurrentPage((prev)=> prev + 1);  ; }} disabled = {currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    )
}

export default SearchMovies