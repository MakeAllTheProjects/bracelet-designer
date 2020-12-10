import axios from 'axios'
import React from 'react'

import './App.scss'

import Bracelet from './components/Bracelet'
import Footer from './components/Footer'
import Header from './components/Header'
import PickBlank from './components/PickBlank'

export const baseURL = process.env.IS_PRODUCTION ? 'https://bracelet-designer.herokuapp.com' : 'http://localhost:8080'

export default function App () {
	const [selectedBlank, setSelectedBlank] = React.useState({})
	const [stamps, setStamps] = React.useState([])

	React.useEffect(() => {
		console.log('stamps?')
		axios.get(`${baseURL}/api/stamps`)
			.then(res => {
				console.log(res.data)
			})
	}, [stamps])

	return (
		<div className="app">
			<Header/>
			<main className="app-container">
				<PickBlank
					selectedBlank={selectedBlank}
					setSelectedBlank={setSelectedBlank}
				/>
				<Bracelet
					bracelet={selectedBlank}
				/>
			</main>
			<Footer/>
		</div>
	)
}
