import { IUser } from '@/compiler/interfaces'
import { countryCodes } from '@/lib/countryCodes'

export default function AccountDetailsForm({ user }: { user: IUser }) {
  return (
    <form className="flex flex-col">
      <fieldset className="mt-4 flex w-full flex-wrap items-center gap-2 sm:gap-8">
        <legend className="text-secondary">Personal information</legend>
        <div className="relative z-0 my-6 w-full sm:w-auto">
          <input
            id="pd-first-name"
            defaultValue={user.first_name}
            type="text"
            className="input-with-floating-label peer pb-1 pt-4 sm:w-auto"
            placeholder=" "
          />
          <label htmlFor="pd-first-name" className="floating-label">
            First Name
          </label>
        </div>
        <div className="relative z-0 my-6 w-full sm:w-auto">
          <input
            id="pd-last-name"
            defaultValue={user.last_name}
            type="text"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 sm:w-auto"
          />
          <label
            htmlFor="pd-last-name"
            className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Last Name
          </label>
        </div>
        <div className="relative z-0 my-6 w-full sm:w-auto">
          <input
            id="pd-email"
            defaultValue={user.email}
            type="email"
            className="input-with-floating-label peer pb-1 pt-4 sm:w-auto"
            placeholder=" "
          />
          <label htmlFor="pd-first-name" className="floating-label">
            Email
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-8">
          <div className="relative z-0 w-full sm:w-auto">
            <label htmlFor="pd-country-code" className="floating-label">
              Country code
            </label>
            <select
              id="pd-country-code"
              name="pd-country-code"
              className="h-fit border-b-2 border-primary px-0 pb-1.5 pt-4 text-2xl target:border-none hover:cursor-pointer"
            >
              {countryCodes.map((item) => (
                <option
                  key={`${item.code}-cc`}
                  value={item.code}
                  selected={item.code === user.country_code}
                >
                  +{item.code} ({item.country})
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 my-6 w-full sm:w-auto">
            <input
              id="pd-phone-number"
              defaultValue={user.phone_number}
              type="text"
              placeholder=" "
              className="input-with-floating-label peer pb-1 pt-4 sm:w-auto"
            />
            <label
              htmlFor="pd-phone-number"
              className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Phone number
            </label>
          </div>
        </div>
      </fieldset>
      <div className="my-6 h-0.5 w-full bg-quaternary sm:my-0"></div>
      <fieldset className="my-4 flex w-full flex-wrap items-center gap-2 sm:gap-8">
        <legend className="text-secondary">Address</legend>
        <div className="relative z-0 my-6 w-full sm:w-auto">
          <input
            id="pd-street"
            defaultValue={user.street}
            type="text"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 sm:w-auto"
          />
          <label
            htmlFor="pd-street"
            className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Street
          </label>
        </div>
        <div className="relative z-0 my-6 w-full sm:w-auto">
          <input
            id="pd-street-number"
            defaultValue={user.street}
            type="number"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 sm:w-auto"
          />
          <label
            htmlFor="pd-street-number"
            className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Street Number
          </label>
        </div>
        <div className="relative z-0 my-6 w-full sm:w-auto">
          <input
            id="pd-additional_address_line"
            defaultValue={user.additional_address_line}
            type="number"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 sm:w-auto"
          />
          <label
            htmlFor="pd-additional_address_line"
            className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Additional line
          </label>
        </div>
        <div className="relative z-0 my-6 w-full sm:w-auto">
          <input
            id="pd-zip_code"
            defaultValue={user.zip_code}
            type="number"
            placeholder=" "
            className="input-with-floating-label peer pb-1 pt-4 sm:w-auto"
          />
          <label
            htmlFor="pd-zip_code"
            className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-2xl font-bold text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Zip Code
          </label>
        </div>
        <div className="relative z-0 w-full sm:w-auto">
          <label htmlFor="pd-country" className="floating-label">
            Country
          </label>
          <select
            id="pd-country"
            name="pd-country"
            className="h-fit w-full border-b-2 border-primary px-0 pb-1.5 pt-4 text-2xl target:border-none hover:cursor-pointer sm:max-w-[200px]"
          >
            {countryCodes.map((item) => (
              <option
                key={`${item.country}-country`}
                value={item.country}
                selected={item.country === user.country}
              >
                {item.country}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <div className="my-6 h-0.5 w-full bg-quaternary sm:my-0"></div>
      <button className="btn-primary mb-4 mt-8 self-center" type="submit">
        Update information
      </button>
    </form>
  )
}
