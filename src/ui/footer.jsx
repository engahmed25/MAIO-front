import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[var(--main-lite-color)] text-white py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-0">
        {/* Left Section */}
        <div className="md:col-span-2 text-center md:text-left">
          <h2 className="text-xl font-semibold mb-3">Healthcare</h2>
          <p className="text-sm">
            Copyright © 2026 BRIX Templates <br /> All Rights Reserved
          </p>
        </div>

        {/* Main Sections → Mobile: 2x2 grid / Desktop: normal columns */}
        <div className="col-span-1 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Features</li>
              <li>Pricing</li>
              <li>Case studies</li>
              <li>Reviews</li>
              <li>Updates</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>About</li>
              <li>Contact us</li>
              <li>Careers</li>
              <li>Culture</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Getting started</li>
              <li>Help center</li>
              <li>Server Status</li>
              <li>Report a bug</li>
              <li>Chat support</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold mb-4">Follow us</h3>
            <div className="flex flex-col gap-2 items-start ">
              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="bg-white p-2 rounded-full">
                  <FaInstagram className="text-[var(--main-color)] w-5 h-5" />
                </span>
                <span className="text-sm text-gray-200 group-hover:text-teal-400 transition-colors">
                  Instagram
                </span>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="bg-white p-2 rounded-full">
                  <FaFacebookF className="text-[var(--main-color)] w-5 h-5" />
                </span>
                <span className="text-sm text-gray-200 group-hover:text-teal-400 transition-colors">
                  Facebook
                </span>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="bg-white p-2 rounded-full">
                  <FaTwitter className="text-[var(--main-color)] w-5 h-5" />
                </span>
                <span className="text-sm text-gray-200 group-hover:text-teal-400 transition-colors">
                  Twitter
                </span>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="bg-white p-2 rounded-full">
                  <FaLinkedinIn className="text-[var(--main-color)] w-5 h-5" />
                </span>
                <span className="text-sm text-gray-200 group-hover:text-teal-400 transition-colors">
                  LinkedIn
                </span>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="bg-white p-2 rounded-full">
                  <FaYoutube className="text-[var(--main-color)] w-5 h-5" />
                </span>
                <span className="text-sm text-gray-200 group-hover:text-teal-400 transition-colors">
                  YouTube
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
