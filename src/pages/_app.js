import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../styles/_styles.scss'

export default function App({ Component, ...rest }) {


  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return <Provider store={store} >
      <Component {...pageProps} />
  </Provider>
   
}
