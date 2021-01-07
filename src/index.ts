import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/url-shortener", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.log("database connected"))
  .catch(err => console.log(err))



app.set('view engine', "ejs")
app.set('views', path.join(__dirname, 'views'))

app.use('/', routes)


app.use(express.static(path.join(__dirname, "public")))


app.listen(PORT, () => console.log("listening on port 3001"))