const sourceList = require("./sources")
const PORT = 5068
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()
const _ = require('lodash')

sources = sourceList

// sources.forEach(source =>{
//     console.log("Source name: " + source.name)
// })


const articles = []
const articles2 = []

sources.forEach(source => {
    axios.get(source.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Mortgage")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                // const image = $(this).attr('img')

                articles.push({
                    title,
                    url: source.base + url,
                    // image,
                    source: source.name
                })
            })

        })
})

sources.forEach(source => {
    axios.get(source.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Crypto")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                // const image = $(this).attr('img')

                articles2.push({
                    title,
                    url: source.base + url,
                    // image,
                    source: source.name
                })
            })

        })
})

app.get('/', (req, res) => {
    res.json('Welcome to my News Scraper API')
})

app.get('/russia-related', (req, res) => {
    res.json(articles)
})

app.get('/crypto', (req, res) => {
    res.json(articles2)
    
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
