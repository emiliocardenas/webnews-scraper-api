const PORT = 8000
const express = require('express')
// import Express from 'express'
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()



const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'nytimes',
        address: 'https://www.nytimes.com/section/climate',
        base: '',
    },
    {
        name: 'WSJ',
        address: 'https://www.wsj.com/news/world?mod=nav_top_section',
        base: '',
    },
]
const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                // const image = $(this).attr('img')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    // image,
                    source: newspaper.name
                })
            })

        })
})

app.get('/', (req, res) => {
    res.json('Welcome to my News Scraper API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
