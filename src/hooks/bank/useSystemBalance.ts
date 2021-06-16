import { useContract } from '../useContract'
import { useCallback, useState, useEffect } from 'react'

export const useSystemBalance = () => {
  const [systemBalance, setSystemBalance] = useState<number>(0)
  const contract = useContract()

  const fetch = useCallback(async () => {
    if (!contract) return
    const c = await contract.methods.systemBalance().call()
    setSystemBalance(parseInt(c as string))
  }, [contract])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    systemBalance,
    fetch,
  }
}
