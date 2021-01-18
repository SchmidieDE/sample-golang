/*
const express = require('express')
const app = express()
const fetch = require('node-fetch')
const mongoose = require('mongoose')
*/

const fetch = require('node-fetch')
module.exports = function() {
const Assets = require('../FetchModels/coinstats/assets');

//PORT = process.env.PORT || 20001 


// Open Database connection
/*
const dbURI = 'mongodb+srv://schmidie:Microstar978!@barbershop.2eazy.mongodb.net/Bitlytics?retryWrites=true&w=majority'

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( (result) => app.listen(PORT))
    .catch((err) => console.log(err))
*/

InterTime = new Date()


const FetchIntervall = async EUrl => {
    try{
        const res = await fetch(EUrl)
        const resjson = await res.json()
        const resarray = resjson.coins
        resarray.forEach(e => {
            const data = new Assets({
                name: e.name,
                symbol: e.symbol,
                rank: e.rank,
                price: parseFloat(e.price).toFixed(2),
                volume: parseFloat(e.volume).toFixed(2),
                marketCap: parseFloat(e.marketCap).toFixed(2),
                availableSupply: parseFloat(e.availableSupply).toFixed(2),
                totalSupply: parseFloat(e.totalSupply).toFixed(2),
                time: ReqTime
            })
            console.log(data)
            data.save(function(err) {
                if(err) console.log(err)
            })
        });
    }catch(err) {
        console.log(err)
    }
    
}


Checktime = function(){
    console.log('coinstats läuft')
    ReqTime = new Date();
    Minuten = ReqTime.getMinutes()
    Modulo = Minuten%15
    console.log(ReqTime)
    if (Modulo === 0) {
        FetchIntervall('https://api.coinstats.app/public/v1/coins?skip=0&limit=50&currency=EUR')
    }
}

setInterval(function(){Checktime()}, 60000)



}