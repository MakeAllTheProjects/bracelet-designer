import React from 'react'

import './App.scss'

import Bracelet from './components/Bracelet'
import Footer from './components/Footer'
import Header from './components/Header'
import PickBlank from './components/PickBlank'
import Stamps from './components/Stamps'

export const baseURL = process.env.IS_PRODUCTION ? 'https://bracelet-designer.herokuapp.com' : 'http://localhost:8080'

export default function App () {
	const [selectedBlank, setSelectedBlank] = React.useState({})

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
				<Stamps/>
			</main>
			<Footer/>
		</div>
	)
}
