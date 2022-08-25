const sourceList = require("./sources")
const PORT = 5068
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()
const _ = require('lodash')
// const { forEach } = require("lodash")



sources = sourceList

// sources.forEach(source =>{
//     console.log("Source name: " + source.name)
// })


const stocks = ["Apple", "AAPL", "Tesla", "TSLA", "Axsome", "AXSM", "Exelixis", "EXEL", "Bed Bath", "BBBY", "Carvana", "CVNA", "Peloton", "PTON", "Nvidia", "NVDA", "META", "Amazon", "AMZN", "Advanced Micro Devices", "AMD"]
const articles = []

sources.forEach(source => {

    stocks.forEach(stock => {
        const sendGetRequest = async () => {
            const resp = await axios.get(source.address)
            const html = resp.data
            const $ = cheerio.load(html)
            $(`a:contains(${stock})`, html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    lookingFor: stock,
                    title,
                    url: source.base + url,
                    source: source.name
                })
            })

        }
        sendGetRequest();
    })
    
})

// articles.forEach(article => {
//     console.log(article.lookingFor)
// })


app.get('/', (req, res) => {
    res.json('Welcome to my News Scraper API')
})


app.get('/stocks', (req, res) => {
    res.json(articles)
    // console.log(res.json(articles))
    
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
