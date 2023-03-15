import { useEffect, useState } from 'react'
import ButtonToTop from '../components/ButtonToTop/ButtonToTop'

import NavBar from '../components/NavBar/NavBar'
export default function MainPage({ children }) {

	const [scrolling, toggleScrolling] = useState(false)
	let [lastScrolling, toggleLastScrolling] = useState(0)
	const [directionDown, toggleDirectionDown] = useState(false)

	const handleScroll = () => {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop


		if (scrollTop > lastScrolling && !directionDown) {
			toggleScrolling(true)
			toggleDirectionDown(true)
		} else if (scrollTop < lastScrolling) {
			toggleScrolling(false)
			toggleDirectionDown(false)
		}
		toggleLastScrolling(lastScrolling = scrollTop)
	}


	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})

	return (
		<>
			{scrolling ? null : <NavBar />}
			<div className="wrapper">
				<main>
					{children}
				</main>
				<ButtonToTop />
			</div>
		</>
	)
}