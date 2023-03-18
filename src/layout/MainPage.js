import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ButtonToTop from '../components/ButtonToTop/ButtonToTop'
import NavBar from '../components/NavBar/NavBar'


import styles from './styles.module.scss'

export default function MainPage({ children }) {

	const navOpen = useSelector(state => state.navOpen.navOpen)

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
		const wrapper = document.querySelector(`.${styles.wrapper}`)
		if(navOpen){
			wrapper.classList.add(`${styles.blur}`)
		}else{
			wrapper.classList.remove(`${styles.blur}`)
		}
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})

	return (
		<>
			{scrolling ? null : <NavBar />}

				<main className={styles.wrapper}>
					{children}
				</main>
				<ButtonToTop />
		</>
	)
}