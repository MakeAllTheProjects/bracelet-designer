const express = require('express')
const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appXLEvFCfir1UknZ')

const blanksRouter = express.Router()

blanksRouter.get('/', async (req, res, next) => {
	try {
		await base('blanks').select({
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			const blanks = records.map((record) => {
				return {
					id: record.fields.id,
					cost: record.fields.cost,
					price: record.fields.price,
					length: record.fields.length,
					width: record.fields.width,
					metal: record.fields.metal,
					shape: record.fields.shape,
					available: record.fields.available || false
				}
			})
			fetchNextPage()

			res.send({
				success: true,
				blanks: blanks.filter(blank => blank.available === true)
			})
		}, function done(err) {
			if (err) { 
				console.error(err) 
				return 
			}
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

module.exports = blanksRouter
