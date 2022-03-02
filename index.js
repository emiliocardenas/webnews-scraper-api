const PORT = 8000
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()




const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/us/',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate',
        base: '',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/',
        base: '',
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/',
        base: 'https://www.smh.com.au',
    },
    {
        name: 'un',
        address: 'https://www.un.org/',
        base: '',
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news',
        base: 'https://www.bbc.co.uk',
    },
    {
        name: 'es',
        address: 'https://www.standard.co.uk/',
        base: 'https://www.standard.co.uk'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/',
        base: 'https://www.dailymail.co.uk/'
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/',
        base: ''
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Russia")', html).each(function () {
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

app.get('/russia-related', (req, res) => {
    res.json(articles)
})

app.get('/crypto', (req, res) => {
    
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
