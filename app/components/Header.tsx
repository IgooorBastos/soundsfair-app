"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// Search data (can be moved to separate file later)
const searchableContent = [
  { title: "The Fiat Money System", url: "/learn#level-1", category: "Learn" },
  { title: "Banking System and Debt", url: "/learn#level-2", category: "Learn" },
  { title: "Bitcoin Revolution", url: "/learn#level-3", category: "Learn" },
  { title: "Bitcoin and Geopolitics", url: "/learn#level-4", category: "Learn" },
  { title: "About soundsfair", url: "/about", category: "Company" },
  { title: "Our Mission", url: "/about#mission", category: "Company" },
  { title: "DCA Calculator", url: "#", category: "Tools" },
  { title: "Video Library", url: "#", category: "Resources" },
  { title: "Learning Path", url: "/learn", category: "Learn" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchableContent>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/learn", label: "Learn" },
    { href: "/about", label: "About" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 5)); // Limit to 5 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".search-container")) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const handleSearchSelect = (url: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    if (url !== "#") {
      router.push(url);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white transition-colors group-hover:text-gray-300">
                  sounds
                </span>
                <span className="text-2xl font-bold text-brand-yellow transition-all group-hover:scale-110">
                  fair
                </span>
              </div>
              <span className="hidden text-xs text-gray-500 md:block">
                Learn Bitcoin
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-base font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-brand-yellow"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-brand-yellow"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Search & CTA */}
          <div className="hidden items-center space-x-4 md:flex">
            {/* Search Bar */}
            <div className="search-container relative">
              {!searchOpen ? (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center space-x-2 rounded-lg border border-gray-800 px-4 py-2 text-gray-400 transition-all hover:border-brand-yellow hover:text-brand-yellow"
                  aria-label="Open search"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-sm">Search</span>
                  <kbd className="hidden rounded bg-gray-900 px-2 py-0.5 text-xs text-gray-500 lg:inline-block">
                    ⌘K
                  </kbd>
                </button>
              ) : (
                <div className="relative">
                  <div className="flex items-center">
                    <svg
                      className="absolute left-3 h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search lessons, topics..."
                      className="w-64 rounded-lg border border-brand-yellow bg-gray-900 py-2 pl-10 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="absolute right-3 text-gray-400 hover:text-white"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Search Results Dropdown */}
                  {searchQuery.length > 0 && (
                    <div className="absolute top-full mt-2 w-full rounded-lg border border-gray-800 bg-black shadow-xl">
                      {searchResults.length > 0 ? (
                        <div className="max-h-96 overflow-y-auto">
                          {searchResults.map((result, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSelect(result.url)}
                              className="flex w-full items-center justify-between border-b border-gray-800 px-4 py-3 text-left transition-colors hover:bg-gray-900 last:border-b-0"
                            >
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {result.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {result.category}
                                </div>
                              </div>
                              <svg
                                className="h-4 w-4 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-8 text-center text-sm text-gray-500">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/learn"
              className="rounded-lg border-2 border-brand-yellow px-5 py-2 text-sm font-semibold text-brand-yellow transition-all hover:bg-brand-yellow hover:text-black"
            >
              Start Learning
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-center justify-center space-y-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-brand-yellow transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-brand-yellow transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-brand-yellow transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-800 py-4 md:hidden">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <svg
                  className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-lg border border-gray-800 bg-gray-900 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                />
              </div>

              {/* Mobile Search Results */}
              {searchQuery.length > 0 && searchResults.length > 0 && (
                <div className="mt-2 space-y-2">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleSearchSelect(result.url);
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-800 px-3 py-2 text-left transition-colors hover:bg-gray-900"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          {result.title}
                        </div>
                        <div className="text-xs text-gray-500">{result.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-brand-yellow"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/learn"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block rounded-lg bg-brand-yellow px-5 py-3 text-center text-sm font-semibold text-black transition-all hover:bg-primary-dark"
              >
                Start Learning
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Progress Bar (optional - can track scroll or learning progress) */}
      {pathname.startsWith("/learn") && (
        <div className="h-1 w-full bg-gray-900">
          <div className="h-full w-0 bg-brand-yellow transition-all duration-300"></div>
        </div>
      )}
    </header>
  );
}
