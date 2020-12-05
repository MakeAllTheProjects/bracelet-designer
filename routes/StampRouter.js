const express = require('express')

const stampRouter = express.Router()

stampRouter.get('/', async (req, res, next) => {
	try {
		res.send({
			success: true
		})
	} catch (err) {
		if (err) {
			console.error(err)
		}
		res.send({
			success: false
		})
	}
})

module.exports = stampRouter
