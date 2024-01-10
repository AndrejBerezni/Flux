import { FaSearch } from 'react-icons/fa'
export default function SmallScreenPickupSelect() {
  return (
    <div className="flex w-full flex-1 flex-col justify-around md:hidden">
      <div className="flex items-center gap-2 text-lg max-[320px]:text-base">
        <FaSearch />
        <input
          type="text"
          placeholder="Airport or city"
          className="max-w-full flex-1 border-0 border-b-2 border-secondary pb-1 text-base focus:outline-none"
        />
      </div>
      <button className="btn-primary">Select pickup</button>
    </div>
  )
}
