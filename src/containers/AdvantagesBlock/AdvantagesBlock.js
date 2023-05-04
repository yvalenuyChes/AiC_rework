import AdvantagesItem from '../../components/AdvantageBlockItem/AdvantageBlockItem'
import { 
   FIRST_ITEM_TEXT, 
   FOURTH_ITEM_TEXT, 
   SECOND_ITEM_TEXT, 
   THIRD_ITEM_TEXT 
} from '../../components/AdvantageBlockItem/AdvantageBlockText/AdvantageBlockText'
import styles from './advantagesBlock.module.scss'

import planet from '../../images/advantagesImg/planet.svg'
import tip from '../../images/advantagesImg/tip.svg'
import hands from '../../images/advantagesImg/hands.svg'
import ten from '../../images/advantagesImg/number.svg'

export default function Advantages() {

	return (
		<section className={styles.advantagesBlock} id="advantages">
			<div className={styles.advantagesBlock__title}>
				<h2>Почему именно наша фирма?</h2>
			</div>
			<div className={styles.advantagesBlock__body}>
				<AdvantagesItem
					title="Огромный выбор"
					subtitle={FIRST_ITEM_TEXT}
					img={planet}
					animation={'fadeIn'}
				/>
				<AdvantagesItem
					title="Надежность"
					subtitle={SECOND_ITEM_TEXT}
					img={tip}
				/>
				<AdvantagesItem
					title="Работаем для вас"
					subtitle={THIRD_ITEM_TEXT}
					img={hands}
				/>
				<AdvantagesItem
					title="Стабильность"
					subtitle={FOURTH_ITEM_TEXT}
					img={ten}
				/>
			</div>
		</section >
	)
}