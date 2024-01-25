import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function useClearParams() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const clearParams = (param: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete(param)
    replace(`${pathname}?${params.toString()}`)
  }

  return clearParams
}
