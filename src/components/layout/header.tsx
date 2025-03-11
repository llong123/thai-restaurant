"use client";

import { useState } from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Directions", href: "/directions" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Thai Delight
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={
                "text-sm font-medium transition-colors hover:text-primary"
              }
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block"></div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Thai Delight
              </Link>
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="container mx-auto px-4 py-2 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    "block py-3 text-base font-medium transition-colors hover:text-primary"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="w-full mt-4">
                <Link href="/reservations">Make a Reservation</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
