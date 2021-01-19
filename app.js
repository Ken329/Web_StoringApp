//static files
const express = require('express')
const parser = require('body-parser')
const { check, validateResult} = require('express-validator')
const app = express()
const port = 3000
const dbService = require('./static/js/dbService')

app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))

const urlEncode = parser.urlencoded({extended: false})

//set views
app.set('views', './view')
app.set('view engine', 'ejs')

app.get('', (req, res)=>{
    res.render('index')
})
app.post('/submit', urlEncode, (req, res)=>{
    var firstName = req.body.first_name
    var lastName = req.body.last_name
    var age = req.body.age
    var kg = req.body.kg
    var height = req.body.height

    const db = dbService.getDbServiceInstance()

    const result = db.submitData(firstName, lastName, age, kg, height)
    result
    .then(data => {
        if(data === true){
            res.send('Successful submit file')
        }
    })
    .catch(err => console.log(err))
})
app.get('/getInfoData', urlEncode, (req, res)=>{
    const db = dbService.getDbServiceInstance()

    const result = db.getInfoData()
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err))
})
app.listen(port, () => console.info(`Listening on port ${port}`))