import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux'

import { roboto } from '@/app/fonts'
import { hideModal } from '@/store/modal'

export default function PickupDetailsHeader() {
  const dispatch = useDispatch()
  return (
    <div className="mb-6 flex items-center md:hidden">
      <button type="button" onClick={() => dispatch(hideModal())}>
        <IoCloseSharp className="text-2xl" />
      </button>

      <h1
        className={`${roboto.className} flex-1 text-center text-lg font-bold`}
      >
        Your rental details
      </h1>
    </div>
  )
}
