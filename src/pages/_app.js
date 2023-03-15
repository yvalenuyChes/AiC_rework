import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import '../styles/_styles.scss'


export default function App({ Component, ...rest }) {


  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return <Provider store={store} >
      <Component {...pageProps} />
  </Provider>
   
}
