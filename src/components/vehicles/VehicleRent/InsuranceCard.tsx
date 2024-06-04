import { useState } from 'react'

import clsx from 'clsx'
import { FaCheck } from 'react-icons/fa6'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import { IInsurance } from '@/compiler/interfaces'
import { setRentInsurance } from '@/store/vehicleRent'
import { getRentInsuranceInfo } from '@/store/vehicleRent/selectors'

export default function InsuranceCard({
  insurance,
  includedInSubscription,
}: Readonly<{
  insurance: IInsurance
  includedInSubscription?: boolean
}>) {
  const dispatch = useDispatch()
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const insuranceCoverage = useSelector(getRentInsuranceInfo)
  return (
    <div className="mb-3 w-full rounded-md border-[1px] border-primary p-2 shadow-md sm:w-2/3">
      <div className="flex items-center gap-4">
        {/* Custom radio button: */}
        <div
          className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-primary hover:cursor-pointer"
          onClick={() => dispatch(setRentInsurance(insurance))}
        >
          <div
            className={clsx('h-[10px] w-[10px] rounded-full bg-primary', {
              hidden:
                insuranceCoverage.coverage_name !== insurance.coverage_name,
              block:
                insuranceCoverage.coverage_name === insurance.coverage_name,
            })}
          ></div>
        </div>

        {/* Insurance name: */}
        <h3 className="text-xl font-semibold capitalize">
          {insurance.coverage_name} coverage
        </h3>

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
        <p className="mt-3 text-lg">{insurance.financial_responsibility}</p>
        <p className="flex items-center gap-2 text-lg">
          <FaCheck /> Includes theft protection
        </p>
      </div>

      {/* Price: */}
      <p className="text-lg font-semibold text-brand">
        {includedInSubscription
          ? 'Included in subscription'
          : insurance.price_description}
      </p>
    </div>
  )
}
