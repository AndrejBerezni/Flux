import { robotoCondensed } from '@/app/fonts'
import AccountDetailsForm from '@/components/user/AccountDetailsForm'
import { fetchUserWithId } from '@/lib/fetchUser'

export const fetchCache = 'force-no-store'

export default async function AccountDetailsPage({
  params,
}: {
  params: { user: string }
}) {
  const uid = params.user || ''

  const userData = await fetchUserWithId(uid)

  return (
    <section
      className={`${robotoCondensed.className} max-w-full flex-1 rounded-md bg-white p-6 shadow-md`}
    >
      <h1 className="text-3xl font-bold uppercase">Account details</h1>
      <p className="my-2 text-xl">One place to manage your account</p>
      <div className="my-6 h-0.5 w-full bg-quaternary sm:my-0"></div>
      <AccountDetailsForm user={userData} />
    </section>
  )
}