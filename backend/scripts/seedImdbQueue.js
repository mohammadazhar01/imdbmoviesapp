import connectDB from "../config/db.js";
import ImdbQueue from "../models/ImdbQueue.model.js";
import imdbIds from "../assets/imdbIds.js";
import dotenv from 'dotenv'

dotenv.config()

const seedToQueue = async() => {
    try {
        await connectDB();

        for(const imdbId of imdbIds){
            await ImdbQueue.updateOne({ imdbId }, {imdbId, status: "pending"}, {upsert: true})  // 1 obj. check if already exist //2 obj. data to insert //3 obj. insert if not exists
        }

        console.log("IMDB queuee seeded successfully.")
    } catch(err) {
        console.log("Failed to seeded queue", err.message)
    }
}

seedToQueue()