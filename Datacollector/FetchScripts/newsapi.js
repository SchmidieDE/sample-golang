
module.exports = function() {

/*
const express = require('express')
const app = express()
const fetch = require('node-fetch')
const mongoose = require('mongoose')
*/

const fetch = require('node-fetch')
const NewsApi = require('../FetchModels/newsapi/newsapi');

//PORT = process.env.PORT || 20002

// Open Database connection
/*const dbURI = 'mongodb+srv://schmidie:Microstar978!@barbershop.2eazy.mongodb.net/Bitlytics?retryWrites=true&w=majority'

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( (result) => app.listen(PORT))
    .catch((err) => console.log(err))

/*
Key = '20220cb1e98e469ea973c217d3acb8bb'
https://newsapi.org/v2/everything?q=apple&from=2020-12-17&to=2020-12-17&sortBy=popularity&apiKey=20220cb1e98e469ea973c217d3acb8bb
*/




const FetchArticles = async Key => {
    date = new Date().toJSON()
    TimeStart = date.slice(0,10)
    TimeStart = '2020-12-18'
    NewsApiQuery = `https://newsapi.org/v2/everything?domains=faz.net,bloomberg.com,foxnews.com,nbcnews.com,cnn.com,theguardian.com,bild.de,tagesspiegel.de,sueddeutsche.de,mdr.de,tagesschau.de,n-tv.de,zdf.de,deutschlandfunk.de,ndr.de,focus.de,zeit.de,nzz.ch,welt.de,spiegel.de&q=bitcoin&from=${TimeStart}&apiKey=20220cb1e98e469ea973c217d3acb8bb`
    ReqTime = new Date()

    try{
        const res = await fetch(NewsApiQuery)
        const resJSON = await res.json()
        console.log(await resJSON)

        Totalresults = await resJSON.totalResults
        articles = await resJSON.articles


        Data = new NewsApi({
            sources: new Array(),
            totalResults: Totalresults,
            time: ReqTime
        })

        console.log(articles)
        articlescountArray = []

        articles.forEach(E => {
            if(E.source.name !== null) {
                Sourcename = E.source.name
                articlescountArray.push(Sourcename)
            }
            else if (E.source.id !== null) {
                Sourcename = E.source.id
                articlescountArray.push(Sourcename)
            }
            else {
                Sourcename= null
                articlescountArray.push(Sourcename)
            }


        }) 
        count = {};
        articlescountArray.forEach(function(i) { count[i] = (count[i]||0) + 1;});

        for (key in count) {
            Objekt = {
                source: key,
                total: count[key]
            }
            Data.sources.push(Objekt)
        }

        console.log(Data)
        Data.save(function(err) {
            if(err) console.log(err)
        })

    }catch(err) {

    }
}


function Checktime() {
    ReqTime = new Date()
    Minuten = ReqTime.getMinutes()
    Stunden = ReqTime.getHours() + 1
    console.log('Newsapi läuft!')
    if(Stunden === 23 && Minuten === 55) FetchArticles()
}

setInterval(function(){Checktime()}, 60000)

}

