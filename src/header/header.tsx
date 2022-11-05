import Button from '../Button/Button';
import SearchBar from '../search-bar/search-bar';
import React from 'react';
import './header.css';

function Header() {
	return (
		<div className="header">
			<SearchBar />
			<div className='header__buttons'>
				<Button value={"Светлая тема"} />
				<Button value={"Темная тема"} />
			</div>
		</div>
	);
}

export default Header;
