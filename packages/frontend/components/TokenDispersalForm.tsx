import { utils } from 'ethers'
import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react'
import { useContractWrite, useSigner } from 'wagmi'
import { constants } from '../constants'
import { DisplayPayout } from './DisplayPayouts'
import { TotalAmount } from './TotalAmounts'

interface TokenDispersalForm {
  token: string
}

export const TokenDispersalForm  = ({ token }: TokenDispersalForm) => {
  const [entry, setEntry] = useState('')
  const targets = useRef(['']);
  const amounts = useRef([0]);

  const { data: signer } = useSigner();
  const { isLoading, write } = useContractWrite(
    {
      addressOrName: constants.contractAddress,
      contractInterface: constants.contractInterface,
      signerOrProvider: signer,
    },
    'disperse',
    {
      onSuccess: () => { resestStates() },
      onError: (error) => { console.log(error) }
    }
  )

  const resestStates: Function = (): void => {
    setEntry('')
    targets.current = []
    amounts.current = []
  }

  const parseEntry: Function = (): void => {
    const lines = entry.split('\n')
    const recipients: string[] = [];
    const dispersals: number[] = [];

    lines.forEach(line => {
      const [target, amount] = line.split(',')
      if (target && amount && !isNaN(parseFloat(amount.trim()))) {
        recipients.push(target.trim())
        dispersals.push(parseFloat(amount.trim()))
      }
    })
    targets.current = recipients
    amounts.current = dispersals
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    parseEntry()

    write({
      args: [
        token,
        targets.current,
        amounts.current.map(a => utils.parseEther(a.toString()))
      ],
    })
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
          cols={50}
          value={entry}
          onChange={handleChange}
        />
        <br />
        <input disabled={isLoading} type="submit" value="Disperse" />
        <br />
        <label>Address and amount seperated by a comma. One target per line.</label> 
      </form>
      {
        amounts.current.length > 0
        ? (
          <>
            <DisplayPayout targets={targets.current} amounts={amounts.current} />
            <TotalAmount amounts={amounts.current} />
          </>
          )
        : (<></>)
      }
    </div>
  )
}
