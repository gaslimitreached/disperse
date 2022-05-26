import { ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react'
import { useContractWrite, useSigner } from 'wagmi'
import { constants } from '../constants'

export const ChangeGreeting = () => {
  const [greeting, setGreeting] = useState('')
  const { data: signer } = useSigner();
  const { isLoading, write } = useContractWrite(
    {
      addressOrName: constants.contractAddress,
      contractInterface: constants.contractInterface,
      signerOrProvider: signer,
    },
    'setGreeting',
    {
      args: [greeting],
      onSuccess: () => { setGreeting('') },
      onError: (error) => { console.log(error) }
    }
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    write()
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setGreeting(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={greeting} onChange={handleChange} />
      <input disabled={isLoading} type="submit" value="Update Greeting" />
    </form>
  )
}
