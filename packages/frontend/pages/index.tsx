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
        <title>{constants.APP_NAME}</title>
        <meta name="description" content={constants.DESCRIPTION?? constants.APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {constants.APP_NAME}
        </h1>
        {
          constants.NODE_ENV === 'development'
          ? <a href={`https://etherscan.io/address/${constants.CONTRACTS.DISPERSER.ADDRESS}`}>{ constants.CONTRACTS.DISPERSER.ADDRESS }</a>
          : <></>
        }
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
