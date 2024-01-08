import FooterLinks from './FooterLinks'
import SocialMediaLinks from './SocialMediaLinks'

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center bg-primary py-8 pl-4 pr-6 lg:px-48">
      <SocialMediaLinks />
      <FooterLinks />
      <p className="text-secondary">© Flux 2024</p>
    </footer>
  )
}
