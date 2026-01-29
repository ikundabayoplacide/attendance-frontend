import { useState } from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEye, FaEyeSlash, FaChevronDown, FaSignInAlt, FaInstagram } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import evsLogo from '../../assets/logos/evs.png'
import backgroundImage from '../../assets/images/chartImagenow.png'
import borderImage from '../../assets/images/kf.png'
import Button from '../../components/ui/Button'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('+250')
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: ''
  })

  const countries = [
    { code: '+250', name: 'Rwanda', flag: '🇷🇼' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+254', name: 'Kenya', flag: '🇰🇪' },
    { code: '+256', name: 'Uganda', flag: '🇺🇬' }
  ]

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  )

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Register submitted', formData)
  }

  return (
    <div
      className="w-screen h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        border: '10px solid transparent',
        borderImage: `url(${borderImage}) 10 repeat`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Main register container */}
      <div className="w-[95vw] h-[95vh] max-w-6xl bg-white backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative flex flex-col">
        {/* Window controls */}
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

        {/* Content */}
        <div className="flex flex-col lg:flex-row flex-1 relative overflow-hidden">
          {/* Left side - Blue section */}
          <div
            className="w-full lg:w-1/2 flex flex-col relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #4a6fa5 0%, #3b5998 50%, #2d4373 100%)"
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: "10vw",
                height: "10vw",
                top: "15%",
                right: "15%",
              }}
            />

            <div
              className="absolute rounded-full bg-white opacity-5"
              style={{
                width: "6vw",
                height: "6vw",
                top: "50%",
                left: "20%",
              }}
            />

            <div
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: "12vw",
                height: "12vw",
                bottom: "10%",
                left: "10%",
              }}
            />

            {/* Content - flex-1 to take available space */}
            <div className="relative z-10 text-center text-white px-4 flex-1 flex flex-col justify-center">
              <div className="mb-4 flex justify-center">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white flex items-center justify-center shadow-xl">
                  <img src={evsLogo} alt="EVS Logo" className="w-28 h-28 lg:w-36 lg:h-36" />
                </div>
              </div>
              <h2 className="text-xl lg:text-3xl font-bold mb-2 tracking-wide">JOIN US</h2>
              <p className="text-xl lg:text-lg text-blue-100 font-light mb-4">E-Visitors System</p>
            </div>
            
            {/* Social Media Buttons - positioned at bottom */}
            <div className="relative z-10 pb-6 flex justify-center">
              <div className="flex justify-center gap-3">
                <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:bg-[#166FE5] transition-colors">
                  <FaFacebookF size={12} />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:bg-[#1A91DA] transition-colors">
                  <FaTwitter size={12} />
                </button>
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                  <FaInstagram size={12} />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:bg-[#004182] transition-colors">
                  <FaLinkedinIn size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* S-Curve Divider */}
          <svg
            className="absolute left-1/2 top-0 h-full hidden lg:block z-20"
            style={{ width: '100px', marginLeft: '-80px' }}
            viewBox="0 0 200 600"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,0 C 150,0 150,150 100,300 C 50,450 50,600 200,600 L 200,0 Z"
              fill="white"
            />
          </svg>

          {/* Right side - White section */}
          <div className="w-full lg:w-1/2 bg-white flex flex-col p-4 relative z-50">
            <div className="flex-shrink-0 mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Create Account</h3>
              <p className="text-gray-500 text-xs mt-1">Fill in your details to register</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="w-full max-w-sm mx-auto">
                <form onSubmit={handleSubmit} className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCountryOpen(!isCountryOpen)}
                        className="flex items-center gap-2 px-2 py-3 bg-gray-50 border border-gray-400 border-r-0 rounded-l-lg hover:bg-gray-100 transition-colors min-w-[120px]"
                      >
                        <span>{countries.find(c => c.code === selectedCountry)?.flag}</span>
                        <span className="text-xs text-black">{countries.find(c => c.code === selectedCountry)?.name}</span>
                        <span className="text-xs text-black">{selectedCountry}</span>
                        <FaChevronDown className={`text-xs transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isCountryOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[200px] z-50">
                          <div className="px-3 py-2 border-b border-gray-200">
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full text-black px-2 py-1 text-sm border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-40 overflow-y-auto hide-scrollbar">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country.code)
                                  setIsCountryOpen(false)
                                  setCountrySearch('')
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                              >
                                <span>{country.flag}</span>
                                <span className='text-black'>{country.code}</span>
                                <span className='text-black'>{country.name}</span>
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                No countries found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="780000000"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-400 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Terms and conditions */}
                <div className="mb-6">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Create Account button */}
                <Button
                  className="w-full bg-[#1A3263] hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200 mb-6"
                >
                  Create Account
                </Button>

                {/* Divider */}
                <div className="flex items-center mb-6">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-sm text-gray-500">or sign up with</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Google Sign Up */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 mb-4"
                >
                  <FcGoogle size={20} />
                  <span className="text-gray-700 font-medium">Sign up with Google</span>
                </button>

                {/* Sign in link */}
                <p className="text-center mb-2 text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign in
                  </Link>
                </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <img
        src={computerSite}
        alt='Computer Site'
        className='w-20 h-16 sm:w-32 sm:h-24 absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none'
      /> */}
    </div>
  )
}

export default Register