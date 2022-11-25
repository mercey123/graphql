import React, { useContext } from 'react';
import { UserContext } from '../app/app';
import './search-bar.css';

export default function SearchBar() {
	const { setUser } = useContext(UserContext)

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		let temp = event.target.value.trim()
		if (temp.length < 1) {
			return
		}

		setUser(temp)
	}

	return (
		<div className="search_bar">
			<input
				className="search_bar__input"
				type="text"
				placeholder={"Enter your nickname..."}
				onChange={debounce(inputHandler, 1000)}
			/>
		</div>
	);
}

const debounce = (func: (...args: any[]) => void, time: number) => {
	let timeout: number
	return (...args: any[]) => {
		clearTimeout(timeout)
		timeout = window.setTimeout(() => {
			timeout = 0
			func(...args)
		}, time)
	}
}
