'use client'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { IUser } from '@/compiler/interfaces'
import Divider from '@/components/Divider'
import { passwordReset } from '@/firebase/authentication'
import { countryCodes } from '@/lib/countryCodes'
import { setMessage } from '@/store/modal'

import { updateUser } from '../../../lib/server_actions/updateUserAction'

export default function AccountDetailsForm({
  user,
}: Readonly<{ user: IUser }>) {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleEmailExplanation = () => {
    dispatch(
      setMessage({
        type: 'error',
        text: 'Changing email not allowed - If you wish to use different email address - please create a new account with desired address.',
      })
    )
  }

  const handlePasswordReset = async () => {
    try {
      await passwordReset(user.email)
      dispatch(
        setMessage({
          type: 'message',
          text: `Password reset email sent to ${user.email}`,
        })
      )
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setMessage({ type: 'error', text: error.message }))
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = await updateUser(formData, user.id)
    dispatch(setMessage({ type: 'info', text: message }))
    router.refresh()
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="relative flex flex-col">
      <fieldset className="mt-4 flex flex-wrap items-center gap-2 sm:gap-8">
        <legend className="text-secondary">Personal information</legend>
        <div className="relative z-0 my-6 max-w-full">
          <input
            id="pd-first-name"
            name="first_name"
            defaultValue={user.first_name}
            type="text"
            className="input-with-floating-label peer pb-1 pt-4 max-[320px]:text-lg sm:w-auto"
            placeholder=" "
            required
          />
          <label
            htmlFor="pd-first-name"
            className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
          >
            First Name
          </label>
        </div>
        <div className="relative z-0 my-6 max-w-full">
          <input
            id="pd-last-name"
            defaultValue={user.last_name}
            name="last_name"
            type="text"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 max-[320px]:text-lg sm:w-auto"
          />
          <label
            htmlFor="pd-last-name"
            className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
          >
            Last Name
          </label>
        </div>
        <div className="relative z-0 my-6 max-w-full">
          <input
            id="pd-email"
            defaultValue={user.email}
            name="email"
            type="email"
            className="input-with-floating-label peer w-full pb-1 pt-4 text-secondary hover:cursor-help max-[320px]:text-lg sm:w-auto"
            placeholder=" "
            readOnly
            onClick={handleEmailExplanation}
          />
          <label
            htmlFor="pd-first-name"
            className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
          >
            Email
          </label>
        </div>
        <div className="flex max-w-full flex-wrap items-center gap-2 sm:gap-8">
          <div className="relative z-0 max-w-full">
            <label
              htmlFor="pd-country-code"
              className=" floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
            >
              Country code
            </label>
            <select
              id="pd-country-code"
              name="country_code"
              className="h-fit w-full border-b-2 border-primary px-0 pb-1.5 pt-4 text-2xl font-semibold text-brand outline-none hover:cursor-pointer max-[320px]:text-lg sm:max-w-[260px]"
              defaultValue={user.country_code}
            >
              {countryCodes.map((item) => (
                <option
                  key={`${item.code}-${item.country}`}
                  value={item.code}
                  className="text-primary"
                >
                  +{item.code} ({item.country})
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 my-6 max-w-full">
            <input
              id="pd-phone-number"
              defaultValue={user.phone_number}
              name="phone_number"
              type="text"
              placeholder=" "
              className="input-with-floating-label peer pb-1 pt-4 max-[320px]:text-lg sm:w-auto"
            />
            <label
              htmlFor="pd-phone-number"
              className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
            >
              Phone number
            </label>
          </div>
        </div>
      </fieldset>
      <Divider />
      <fieldset className="my-4 flex flex-wrap items-center gap-2 sm:gap-8">
        <legend className="text-secondary">Address</legend>
        <div className="relative z-0 my-6 max-w-full sm:w-auto">
          <input
            id="pd-street"
            defaultValue={user.street}
            name="street"
            type="text"
            placeholder=" "
            className="input-with-floating-label peer w-full pb-1 pt-4 max-[320px]:text-lg sm:w-auto"
          />
          <label
            htmlFor="pd-street"
            className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
          >
            Street
          </label>
        </div>
        <div className="relative z-0 my-6 max-w-full sm:w-auto">
          <input
            id="pd-street-number"
            defaultValue={user.street_number}
            name="street_number"
            type="number"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 max-[320px]:text-lg sm:w-auto"
          />
          <label
            htmlFor="pd-street-number"
            className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
          >
            Street Number
          </label>
        </div>
        <div className="relative z-0 my-6 max-w-full">
          <input
            id="pd-additional_address_line"
            defaultValue={user.additional_address_line}
            name="additional_address_line"
            type="text"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 max-[320px]:text-lg sm:w-auto"
          />
          <label
            htmlFor="pd-additional_address_line"
            className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
          >
            Additional line
          </label>
        </div>
        <div className="relative z-0 my-6 max-w-full">
          <input
            id="pd-zip_code"
            defaultValue={user.zip_code}
            name="zip_code"
            type="string"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 max-[320px]:text-lg sm:w-auto"
          />
          <label
            htmlFor="pd-zip_code"
            className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
          >
            Zip Code
          </label>
        </div>
        <div className="relative z-0 my-6 max-w-full">
          <input
            id="pd-city"
            defaultValue={user.city}
            name="city"
            type="string"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 max-[320px]:text-lg sm:w-auto"
          />
          <label
            htmlFor="pd-city"
            className="floating-label peer-placeholder-shown:text-secondary peer-focus:text-primary max-[320px]:text-lg"
          >
            City
          </label>
        </div>
        <div className="relative z-0 max-w-full">
          <label
            htmlFor="pd-country"
            className="floating-label max-[320px]:text-lg"
          >
            Country
          </label>
          <select
            id="pd-country"
            defaultValue={user.country}
            name="country"
            className="h-fit w-full border-b-2 border-primary px-0 pb-1.5 pt-4 text-2xl font-semibold text-brand outline-none target:border-none hover:cursor-pointer max-[320px]:text-lg sm:max-w-[200px]"
          >
            {countryCodes.map((item) => (
              <option
                key={`${item.country}-country`}
                value={item.country}
                className="text-primary"
              >
                {item.country}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <Divider />
      <div className="mb-4 mt-8 flex flex-col items-center gap-4 self-center sm:flex-row">
        <button
          className="btn-primary w-full shadow-lg sm:w-auto"
          type="submit"
        >
          Update information
        </button>
        {user.auth_type === 'email' && (
          <button
            className="btn-primary w-full shadow-lg sm:w-auto"
            type="button"
            onClick={handlePasswordReset}
          >
            Reset Password
          </button>
        )}
      </div>
    </form>
  )
}
