import Divider from '@/components/Divider'
import AccountDetailsForm from '@/components/user/accountdetails/AccountDetailsForm'
import { fetchUserWithId } from '@/lib/dbQueries/users'

export const fetchCache = 'force-no-store'

export default async function AccountDetailsPage({
  params,
}: {
  params: { user: string }
}) {
  const uid = params.user ?? ''

  const userData = await fetchUserWithId(uid)

  return (
    <section className="max-w-full flex-1 rounded-md bg-white p-6 shadow-md">
      <h1 className="text-3xl font-bold uppercase">Account details</h1>
      <p className="my-2 text-xl">One place to manage your account</p>
      <Divider />
      <AccountDetailsForm user={userData} />
    </section>
  )
}
