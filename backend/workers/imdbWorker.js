import axios from 'axios'
import Movie from '../models/Movie.model.js'
import ImdbQueue from '../models/ImdbQueue.model.js'

const IntervalTime = 5000

const startImdbWorker = () => {
    setInterval(async() =>{
        try {
            const job = await ImdbQueue.findOne({status: "pending"})

            if (!job) {
                return;
            }

            job.status = "processing"
            await job.save()

            const res = await axios.get(`https://www.omdbapi.com/?i=${job.imdbId}&apikey=${process.env.OMDB_API_KEY}`)
            const data = res.data

            if(data.Response === "False") {
                job.status = "failed"
                job.error = data.error
                await job.save()
                return
            }

            await Movie.create({
                title: data.Title,
                description: data.Plot,
                rating: Number(data.imdbRating),
                releaseDate: data.Released ? new Date(data.Released) : null,
                duration: Number(data.Runtime.slice(0,3)),
                poster: data.Poster !== "N/A" ? data.Poster : null,
                imdbId: job.imdbId,
                source: "imdb"
            })

            job.status = "done"
            await job.save()

        } catch(err) {
            console.log("Worker Error:",err.message)
        }
    }, IntervalTime)
}

export default startImdbWorker