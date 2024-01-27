'use client'
import { useState, useEffect, useId } from 'react'

import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { IoMdSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

import useClearParams from '@/hooks/useClearParams'
import { showSecondaryModal } from '@/store/modal'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function LocationSearchInput({
  variant,
  labelInvisible,
}: {
  variant: 'pickupLocation' | 'returnLocation'
  labelInvisible?: boolean
}) {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const clearParams = useClearParams()
  const [inputValue, setInputValue] = useState<string>('')
  const [blurTriggered, setBlutTriggered] = useState<boolean>(false)
  const inputId = useId()

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

  const handleBlur = () => {
    setBlutTriggered((prev) => !prev)
    clearParams(variant)
  }

  useEffect(() => {
    if (vehicleSearch[variant] !== null) {
      setInputValue(vehicleSearch[variant]!.name)
    } else {
      setInputValue('')
    }
  }, [vehicleSearch[variant], blurTriggered])

  return (
    <>
      <label
        htmlFor={inputId}
        className={clsx(
          'absolute bottom-full mb-1 text-base font-bold md:text-[0.8rem]',
          {
            hidden: labelInvisible,
          }
        )}
      >
        {vehicleSearch.sameReturn
          ? 'Pick-up & return'
          : variant === 'pickupLocation'
            ? 'Pick-up'
            : 'Return'}
      </label>
      <input
        type="text"
        id={inputId}
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
        onBlur={handleBlur}
        value={inputValue}
      />
      <IoMdSearch
        className={clsx('absolute top-1/4 text-2xl', {
          'left-2': !labelInvisible,
          'left-4': labelInvisible,
        })}
      />
    </>
  )
}
