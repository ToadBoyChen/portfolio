import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
  // Helper component for link items to avoid repetition
  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
      <a 
        href={href} 
        className="text-foreground/80 hover:text-primary transition-colors duration-300"
      >
        {children}
      </a>
    </li>
  );

  return (
    <footer 
      id='footer' 
      // Note: `absolute` positioning can sometimes be tricky. You might need to add a `relative` class
      // to your main page container to ensure the footer is positioned correctly relative to it.
      // I've changed min-w-screen to w-screen to be more explicit.
      className="absolute w-screen rounded-none backdrop-blur-lg bg-gradient-to-br from-blue-100/40 to-purple-500/50 mt-60 flex flex-col px-8 md:px-16 lg:px-32 py-16 text-foreground -translate-x-8"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          <div className="flex-1 max-w-sm">
            <p 
            className="text-2xl font-bold chango-regular knewave-shadow-small text-background mb-3">
              Toby Chen
              </p>
            <p className="text-foreground/80">
              A passionate software developer creating interactive and engaging web applications.
            </p>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="#introduction">Introduction</FooterLink>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#experience">Experience</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-4">Connect With Me</h4>
            <div className="flex justify-center items-center gap-6">
              <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300">
                <FaGithub size={28} />
              </a>
              <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300">
                <FaLinkedin size={28} />
              </a>
              <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300">
                <FaYoutube size={28} />
              </a>
              <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300">
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;