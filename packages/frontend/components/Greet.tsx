import { useContractRead } from 'wagmi'
import { constants } from '../constants'
import { useIsMounted } from '../hooks/useIsMounted'

export const Greeter = () => {
  const { data } = useContractRead(
    {
      addressOrName: constants.contractAddress,
      contractInterface: constants.contractInterface
    },
    'greet',
    {
      watch: true,
      onError: (error) => {console.log(error)}
    },
  )

  const mounted = useIsMounted()
  if (!mounted) return null

  return <p>{data}</p>
}