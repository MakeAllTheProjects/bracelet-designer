import React from 'react'
import './Bracelet.scss'

export default function Bracelet (props) {
	const { bracelet } = props

	console.log(bracelet)

	return (
		<section
			className="bracelet-container"
			style={{
				height: bracelet && bracelet.width ? `calc(${(bracelet.width / 6) * 85}vw)` : 'calc(3.54167vw)',
				filter: bracelet 
					?	bracelet.metal === 'Copper' 
						? 'hue-rotate(175deg) saturate(265%)' 
						: bracelet.metal === 'Brass'
							? 'hue-rotate(200deg) saturate(250%)'
							: 'grayscale(100%)'
					: 'grayscale(100%)'
			}}
		>
			<div
				className="bracelet"
				style={{
					height: bracelet && bracelet.width ? `calc(${(bracelet.width / 6) * 85}vw)` : 'calc(3.54167vw)',
					borderRadius: bracelet && bracelet.shape === "tapered" ? '100%' : '15rem'
				}}
			>

			</div>
		</section>
	)
}