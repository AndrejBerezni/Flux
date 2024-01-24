'use client'
import { useState, useEffect } from 'react'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { IoMdSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

import { showSecondaryModal } from '@/store/modal'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function LocationSearchInput({
  variant,
}: {
  variant: 'pickupLocation' | 'returnLocation'
}) {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [inputValue, setInputValue] = useState<string>('')
  const [blurTriggered, setBlutTriggered] = useState<boolean>(false)

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set(variant, term)
    } else {
      params.delete(variant)
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    handleSearch(event.target.value)
  }

  useEffect(() => {
    setInputValue(vehicleSearch[variant])
  }, [vehicleSearch[variant], blurTriggered])

  return (
    <>
      <label
        htmlFor={`${variant}-search`}
        className="absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]"
      >
        {vehicleSearch.sameReturn
          ? 'Pick-up & return'
          : variant === 'pickupLocation'
            ? 'Pick-up'
            : 'Return'}
      </label>
      <input
        type="text"
        id={`${variant}-search`}
        className="w-full rounded-md px-10 py-3 font-medium caret-brand outline outline-1 outline-tertiary focus:outline-2 focus:outline-brand"
        placeholder="Airport or city"
        autoComplete="off"
        onFocus={() =>
          dispatch(
            showSecondaryModal({
              secondaryModal: variant,
              outerType: 'invisible',
            })
          )
        }
        onChange={(e) => handleChange(e)}
        onBlur={() => setBlutTriggered((prev) => !prev)}
        value={inputValue}
      />
      <IoMdSearch className="absolute left-2 top-1/4 text-2xl" />
    </>
  )
}
