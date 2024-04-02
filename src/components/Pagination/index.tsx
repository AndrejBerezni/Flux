'use client'
import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Pagination({
  numberOfPages,
  currentPage,
}: {
  numberOfPages: number
  currentPage: number
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1)

  const setPage = (pageNumber: number) => {
    if (pageNumber === currentPage) {
      //prevent useless reload of the page
      return
    }
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <nav aria-label="Pagination" className="flex items-center gap-4">
      {pages.map((page) => (
        <button
          key={`page-${page}`}
          onClick={() => setPage(page)}
          className={clsx('text-xl font-extrabold duration-200', {
            '-mx-1 scale-125 rounded-md border-2 border-brand bg-white px-2 py-1 text-brand shadow-md':
              currentPage === page,
            'text-secondaryText hover:scale-125 hover:text-brand':
              currentPage !== page,
          })}
        >
          {page}
        </button>
      ))}
    </nav>
  )
}
