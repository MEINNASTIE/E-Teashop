import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSeedling, faTruckFast, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

export default function ShoppingInfo() {
  return (
    <div className="flex justify-between pr-20 pl-20 pt-8 pb-8 bg-white">
      <div className="flex p-4 cursor-pointer">
        <FontAwesomeIcon icon={faHeart} className="text-gray-500 text-lg mr-2 mt-2" />
        <div>
            <p>Unmatchable Selection</p>
            <p className="text-gray-600 text-[14px]">The world's largest selection of Chinese tea from artisanal tea farms, factories and expert merchants. See all vendors.</p>
        </div>
      </div>
      <div className="flex p-4 cursor-pointer">
        <FontAwesomeIcon icon={faSeedling} className="text-gray-500 text-lg mr-2 mt-2" />
        <div>
             <p>Learn About Tea</p>
            <p className="text-gray-600 text-[14px]">Extensive info on Chinese culture and Chinese tea to help you grow as a tea drinker. Checkout the Dojo Collection for samplers!</p>
        </div>
      </div>
      <div className="flex p-4 cursor-pointer">
        <FontAwesomeIcon icon={faTruckFast} className="text-gray-500 text-lg mr-2 mt-2" />
        <div>
            <p>International Shipping</p>
            <p className="text-gray-600 text-[14px]">Delivery guaranteed or your money back. We ship via DHL Express or the Post Office to USA and major countries. (Conditions apply.)</p>
        </div>
      </div>
      <div className="flex p-4 cursor-pointer">
        <FontAwesomeIcon icon={faFaceSmile} className="text-gray-500 text-lg mr-2 mt-2" />
        <div>
            <p>Top-notch support</p>
            <p className="text-gray-600 text-[14px]">Do you have questions about Chinese tea? Problems with your order? Contact us and we'll be on it ASAP!.</p>  
        </div>
      </div>
    </div>
  );
}
