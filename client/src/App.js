import React from 'react'

import './App.scss'

import Bracelet from './components/Bracelet'
import Footer from './components/Footer'
import Header from './components/Header'
import PickBlank from './components/PickBlank'
import Stamps from './components/Stamps'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://braclet-designer.herokuapp.com' : 'http://localhost:8080'

export default function App () {
	const [selectedBlank, setSelectedBlank] = React.useState({})
	const [selectedStamps, setSelectedStamps] = React.useState([])

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
					selectedStamps={selectedStamps}
				/>
				{selectedBlank.shape && (
					<Stamps 
						blankSize={selectedBlank.width}
						selectedStamps={selectedStamps}
						setSelectedStamps={setSelectedStamps}
					/>
				)}
			</main>
			<Footer/>
		</div>
	)
}
