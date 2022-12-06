import Button from '../button/button';
import SearchBar from '../search-bar/search-bar';
import React from 'react';
import './header.css';

const darkTheme = () => {
	document.body.className = 'dark-theme'
	localStorage.setItem('theme', 'dark')
}

const lightTheme = () => {
	document.body.className = 'light-theme'
	localStorage.setItem('theme', 'light')
}

function Header() {
	const theme = localStorage.getItem('theme')

	if (!theme || theme === 'light') {
		lightTheme()
	}
	if (theme === 'dark') {
		darkTheme()
	}

	return (
		<div className="header">
			<SearchBar />
			<div className='header__buttons'>
				<Button buttonText={"Ligth theme"} handler={lightTheme} />
				<Button buttonText={"Dark theme"} handler={darkTheme} />
			</div>
		</div>
	);
}

export default Header;
