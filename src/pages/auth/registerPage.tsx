import { useState } from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEye, FaEyeSlash, FaChevronDown, FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import evsLogo from '../../assets/logos/evs.png'
import backgroundImage from '../../assets/images/chartImagenow.png'
import borderImage from '../../assets/images/kf.png'
import Button from '../../components/ui/Button'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState('+250')
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
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

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log('Register submitted', formData)
    }
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
      {/* Main register container */}
      <div className="w-full max-w-6xl h-auto bg-white backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative">
        {/* Window controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="ml-4 text-[#1A3263] text-sm flex font-bold">
            <img src={evsLogo} alt="EVS Logo" className="w-5 h-5 mr-2" />EVS Register</span>
          <Link to="/">
            <FaHome className="text-blue-800 hover:text-gray-600 cursor-pointer ml-auto mr-10 w-6 h-6" />
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row min-h-[600px] relative">
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
                <div className="w-24 h-24 lg:w-48 lg:h-48 rounded-full bg-white flex items-center justify-center shadow-xl">
                  <img src={evsLogo} alt="EVS Logo" className="w-24 h-24 lg:w-34 lg:h-34" />
                </div>
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-3 tracking-wide">JOIN US</h2>
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
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Create Account</h3>
                <p className="text-gray-500 text-sm mt-2 mb-6">Step {currentStep} of 3</p>
              </div>

              <form onSubmit={handleSubmit}>
                {currentStep === 1 ? (
                  <>
                    {/* Full Name */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>
                    {/* Phone Number */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <div className="flex">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsCountryOpen(!isCountryOpen)}
                            className="flex items-center gap-2 px-3 py-3 bg-gray-50 border border-gray-200 border-r-0 rounded-l-lg hover:bg-gray-100 transition-colors"
                          >
                            <span>{countries.find(c => c.code === selectedCountry)?.flag}</span>
                            <span className="text-sm text-black">{selectedCountry}</span>
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
                                  <span className='text-black'>{country.code}</span>
                                  <span className='text-black'>{country.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="780000000"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
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

                    <Button

                      className="w-full bg-[#1A3263] hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200 mb-6"
                    >
                      Next
                    </Button>
                  </>
                ) : currentStep === 2 ? (
                  <>
                    {/* Province */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Province
                      </label>
                      <input
                        type="text"
                        name="province"
                        placeholder="Enter your province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* District */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        District
                      </label>
                      <input
                        type="text"
                        name="district"
                        placeholder="Enter your district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Sector */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Sector
                      </label>
                      <input
                        type="text"
                        name="sector"
                        placeholder="Enter your sector"
                        value={formData.sector}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Cell */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Cell
                      </label>
                      <input
                        type="text"
                        name="cell"
                        placeholder="Enter your cell"
                        value={formData.cell}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Village */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Village
                      </label>
                      <input
                        type="text"
                        name="village"
                        placeholder="Enter your village"
                        value={formData.village}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    <div className="flex gap-3 mb-6">
                      <Button

                        onClick={() => setCurrentStep(1)}
                        className="flex-1 border-1 border-[#1A3263] hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200"
                      >
                        Back
                      </Button>
                      <Button

                        className="flex-1 bg-[#1A3263] hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                      >
                        Next
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Role Selection */}
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-4">
                        Select Your Role
                      </label>
                      <div className="space-y-3">
                        {['Team Leader', 'Help Desk', 'Check Point Officer', 'Protocol/Delegation'].map((roleOption) => (
                          <label key={roleOption} className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <input
                              type="radio"
                              name="role"
                              value={roleOption}
                              checked={formData.role === roleOption}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-gray-700">{roleOption}</span>
                          </label>
                        ))}
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

                    <div className="flex gap-3 mb-6">
                      <Button

                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gray-200 border-1 border-[#1A3263] hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200"
                      >
                        Back
                      </Button>
                      <button
                        type="submit"
                        className="flex-1  bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                      >
                        Create Account
                      </button>
                    </div>
                  </>
                )}

                {/* Social login buttons - only show on step 1 */}
                {currentStep === 1 && (
                  <>
                    {/* Divider */}
                    <div className="flex items-center mb-6">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="px-4 text-sm text-gray-500">or sign up with</span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>

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
                  </>
                )}

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
      {/* <img
        src={computerSite}
        alt='Computer Site'
        className='w-20 h-16 sm:w-32 sm:h-24 absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none'
      /> */}
    </div>
  )
}

export default Register