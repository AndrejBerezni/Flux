import clsx from 'clsx'

function CarouselControl({
  current,
  changeSlide,
  controlValue,
}: {
  current: number
  changeSlide: (index: number) => void
  controlValue: number
}) {
  return (
    <button
      onClick={() => {
        changeSlide(controlValue)
      }}
      className={clsx('mx-4 h-4 w-8 border-2 border-white', {
        'bg-brand': current === controlValue,
        ' bg-tertiary hover:bg-secondary': current !== controlValue,
      })}
    ></button>
  )
}
export default function SubscriptionsCarouselControls({
  changeSlide,
  current,
}: {
  changeSlide: (index: number) => void
  current: number
}) {
  return (
    <div className="mb-[10px] flex w-full justify-center md:absolute md:bottom-6 md:left-1/2 md:mb-0 md:w-auto md:-translate-x-1/2 lg:bottom-10">
      {[0, 1].map((item) => (
        <CarouselControl
          key={`sub-carousel-control-btn-${item}`}
          changeSlide={changeSlide}
          controlValue={item}
          current={current}
        />
      ))}
    </div>
  )
}
