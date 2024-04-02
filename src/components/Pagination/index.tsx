'use client'
import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Pagination({
  numberOfPages,
}: {
  numberOfPages: number
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1)

  const setPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      {pages.map((page) => (
        <button key={`page-${page}`} onClick={() => setPage(page)}>
          {page}
        </button>
      ))}
    </nav>
  )
}
