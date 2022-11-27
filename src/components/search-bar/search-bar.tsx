import React, { useContext } from 'react';
import AsyncSelect from 'react-select/async';
import { UserContext } from '../app/app';
import './search-bar.css';
import { getUsersBy } from '../../query/search';

const getUsers = async (value: string): Promise<{ label: string }[]> => {
	return getUsersBy(value).then((res) => res.map((name) => ({ label: name })))
}

export default function SearchBar() {
	const { setUser } = useContext(UserContext)

	const inputHandler = (input: { label: string } | null) => {
		if (input) {
			setUser(input.label)
		}
	}

	return (
		<AsyncSelect
			className="search_bar"
			loadOptions={debouncePromise(getUsers, 300)}
			isClearable={true}
			onChange={inputHandler}
			placeholder={"Enter nickname to search..."}
			styles={{
				control: (baseStyles) => ({
					...baseStyles,
					width: "100%"
				}),
			}}
		/>
	);
}

function debouncePromise(func: (...args: any[]) => Promise<any>, time: number) {
	let timeout: number
	let resolves: any[] = [];

	return (...args: any[]): Promise<any> => {
		clearTimeout(timeout);
		timeout = window.setTimeout(() => {
			let result = func(...args);
			resolves.forEach(r => r(result));
			resolves = [];
		}, time);

		return new Promise((r: any) => resolves.push(r));
	};
}