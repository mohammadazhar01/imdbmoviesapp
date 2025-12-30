import express,{Router} from 'express'
import { addMovie, deleteMovie, getadminMovies, getAllMovies, getSingleMovie, getSortedMovies, searchMovies, updateMovie } from '../controllers/movie.controller.js'
import authUser from '../middlewares/auth.middleware.js'
import role from '../middlewares/role.middleware.js'
import upload from '../config/multer.js'

const movieRouter = express.Router()

movieRouter.get('/', getAllMovies)

movieRouter.get('/sorted', getSortedMovies)
movieRouter.get('/search', searchMovies)
movieRouter.get('/adminmovies/:id', authUser, role("admin"), getadminMovies)
movieRouter.get('/:id', getSingleMovie)
movieRouter.post('/', authUser, role("admin"), upload.single("poster"), addMovie )
movieRouter.put('/:id', authUser, role("admin"), updateMovie )
movieRouter.delete('/:id', authUser, role("admin"), deleteMovie)

export default movieRouter