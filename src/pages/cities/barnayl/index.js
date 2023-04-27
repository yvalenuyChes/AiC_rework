import CityPage from "@/components/CityPage";
import styles from './styles.module.scss'

export default function Barnaul(){
   return(
      <CityPage
         cityName='Барнаул'
         cityNameEng={'barnayl'}

         firstImage={styles.kitchenFirstImage}
         firstText={'Text'}
         firstTitle={'Первый ресторан'}
         firstCardImage={styles.firstCardItem}

         secondImage={styles.kitchenSecondImage}
         secondTitle='Второй ресторан'
         secondText={'Text'}
         secondCardImage={styles.secondCardItem}

         thirdImage={styles.kitchenThirdImage}
         thirdTitle={'Третий ресторан'}
         thirdText={'Text'}
         thirdCardImage={styles.thirdCardItem}

         fourthImage={styles.interestingFirstImage}
         fourthTitle={'Первое интересное место'}
         fourthText={'Text'}
         fourthCardImage={styles.fourthCardItem}

         fifthImage={styles.interestingSecondImage}
         fifthTitle={'Второе интересное место'}
         fifthText={'Text'}
         fifthCardImage={styles.fifthCardItem}

         sixthImage={styles.interestingThirdImage}
         sixthTitle={'Третье интересное место'}
         sixthText={'Text'}
         sixthCardImage={styles.sixthCardItem}
      />
   )
}