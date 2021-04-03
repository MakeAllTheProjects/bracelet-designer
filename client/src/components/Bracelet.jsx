import React from 'react'
import './Bracelet.scss'

export default function Bracelet(props) {
	const { bracelet, selectedStamps } = props

	return (
		<section
			className="bracelet-container"
			style={{
				height: bracelet && bracelet.width ? `calc(${(bracelet.width / 6) * 85}vw)` : 'calc(3.54167vw)',
				filter: bracelet
					? bracelet.metal === 'Copper'
						? 'hue-rotate(175deg) saturate(265%)'
						: bracelet.metal === 'Brass'
							? 'hue-rotate(200deg) saturate(250%)'
							: 'grayscale(100%)'
					: 'grayscale(100%)'
				,
				transition: 'all ease 1s'
			}}
		>
			<div
				className="bracelet"
				style={{
					height: bracelet && bracelet.width ? `calc(${(bracelet.width / 6) * 85}vw)` : 'calc(3.54167vw)',
					borderRadius: bracelet && bracelet.shape === "tapered" ? '100%' : '15rem'
				}}
			>
				{selectedStamps.length > 0 && selectedStamps.map((stamp, i) => (
					<img
						className="stamped"
						alt={stamp.text}
						key={`${stamp.id}-${i}`}
						src={stamp.symbol.url}
						style={{
							height: `calc(${(stamp.size * 0.0383) * 15}vw)`
						}}
						title={stamp.text}
					/>
				))}
			</div>
		</section>
	)
}