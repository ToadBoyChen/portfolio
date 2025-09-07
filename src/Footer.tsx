import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import SectionCard from './components/SectionCard';

const socialLinks: { href: string; label: string; Icon: IconType }[] = [
  { href: "https://github.com/your-username", label: "GitHub", Icon: FaGithub },
  { href: "https://linkedin.com/in/your-username", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://youtube.com/your-channel", label: "YouTube", Icon: FaYoutube },
  { href: "https://instagram.com/your-username", label: "Instagram", Icon: FaInstagram },
];

// --- Helper Component for Footer Links ---
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li className="w-full sm:w-auto text-center sm:text-left">
    <a 
      href={href} 
      className="text-foreground/80 hover:text-primary transition-colors duration-300 block"
    >
      {children}
    </a>
  </li>
);

function Footer() {
  return (
    <footer 
      id='footer'
      className="w-full text-foreground mt-36"
    >
      <SectionCard>
        <div className="container mx-auto">
          {/* Main Flex Container */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-8">

            {/* Section 1: Branding & Description */}
            <div className="w-full md:flex-1 md:basis-1/3 max-w-sm mx-auto md:mx-0 text-center md:text-left">
              <p className="text-xl sm:text-2xl font-bold chango-regular knewave-shadow-small text-background mb-3">
                Toby Chen
              </p>
              <p className="text-foreground/80">
                A passionate software developer creating interactive and engaging web applications.
              </p>
            </div>

            {/* Section 2: Quick Links */}
            <div className="w-full md:flex-1 md:basis-1/3">
              <h4 className="font-bold text-lg mb-4 text-center md:text-left">Quick Links</h4>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                <FooterLink href="#introduction">Introduction</FooterLink>
                <FooterLink href="#about">About</FooterLink>
                <FooterLink href="#experience">Experience</FooterLink>
                <FooterLink href="#contact">Contact</FooterLink>
              </ul>
            </div>

            {/* Section 3: Connect With Me */}
            <div className="w-full md:flex-1 md:basis-1/3">
              <h4 className="font-bold text-lg mb-4 text-center md:text-left">Connect With Me</h4>
              <div className="flex justify-center md:justify-start items-center gap-5 flex-wrap">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a 
                    key={label}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={label}
                    className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-foreground/10 text-center text-foreground/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Toby Chen. </p>
          </div>
        </div>
      </SectionCard>
    </footer>
  )
}

export default Footer;
