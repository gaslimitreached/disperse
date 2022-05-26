import { useContractRead } from 'wagmi'
import { constants } from '../constants'
import { useMounted } from '../hooks/mounted'

export const Greeter = () => {
  const { data } = useContractRead(
    {
      addressOrName: constants.contractAddress,
      contractInterface: constants.contractInterface
    },
    'greet',
    {
      watch: true,
    },
  )

  const mounted = useMounted()
  if (!mounted) return null

  return <p>{data}</p>
}