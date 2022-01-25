import '../styles/globals.css'
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import allReducers from '../reducers';
import React from 'react';

const store = createStore(allReducers);

const BOTS_USER_AGENTS = [
  'googlebot',
  'google-structured-data-testing-tool',
  'bingbot',
  'linkedinbot',
  'mediapartners-google',
  'yandexbot'
]

export const BotContext = React.createContext()

function MyApp({ Component,isBot, pageProps }) {


  return (
    <>
    <Layout/>
    <BotContext.Provider value={isBot}>
    <Provider store={store} >
    <Component {...pageProps} />
    </Provider>
    </BotContext.Provider>
    </>
  )
 
}

MyApp.getInitialProps = async function getInitialProps({ ctx}) {
  const {req} = ctx
 
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  const isBot = BOTS_USER_AGENTS.some(bot =>
    userAgent.toLowerCase().includes(bot)
  )

  return {
    isBot
  }


}

export default MyApp
