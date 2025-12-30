import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import {  } from "react";
import toast from "react-hot-toast";

const AdminRoute = () => {
  const { user, isAdmin, loading } = useContext(AppContext);

    useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("Please login to access admin panel");
      } else if (!isAdmin) {
        toast.error("Access denied. Admins only.");
      }
    }
  }, [user, isAdmin, loading]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Checking permissions...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
}

export default AdminRoute
