const express = require('express')
const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appXLEvFCfir1UknZ')

const stampsRouter = express.Router()

stampsRouter.get('/', async (req, res, next) => {
	try {
		await base('stamps').select({
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			const stamps = {}

			records.forEach(record => {
				if (!stamps[record.fields.set]) {
					stamps[record.fields.set] = [{
						id: record.id,
						size: record.fields.size_mm, 
						symbol: {
							img_id: record.fields.symbol[0].id,
							url: record.fields.symbol[0].thumbnails.full.url
						},
						text: record.fields.text,
						type: record.fields.type
					}]
				} else {
					stamps[record.fields.set] = [
						...stamps[record.fields.set],
						{
							id: record.id,
							size: record.fields.size_mm,
							symbol: {
								img_id: record.fields.symbol[0].id,
								url: record.fields.symbol[0].thumbnails.full.url
							},
							text: record.fields.text,
							type: record.fields.type
						}
					]
				}
			})

			res.send({
				success: true,
				stamps: stamps
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

module.exports = stampsRouter
