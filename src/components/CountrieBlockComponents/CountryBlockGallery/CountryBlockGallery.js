import MainContentImg from '../MainContentImage/MainContentImage'

import niderlandsImg from '../../../images/countries/nider.png'
import maldivesImg from '../../../images/countries/mal.png'
import vengriaImg from '../../../images/countries/vengr.png'
import mramCanyonImg from '../../../images/countries/mram.png'
import newYorkImg from '../../../images/countries/NY.png'
import kanadaImg from '../../../images/countries/kanada.png'
import { KANADA_TEXT, MALDIVES_TEXT, MRAM_KANYON_TEXT, NIRERLAND_TEXT, NY_TEXT, VENGRIA_TEXT } from '../CountryBlockText/CountryBlockText'
import styles from './CountryBlockGallery.module.scss'


export default function CountrieBlockGallery() {
	return (
		<div className={styles.imgGallary}>
			<div className={styles.niderlands}>
				<MainContentImg
					limiter="limiter"
					imgSrc={niderlandsImg}
					title="Нидерланды"
					content__text_subtitle={NIRERLAND_TEXT}
					value='3500'
				/>
			</div>
			<div className={styles.maldives}>
				<MainContentImg
					imgSrc={maldivesImg}
					title="Мальдивы"
					content__text_subtitle={MALDIVES_TEXT}
					value='4000'
				/>
			</div>
			<div className={styles.vengria}>
				<MainContentImg
					imgSrc={vengriaImg}
					title="Венгрия"
					content__text_subtitle={VENGRIA_TEXT}
					value='1500'
				/>
			</div>
			<div className={styles.mram}>
				<MainContentImg
					limiter="limiter"
					imgSrc={mramCanyonImg}
					title="Мраморный каньон"
					content__text_subtitle={MRAM_KANYON_TEXT}
					value='200'
				/>
			</div>
			<div className={styles.newYork}>
				<MainContentImg
					imgSrc={newYorkImg}
					title="Нью Йорк"
					content__text_subtitle={NY_TEXT}
					value='2000'
				/>
			</div>
			<div className={styles.kanada}>
				<MainContentImg
					imgSrc={kanadaImg}
					title="Канада"
					content__text_subtitle={KANADA_TEXT}
					value='1000'
				/>
			</div>
		</div>
	)
}