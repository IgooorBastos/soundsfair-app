"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    learn: [
      { label: "All Lessons", href: "/lessons" },
      { label: "Level 5: Store of Value", href: "/lessons/level-5-store-of-value" },
      { label: "Level 6: Economic Freedom", href: "/lessons/level-6-economic-freedom" },
      { label: "Level 7: Geopolitical Future", href: "/lessons/level-7-geopolitical-future" },
      { label: "FAQ", href: "/faq" },
    ],
    resources: [
      { label: "DCA Calculator", href: "/tools/dca" },
      { label: "Glossary", href: "/glossary" },
      { label: "Video Library", href: "#" },
      { label: "Reading List", href: "#" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Our Principles", href: "/about#principles" },
      { label: "Contact", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Disclaimer", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "Nostr",
      href: "#",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.6l7 3.5v7.22l-7-3.5V9.6zm9 10.72v-7.22l7-3.5v7.22l-7 3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:gap-12">
          {/* Learn Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-yellow">
              Learn
            </h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-yellow">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
                  >
                    {link.label}
                    {link.href === "#" && (
                      <span className="ml-2 text-xs text-gray-600">(Soon)</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-yellow">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-yellow">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section (Optional) */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h4 className="mb-1 text-lg font-semibold text-white">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-400">
                Get notified when we launch new lessons and features.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
              />
              <button className="whitespace-nowrap rounded-lg bg-brand-yellow px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-primary-dark">
                Notify Me
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Logo & Copyright */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="group flex items-center">
                <span className="text-lg font-bold text-white transition-colors group-hover:text-gray-300">
                  sounds
                </span>
                <span className="text-lg font-bold text-brand-yellow transition-all group-hover:scale-110">
                  fair
                </span>
              </Link>
              <span className="text-sm text-gray-500">|</span>
              <p className="text-sm text-gray-500">
                &copy; {currentYear} soundsfair. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 transition-colors hover:text-brand-yellow"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="border-t border-gray-800 py-4 text-center">
          <p className="text-xs text-gray-600">
            Educational content about Bitcoin, fair money, and economic freedom.{" "}
            <span className="text-brand-yellow">Not financial advice.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
