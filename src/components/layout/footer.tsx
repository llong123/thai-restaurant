import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Thai Delight Helsinki</h3>
            <p className="text-muted-foreground">
              Authentic Thai cuisine in the heart of Helsinki since 2010.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Opening Hours</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Monday - Friday: 11:00 - 22:00</li>
              <li>Saturday: 12:00 - 23:00</li>
              <li>Sunday: 12:00 - 21:00</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Mannerheimintie 123</li>
              <li>00100 Helsinki</li>
              <li>+358 40 123 4567</li>
              <li>info@thaidelight.fi</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/menu"
                  className="text-muted-foreground hover:text-primary"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/reservations"
                  className="text-muted-foreground hover:text-primary"
                >
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  href="/directions"
                  className="text-muted-foreground hover:text-primary"
                >
                  Directions
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Thai Delight Helsinki. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
