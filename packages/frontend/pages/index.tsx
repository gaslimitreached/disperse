import type { NextPage } from 'next'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { constants } from '../constants'
import { DispersePayments } from '../components/DispersePayments'
import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { utils } from 'ethers';

const Home: NextPage = () => {
  const [token ,setToken] = useState('');
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
      // Validate token: throws if the address is invalid.
      utils.getAddress(token)
      setError('')
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
          <label>Token Address:</label>
          <input type="text" value={token} onChange={handleChange} />
          <button type="submit">Submit</button>
          <br />
          <label style={{ color: "red" }}>{ error ? error : ''}</label>

        </form>
        <DispersePayments token={token} />
      </main>
      <footer className={styles.footer} />
    </div>
  )
}

export default Home
