import MainContentImg from '../MainContentImage/MainContentImage'

import MSK from '../../../images/countries/MSK.png'
import VORZ from '../../../images/countries/VORZ.png'
import NN from '../../../images/countries/NN.png'
import SPB from '../../../images/countries/SPB.png'
import NRK from '../../../images/countries/NRK.png'
import SRTV from '../../../images/countries/SRTV.png'
import { KANADA_TEXT, MALDIVES_TEXT, MRAM_KANYON_TEXT, NIRERLAND_TEXT, NY_TEXT, VENGRIA_TEXT } from '../CountryBlockText/CountryBlockText'
import styles from './CountryBlockGallery.module.scss'


export default function CountrieBlockGallery() {
	return (
		<div className={styles.imgGallary}>
			<div className={styles.niderlands}>
				<MainContentImg
					limiter= {true}
					imgSrc={MSK}
					title="Москва"
					content__text_subtitle={NIRERLAND_TEXT}
					value='700'
					link={'/moscow'}
				/>
			</div>
			<div className={styles.maldives}>
				<MainContentImg
					imgSrc={VORZ}
					title="Воронеж"
					content__text_subtitle={MALDIVES_TEXT}
					value='300'
				/>
			</div>
			<div className={styles.vengria}>
				<MainContentImg
					imgSrc={NN}
					title="Нижний новгород"
					content__text_subtitle={VENGRIA_TEXT}
					value='540'
				/>
			</div>
			<div className={styles.mram}>
				<MainContentImg
					limiter={true}
					imgSrc={SPB}
					title="Санкт-Петербург"
					content__text_subtitle={MRAM_KANYON_TEXT}
					value='600'
				/>
			</div>
			<div className={styles.newYork}>
				<MainContentImg
					imgSrc={NRK}
					title="Норильск"
					content__text_subtitle={NY_TEXT}
					value='450'
				/>
			</div>
			<div className={styles.kanada}>
				<MainContentImg
					imgSrc={SRTV}
					title="Саратов"
					content__text_subtitle={KANADA_TEXT}
					value='465'
				/>
			</div>
		</div>
	)
}