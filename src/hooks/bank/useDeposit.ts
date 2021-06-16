import { useContract } from '../useContract'
import { useCallback, useState } from 'react'
import { useAccounts } from '../useAccounts'

export const useDeposit = () => {
  const contract = useContract()
  const { myAccount } = useAccounts()
  const [loading, setLoading] = useState(false)

  const deposit = useCallback(
    async (amount: string, callback?: any) => {
      if (!contract || !myAccount) return
      let options = {
        from: myAccount,
      }
      setLoading(true)
      let confirmed = false
      let errored = false
      // Send a transaction to blockchain
      contract.methods
        .deposit(amount)
        .send(options)
        .on('error', (error: any) => {
          setLoading(false)
          if (!errored) {
            console.error(error)
            errored = true
          }
        })
        .on('confirmation', (confirmationNumber: any, receipt: any) => {
          console.log('confirmationNumber', confirmationNumber)
          console.log(receipt)
          setLoading(false)
          if (!confirmed) {
            if (callback) {
              callback()
            }
            confirmed = true
          }
        })
    },
    [contract, myAccount],
  )

  return {
    deposit,
    loading
  }
}
