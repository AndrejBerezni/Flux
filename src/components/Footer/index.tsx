import FooterLinks from './FooterLinks'
import SocialMediaLinks from './SocialMediaLinks'

export default function Footer() {
  return (
    <footer className="section-padding flex w-full flex-col items-center bg-primary py-8">
      <SocialMediaLinks />
      <FooterLinks />
      <p className="text-secondary sm:self-end">© Flux 2024</p>
    </footer>
  )
}
