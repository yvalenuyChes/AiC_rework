import MainContentImg from '../MainContentImage/MainContentImage'

import MSK from '../../../images/countries/MSK.png'
import SOCHI from '../../../images/countries/sochi.jpg'
import KAZ from '../../../images/countries/kazan.png'
import SPB from '../../../images/countries/SPB.png'
import BARN from '../../../images/countries/barnayl.jpg'
import VIB from '../../../images/countries/viborg.jpg'
import { VIBORG_TEXT, SOCHI_TEXT, SPB_TEXT, MSK_TEXT, BARNAYL_TEXT, KAZAN_TEXT } from '../CountryBlockText/CountryBlockText'
import styles from './CountryBlockGallery.module.scss'


export default function CountrieBlockGallery() {
	return (
		<div className={styles.imgGallary}>
			<div className={styles.niderlands}>
				<MainContentImg
					limiter= {true}
					imgSrc={MSK}
					title="Москва"
					content__text_subtitle={MSK_TEXT}
					value='700'
				/>
			</div>
			<div className={styles.maldives}>
				<MainContentImg
					imgSrc={SOCHI}
					title="Сочи"
					content__text_subtitle={SOCHI_TEXT}
					value='300'
				/>
			</div>
			<div className={styles.vengria}>
				<MainContentImg
					imgSrc={KAZ}
					title="Казань"
					content__text_subtitle={KAZAN_TEXT}
					value='540'
				/>
			</div>
			<div className={styles.mram}>
				<MainContentImg
					limiter={true}
					imgSrc={SPB}
					title="Санкт-Петербург"
					content__text_subtitle={SPB_TEXT}
					value='100'
					link={'/saint_petersburg'}
					orderLink={'/saint_petersburg#order_ticketSPB'}
				/>
			</div>
			<div className={styles.newYork}>
				<MainContentImg
					imgSrc={BARN}
					title="Барнаул"
					content__text_subtitle={BARNAYL_TEXT}
					value='450'
				/>
			</div>
			<div className={styles.kanada}>
				<MainContentImg
					imgSrc={VIB}
					title="Выборг"
					content__text_subtitle={VIBORG_TEXT}
					value='465'
				/>
			</div>
		</div>
	)
}