import Slider from 'react-slick'
import styles from './SliderStyles.module.scss'
import BusTicketForm from './Slides/Bus'
import TrainTicketForm from './Slides/Train'
import PlaneTicketForm from './Slides/Plane'
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
				<BusTicketForm
					sliderTitle="Автобус"
					sliderBackground={styles.slider__busBackground}
				/>
				<TrainTicketForm
					sliderTitle="Поезд"
					sliderBackground={styles.slider__trainBackground}
				/>
				<PlaneTicketForm
					sliderTitle="Самолет"
					sliderBackground={styles.slider__planeBackground}
				/>
			</Slider>
		</div>
	)
}