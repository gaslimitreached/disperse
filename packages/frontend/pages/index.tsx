import type { NextPage } from 'next'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { constants } from '../constants'
import { Greeter } from '../components/Greet'
import { ChangeGreeting } from '../components/ChangeGreeting'

const Home: NextPage = () => {
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

        <div className={styles.description}>
        </div>

        <ConnectButton />
        <Greeter />
        <ChangeGreeting />
      </main>
      <footer className={styles.footer} />
    </div>
  )
}

export default Home
