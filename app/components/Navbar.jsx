import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectUsername } from '../redux/slices/userSlice';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = useSelector(selectUsername);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-purple-700 p-4 flex flex-col sm:flex-row items-center justify-between">
      {/* Logo for all screens */}
      <div className="flex items-center mb-4 sm:mb-0">
        <a href="/" className="text-white text-lg font-bold hover:underline sm:block hidden" >
          CircleVista
        </a>
      </div>
   
      {/* Menu button for small screens */}
      <div className="sm:hidden flex items-center justify-between w-full">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <a href="/" className="text-white text-lg font-bold hover:underline">
          CircleVista
        </a>
      </div>

      {/* Menu for small screens */}
      <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-2 mt-2">
          <a href="/" className="text-white hover:underline">
            Home
          </a>
          <a href="/createPost" className="text-white hover:underline">
            Create Post
          </a>
          <a href="/posts" className="text-white hover:underline">
            Posts
          </a>
          {username ? (
            <a href="/logout" className="text-white hover:underline">
              Logout
            </a>
          ) : (
            <>
              <a href="/login" className="text-white hover:underline">
                Login
              </a>
              <a href="/register" className="text-white hover:underline">
                Register
              </a>
            </>
          )}
        </div>
      </div>

      {/* Logo and links for medium and large screens */}
      <div className="hidden sm:flex items-center space-x-4">
        <a href="/" className="text-white hover:underline">
          Home
        </a>
        <a href="/createPost" className="text-white hover:underline">
          Create Post
        </a>
        <a href="/posts" className="text-white hover:underline">
          Posts
        </a>
        {username ? (
          <a href="/logout" className="text-white hover:underline">
            Logout
          </a>
        ) : (
          <>
            <a href="/login" className="text-white hover:underline">
              Login
            </a>
            <a href="/register" className="text-white hover:underline">
              Register
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
