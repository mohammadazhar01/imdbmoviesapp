import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL 

export const AppContext = createContext(null) 

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [allMovies, setAllMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchResults, setSearchResults] = useState([]) 
    const [loading, setLoading] = useState(true)
    const [adminMovies, setAdminMovies] = useState([])
    const [adminLoading, setAdminLoading] = useState(true)
    const Navigate = useNavigate()
    

    const fetchUser = async() => {
        try {
            const {data} = await axios.get("/user/is-auth")
            if(data.success){
                setUser(data.user)
            }
        } catch(err){
            console.log(err)
            setUser(null)
        }
    }

    const fetchMovies = async() => {
        try {
            const {data} = await axios.get('/movies')
            if(data.success){
                setAllMovies(data.allMovies)
            }
        } catch(err) {
            console.log(err)
        }
    }

    const getSearchResults = async(searchTerm) => {
        try {
            const {data} = await axios.get(`/movies/search?q=${searchTerm}`)
            if(data.success === true) {
                setSearchResults([...data.searchResult])
            }

        } catch(err) {
            console.log(err)
        }        
    }

    const setSortBy = async (sortBy, order = "asc") => {
        if (!sortBy){
            fetchMovies()
            return 
        } 
        
        const { data } = await axios.get(`/movies/sorted?sortBy=${sortBy}&order=${order}`);
        if (data.success){
            console.log(data.sortedMovies)
            setAllMovies(data.sortedMovies);
        }
    };

    const getAdminMovies = async(adminId) => {
        try {
            console.log(adminId)
            const {data} = await axios.get(`/movies/adminmovies/${adminId}`)
            if(data.success){
                setAdminMovies([...data.adminMovies])
            } else {
                console.log("err")
            }

        } catch(err) {
            console.log(err)
        } finally {
            setAdminLoading(false)
        }
    } 

    useEffect(()=> {
        const fetchHandle = async() => {
            await fetchUser()
            await fetchMovies()
            setLoading(false)
        }
         fetchHandle()   
    }, [])

    const isAdmin = user?.role === "admin"

    const data = {Navigate,loading, fetchMovies,user, setUser, isAdmin, allMovies, setAllMovies, currentPage, setCurrentPage, getSearchResults, searchResults, setSortBy, getAdminMovies,adminMovies, adminLoading}
    return (<AppContext.Provider value={data}>
        {children}
    </AppContext.Provider>)
}

export default ContextProvider