/*
const express = require('express')
const app = express()

const mongoose = require('mongoose')
*/
const fetch = require('node-fetch')
module.exports = function() {

    
const ChannelInfo = require('../FetchModels/youtubeapi/channelInfo.js');
const FetchList = require('../FetchModels/youtubeapi/fetchlist.js');

//PORT = process.env.PORT || 20003 

//https://www.googleapis.com/youtube/v3/channels?part=statistics&id={self.channel_id}&key={self.api_key}
//https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCbXgNpp0jedKWcQiULLbDTA&key=AIzaSyCeBCATXWq6JNRd86F0-l__qZGiK5xyKTw

// Google API KEY AIzaSyCeBCATXWq6JNRd86F0-l__qZGiK5xyKTw
// Open Database connection

/*
const dbURI = 'mongodb+srv://schmidie:Microstar978!@barbershop.2eazy.mongodb.net/Bitlytics?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then( (result) => app.listen(PORT))
    .catch((err) => console.log(err))
*/

FetchListURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=bitcoin&type=channel&key=AIzaSyA3am3bLCx3vMVUTdw8u3Mo4syGG2rrNyM'

const FetchListIntervall = async Url => {
    try{
        Budget -= 100
        const res = await fetch(Url)
        const resjson = await res.json()
        console.log(await resjson)
        const resarray = await resjson.items
        console.log(await resarray)
        ChannelArray = []
        await resarray.forEach(e => {
            console.log(e.snippet.channelTitle)
            ChannelArray.push({YtID: e.id.channelId, Name: e.snippet.channelTitle})
            //console.log(e.id.channelId)
        });

       function CreateDataset(DataDB){
        
        //console.log(DataDB.channelIds, 'Concat')
        newArray = DataDB.channelIds.concat(ChannelArray)
        //console.log(newArray, 'New Array')
        function findDup(Array) {
            uniqueArray = []
            indexArray = []
            for(let key of Array) {
                if(!uniqueArray.includes(key.YtID)) {
                    uniqueArray.push(key.YtID)
                    indexArray.push(Array.indexOf(key))
                }
                else {
                    
                }
            }
            RetArray= []
            indexArray.forEach(E => {
                RetArray.push(newArray[E])
            })
           
            return RetArray
        }
       
        sorted= findDup(newArray)
        //console.log(sorted)
        Datatest= {
            channelIds: sorted,
            LastUpdated: new Date()
        }
        return Datatest
       }

        DataDB = await FetchList.findById({_id: 'FetchList'})

        //console.log(await DataDB, 'Data aus DB')

       if (await DataDB == null) {
           // Nur wenn DB zurückgesetzt wird!!!!!
            Data = new FetchList({
                channelIds: ChannelArray,
                LastUpdated: new Date()
            })   
            Data.save(function(err) {
                if(err) console.log(err)
            })   
            //console.log(Data)
       }
       else {
        await DataDB.update(CreateDataset(await DataDB))
       
       }


        


    }catch(err) {
        console.log(err)
    }
    
}





async function FetchChannelInfoIntervall() {
    DataDB = await FetchList.findById({_id: 'FetchList'})
    console.log(await DataDB)
    FetchObjects = DataDB.channelIds

    FetchObjects.forEach(E => {
        FetchChannelInfo(E.YtID, E.Name)   
    })
}







const FetchChannelInfo = async (YTID, Name) => {
    
    try{
        //YTID= 'UCfnNL_HtS5dKl5WCCJ4tBgg'
        ChannelInfoUrl = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+YTID+'&key=AIzaSyA3am3bLCx3vMVUTdw8u3Mo4syGG2rrNyM'
        Budget -=1
        let res = await fetch(ChannelInfoUrl)
        let resjson = await res.json()
        let resdata = await resjson.items[0].statistics
        
        DataDB = await ChannelInfo.findOne({YtID: YTID})
        //console.log (await DataDB)
        ViewCount = resdata.viewCount
        VideoCount = resdata.videoCount
        if (resdata.hiddenSubscriberCount === true) SubscriberCount =  0
        SubscriberCount = resdata.subscriberCount
        if (await DataDB === null) {
            Data = new ChannelInfo({
                YtID: YTID,
                Name: Name,
                channelInfo: {Timestamp: new Date(), ViewCount, VideoCount, SubscriberCount},
                LastUpdated: new Date()
            })   
            Data.save(function(err) {
                if(err) console.log(err)
            })   
        }else {

            ChannelInfoArray = await DataDB.channelInfo
            Test = {Timestamp: new Date(), ViewCount, VideoCount, SubscriberCount}
            ChannelInfoArray.push(Test )

            console.log(ChannelInfoArray)
            //SubscriberCount
            ChannelInfoData = {
                YtID: DataDB.YtID,
                Name: DataDB.Name,
                channelInfo: ChannelInfoArray,
                LastUpdated: new Date()
            }
            await DataDB.update(ChannelInfoData)
            

            console.log(ChannelInfoData)
            
        }   
        
        
        
        



    }catch(err) {
        console.log(err)
    }
}

/*
FetchChannelInfoIntervall();
*/


Budget = 10000


setInterval(async function() {
    console.log('IntervalChannelInfo läuft')
    ReqTime = new Date()
    Minuten = ReqTime.getMinutes()
    Stunden = ReqTime.getHours() + 1
    console.log(Minuten, Stunden)
    if(Stunden === 23 && Minuten === 55) {
        Budget = 10000
        CheckFetchList = await FetchList.findById({_id: 'FetchList'})
        if (await CheckFetchList === null) FetchListLength= 0
        else FetchListLength = await CheckFetchList.channelIds.length

        if (Budget > FetchListLength && FetchListLength !== 0) { 
        FetchChannelInfoIntervall()
        }
    }
}, 60000)




setInterval(async function() {
    console.log('Intervallist läuft')
    CheckFetchList = await FetchList.findById({_id: 'FetchList'})
    if (await CheckFetchList === null) FetchListLength= 0
    else FetchListLength = await CheckFetchList.channelIds.length
    //Checkt ob Fetch List vorhanden ist und wie groß die ist, da Limit bei Api calls von 10000Units/24 Stunden
    if( await FetchListLength < 9000 && Budget > 500+FetchListLength ) {
        //console.log(500+FetchListLength)
        //console.log(FetchListLength)
        FetchListIntervall(FetchListURL)
    }
}, 3600000) // Jede Stunde 3600000ssss
   




//https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCiciruB9iiUmKT8C6qk8T4w&key=AIzaSyCeBCATXWq6JNRd86F0-l__qZGiK5xyKTw


}