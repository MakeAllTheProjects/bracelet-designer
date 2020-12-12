import React from 'react'

import './Header.scss'

import githubLogo from '../assets/github-image.svg'
import logo from '../assets/logo-thin.png'

export default function Header () {
	return (
		<header className="header">
			<img
				alt="geekerymade logo"
				className="logo"
				src={logo}
				title="geekerymade"
			/>
		</header>
	)
}