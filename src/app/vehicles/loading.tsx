import LoaderAnimation from '@/components/Loader'

export default function Loading() {
  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center rounded-md p-6 shadow-md">
      <LoaderAnimation size="big" color="brand" />
    </section>
  )
}
