import { useContract } from '../useContract'
import { useCallback, useState, useEffect } from 'react'
import { useAccounts } from '../useAccounts'

export const useBalance = () => {
  const [balance, setBalance] = useState<number>(0)
  const contract = useContract()
  const { myAccount } = useAccounts()

  const fetch = useCallback(async () => {
    if (!contract || !myAccount) return
    let options = {
      from: myAccount,
    }
    const c = await contract.methods.balance().call(options)
    setBalance(parseInt(c as string))
  }, [contract, myAccount])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    balance,
    fetch,
  }
}
