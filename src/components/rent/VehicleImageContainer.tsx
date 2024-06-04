import FadeInImage from '../FadeInImage'
export default function VehicleImageContainer({
  image,
  alt,
}: Readonly<{
  image: string
  alt: string
}>) {
  return (
    <article className="flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 max-[768px]:rounded-t-md md:rounded-l-md">
      <FadeInImage src={image} alt={alt} width={480} height={360} />
    </article>
  )
}
