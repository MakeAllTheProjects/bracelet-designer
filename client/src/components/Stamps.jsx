import axios from 'axios'
import React from 'react'

import { baseURL } from '../App'

import './Stamps.scss'

export default function Stamps (props) {
	const { blankSize } = props
	const [stampSetNames, setStampSetNames] = React.useState([])
	const [stamps, setStamps] = React.useState({})
	const [currentSet, setCurrentSet] = React.useState(1)

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
							width: stamps[stampSetNames[currentSet]].includes("symbol") ? 'auto' : `${stamp.size / 1.5}rem`,
							background: blankSize > stamp.size * 0.0393701 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.15)',
							boxShadow: blankSize > stamp.size * 0.0393701 ? 'rgba(0, 0, 0, 0.25) 0.5rem 0.5rem 0.5rem' : 'none'
						}
					}
					title={stamp.text}
				>
					<img
						alt={stamp.text}
						src={stamp.symbol.url}
						style={{
							opacity: blankSize > stamp.size * 0.0393701 ? '100%' : '30%'
						}}
					/>
				</div>
			))}
		</section>
	)
}