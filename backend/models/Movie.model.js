import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        index: true                                        
    },
    rating: {
        type: Number
    },
    releaseDate: {
        type: Date
    },
    duration: {
        type: Number
    },
    poster: {
        type: String
    }, 
    imdbId: {
        type: String,
        unique: true,
        sparse: true
    },
    source: {
        type: String,
        default: "admin",
        enum: ["imdb", "admin"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {timestamps: true})

const Movie = mongoose.model("Movie", movieSchema)

export default Movie