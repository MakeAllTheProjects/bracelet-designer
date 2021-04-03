import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { baseURL } from '../App'
import './Stamps.scss'
import arrow from '../assets/down-arrow-2.svg'
import spaceIcon from '../assets/rounded-black-square-shape.svg'

export default function Stamps(props) {
	const {
		blankSize,
		largestStamp,
		setLargestStamp,
		selectedStamps,
		setSelectedStamps,
		setErrorMessage
	} = props

	const [stampSetNames, setStampSetNames] = useState([])
	const [stamps, setStamps] = useState({})
	const [currentSet, setCurrentSet] = useState(0)
	const [keyPressed, setKeyPressed] = useState('')

	const keyPress = (event) => {
		event.key && setKeyPressed(event.key)
	}

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

	const selectStamp = (stamp, fits) => {
		if (fits) {
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
		if (selectedStamps.length > 0) {
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

	const stampControls = [
		{
			label: "Clear",
			action: clearStamps
		},
		{
			label: "Backspace",
			action: removeStamp
		},
		{
			label: "Space",
			action: addSpace
		}
	]

	const fitsBlank = (size) => blankSize > (size * 0.0393701) + 0.015

	useEffect(() => {
		window.addEventListener("keydown", event => keyPress(event))
		return window.removeEventListener("keydown", event => keyPress(event))
	}, [])

	useEffect(() => {
		if (Object.keys(stamps).length === 0) {
			axios.get(`${baseURL}/api/stamps`)
				.then(res => {
					setStamps(res.data.stamps)
					setStampSetNames(Object.keys(res.data.stamps))
				})
		}
	}, [stamps])

	useEffect(() => {
		if (keyPressed !== '') {
			if (keyPressed === ' ') {
				addSpace()
				setKeyPressed('')
			} else if (keyPressed === 'Backspace') {
				removeStamp()
				setKeyPressed('')
			} else {
				const filtered = stamps?.[stampSetNames?.[currentSet]] ? stamps[stampSetNames[currentSet]].filter(stamp => stamp.text === keyPressed) : []
				if (filtered.length > 0) {
					selectStamp(filtered[0], fitsBlank(filtered[0].size))
				}
				setKeyPressed('')
			}
		}
	}, [keyPressed])


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
				<div className="stamp-set">
					{stampSetNames.length > 0 && stamps[stampSetNames[currentSet]].map(stamp => {
						return (
							<div
								key={stamp.id}
								className="stamp"
								style={
									{
										height: `${stamp.size * 0.75}rem`,
										width: stamps[stampSetNames[currentSet]].includes("symbol") ? 'auto' : `${stamp.size * 0.75}rem`,
										background: fitsBlank(stamp.size) ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.15)',
										boxShadow: fitsBlank(stamp.size) ? 'rgba(0, 0, 0, 0.25) 0.5rem 0.5rem 0.5rem' : 'none'
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
			<div className="stamp-controls">
				{stampControls.map(control => (
					<div
						key={`control-${control.label}`}
						className="stamp-control-button"
						onClick={control.action}
						style={{
							width: control.label === 'Space' ? '40%' : 'auto'
						}}
					>
						{control.label}
					</div>
				))}
			</div>
		</section>
	)
}
