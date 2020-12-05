require('dotenv').config()

const cors = require('cors')
const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

const stampRouter = require('./routes/StampRouter')

const server = express()

const whitelist = [
	'http://localhost:3000',
	'http://localhost:8080',
	'https://bracelet-designer.herokuapp.com'
]

const corsOptions = {
	origin: function (origin, callback) {
		console.log("** Origin of request " + origin)
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			console.log("Origin acceptable")
			callback(null, true)
		} else {
			console.log("Origin rejected")
			callback(new Error('Not allowed by CORS'))
		}
	}
}

server.use(express.json())
server.use(cors(corsOptions))
server.use(serveStatic(__dirname + '/client/build'))

server.get("/", (req, res) => {
	res.send({ message: "Hello World!" })
})

server.use('/api/stamps', stampRouter)

server.use((err, req, res, next) => {
	if (err) {
		console.error(err)
		if (err.name === 'UnauthorizedError') {
			res.status(err.status)
		}
		return res.send({
			message: err.message
		})
	}
})

if (process.env.NODE_ENV === 'production') {
	server.use(express.static(path.join(__dirname, 'client/build')))
	server.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	});
}

server.listen(
	process.env.PORT || 4000,
	() => console.log(`Server listening on port ${process.env.PORT || 4000}`)
)