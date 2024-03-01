import { useState, useEffect } from 'react'

import { ISubscriptionWithDescription } from '@/compiler/interfaces'

export default function useSubscriptions() {
  const [subscriptions, setSubscriptions] =
    useState<ISubscriptionWithDescription[]>()

  useEffect(() => {
    const getSubscriptions = async () => {
      const subscriptionList = await fetch('/api/subscriptions')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`)
          }
          return response.json()
        })
        .catch((error) => console.log(error.message))
      setSubscriptions(subscriptionList)
    }
    getSubscriptions()
  }, [])
  return subscriptions
}
