import Divider from '@/components/Divider'
import AccountDetailsForm from '@/components/user/accountdetails/AccountDetailsForm'
import UserPageHeading from '@/components/user/UserPageHeading'
import { fetchUserWithId } from '@/lib/db_queries/users'

export const fetchCache = 'force-no-store'

export default async function AccountDetailsPage({
  params,
}: Readonly<{
  params: { user: string }
}>) {
  const uid = params.user ?? ''

  const userData = await fetchUserWithId(uid)

  return (
    <section className="max-w-full flex-1 rounded-md bg-white p-6 shadow-md">
      <UserPageHeading
        title="Account details"
        subtitle="One place to manage your account"
      />
      <Divider />
      <AccountDetailsForm user={userData} />
    </section>
  )
}
