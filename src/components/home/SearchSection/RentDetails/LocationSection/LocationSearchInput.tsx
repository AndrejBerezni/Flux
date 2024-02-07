'use client'
import { useState, useEffect, useId } from 'react'

import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { IoMdSearch } from 'react-icons/io'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

import { showSecondaryModal } from '@/store/modal'
import { removeLocation } from '@/store/vehicleSearch'
import { getVehicleSearchInfo } from '@/store/vehicleSearch/selectors'

export default function LocationSearchInput({
  variant,
  labelInvisible,
  readOnly,
}: {
  variant: 'pickupLocation' | 'returnLocation'
  labelInvisible?: boolean
  readOnly?: boolean
}) {
  const dispatch = useDispatch()
  const vehicleSearch = useSelector(getVehicleSearchInfo)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const inputId = useId()
  const [inputValue, setInputValue] = useState<string>('')
  const [blurTriggered, setBlurTriggered] = useState<boolean>(false)

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set(variant, term)
    } else {
      params.delete(variant)
    }
    replace(`${pathname}?${params.toString()}`)
  }, 600)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    handleSearch(event.target.value)
  }

  const handleRemoveInput = () => {
    dispatch(removeLocation(variant))
    setInputValue('')
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
        onFocus={() => {
          dispatch(
            showSecondaryModal({
              secondaryModal: variant,
              outerType: 'invisible',
            })
          )
        }}
        onChange={(e) => handleChange(e)}
        onBlur={() => {
          setBlurTriggered((prev) => !prev)
        }}
        value={inputValue}
        readOnly={readOnly}
      />
      <IoMdSearch
        className={clsx('absolute top-1/4 text-2xl', {
          'left-2': !labelInvisible,
          'left-4': labelInvisible,
        })}
      />
      {inputValue !== '' && (
        <RiDeleteBack2Line
          className={clsx(
            'absolute top-1/4 z-30 text-2xl hover:scale-105 hover:cursor-pointer hover:text-brand',
            {
              'right-2': !labelInvisible,
              'right-4': labelInvisible,
            }
          )}
          onClick={handleRemoveInput}
        />
      )}
    </>
  )
}
