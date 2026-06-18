import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-app-bg-dark border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand and Description */}
          <div className="flex flex-col gap-4 col-span-2">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="SkillHub MM Logo" width={40} height={40} />
              <h1 className="font-extrabold text-pretty text-white text-2xl">
                SkillHub MM
              </h1>
            </div>
            <p className="text-app-text-secondary text-sm">
              Better Skills, Better Life. Master new skills with expert teachers, flexible learning, and proven results.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-app-text-secondary hover:text-app-text-primary transition-colors border border-app-text-secondary rounded-full p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-app-text-secondary hover:text-app-text-primary transition-colors border border-app-text-secondary rounded-full p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="text-app-text-secondary hover:text-app-text-primary transition-colors border border-app-text-secondary rounded-full p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Learn Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-white">Learn</h3>
            <Link href="/home/course" className="text-app-text-secondary text-sm hover:text-app-text-primary transition-colors">
              Courses
            </Link>
            <Link href="/home/level-test" className="text-app-text-secondary text-sm hover:text-app-text-primary transition-colors">
              Level Test
            </Link>
            <Link href="/home/library-shop" className="text-app-text-secondary text-sm hover:text-app-text-primary transition-colors">
              Library
            </Link>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-white">Company</h3>
            <Link href="/home/about" className="text-app-text-secondary text-sm hover:text-app-text-primary transition-colors">
              About Us
            </Link>
            <Link href="/home/contact" className="text-app-text-secondary text-sm hover:text-app-text-primary transition-colors">
              Contact
            </Link>
            <Link href="/home/faq" className="text-app-text-secondary text-sm hover:text-app-text-primary transition-colors">
              FAQ
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-app-text-secondary text-sm">
            © 2026 SkillHub MM. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/home/terms" className="text-app-text-secondary hover:text-app-text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/home/privacy" className="text-app-text-secondary hover:text-app-text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
