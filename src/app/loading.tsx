import LoaderAnimation from '@/components/Loader'
export default function Loading() {
  return (
    <section className="m-0 flex h-screen w-full items-center justify-center bg-primary">
      <LoaderAnimation size="big" color="brand" />
    </section>
  )
}
