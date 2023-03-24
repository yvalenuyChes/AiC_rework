import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import Head from 'next/head'
import MainPage from '@/layout/MainPage'
import  Header  from '@/containers/Header/Header'
import  Footer  from '@/containers/Footer/Footer'
import Advantages from '@/containers/AdvantagesBlock/AdvantagesBlock'
import CountrieBlock from '@/containers/CountriesBlock/CountriesBlock'
import OrderTicket from '@/containers/OrderTicket/OrderTicket'


export default function Home() {

  const cookies = new Cookies()

  const [isLogin, setLogin] = useState(false)
  useEffect(()=> {
    if(cookies.get('TOKEN')){
      setLogin(true)
    }
  }, [isLogin])

  return (
    <>
      <Head>
        <title>Alice in Wonderland</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPage>
        <Header/>
        <CountrieBlock/>
        {
          isLogin 
          ? <OrderTicket/>
          : null
        }
        
        <Advantages/>
        <Footer/>
      </MainPage>
    </>
  )
}
