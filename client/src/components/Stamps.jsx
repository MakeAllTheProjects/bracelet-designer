import axios from 'axios'
import React from 'react'

import { baseURL } from '../App'

import './Stamps.scss'

import arrow from '../assets/down-arrow-2.svg'

export default function Stamps (props) {
	const { blankSize } = props
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

	const nextStampSet = () => {
		if (currentSet === stampSetNames.length - 1) {
			setCurrentSet(0)
		} else {
			setCurrentSet(currentSet + 1)
		}
	}

	const prevStampSet = () => {
		if (currentSet === 0) {
			setCurrentSet(stampSetNames.length - 1)
		} else {
			setCurrentSet(currentSet - 1)
		}
	}

	return (
		<section className="stamps">
			<img
				alt="go back"
				className="arrow left"
				title="go back"
				src={arrow}
				onClick={() => prevStampSet()}
			/>
			<div className="stamp-set">
				{stampSetNames.length > 0 && stamps[stampSetNames[currentSet]].map(stamp => (
					<div
						key={stamp.id}
						className="stamp"
						style={
							{
								height: `${stamp.size / 1.75}rem`,
								width: stamps[stampSetNames[currentSet]].includes("symbol") ? 'auto' : `${stamp.size / 1.75}rem`,
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
			</div>
			<img
				alt="go forward"
				className="arrow right"
				title="go forward"
				src={arrow}
				onClick={() => nextStampSet()}
			/>			
		</section>
	)
}