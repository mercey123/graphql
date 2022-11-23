import React from 'react';
// import getUser from '../';
import './search-bar.css';

class SearchBar extends React.Component {
	constructor(props: any) {
		super(props)
	}

	render() {
		return (
			<div className="search_bar">
				<input className="search_bar__input" type="search" onKeyDown={debounce((event: any) => {
					if (event.target.value != "") {
						// getUser(event.target.value).then((data: any) => {
						// 	if (data === undefined) { return }
						// 	this.setState(data)
						// })
					}
				}, 500)} />
			</div>
		);
	}
}

const debounce = (func: any, time: number) => {
	let timeout: number
	return (...args: any) => {
		clearTimeout(timeout)
		timeout = window.setTimeout(() => {
			timeout = 0
			func(...args)
		}, time)
	}
}

export default SearchBar;
