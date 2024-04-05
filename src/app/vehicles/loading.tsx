import Spinner from '@/components/Spinner'

export default function Loading() {
  return (
    <section className="flex w-full flex-1 flex-col rounded-md bg-white p-6 shadow-md">
      <Spinner />
    </section>
  )
}
