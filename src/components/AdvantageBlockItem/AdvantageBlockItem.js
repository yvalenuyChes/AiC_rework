import Image from 'next/image'
import styles from './AdvantageBlockItem.module.scss'
import { AnimationOnScroll } from 'react-animation-on-scroll'

export default function AdvantagesItem({ title, subtitle, img, animation }) {
	return (
		<AnimationOnScroll
		animateIn={animation}
		style={{'height':'300px', 'width':'300px'}}
	>
		<div className={styles.advantages__item}>
		
				<h3 className={styles.advantages__item_title}>{title}</h3>
				<div className={styles.advantages__item_subtitle}>{subtitle}</div>
				<div className={styles.advantages__item_img}>
					<Image src={img} alt="" />
				</div>
			
		</div>
		</AnimationOnScroll>
	)
}