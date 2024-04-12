export default function UserPageHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <>
      <h1 className="text-2xl font-bold uppercase md:text-3xl">{title}</h1>
      <h2 className="my-1 text-base md:my-2 md:text-xl">{subtitle}</h2>
    </>
  )
}
