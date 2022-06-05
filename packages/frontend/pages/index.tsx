import type { NextPage } from 'next'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { utils } from 'ethers';
import { DispersePayments } from '../components/DispersePayments'
import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { Balance } from '../components/Balance'

import styles from '../styles/Home.module.css'
import { constants } from '../constants'

const Home: NextPage = () => {
  const [token ,setToken] = useState('');
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault()
    setToken(e.target.value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    
    if (token.length < 1) {
      setError('input token address')
      return
    }

    try {
      utils.getAddress(token)
      setError('')
      setValid(true)
    } catch (error: any) {
      // TODO: toast
      if (error.message.includes('invalid address')) {
        setError('invalid address')
      } else {
        setError(error.message)
      }
      return
    }
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
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Token Address"
            type="text"
            value={token}
            onChange={handleChange}
            size={46}
          />
          <button type="submit">Next</button>
          <br />
          <label style={{ color: "red" }}>{ error ? error : ''}</label>

        </form>
        { valid && token.length ? <Balance token={token} /> : <></>}
        { valid && token.length ? <DispersePayments token={token} /> : <></>}
      </main>
      <footer className={styles.footer} />
    </div>
  )
}

export default Home
