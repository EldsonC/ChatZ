const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

const path = require('path')

const chat = require('./routes/chat')

const expressHandlebars = require('express-handlebars')

    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    app.set('views', path.join(__dirname, '../src'))
    app.engine('html', require('ejs').renderFile)
    app.set('view engine', 'html')

    app.use('*/css', express.static(path.join(__dirname + '/public/css')))
    app.use('*/img', express.static(path.join(__dirname + '/public/img')))
    app.use('*/js', express.static(path.join(__dirname + '/public/js')))
    app.use('*/sound', express.static(path.join(__dirname + '/public/sound')))


app.use('/chatz', chat)

let messages = []

io.on('connection', socket => {
    console.log(`<<===>> | SOCKET CONECTADO: ${socket.id} | <<===>>`)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })
})

const hostPort = process.env.PORT || 5000

server.listen(hostPort, () => {
    console.log('<<===>> | SERVER ACTIVE | <<===>>')
})