interface IThirdPartyLoginButtonProps {
  icon: React.ReactNode
  text: string
  handleClick: () => void
}

export default function ThirdPartyLoginButton({
  icon,
  text,
  handleClick,
}: Readonly<IThirdPartyLoginButtonProps>) {
  return (
    <button
      type="button"
      className="relative flex items-center justify-center gap-4 border-2 border-primary px-2 py-4 font-bold duration-150 hover:text-brand sm:text-xl"
      onClick={handleClick}
    >
      {icon}
      {text}
    </button>
  )
}
