interface IThirdPartyLoginButtonProps {
  icon: React.ReactNode
  text: string
  //   onClick: () => void
}

export default function ThirdPartyLoginButton({
  icon,
  text,
}: Readonly<IThirdPartyLoginButtonProps>) {
  return (
    <button
      type="button"
      className="relative flex items-center justify-center gap-4 border-2 border-primary px-2 py-4 font-bold duration-150 hover:text-brand sm:text-2xl"
    >
      {icon}
      {text}
    </button>
  )
}
