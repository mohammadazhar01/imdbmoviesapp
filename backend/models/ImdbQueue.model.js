import mongoose from 'mongoose'

const imdbQueueSchema = new mongoose.Schema(
    {
        imdbId: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            default: "pending"
        },
        error: {
            type: String
        }
    }, 
    
{timestamps: true})

const ImdbQueue = mongoose.model('imdbQueue', imdbQueueSchema)


export default ImdbQueue