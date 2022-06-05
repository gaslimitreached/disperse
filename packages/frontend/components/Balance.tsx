import { useAccount, useBalance } from 'wagmi'
import { useIsMounted } from '../hooks/useIsMounted'

interface BalanceProps {
  token: string
}

export const Balance = ({ token }: BalanceProps) => {
  const { data: account } = useAccount()
  const { data: balance } = useBalance({
    addressOrName: account?.address,
    token
  })

  const mounted = useIsMounted()
  if (!mounted) return null
  console.log(balance?.symbol)
  return <p>You have {balance?.formatted} {balance?.symbol}</p>
}