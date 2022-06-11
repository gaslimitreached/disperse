import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { DisperseTokens } from '../components/DisperseTokens'
import { DisperseEthers } from '../components/DisperseEther'
import { constants } from '../constants'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [mechanism, setMechanism] = useState('eth')

  return (
    <div className={styles.container}>
      <Head>
        <title>{constants.appName}</title>
        <meta name="description" content={constants.description?? constants.appName} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {constants.appName}
        </h1>
        <ConnectButton />
        <br />
        <button onClick={() => { setMechanism('eth')} }>Eth</button>
        <button onClick={() => { setMechanism('token')} }>Token</button>
        <br />
        { mechanism == 'token' ? <DisperseTokens /> : <DisperseEthers /> }
      </main>
      <footer className={styles.footer} />
    </div>
  )
}

export default Home
