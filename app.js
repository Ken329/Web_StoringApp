//static files
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))

//set views
app.set('views', './view')
app.set('view engine', 'ejs')

app.get('', (req, res)=>{
    res.render('index')
})

app.listen(port, () => console.info(`Listening on port ${port}`))