import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import SearchMovies from "./pages/SearchMovies"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import Register from "./pages/Register"
import AddMovie from "./pages/admin/AddMovie"
import Admin from "./pages/admin/Admin"
import UpdateMovie from "./pages/admin/UpdateMovie"
import AdminRoute from "./routes/AdminRoute"
import ScrollToTop from "./components/ScrollToTop"


const App = () => {
  return(
    <>
      <Toaster />
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/addmovie" element={<AddMovie />} />
          <Route path="/admin/updatemovie/:id" element={<UpdateMovie />} />
        </Route>
      </Routes>
    </>
    
  )
}

export default App