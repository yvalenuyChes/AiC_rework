import { useState, useEffect } from 'react'

function useWindowWidth() {
	const [width, setWidth] = useState(0)
	useEffect(() => {
		setWidth(window.innerWidth)
	}, [width])
	return width
}

export default useWindowWidth