import {
  useState,
  ChangeEventHandler,
  FormEventHandler
} from 'react';
import { utils } from 'ethers';

import { Balance } from '../components/Balance'
import { TokenDispersalForm } from './TokenDispersalForm'

export const DisperseTokens = () => {
  const [token, setToken] = useState('');
  const [valid, setValid] = useState(false);
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
      utils.getAddress(token)
      setError('')
      setValid(true)
    } catch (error: any) {
      if (error.message.includes('invalid address')) {
        setError('invalid address')
      } else {
        setError(error.message)
      }
      return
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Token Address"
          type="text"
          value={token}
          onChange={handleChange}
          size={46}
        />
        <button type="submit">Next</button>
        <br />
        <label style={{ color: "red" }}>{error ? error : ''}</label>

      </form>
      {valid && token.length ? <Balance token={token} /> : <></>}
      {valid && token.length ? <TokenDispersalForm token={token} /> : <></>}
    </>
  )
}