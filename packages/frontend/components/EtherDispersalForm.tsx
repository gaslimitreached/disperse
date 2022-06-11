import { utils } from 'ethers'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { useContractWrite, useSigner } from 'wagmi'
import { constants } from '../constants'
import { DisplayPayout } from './DisplayPayouts'
import { TotalAmount } from './TotalAmounts'

export const EtherDispersalForm  = () => {
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
    'disperseEther',
    {
      args: [targets, amounts],
      overrides: {
        value: utils.parseEther(
          amounts.reduce((prev, curr) => prev + curr, 0).toString())
      },
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
      if (target && amount && !isNaN(parseInt(amount.trim()))) {
        recipients.push(target.trim())
        amounts.push(parseInt(amount.trim()))
      }
    })
    setTargets(recipients)
    setAmounts(amounts)
    console.log(...targets, ...amounts)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

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
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={5}
          cols={43}
          value={entry}
          onChange={handleChange}
        />
        <br />
        <input disabled={isLoading} type="submit" value="Disperse" />
        <br />
        <label>Address and amount seperated by a comma. One target per line.</label> 
      </form>
      {
        amounts.length > 0
        ? (
          <>
            <DisplayPayout targets={targets} amounts={amounts} />
            <TotalAmount amounts={amounts} />
          </>
          )
        : (<></>)
      }
    </div>
  )
}
