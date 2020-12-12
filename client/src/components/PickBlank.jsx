import axios from 'axios'
import React from 'react'
import Select from 'react-select'

import { baseURL } from '../App'

import './PickBlank.scss'

export default function PickBlank (props) {
	const { selectedBlank, setSelectedBlank } = props
	const [blanksOptions, setBlanksOptions] = React.useState([])
	
	React.useEffect(() => {
		if (blanksOptions && blanksOptions.length < 1) {
			axios.get(`${baseURL}/api/blanks`)
				.then(res => {
					const blanks = res.data.blanks.map(blank => {
						return {
							value: blank,
							label: `${blank.shape.charAt(0).toUpperCase()}${blank.shape.slice(1)} - ${blank.width}" x ${blank.length}" - ${blank.metal}`
						}
					})
					setBlanksOptions(blanks)
				})
		}
	}, [blanksOptions])

	const selectStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: 'rgba(255, 255, 255, 0.45)',
			fontFamily: 'Montserrat, sans-serif',
			fontSize: '1.5rem',
			border: state.isFocused || state.isSelected ? '$white5 solid 2px' : '$white2 solid 3px',
			'&:hover': {
				borderColor: state.isFocused ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)',
				boxShadow: 'none !important'
			},
			'&:focus-within': {
				borderColor: state.isFocused ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)',
				boxShadow: 'none !important'
			}
		}),
		placeholder: (provided, state) => ({
			...provided,
			fontFamily: 'Montserrat, sans-serif',
			fontSize: '1.5rem'
		}),
		menu: (provided, state) => ({
			...provided,
			backgroundColor: 'rgba(255, 255, 255, 0.8)'
		}),
		noOptionsMessage: (provided, state) => ({
			...provided,
			color: 'rgba(0, 0, 0, 0.5)',
			fontFamily: 'Montserrat, sans-serif',
			fontSize: '1.5rem',
		}),
		option: (provided, state) => ({
			...provided,
			fontFamily: 'Montserrat, sans-serif',
			fontSize: '1.5rem'
		}),
		input: (provided, state) => ({
			...provided,
			fontFamily: 'Montserrat, sans-serif',
			fontSize: '1.5rem'
		})
	}

	return (
		<form
			className="pick-blank"
		>
			{blanksOptions.length > 0 && (
				<Select
					styles={selectStyles}
					options={blanksOptions}
					onChange={({value}) => setSelectedBlank(value)}
				/>
			)}
		</form>
	)
}