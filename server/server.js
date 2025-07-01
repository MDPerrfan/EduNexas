import express from 'express'
import cors from 'cors'
import 'dotenv/config'


const app = express()

app.use(cors({

}))

//Routes

app.get('/', (req, res) => res.send("API working"))

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running.")
})