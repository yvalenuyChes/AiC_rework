import CityPage from '@/components/CityPage'
import {
	FIFTH_TEXT_ITEM,
	FIRST_TEXT_ITEM,
	FOURTH_TEXT_ITEM,
	SECOND_TEXT_ITEM,
	SIXTH_TEXT_ITEM,
	THIRD_TEXT_ITEM
} from '../../../components/CityPageComponents/CountriesPageText/moscow_text'
import styles from './styles.module.scss'


export default function Saint_petersburg(){

   return(
      <CityPage
         cityName={'Санкт-Петербург'}
         cityNameEng={'spb'}

         firstImage={styles.kitchenFirstImage}
         firstText={FIRST_TEXT_ITEM}
         firstTitle={'Первый ресторан'}
         firstCardImage={styles.firstCardItem}

         secondImage={styles.kitchenSecondImage}
         secondTitle='Второй ресторан'
         secondText={SECOND_TEXT_ITEM}
         secondCardImage={styles.secondCardItem}

         thirdImage={styles.kitchenThirdImage}
         thirdTitle={'Третий ресторан'}
         thirdText={THIRD_TEXT_ITEM}
         thirdCardImage={styles.thirdCardItem}

         fourthImage={styles.interestingFirstImage}
         fourthTitle={'Первое интересное место'}
         fourthText={FOURTH_TEXT_ITEM}
         fourthCardImage={styles.fourthCardItem}

         fifthImage={styles.interestingSecondImage}
         fifthTitle={'Второе интересное место'}
         fifthText={FIFTH_TEXT_ITEM}
         fifthCardImage={styles.fifthCardItem}

         sixthImage={styles.interestingThirdImage}
         sixthTitle={'Третье интересное место'}
         sixthText={SIXTH_TEXT_ITEM}
         sixthCardImage={styles.sixthCardItem}
      />
   )
}