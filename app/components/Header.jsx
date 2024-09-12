import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="bg-white shadow-lg p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-black text-2xl font-bold">MaxiMart</h1>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          
          {/* Cart */}
          <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
            <FaShoppingCart className="text-lg" />
            <span className="text-md font-medium">Cart</span>
          </div>

          {/* Wishlist */}
          <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
            <FaHeart className="text-lg" />
            <span className="text-md font-medium">Wishlist</span>
          </div>

          {/* Account */}
          <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
            <FaUser className="text-lg" />
            <span className="text-md font-medium">Account</span>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
