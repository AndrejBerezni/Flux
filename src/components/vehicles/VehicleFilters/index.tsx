import RangeFilter from './RangeFilter'

export default function VehicleFilters() {
  return (
    <fieldset className="hidden h-fit max-w-[400px] bg-white px-3 py-6 shadow-lg md:block md:min-w-[180px] lg:w-1/4">
      <h2 className="mb-3 text-xl font-extrabold uppercase tracking-wider">
        Filters
      </h2>
      <RangeFilter labelText="passengers" filterValues={[2, 4, 5, 7]} />
      <RangeFilter labelText="doors" filterValues={[2, 3, 4, 5]} />
      <RangeFilter labelText="bags" filterValues={[1, 2, 3]} />
    </fieldset>
  )
}
