import { createContext, useContext, useEffect, useState } from 'react'

const DarkModeContext = createContext()

export const DarkModeContextProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(true)

	const handleDarkMode = () => {
		localStorage.setItem('pinit- darkMode', !darkMode)
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		const darkMode = localStorage.getItem('pinit- darkMode') === 'true'
		setDarkMode(darkMode)
	}, [])

	return (
		<DarkModeContext.Provider value={{ darkMode, handleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	)
}

export const useDarkMode = () => useContext(DarkModeContext)
