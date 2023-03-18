import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBody from './navBody'
import {toggleNavOpen} from '../../../redux/slices/openNav'
import styles from './NavBarComponents.module.scss'


export default function NavBodyWrapper() {

	const navOpen = useSelector(state => state.navOpen.navOpen)
	const dispatch = useDispatch()

	useEffect(() => {
		if (navOpen) {
			const paddingBody = window.innerWidth - document.documentElement.clientWidth
			document.body.classList.add('bodyLock')
			document.body.style.paddingRight = `${paddingBody}px`
		} else {
			document.body.classList.remove('bodyLock')
			document.body.style.paddingRight = '0px'
		}
	}, [navOpen])

	return (
		<>
			<div
				className={navOpen ? `${styles.nav__button + ' ' + styles.active}` : `${styles.nav__button}`  }
				onClick={() => {dispatch(toggleNavOpen())}}
				role="button"
				tabIndex={0}
			>
				<span />
			</div>
			<NavBody />
		</>
	)
}