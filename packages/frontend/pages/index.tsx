import type { NextPage } from 'next'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { constants } from '../constants'
import { DispersePayments } from '../components/DispersePayments'
import { useState, ChangeEventHandler } from 'react';

const Home: NextPage = () => {
  const [token ,setToken] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault()
    setToken(e.target.value)
  }

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
        <label>Token Address:</label>
        <input type="text" value={token} onChange={handleChange} />
        
        <DispersePayments token={token} />
      </main>
      <footer className={styles.footer} />
    </div>
  )
}

export default Home
