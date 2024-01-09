import SearchBox from './SearchBox'

export default function SearchSection() {
  return (
    <section className="min-h-[60vh] w-full bg-black bg-[url('/searchsectionbgtesla.jpg')] bg-contain bg-[center_180px] bg-no-repeat px-4 sm:min-h-[70vh] md:bg-[center_bottom_-100px] lg:px-48">
      <SearchBox />
    </section>
  )
}
