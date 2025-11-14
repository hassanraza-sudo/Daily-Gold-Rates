import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
                <span className="font-bold text-3xl pb-2 text-white">🧈</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                DailyGoldRate
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for daily gold and silver price updates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className="text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              onClick={() =>
                window.open("https://x.com/GoldRate0506", "_blank")
              }
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-yellow-600 hover:text-white transition-colors cursor-pointer"
            >
              <Twitter className="h-5 w-5" />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61575087044939"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-yellow-600 hover:text-white transition-colors pointer-events-auto"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/bhaao2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-yellow-600 hover:text-white transition-colors pointer-events-auto"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/gold-rate-16ab6a361/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-yellow-600 hover:text-white transition-colors pointer-events-auto"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:example@gmail.com"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-yellow-600 hover:text-white transition-colors pointer-events-auto"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} DailyGoldRate. All rights reserved.
          </p>
          <p className="mt-2">
            Disclaimer: Gold rates are updated manually and for informational
            purposes only. Please verify with local dealers before making any
            purchase decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
