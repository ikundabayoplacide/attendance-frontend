import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import evsLogo from '../../assets/logos/evs.png'

function RegisterNavbar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-3 sm:px-6 py-2 border-b border-gray-200 gap-2 bg-[#1A3263] flex-shrink-0">
      {/* Logo */}
      <div className='flex items-center gap-3'>
        <img src={evsLogo} alt='EVS Logo' className='w-6 h-6 sm:w-8 sm:h-8' />
        <span className='text-xs sm:text-xl font-semibold text-white'>
          E-visitor platform
        </span>
      </div>

      {/* Nav */}
      <nav className='hidden md:block'>
        <ul className='flex gap-4 text-white font-bold text-xl'>
          <Link to="/" className='hover:text-gray-300 cursor-pointer !text-white'>Home</Link>
          <Link to="/about" className='hover:text-gray-300 cursor-pointer !text-white'>About</Link>
          <Link to="/services" className='hover:text-gray-300 cursor-pointer !text-white'>Services</Link>
          <Link to="/contact" className='hover:text-gray-300 cursor-pointer !text-white'>Contact</Link>
        </ul>
      </nav>

      {/* Right */}
      <div className='flex items-center gap-4 text-white'>
        <Link to="/login" className='rounded-xl bg-white text-blue-800 px-2 py-1 text-lg flex items-center gap-1 font-bold hover:bg-gray-100 transition-colors'>
          <FaSignInAlt size={12} />
          Login
        </Link>
      </div>
    </div>
  )
}

export default RegisterNavbar