import { utils } from 'ethers'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { useContractWrite, useSigner } from 'wagmi'
import { constants } from '../constants'

interface DispersePaymentsProps {
  token: string
}

export const DispersePayments = ({ token }: DispersePaymentsProps) => {
  const [entry, setEntry] = useState('')
  const [targets, setTargets] = useState([''])
  const [amounts, setAmounts] = useState([0])

  const { data: signer } = useSigner();
  const { isLoading, write } = useContractWrite(
    {
      addressOrName: constants.contractAddress,
      contractInterface: constants.contractInterface,
      signerOrProvider: signer,
    },
    'disperse',
    {
      args: [token, targets, amounts],
      onSuccess: () => { resestStates() },
      onError: (error) => { console.log(error) }
    }
  )

  const resestStates: Function = (): void => {
    setEntry('')
    setTargets([])
    setAmounts([])
  }

  const parseEntry: Function = (): void => {
    const lines = entry.split('\n')
    const recipients: string[] = [];
    const amounts: number[] = [];

    lines.forEach(line => {
      const [target, amount] = line.split(',')
      console.log(target, amounts)
      if (target && amount && !isNaN(parseInt(amount.trim()))) {
        targets.push(target.trim())
        amounts.push(parseInt(amount.trim()))
      }
    })
    setTargets(recipients)
    setAmounts(amounts)
    console.log(...targets, ...amounts)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    console.log(token)
    try {
      // Validate token: throws if the address is invalid.
      utils.getAddress(token);
    } catch (error) {
      // TODO: toast
      console.log('we made a boo boo')
      console.error(error)
      return
    }
    // parse entry into targest and amounts
    parseEntry()
    
    write()
  }

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = async (e) => {
    e.preventDefault()
    setEntry(e.target.value)
    parseEntry()
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows={5}
        cols={20}
        value={entry}
        onChange={handleChange}
      />
      <br />
      <input disabled={isLoading} type="submit" value="Disperse" />
      <br />
      <label>Address and amount seperated by a comma. One target per line.</label> 
    </form>
  )
}
