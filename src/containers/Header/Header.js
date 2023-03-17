import HeaderScene from "../../components/HeaderScene/HeaderScene"
import useWindowWidth from "../../custumHooks/useWindowWidth"
import styles from './Header.module.scss'


function Header() {

	const width = useWindowWidth()

	return (
		<header
			className={styles.header}
			id="header"
		>
			{width > 1000
				? (
					<>
						<HeaderScene />
						<div className={styles.wave} />
					</>
				)
				: <div className={styles.fonPhone} />}
			<div className={styles.header__text}>
				<div className={styles.header__title}>
					<h2>Мы покажем тебе удивительный мир!
               <br />
               За пределами стен есть то, что может тебя поразить
               </h2>
				</div>
			</div>
			<div className={styles.header__squere} />
		</header>
	)
}

export default Header