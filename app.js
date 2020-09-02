let express = require('express')
let app = express()
let favicon = require('serve-favicon')
let bodyParser = require('body-parser')
let helmet = require('helmet')
let ejs = require("ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())


// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

let index = require("./routes/index.js")


app.use('/', index)



app.listen(8080)