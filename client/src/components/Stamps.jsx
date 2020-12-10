import axios from 'axios'
import React from 'react'

import { baseURL } from '../App'

import './Stamps.scss'

export default function Stamps (props) {
	const [stampSetNames, setStampSetNames] = React.useState([])
	const [stamps, setStamps] = React.useState({})
	const [currentSet, setCurrentSet] = React.useState(0)

	React.useEffect(() => {
		console.log(stamps)
		if (Object.keys(stamps).length === 0) {
			axios.get(`${baseURL}/api/stamps`)
				.then(res => {
					console.log(res.data.stamps)
					setStamps(res.data.stamps)
					setStampSetNames(Object.keys(res.data.stamps))
				})
		}
	}, [stamps])



	return (
		<section className="stamps">
			{/* {stampSetNames.length > 0 && stampSetNames.map(setName => <p>{setName}</p>)} */}
			{stampSetNames.length > 0 && stamps[stampSetNames[currentSet]].map(stamp => (
				<div
					key={stamp.id}
					className="stamp"
					style={
						{
							height: `${stamp.size / 1.5}rem`,
							width: stamps[stampSetNames[currentSet]].includes("symbol") ? 'auto' : `${stamp.size / 1.5}rem`
						}
					}
				>
					<img
						alt={stamp.text}
						src={stamp.symbol.url}
						title={stamp.text}
					/>
				</div>
			))}
		</section>
	)
}