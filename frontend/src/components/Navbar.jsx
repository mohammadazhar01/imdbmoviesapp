import { Link, useLocation } from "react-router-dom"
import { BiMovie } from "react-icons/bi"
import { IoSearch } from "react-icons/io5"
import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import toast from "react-hot-toast"

const Navbar = () => {
    const {getSearchResults, Navigate, user, setUser, isAdmin, setSortBy, setCurrentPage} = useContext(AppContext)
    const [searchTerm, setSearcTerm] = useState('')
    const [sortValue, setSortValue] = useState("");
    const [orderValue, setOrderValue] = useState("");

    const isSearchRoute = useLocation().pathname === '/search'
    const isAdminRoute = useLocation().pathname.startsWith('/admin')
    const isLoginRoute = useLocation().pathname === '/login'
    const isRegisterRoute = useLocation().pathname === '/register'

    console.log(isAdminRoute)

    const searchHandle = (e) => {
        setSearcTerm(e.target.value)
        getSearchResults(searchTerm)
        Navigate('../search')   
    }

    const sortHandle = (e) => {
    const value = e.target.value;
    setSortValue(value);

    if (!value) {
      setSortBy("")
      return 
    }

    setSortBy(value, orderValue || "asc")
  }

   const orderHandle = (e) => {
    const value = e.target.value;
    setOrderValue(value);

    if (!sortValue) {
      setOrderValue(null)
      toast.error("Select sort by first")
      
      return 
    }

    setSortBy(sortValue, value || "asc")

  }

    const logout = async() => {
        try {

            const {data} = await axios.get('/user/logout')

            if(data.success) {
                setUser(null)
                toast.success("Logout successfull")
            }
        } catch(err){
            console.log(err)
        }
    }

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 text-white shadow-lg">
      <div className="px-6 py-4">
    
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={()=> {setCurrentPage(1); window.scrollTo({top:0, behavior: "instant"})}}
            className="text-2xl font-bold tracking-tight text-red-500">
            <BiMovie className="inline" /> TopMoviez
          </Link>
    
          <div className="flex items-center gap-4 text-sm font-medium">
            {isAdmin && (
              <div
                onClick={() => {Navigate('admin'); window.scrollTo({top: 0})}}
                className="bg-red-500 px-3 py-1.5 rounded-full hover:bg-red-600 transition cursor-pointer">
                Admin
              </div>
            )}
    
            {user ? (
              <button
                onClick={logout}
                className="cursor-pointer hover:text-gray-300"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            )}
          </div>
        </div>
    
        {!isLoginRoute && !isRegisterRoute && !isAdminRoute && (<div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-center gap-4 w-full">
    
        <div className="w-full md:w-[80%]">
          <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 focus-within:outline-red-500 focus-within:ring-1 focus-within:ring-red-500 transition">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
              onChange={searchHandle}/>
            <IoSearch className="text-gray-400 ml-2" />
          </div>
        </div>
    
        {!isSearchRoute && (
        <div className="flex w-full md:w-auto gap-4 justify-between md:justify-center">
          <select onChange={sortHandle}
          value={sortValue}
          className="bg-gray-700 text-sm text-gray-300 rounded-full px-4 py-2 outline-none cursor-pointer w-1/2 md:w-[160px]">
            <option disabled value="">Sort By</option>
            <option value="" >Default</option>
            <option value="title" >Title</option>
            <option value="rating">Rating</option>
            <option value="releaseDate">Release Date</option>
            <option value="duration">Duration</option>
          </select>

          <select
            onChange={orderHandle}
            value={orderValue}
            className="bg-gray-700 text-sm text-gray-300 rounded-full px-4 py-2 outline-none cursor-pointer w-1/2 md:w-[140px]">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>)}
       </div> )}
      </div> 
    </nav>
  );
}

export default Navbar;
