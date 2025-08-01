import { Feather } from 'lucide-react';

const socials = [
  { href: 'https://github.com/iadii/', label: 'GitHub', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
  ) },
  { href: 'https://twitter.com/', label: 'X', icon: (
    <svg className="w-5 h-5" viewBox="0 0 1200 1227" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1199.61 0H944.13L600.01 494.13L255.87 0H0L489.13 700.87L0 1227H255.87L600.01 732.87L944.13 1227H1200L710.87 526.13L1199.61 0ZM872.87 1120.13L600.01 729.13L327.13 1120.13H163.13L600.01 563.13L1036.87 1120.13H872.87ZM1036.87 106.87L600.01 663.87L163.13 106.87H327.13L600.01 497.87L872.87 106.87H1036.87Z"/></svg>
  ) },
  { href: 'https://www.linkedin.com/in/iadii/', label: 'LinkedIn', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  ) },
];

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
];

const Footer = () => (
  <footer className="py-8 border-t border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-0">
        {/* Logo and name */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <Feather className="w-8 h-8 text-teal-400 drop-shadow-glow" />
            <span className="font-serenade text-2xl font-bold text-white drop-shadow-glow">commitKaro()</span>
          </div>
          <div className="flex gap-4 mt-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-teal-400 transition-colors" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Quick links */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-6 mb-2">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-white/70 hover:text-teal-400 transition-colors text-base font-medium">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-white/40 text-sm mt-2 md:mt-0 font-serif">Thoughts staged. Emotions pushed.</p>
          <p className="text-white/30 text-xs italic mt-1">Dreamed, designed, and crafted with love by iadii — for every soul who writes beneath the gentle sky and lets their verses bloom.</p>
        </div>
      </div>
     
    </div>
  </footer>
);

export default Footer;
