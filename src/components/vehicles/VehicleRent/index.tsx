'use client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { robotoCondensed } from '@/app/fonts'
import { VehicleType } from '@/compiler/types'
import Divider from '@/components/Divider'
import { hideModal } from '@/store/modal'
import { getModalInfo } from '@/store/modal/selectors'
import { getRentVehicleInfo } from '@/store/vehicleRent/selectors'

import InsuranceSelect from './InsuranceSelect'
import RentPrice from './RentPrice'
import RentTimeDateLocation from './RentTimeDateLocation'
import VehicleProperties from '../VehicleCard/VehicleProperties'

export default function VehicleRent({ days }: { days: number }) {
  const dispatch = useDispatch()
  const modal = useSelector(getModalInfo)
  const vehicle = useSelector(getRentVehicleInfo)
  const searchParams = useSearchParams()

  const vehicleType = searchParams.get('vehicleType') as VehicleType

  if (modal.modalType === 'rent') {
    return (
      <article
        className={`${robotoCondensed.className} fixed left-0 top-0 z-30 flex h-screen w-screen flex-col overflow-auto bg-white md:left-1/2 md:top-[5%] md:h-[90%] md:w-[600px] md:-translate-x-1/2 md:rounded-xl md:border-2`}
      >
        <button
          onClick={() => dispatch(hideModal())}
          className="absolute right-2 top-2 text-2xl hover:text-white"
        >
          <IoCloseSharp />
        </button>
        <div className="flex w-full justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 md:rounded-t-lg">
          <Image
            src={vehicle.image_url}
            alt={vehicle.name}
            width={400}
            height={300}
          />
        </div>
        <div className="bg-quaternary px-4 pb-4 pt-2">
          <h1
            className={`${robotoCondensed.className} mb-3 text-3xl font-extrabold uppercase tracking-wider`}
          >
            {'brand' in vehicle && vehicle.brand} {vehicle.name}
          </h1>
          <VehicleProperties vehicle={vehicle} vehicleType={vehicleType} />
        </div>
        <div className="flex flex-col overflow-auto">
          <InsuranceSelect />
          <Divider />
          <RentTimeDateLocation />
          <RentPrice days={days} />
          <button className="btn-primary mb-4 w-1/2 self-center">
            Checkout
          </button>
        </div>
      </article>
    )
  }
}
