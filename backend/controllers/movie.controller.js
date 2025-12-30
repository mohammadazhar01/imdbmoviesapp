import Movie from "../models/Movie.model.js";
import {v2 as cloudinary} from 'cloudinary'


export const addMovie = async(req,res) => {
    try {
        const {title, description, rating, releaseDate, duration} = JSON.parse(req.body.movieDetails)
        let posterUrl = null

        if(!title || !description ){
            return res.json({success: false,message: "Title and description is requiered"})
        }

        if(req.file){
            const posterImageUrl = await cloudinary.uploader.upload(req.file.path, { folder: "movie_posters"})
            posterUrl = posterImageUrl.secure_url
        }
    
        const movie = await Movie.create({
            title,
            description,
            rating,
            releaseDate,
            duration,
            poster: posterUrl,
            createdBy: req.user.id
        })
    
        res.status(201).json({success: true, message: "New movie added"})
    } catch(err) {
        console.log(err)
        res.json({success: false, message: "Server error"})
    }
    
}

export const getadminMovies = async(req,res) => {
    try {
        const adminId = req.user.id
        const adminMovies = await Movie.find({createdBy: adminId}).sort({createdAt: -1})

        res.json({success: true, adminMovies})
    } catch(err) {
        console.log(err)
        res.json({success: false, message: "Server error"})
    }
}

export const getSingleMovie = async(req, res) => {
    try {
        const {id} = req.params

        const movie =await Movie.findById(id)

        if(!movie) {
            return res.json({success:true, message: "Movie not found"})
        }

        res.json({success: true, movie})

    } catch(err) {
        console.log(err)
        res.json({success: false, message: "Server error"})
    }
}

export const updateMovie = async( req, res) => {
    try {
         const  {title, description, rating, releaseDate, duration}  = req.body
         const updatedData = {
            title,
            description,
            rating,
            releaseDate,
            duration
         }
         const movieId = req.params.id
     
         const updateMovieDetails = await Movie.findByIdAndUpdate(movieId, {...updatedData}, {new:true})

         if(!updateMovieDetails) {
             return res.json({success: false, message: "Movie does not found"})
         }
     
         res.json({success:true, message: "Movie details updated"})
    } catch(err) {
        console.log(err)
        res.json({success: false, message: "Server error"})
    }
   
}

export const deleteMovie = async(req, res) => {
    try {
        const movieId = req.params.id

        const movie = await Movie.findByIdAndDelete(movieId)
    
        if(!movie) {
            return res.json({success: false, message: "Movie does not found"})
        }
    
        res.json({success:true, message: "Movie deleted successfully"})

    } catch(err){
        console.log(err)
        res.json({success: false, message: "Server error"})
    }
}

export const getAllMovies = async(req, res) => {
    try {
        const allMovies = await Movie.find({})

        res.status(200).json({success: true, allMovies})
    } catch(err){
        console.log(err)
        res.json({success: false, message: "Sever Error: Failed to retrieve movies from database"})
    }
}

export const getSortedMovies = async(req, res) => {
    try {
        const {sortBy , order} = req.query

        const sortOrder = order === "desc" ? -1 : 1

        const sortedMovies = await Movie.find().sort({[sortBy]: sortOrder}) 
        
        res.json({success: true, sortedMovies})
    } catch(err) {
        console.log(err)
        res.json({success:false, message: "Server error"})
    }
    
}

export const searchMovies = async(req, res) => {
    try {
        const {q} = req.query

        if(!q) {
            return res.json({success: false, message: "Search field is required"})
        }
    
        const searchResult = await Movie.find({
            $or: [
                {title: {$regex: q, $options: "i"}},
                {description: {$regex: q, $options: "i"}}
            ]
        })
        
        res.json({success: true, searchResult})
    } catch(err) {
        console.log(err)
        res.json({success:false, message: "Server error"})
    }

}