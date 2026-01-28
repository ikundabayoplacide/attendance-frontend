import { useState } from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEye, FaEyeSlash, FaChevronDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import evsLogo from '../../assets/logos/evs.png'
import backgroundImage from '../../assets/images/chartImagenow.png'
import borderImage from '../../assets/images/kf.png'
import Button from '../../components/ui/Button'


function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginType, setLoginType] = useState('email') // 'email' or 'phone'
  const [loginValue, setLoginValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('+250')
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [password, setPassword] = useState('')

  const countries = [
    { code: '+250', name: 'Rwanda', flag: '🇷🇼' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+254', name: 'Kenya', flag: '🇰🇪' },
    { code: '+256', name: 'Uganda', flag: '🇺🇬' }
  ]

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login submitted', { loginType, loginValue, password, rememberMe })
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center relative px-4 py-8"
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

      {/* Main login container */}
      <div className="w-full max-w-6xl h-auto bg-white backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative">
        {/* Window controls */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <span className="ml-4 text-[#1A3263] text-sm flex font-bold"><img src={evsLogo} alt="EVS Logo" className="w-5 h-5 mr-2" />EVS Login</span>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row min-h-[500px] relative">
          {/* Left side - Blue section */}
          <div
            className="w-full lg:w-1/2 flex items-center justify-center relative p-8 lg:p-0 overflow-visible"
            style={{
              background: "linear-gradient(135deg, #4a6fa5 0%, #3b5998 50%, #2d4373 100%)"
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: "150px",
                height: "150px",
                top: "15%",
                right: "15%",
              }}
            />

            <div
              className="absolute rounded-full bg-white opacity-5"
              style={{
                width: "100px",
                height: "100px",
                top: "50%",
                left: "20%",
              }}
            />

            <div
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: "180px",
                height: "180px",
                bottom: "10%",
                left: "10%",
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-8">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-white flex items-center justify-center shadow-xl">
                  <img src={evsLogo} alt="EVS Logo" className="w-12 h-12 lg:w-18 lg:h-18" />
                </div>
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-3 tracking-wide">WELCOME To</h2>
              <p className="text-lg lg:text-xl text-blue-100 font-light">E-Visitors System</p>
            </div>
          </div>

          {/* S-Curve Divider - positioned absolutely between sections */}
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
          <div className="w-full lg:w-1/2 bg-white flex items-center justify-center  p-26 lg:p-12 relative z-50">
            <div className="w-full max-w-sm">
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Please Sign in</h3>
                <p className="text-gray-500 text-sm mt-2 mb-8">Login to your account to continue</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Login Type Toggle */}
                <div className="mb-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setLoginType('email')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        loginType === 'email'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginType('phone')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        loginType === 'phone'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>

                {/* Dynamic Input Field */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    {loginType === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  {loginType === 'phone' ? (
                    <div className="flex">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCountryOpen(!isCountryOpen)}
                          className="flex items-center gap-2 px-3 py-3 bg-gray-50 border border-gray-200 border-r-0 rounded-l-lg hover:bg-gray-100 transition-colors"
                        >
                          <span>{countries.find(c => c.code === selectedCountry)?.flag}</span>
                          <span className="text-sm text-blue-700">{selectedCountry}</span>
                          <FaChevronDown className={`text-xs transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isCountryOpen && (
                          <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[200px] z-50">
                            {countries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country.code)
                                  setIsCountryOpen(false)
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                                <span>{country.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={loginValue}
                        onChange={(e) => setLoginValue(e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>
                  ) : (
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={loginValue}
                      onChange={(e) => setLoginValue(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                    />
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
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

                {/* Remember me and Forgot password */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link to="/reset-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot Password?
                  </Link>
                </div>

                {/* Sign in button */}
                <Button
                  className="w-full bg-[#1A3263] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 mb-6"
                >
                  Sign in
                </Button>

                {/* Divider */}
                <div className="flex items-center mb-6">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-sm text-gray-500">or continue with</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Social login buttons */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                  >
                    <FaFacebookF size={16} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 text-white transition-colors duration-200"
                  >
                    <FaTwitter size={16} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-200"
                  >
                    <FaLinkedinIn size={16} />
                  </button>
                </div>

                {/* Sign up link */}
                <p className="text-center mb-2 text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign up
                  </Link>
                </p>
              </form>

              {/* Footer text */}
              <p className="text-center text-xs text-gray-400 mt-6">
                Security & Authentication
              </p>
            </div>
          </div>
          
        </div>
      </div>
      {/* <img
        src={computerSite}
        alt='Computer Site'
        className='w-20 h-16 sm:w-32 sm:h-24 absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 pointer-events-none'
      /> */}
    </div>
  )
}

export default Login