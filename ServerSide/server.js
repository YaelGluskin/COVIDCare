const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const PORT = process.env.PORT || 3500
// The logger wull be before everything else
app.use(logger)
// Receive and parse json data
app.use(express.json())

// Navigate to the public
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
// Handle the pages who dont find
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){ // What type of respond to sent
        res.sendFile(path.join(__dirname, 'views', '404.html'))
       
    } // For a jason request that wasent routed properly
    else if(req.accepts('jason')) {
        res.json({message: 'Not Found'})
    } else { // Edge case
        res.type('txt').send('Not Found')
        }
})
app.listen(PORT, () => console.log(`Srever runnng on port ${PORT}`))