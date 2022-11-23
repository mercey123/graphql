import Button from '../button/button';
import SearchBar from '../search-bar/search-bar';
import React from 'react';
import './header.css';

function Header() {
	return (
		<div className="header">
			<SearchBar />
			<div className='header__buttons'>
				<Button buttonText={"Светлая тема"} />
				<Button buttonText={"Темная тема"} />
			</div>
		</div>
	);
}

export default Header;
