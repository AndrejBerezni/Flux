import { useId } from 'react'

export default function RadioSort({
  labelText,
  sortValue,
  name,
}: {
  labelText: string
  sortValue: string
  name: string
}) {
  const radioId = useId()

  return (
    <div className="my-2 flex items-center gap-4">
      <input
        id={radioId}
        type="radio"
        value={sortValue}
        name={name}
        defaultChecked
        className="peer hover:cursor-pointer"
      />
      <label
        htmlFor={radioId}
        className="text-lg font-semibold capitalize duration-200 hover:cursor-pointer hover:text-brand peer-hover:text-brand"
      >
        {labelText}
      </label>
    </div>
  )
}

// text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2
