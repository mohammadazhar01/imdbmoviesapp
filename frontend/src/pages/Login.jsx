import axios from "axios";
import toast from 'react-hot-toast'
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
        const {setUser, Navigate} = useContext(AppContext)
        const [userData, setUserData] = useState({email: "", password: ""})
        const [logging, setLogging] = useState(false)

        const submitHandle = async(e) => {
            e.preventDefault() 
            setLogging(true)
            try {
                const {data} = await axios.post('/user/login', userData)
                if(data.success) {
                    setUser(data.user)
                    Navigate('/')
                    toast.success(data.message)
                } else {
                    setLogging(false)
                    toast.error(data.message)
                }
            } catch(err) {
                console.log(err.message)
            }  
        }
  return (
    <div className="bg-gray-900 min-h-screen px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Login to TopMoviez
          </h1>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <form className="space-y-6">
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
                value={userData.email}
                onChange={(e)=> setUserData({...userData , email: e.target.value})}/>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                className="w-full px-4 py-2.5 rounded bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
                value={userData.password}
                onChange={(e)=> setUserData({...userData , password: e.target.value})}/>
            </div>

            <button
              type="submit"
              className={`w-full ${logging ? "bg-gray-400" :"bg-red-500 hover:bg-red-600"} transition py-2.5 rounded text-white font-medium cursor-pointer`}
              onClick={(e)=> submitHandle(e)}>
              {logging ? "Logging..." :"Login"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span className="text-red-500 hover:underline cursor-pointer" onClick={()=> {Navigate('/register'); window.scrollTo({top: 0})}}>
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
