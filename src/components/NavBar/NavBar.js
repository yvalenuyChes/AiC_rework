import Link from 'next/link'
import styles from './NavBar.module.scss'
import NavBodyWrapper from './NavBarComponents/navBodyWrapper'


export default function Nav() {
	return (
		<nav className={styles.navbar} >
			<div className={styles.navbar__body}>
				<div className={styles.navbar__logo}>
					<Link href="/"></Link>
				</div>
				<NavBodyWrapper />
			</div>
		</nav>
	)
}