import { useEffect } from 'react'
import styles from './HeaderScene.module.scss'

export default function HeaderScene() {

	useEffect(() => {
		const header = document.querySelector('#header')
		const layers = header.querySelectorAll(`.${styles.layer}`)

		header.addEventListener('mousemove', event => {
			layers.forEach(layer => {
				const speed = layer.getAttribute('data-speed')
				layer.style.transform = `translateX(${event.clientX * speed / 1000}px)`
			})
		})
		return header.removeEventListener('mousemove', event => {
			layers.forEach(layer => {
				const speed = layer.getAttribute('data-speed')
				layer.style.transform = `translateX(${event.clientX * speed / 1000}px)`
			})
		})
	}, [])


	return (
		<div className={styles.scene__body}>
			<div className={styles.layer + ' ' + styles.layer_bg} data-speed="10" />
			<div className={styles.layer + ' ' + styles.layer_girl} data-speed="30" />
		</div>
	)
}