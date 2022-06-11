import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import {
  Chain,
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  ApiProvider
} from '@rainbow-me/rainbowkit'
import { chain, createClient, WagmiProvider } from 'wagmi'
import { StaticJsonRpcProvider, WebSocketProvider } from '@ethersproject/providers'
import { constants } from '../constants'

const defaultChains: Chain[] = [chain.goerli]

if (constants.NODE_ENV == 'development') {
  defaultChains.push({
    id: 31337,
    name: 'Local Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'local',
      symbol: 'LOCAL',
    },
    rpcUrls: { default: 'http://127.0.0.1:8545' },
    testnet: true,
  })
}

const apiProviders: ApiProvider<StaticJsonRpcProvider, WebSocketProvider>[] = [
  apiProvider.alchemy(process.env.ALCHEMY_ID),
  apiProvider.fallback(),
]

const { chains, provider } = configureChains(defaultChains, apiProviders)
const { connectors } = getDefaultWallets({ appName: constants.APP_NAME, chains })

const client = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider client={client}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiProvider>
  )
}

export default MyApp
