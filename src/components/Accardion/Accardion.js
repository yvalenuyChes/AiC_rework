import { useState } from "react"
import { CSSTransition } from 'react-transition-group'
import styles from './Accardion.module.scss'


export default function AccordionBlock({ title, content }) {

	const [active, toggleActive] = useState(false)

	return (
		<div className={styles.accordion}>
			<div
				className={styles.accordion__summary}
				onClick={() => toggleActive(prev => !active)}
				role="button"
				tabIndex={0}
			>
				<div className={
					active 
					? `${styles.accordion__arrow + ' ' + styles.active}`
					: `${styles.accordion__arrow}`
					} />
				<h3>{title}</h3>
			</div>
			<div className={styles.accordion__content}>
				<CSSTransition
					in={active}
					timeout={500}
					classNames={styles.accordionList}
					unmountOnExit
					mountOnEnter
				>
					{content}
				</CSSTransition>
			</div>
		</div>
	)
}