import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import evsLogo from '../../assets/logos/evs.png'
import backgroundImage from '../../assets/images/chartImagenow.png'
import borderImage from '../../assets/images/kf.png'

function ResetPassword() {
  const [resetType, setResetType] = useState('email') 
  const [resetValue, setResetValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('+250')
  const [isCountryOpen, setIsCountryOpen] = useState(false)

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
    console.log('Reset password submitted', { resetType, resetValue, selectedCountry })
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
      {/* Main reset password container */}
      <div className="w-full max-w-6xl h-auto bg-white backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative">
        {/* Window controls */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <span className="ml-4 text-[#1A3263] text-sm flex font-bold"><img src={evsLogo} alt="EVS Logo" className="w-5 h-5 mr-2" />EVS Reset Password</span>
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
              <h2 className="text-2xl lg:text-4xl font-bold mb-3 tracking-wide">RESET PASSWORD</h2>
              <p className="text-lg lg:text-xl text-blue-100 font-light">E-Visitors System</p>
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
          <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12 relative z-50">
            <div className="w-full max-w-sm">
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Reset Password</h3>
                <p className="text-gray-500 text-sm mt-2 mb-8">Enter your email or phone to reset password</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Reset Type Toggle */}
                <div className="mb-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setResetType('email')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        resetType === 'email'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setResetType('phone')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        resetType === 'phone'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>

                {/* Dynamic Input Field */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    {resetType === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  {resetType === 'phone' ? (
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
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                              >
                                <span>{country.flag}</span>
                                <span className="text-black">{country.code}</span>
                                <span className="text-black">{country.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={resetValue}
                        onChange={(e) => setResetValue(e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>
                  ) : (
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={resetValue}
                      onChange={(e) => setResetValue(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                    />
                  )}
                </div>

                {/* Reset button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 mb-6"
                >
                  Send Reset Link
                </button>

                {/* Back to login link */}
                <p className="text-center mb-2 text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Back to Login
                  </Link>
                </p>
              </form>

            
            </div>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default ResetPassword