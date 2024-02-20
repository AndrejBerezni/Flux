import { fetchUserWithId } from '@/lib/fetchUser'

export default async function AccountDetailsPage({
  params,
}: {
  params: { user: string }
}) {
  const uid = params.user || ''

  const userData = await fetchUserWithId(uid)

  return (
    <main className="text-brand">
      <h1>Account details</h1>
      <p>{userData.first_name}</p>
      <p>{userData.last_name}</p>
      <p>{userData.email}</p>
    </main>
  )
}
