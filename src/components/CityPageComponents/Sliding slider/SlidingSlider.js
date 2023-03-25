import styles from './styles.module.scss'


export default function SlidingSlider({ title, subtitle, sendClass }) {
	return (
		<div className={`${styles.img_box} ${sendClass}`}>
			<span className={styles.border_left_rig} />
			<span className={styles.border_top_bot} />
			<div className={styles.container_box}>
				<h2>{title}</h2>
				<p>{subtitle}</p>
			</div>
		</div>
	)
}