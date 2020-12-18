import axios from 'axios'
import React from 'react'

import { baseURL } from '../App'

import './Stamps.scss'

import arrow from '../assets/down-arrow-2.svg'
import spaceIcon from '../assets/rounded-black-square-shape.svg'

export default function Stamps (props) {
	const { 
		blankSize,
		largestStamp,
		setLargestStamp,
		selectedStamps,
		setSelectedStamps,
		setErrorMessage
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
			if (selectedStamps.length < 40) {
				const newStampSet = [...selectedStamps, stamp]
				setSelectedStamps(newStampSet)
				if (stamp.size > largestStamp) {
					setLargestStamp(stamp.size)
				}
			} else {
				setErrorMessage("Sorry, only 40 characters can fit on this bracelet")
			}
		}
	}

	const removeStamp = () => {
		if(selectedStamps.length > 0) {
			if (selectedStamps.length === 40) {
				setErrorMessage("")
			}
			const newSelectedStamps = selectedStamps.splice(0, selectedStamps.length - 1)
			setSelectedStamps(newSelectedStamps)
		}
	}

	const clearStamps = () => {
		if (selectedStamps.length > 0) {
			if (selectedStamps.length === 40) {
				setErrorMessage("")
			}
			setSelectedStamps([])
		}
	}

	const addSpace = () => {
		if (selectedStamps.length < 40) {
			const newStampSet = [
				...selectedStamps,
				{
					id: 'space',
					size: 2,
					symbol: {
						img_id: 'space-svg',
						url: spaceIcon
					}
				}
			]
			setSelectedStamps(newStampSet)
		} else {
			setErrorMessage("Sorry, only 40 characters can fit on this bracelet")
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
			<div className="stamp-keyboard">
				<div className="stamp-controls">
					<div
						className="stamp-control-button"
						onClick={() => addSpace()}
					>
						Space
					</div>
					<div 
						className="stamp-control-button" 
						onClick={() => removeStamp()}
					>
						Backspace
					</div>
					<div 
						className="stamp-control-button"
						onClick={() => clearStamps()}
					>
						Clear
					</div>
				</div>
				<div className="stamp-set">
					{stampSetNames.length > 0 && stamps[stampSetNames[currentSet]].map(stamp => {
						const fitsBlank = blankSize > (stamp.size * 0.0393701) + 0.015
						console.log(stamp.size)
						return (
							<div
								key={stamp.id}
								className="stamp"
								style={
									{
										height: `${stamp.size * 0.75}rem`,
										width: stamps[stampSetNames[currentSet]].includes("symbol") ? 'auto' : `${stamp.size * 0.75}rem`,
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
