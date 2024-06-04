import Link from 'next/link'
export default function NoUserContent({
  contentText,
  linkHref,
  linkText,
}: Readonly<{
  contentText: string
  linkHref: string
  linkText: string
}>) {
  return (
    <div className="my-4 flex flex-col items-start gap-8">
      <p>You currently don&apos;t have {contentText}</p>
      <Link className="btn-primary" href={linkHref}>
        {linkText}
      </Link>
    </div>
  )
}
