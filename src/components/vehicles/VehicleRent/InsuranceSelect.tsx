import { useState, useEffect } from 'react'

import { useSearchParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'

import { IInsurance } from '@/compiler/interfaces'
import { VehicleType } from '@/compiler/types'
import LoaderAnimation from '@/components/Loader'
import { fetchInsurances } from '@/lib/server_actions/rentActions'
import { setRentInsurance } from '@/store/vehicleRent'
import { getRentSubscriptionInfo } from '@/store/vehicleRent/selectors'

import InsuranceCard from './InsuranceCard'

export default function InsuranceSelect() {
  const dispatch = useDispatch()
  const params = useSearchParams()
  const vehicle = params.get('vehicleType')
  const subscription = useSelector(getRentSubscriptionInfo)
  const [insurances, setInsurances] = useState<IInsurance[]>([])

  useEffect(() => {
    const handleInsurances = async () => {
      const insuranceList = await fetchInsurances(vehicle as VehicleType)
      if (insuranceList) {
        dispatch(setRentInsurance(insuranceList[0]))
        setInsurances(insuranceList as IInsurance[])
      }
    }
    handleInsurances()
  }, [vehicle])

  return (
    <div className="w-full bg-white px-4 py-3">
      <h2 className="mb-2 text-2xl font-bold text-secondaryText">Insurance</h2>
      {/* Do not display lesser insurances if user already has insurance included in their subscription */}
      {insurances.length > 0 ? (
        subscription.details.insurance === 'maximum' ? (
          <InsuranceCard
            key={`${insurances[0].coverage_name}-insurance-card`}
            insurance={insurances[0]}
            includedInSubscription
          />
        ) : subscription.details.insurance === 'medium' ? (
          insurances
            .slice(0, 2)
            .map((insurance) => (
              <InsuranceCard
                key={`${insurance.coverage_name}-insurance-card`}
                insurance={insurance}
                includedInSubscription={insurance.coverage_name === 'medium'}
              />
            ))
        ) : (
          insurances.map((insurance) => (
            <InsuranceCard
              key={`${insurance.coverage_name}-insurance-card`}
              insurance={insurance}
              includedInSubscription={false}
            />
          ))
        )
      ) : (
        <div className="flex w-full items-center justify-center pt-4">
          <LoaderAnimation size="small" color="brand" />
        </div>
      )}
    </div>
  )
}
