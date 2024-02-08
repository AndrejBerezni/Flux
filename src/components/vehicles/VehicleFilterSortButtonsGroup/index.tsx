import VehicleFilterSortButton from './VehicleFilterSortButton'
import { MdOutlineFilterList } from 'react-icons/md'
import { TiArrowUnsorted } from 'react-icons/ti'

export default function VehicleFilterSortButtonsGroup() {
  const buttons = [
    {
      buttonText: 'Filter',
      modal: 'vehicleFilters',
      icon: <MdOutlineFilterList />,
    },
    { buttonText: 'Sort', modal: 'sortVehicles', icon: <TiArrowUnsorted /> },
  ]

  return (
    <section className="flex justify-between">
      {buttons.map((btn) => (
        <VehicleFilterSortButton
          key={`${btn.buttonText}-button`}
          buttonText={btn.buttonText}
          modal={btn.modal}
          icon={btn.icon}
        />
      ))}
    </section>
  )
}
