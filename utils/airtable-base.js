require('dotenv').config()
const Airtable = require('airtable')

Airtable.configure({
	endpointUrl: process.env.AIRTABLE_ENDPOINT_URL,
	apiKey: process.env.AIRTABLE_API_KEY
})

const base = Airtable.base(process.env.AIRTABLE_BASE)

module.export = base