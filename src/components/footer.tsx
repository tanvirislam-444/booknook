import {BookOpen} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#302016] text-[#F5EBDD] px-6 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">

        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 font-bold text-lg">
            <BookOpen size={24} />
            <span>BOOKNOOK</span>
          </div>
          <p className="text-sm text-gray-300 mt-3">
            A small online library for curious minds.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-300">
            help@booknook.com
          </p>
          <p className="text-sm text-gray-300 mt-1">
            +880 1234 567890
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-orange-400">
              <FaFacebookF size={19} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-orange-400">
              <FaInstagram size={19} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-orange-400">
              <FaXTwitter size={19} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-orange-400">
              <FaYoutube size={19} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-300 md:text-right">
          © 2026 BookNook. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;