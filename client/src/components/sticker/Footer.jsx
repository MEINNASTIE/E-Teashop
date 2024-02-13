import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <footer className="bg-[#D0D6B1] text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum tortor a risus vehicula.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>123 Main Street, City, Country</p>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-400">
                <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p>Subscribe to our newsletter for latest updates.</p>
            <form className="mt-4">
              <input type="email" className="w-full px-4 py-2 border focus:outline-none bg-transparent placeholder:text-white" placeholder="Enter your email" />
              <button type="submit" className="bg-white hover:bg-[#782F10] text-gray-500 hover:text-white px-4 py-2 mt-2 block w-full">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

