import logonobg from "../assets/images/logonobg.png";
import cartIcon from "../assets/icons/cart.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./elements/Button";
import { useEffect, useState } from "react";

export const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('user');


  const handleLogout = () => {
    localStorage.removeItem("Auth token");
    localStorage.removeItem("User Id");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem("Auth token");
      if (token) {
        setIsLoggedIn(true);
        fetch('http://localhost:2000/api/test/restaurant', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
          }
        }).then((response) => {
          if (response.status === 200) {
              setUserRole('restaurant');
          }
        })
        fetch('http://localhost:2000/api/test/delivery', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
          }
        }).then((response) => {
          if (response.status === 200) {
              setUserRole('delivery');
          }
        })
                
      } else {
        setIsLoggedIn(false);
        setUserRole('user');
      }
    };

    checkAuthToken();
    window.addEventListener("storage", checkAuthToken);

    return () => {
      window.removeEventListener("storage", checkAuthToken);
    };
  }, [setUserRole]);

  return (
    <nav id="header" className="bg-black text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        
        {/*Logo*/}
        <div className="logo-wrapper pl-4 flex items-center">
          <Link
            to="/"
            className="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            <img src={logonobg} alt="logo" className="w-30 h-20 object-cover hover:scale-110" />
          </Link>
        </div>

        {/*Pages*/}
        <div className="nav-menu-wrapper flex items-center justify-between space-x-4 lg:space-x-10">
          <button
            onClick={handleMenuToggle}
            className="text-xl lg:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 lg:h-6 lg:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex flex-grow items-center mt-2 lg:mt-0`}
          >
            { userRole === 'delivery' && (
            <div>
              <Link
              to="/"
              className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-10"
              >
                Home
              </Link>
              
              <Link
                to="/delivery"
                className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-10"
              >
                Livraisons
              </Link>
            </div>
            )}
            { userRole === 'restaurant' && (
            <div>
              <Link
              to="/"
              className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-10"
              >
                Home
              </Link>
              
              <Link
                to="/restaurants"
                className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-10"
              >
                Restaurants
              </Link>
            </div>
            )}
            { userRole === 'user' && (
            <div>
              <Link
              to="/"
              className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-10"
              >
                Home
              </Link>
              
              <Link
                to="/menu"
                className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-10"
              >
                Menus
              </Link>

              <Link
                to="/restaurants"
                className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-10"
              >
                Restaurants
              </Link>
            </div>
            )}
            
          </div>
        </div>
        
        {/*Cart et log*/}
        <div className="nav-menu-wrapper flex items-center justify-between space-x-4">

          <Link to="/cart" className="relative hover:scale-110">
            <img src={cartIcon} alt="cart"/>
            {cartCount > 0 && (
              <div className="rounded-full bg-red-600 text-white inline-flex justify-center items-center w-5 h-5 absolute -top-2 -right-2">
                {cartCount}
              </div>
            )}
          </Link>

          {isLoggedIn ? (
            <Button 
              onClick={handleLogout}
              className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-5 ml-5"
              >
                Log Out
              </Button>
          ) : (
            
            <div className="flex space-x-4">
              <Link 
                to="/login"
                className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110 mr-5 ml-5"
                >
                  Log In
                </Link>
              <Link 
                to="/register"
                className="text-2xl lg:text-xl text-white hover:text-yellow-400 hover:scale-110">
                  Sign Up
                </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};