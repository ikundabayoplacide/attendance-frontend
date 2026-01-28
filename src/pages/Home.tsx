import borderImage from '../assets/images/kf.png'
import homeImage from '../assets/images/chartImagenow.png'
import cloudImage from '../assets/images/kigaliport.png'
import evsLogo from '../assets/logos/evs.png'
import computerSite from '../assets/images/removedBackground.png'
import chatbotAnimation from '../assets/avatar/Cute chatbot greeting people with computer.json'

import Lottie from 'lottie-react'
import { useState } from 'react'
import { FaArrowRight, FaChevronDown, FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('ENG')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  
  const languages = [
    { code: 'ENG', name: 'English' },
    { code: 'KIN', name: 'Kinyarwanda' },
    { code: 'SWA', name: 'Kiswahili' },
    { code: 'ARA', name: 'Arabic' },
    { code: 'FRA', name: 'French' }
  ]
  return (
    <div
      className='w-full min-h-screen flex justify-center items-center relative'
      style={{
        border: '10px solid transparent',
        borderImage: `url(${borderImage}) 10 repeat`,
        backgroundImage: `url(${homeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* MAIN CARD */}
      <div className='w-full sm:w-11/12 md:w-10/12 lg:w-8/12 h-auto sm:h-5/6 mb-16 mx-2 sm:mx-4 rounded-xl sm:rounded-3xl shadow-2xl border border-gray-100 relative bg-white/90 backdrop-blur-md'>

        <div className='h-full flex flex-col'>

          {/* NAVBAR */}
          <div
            className='flex flex-col sm:flex-row justify-between items-center px-3 sm:px-6 py-3 rounded-t-xl sm:rounded-t-3xl gap-2 bg-[#1A3263]'
          >
            {/* Logo */}
            <div className='flex items-center gap-3'>
              <img src={evsLogo} alt='EVS Logo' className='w-8 h-8 sm:w-12 sm:h-12' />
              <span className='text-sm sm:text-xl font-semibold text-white'>
                E-visitor platform
              </span>
            </div>

            {/* Nav */}
            <nav className='hidden md:block'>
              <ul className='flex gap-6 text-white'>
                <li className='hover:text-gray-300 cursor-pointer'>Home</li>
                <li className='hover:text-gray-300 cursor-pointer'>About</li>
                <li className='hover:text-gray-300 cursor-pointer'>Services</li>
                <li className='hover:text-gray-300 cursor-pointer'>Contact</li>
              </ul>
            </nav>

            {/* Right */}
            <div className='flex items-center gap-4 text-white'>
              <div className='relative'>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className='flex items-center border-1 border-white gap-2 px-3 py-1 rounded-md hover:bg-white/10 transition-colors'
                >
                  <span className='text-sm font-medium'>{selectedLanguage}</span>
                  <FaChevronDown className={`text-xs transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLanguageOpen && (
                  <div className='absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[120px] z-50'>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code)
                          setIsLanguageOpen(false)
                        }}
                        className='w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2'
                      >
                        <span className='font-medium text-blue-600'>{lang.code}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to='/login'
                className='rounded-xl bg-white text-blue-800 px-3 py-1 text-sm'
              >
                 <FaSignInAlt size={23} /> 
              </Link>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div
            className='flex-1 flex flex-col lg:flex-row rounded-b-xl sm:rounded-b-3xl overflow-hidden'
            style={{
              backgroundImage: `url(${cloudImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* LEFT */}
            <div className='w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
                Digital Visitor Management
              </h1>

              <p className='text-gray-700 text-sm sm:text-base lg:text-lg mb-8 max-w-md'>
                Streamline your visitor experience with our modern, secure, and efficient
                electronic visitor system. Track, manage, and welcome guests seamlessly.
              </p>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Button className='bg-white text-[#1A3263] rounded-full border border-[#1A3263]'>
                  Learn More
                </Button>

                <Button className='bg-[#1A3263] flex gap-3 items-center'>
                  Get Started
                  <FaArrowRight className='text-white' />
                </Button>
              </div>
            </div>

            {/* RIGHT */}
            <div className='w-full lg:w-1/2 flex justify-center items-start h-64 sm:h-auto'>
              <Lottie
                animationData={chatbotAnimation}
                className='w-full h-full -mt-10 sm:-mt-20'
                loop
                autoplay
              />
            </div>
          </div>
        </div>

        <img
          src={computerSite}
          alt='Computer Site'
          className='
            w-20 h-20
            sm:w-32 sm:h-24
            absolute
            -bottom-22
            left-1/2
            transform -translate-x-1/2
            z-30
            pointer-events-none
          '
        />
      </div>
      


    </div>
  )
}

export default Home
