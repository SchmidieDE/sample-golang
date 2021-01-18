const express = require('express')
const app = express()
const mongoose = require('mongoose')

PORT = process.env.PORT || 20003 

const dbURI = 'mongodb+srv://schmidie:Microstar978!@barbershop.2eazy.mongodb.net/Bitlytics?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then( (result) => app.listen(PORT))
    .catch((err) => console.log(err))


require('./FetchScripts/newsapi')()
require('./FetchScripts/youtube')()
require('./FetchScripts/coinstats')()
require('./FetchScripts/twitter')()

console.log("Läuft's ?")