'use client'

import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { getModalInfo } from '@/store/modal/selectors'

import DateTimeSection from './DateTimeSection'
import LocationSection from './LocationSection'
import RentDetailsHeader from './RentDetailsHeader'
import SearchBoxDivider from './SearchBoxDivider'

export default function RentDetails({
  children,
}: {
  children: React.ReactNode[]
}) {
  const modal = useSelector(getModalInfo)

  return (
    <form
      className={clsx(' gap-8 px-4 md:w-full md:flex-wrap md:pb-8 md:pt-10', {
        'hidden md:flex ': modal.modalType !== 'rentDetails',
        'fixed left-0 top-0 z-30 flex h-screen w-screen flex-col bg-white py-4 md:static md:h-auto md:flex-row':
          modal.modalType === 'rentDetails',
      })}
    >
      <RentDetailsHeader />
      <LocationSection>{children}</LocationSection>
      <SearchBoxDivider />
      <DateTimeSection />
    </form>
  )
}
