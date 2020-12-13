import axios from 'axios'
import React from 'react'

import { baseURL } from '../App'

import './Stamps.scss'

import arrow from '../assets/down-arrow-2.svg'

export default function Stamps (props) {
	const { 
		blankSize,
		largestStamp,
		setLargestStamp,
		selectedStamps,
		setSelectedStamps
	} = props

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

	const selectStamp = (stamp, fitsBlank) => {
		if (fitsBlank) {
			const newStampSet = [...selectedStamps, stamp]
			setSelectedStamps(newStampSet)
			if (stamp.size > largestStamp) {
				setLargestStamp(stamp.size)
			}
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
				{stampSetNames.length > 0 && stamps[stampSetNames[currentSet]].map(stamp => {
					const fitsBlank = blankSize > (stamp.size * 0.0393701) + 0.015
					return (
						<div
							key={stamp.id}
							className="stamp"
							style={
								{
									height: `${stamp.size / 1.75}rem`,
									width: stamps[stampSetNames[currentSet]].includes("symbol") ? 'auto' : `${stamp.size / 1.75}rem`,
									background: fitsBlank ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.15)',
									boxShadow: fitsBlank ? 'rgba(0, 0, 0, 0.25) 0.5rem 0.5rem 0.5rem' : 'none'
								}
							}
							title={stamp.text}
							onClick={() => selectStamp(stamp, fitsBlank)}
						>
							<img
								alt={stamp.text}
								src={stamp.symbol.url}
								style={{
									opacity: fitsBlank ? '100%' : '30%'
								}}
							/>
						</div>
					)
				})}
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
