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
	const [largestStamp, setLargestStamp] = React.useState(0)

	return (
		<div className="app">
			<Header/>
			<main className="app-container">
				<PickBlank
					largestStamp={largestStamp}
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
						largestStamp={largestStamp}
						setLargestStamp={setLargestStamp}
						selectedStamps={selectedStamps}
						setSelectedStamps={setSelectedStamps}
					/>
				)}
			</main>
			<Footer/>
		</div>
	)
}
