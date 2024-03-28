import { useState } from 'react'

import clsx from 'clsx'
import { FaCheck } from 'react-icons/fa6'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import { setRentInsurance } from '@/store/vehicleRent'
import {
  getRentInsuranceInfo,
  getRentSubscriptionInfo,
} from '@/store/vehicleRent/selectors'

function InsuranceCard({
  insurance,
}: {
  insurance: {
    name: string
    price: string
    text: string
  }
}) {
  const dispatch = useDispatch()
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const { name, price, text } = insurance
  const insuranceCoverage = useSelector(getRentInsuranceInfo)
  return (
    <div className="mb-3 w-full rounded-md border-[1px] border-primary p-2 shadow-md sm:w-2/3">
      <div className="flex items-center gap-4">
        {/* Custom radio button: */}
        <div
          className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-primary hover:cursor-pointer"
          onClick={() => dispatch(setRentInsurance(name))}
        >
          <div
            className={clsx('h-[10px] w-[10px] rounded-full bg-primary', {
              hidden: insuranceCoverage !== name,
              block: insuranceCoverage === name,
            })}
          ></div>
        </div>

        {/* Insurance name: */}
        <h3 className="text-xl font-semibold capitalize">{name} coverage</h3>

        {/* Show/hide additional info button: */}
        {showInfo ? (
          <IoIosArrowUp
            className="ml-auto hover:cursor-pointer"
            onClick={() => setShowInfo(false)}
          />
        ) : (
          <IoIosArrowDown
            className="ml-auto hover:cursor-pointer"
            onClick={() => setShowInfo(true)}
          />
        )}
      </div>

      {/* Additional info: */}
      <div
        className={clsx('overflow-hidden transition-all duration-300', {
          'h-0': !showInfo,
          'h-[80px] max-[320px]:h-[100px]': showInfo,
        })}
        style={{ transitionProperty: 'height' }}
      >
        <p className="mt-3 text-lg">{text}</p>
        <p className="flex items-center gap-2 text-lg">
          <FaCheck /> Includes theft protection
        </p>
      </div>

      {/* Price: */}
      <p className="text-lg font-semibold text-brand">{price}</p>
    </div>
  )
}

export default function InsuranceSelect() {
  const subscription = useSelector(getRentSubscriptionInfo)
  //To be fetched from db later:
  const insurances = [
    {
      name: 'maximum',
      price:
        subscription.details.insurance === 'maximum'
          ? 'Included in subcription'
          : '19.29€ / per day',
      text: '€0.00 financial responsibility',
    },
    {
      name: 'medium',
      price:
        subscription.details.insurance === 'medium'
          ? 'Included in subcription'
          : '11.58€ / per day',
      text: '700.00€ financial responsibility',
    },
    {
      name: 'minimum',
      price: 'Included',
      text: '1450.00€ financial responsibility',
    },
  ]
  return (
    <div className="bg-white px-4 py-3">
      <h2 className="mb-2 text-2xl font-bold text-secondaryText">Insurance</h2>
      {/* Do not display lesser insurances if user already has insurance included in their subscription */}
      {subscription.details.insurance === 'maximum' ? (
        <InsuranceCard
          key={`${insurances[0].name}-insurance-card`}
          insurance={insurances[0]}
        />
      ) : subscription.details.insurance === 'medium' ? (
        insurances
          .slice(0, 2)
          .map((insurance) => (
            <InsuranceCard
              key={`${insurance.name}-insurance-card`}
              insurance={insurance}
            />
          ))
      ) : (
        insurances.map((insurance) => (
          <InsuranceCard
            key={`${insurance.name}-insurance-card`}
            insurance={insurance}
          />
        ))
      )}
    </div>
  )
}