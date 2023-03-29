import {useState} from 'react'

import styles from './style.module.scss'

export default function Card({ idCard, title, subtitle }) {

	const [active, toggleActive] = useState(false)

	return (
		<div
			className={active ? `${styles.card_wrapper + ' ' + styles.active}` : `${styles.card_wrapper}`}
			onClick={() => toggleActive(prev => !active)}
		>
			<div className={styles.card}>
				<div
					className={styles.front}
					id={idCard}
				>
					<div className={styles.card__title}>{title}</div>
				</div>
				<div className={styles.back}>
					<div className={styles.card__subtitle}>{subtitle}</div>
				</div>
			</div>
		</div>
	)
}