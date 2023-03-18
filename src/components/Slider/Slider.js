import Slider from 'react-slick'
import Slide from './Slides/Slide'
import styles from './SliderStyles.module.scss'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function SliderBlock() {
	const settings = {
		infinite: false,
		slides: 1,
		slidesToScroll: 1,
		className: styles.slider__wrapper,
		draggable: true
	}

	return (
		<div className={styles.slider}>
			<Slider {...settings}>
				<Slide
					sliderTitle="Автобус"
					sliderBackground={styles.slider__busBackground}
				/>
				<Slide
					sliderTitle="Поезд"
					sliderBackground={styles.slider__trainBackground}
				/>
				<Slide
					sliderTitle="Самолет"
					sliderBackground={styles.slider__planeBackground}
				/>
			</Slider>
		</div>
	)
}