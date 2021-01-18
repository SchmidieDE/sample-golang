

const express = require('express')
const app = express()
const fetch = require('node-fetch')
const mongoose = require('mongoose')

module.exports = function() {

const woeid = require('woeid');
const { getCountries, getCurrencySymbol } = require('country-from-iso2');

const TwitterTrends = require('../FetchModels/twitter/trends');

PORT = process.env.PORT || 20004 
endpointURL = 'twst'
// API KEY derKKmfiWZwC4MMldajN3Cvky
// API SECRET KEY 0fDFC3QtJdvrIOSWqkQ9OfyVAwJptBI5E6wtRrOisaTCAz3gRR
// Bearer token AAAAAAAAAAAAAAAAAAAAAEPnKwEAAAAAb64vjzMBcRfS8Z8c7om7XdYJg3c%3Di9sEHuzWhsY8cino1gc6DqfE12bkY2l8zveQRaRKf21yYwhpXX

//console.log(Countries)
const needle = require('needle');

CountryList = [ 'AE', 'AR', 'AU', 'AT', 'BE', 'BH', 'BY', 'BR', 'CA', 'CH', 'CL', 'CO', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EG', 'ES', 'FR', 'GH', 'GR', 'GT', 'ID', 'IN', 'IE', 'IL', 'IT', 'JO', 'JP', 'KE', 'KR', 'KW', 'LB', 'LV', 'MX', 'MY', 'NG', 'NL', 'NO', 'NZ', 'OM', 'PK', 'PA', 'PE', 'PH', 'PL', 'PR', 'PT', 'QA', 'RU', 'SA', 'SG', 'SE', 'TH', 'TR', 'UA', 'US', 'VE', 'VN', 'ZA' ]
// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal: 
// export BEARER_TOKEN='YOUR-TOKEN' 
const token = 'AAAAAAAAAAAAAAAAAAAAAEPnKwEAAAAAb64vjzMBcRfS8Z8c7om7XdYJg3c%3Di9sEHuzWhsY8cino1gc6DqfE12bkY2l8zveQRaRKf21yYwhpXX'; 


async function getRequest() {
/*
    const params = {
        "ids": "1343307369716080645", // Edit Tweet IDs to look up
        "tweet.fields": "lang,author_id", // Edit optional query parameters here
        "user.fields": "created_at" // Edit optional query parameters here
    }*/
    //console.log(await endpointURL)
    const res = await needle('get', endpointURL, { headers: {
        "authorization": `Bearer ${token}`
    }})

    if(res.body) {
        return res.body;
    } else {
        throw new Error ('Unsuccessful request')
    }
}

function ExecuteFuntcion() {
(async () => {

    try {
        // Make request
        const response = await getRequest(endpointURL);

        //console.log(await response)
        if ('errors' in await response) {
            console.log('Keine Gültige API REQ Womöglich Limit überschritten')
        }
        
        Twittertrendsarray = []
        Twittertrends = await response[0].trends
        Twittertrends.forEach(E => {
            Twittertrendsarray.push({name: E.name, tweet_volume:  E.tweet_volume})
        })
        //console.log(Twittertrendsarray, 'Twittertrendsarray')
       
       
        //Twittertrendsarray = [{name: '#onepicofprompayy', tweet_volume:  12121}, {name: 'Litcoin mit WAllet', tweet_volume:  null}]
        Keywords = ['bitcoin', 'hold','hodl' ,'btc', '₿', 'cryptocurrency', 'altcoin','ethereum', 'wallet','binance', 'kraken', 'coinbase', 'huobi', 'bithumb', 'bitstamp', 'kucoin']
        Keyword = []

        TotalTrends = await Twittertrends.length

        Twittertrendsarray.forEach(E => {
            EVolume = E.tweet_volume
            E = E.name.toLowerCase()
            Keywordtrigger = false
            Keywords.forEach(K => {
                //console.log(E.search(K))
                if (E.search(K) !== -1) {
                    //console.log('If')
                    Keywordtrigger = true
                } 
            })

            if (Keywordtrigger === true) Keyword.push({keyword: E, tweet_volume: EVolume})
        })

        TotalCryptoTrends = Keyword.length
   

        GetCountryData = await TwitterTrends.findOne({country: Country})


        if (await GetCountryData !== null) {
            //console.log('In if schleife')
            TrendsArray = await GetCountryData.trends
           
            Keyword.forEach(K => {
                Trend = {Timestamp: new Date(), Keyword: K.keyword, Tweet_volume: K.tweet_volume}
                TrendsArray.push(Trend)
            })
            //console.log(TrendsArray, 'Number of trenfds')
           


            NumberTrends = TotalTrends +await GetCountryData.totalTrends
            NumberCryptoTrends = TotalCryptoTrends +await GetCountryData.totalCryptoTrends
         
            UpdatedData = {
                countryname: await GetCountryData.countryname,
                country: await GetCountryData.country,
                totalCryptoTrends: await NumberCryptoTrends,
                totalTrends: NumberTrends,
                trends: await TrendsArray,
                LastUpdated: new Date()
            }

            //console.log(UpdatedData)
            await GetCountryData.update(UpdatedData)
        } else if (await GetCountryData === null) {
            TrendsArray = []

            Keyword.forEach(K => {
                Trend = {Timestamp: new Date(), Keyword: K.keyword, Tweet_volume: K.tweet_volume}
                TrendsArray.push(Trend)
            })
        
            NewData = new TwitterTrends({
                countryname: CountryName,
                country: Country,
                totalCryptoTrends: Keyword.length,
                totalTrends: TotalTrends,
                trends: TrendsArray,
                LastUpdated: new Date()
            })
            //console.log(await NewData)

            NewData.save(function(err) {
                if(err) console.log(err)
            }) 
          
        }








        
    } catch(e) {
        console.log(e);
        process.exit(-1);
    }
    //process.exit();
  })();
}






setInterval (function() {
    ReqTime = new Date()
    Minuten = ReqTime.getMinutes()
    Stunden = ReqTime.getHours() + 1

    if (Stunden === 0 && Minuten === 1) {
        CountryList.forEach((C, index) =>  {
            setTimeout(() => {
                
                Country = C
                CountryName = woeid.getWoeid(Country).country
                
                CountryWoeid = woeid.getWoeid(Country).woeid
                //https://api.twitter.com/2/users/:id/mentions
                //const endpointURL = "https://api.twitter.com/2/tweets?ids="
                endpointURL = `https://api.twitter.com/1.1/trends/place.json?id=${CountryWoeid}`
                
                //console.log(CountryName, Country)
                ExecuteFuntcion()
                
                console.log(new Date())
            },index * 60000 * 18)
        })
    }
}, 60000)





}