import { useState, useEffect, useRef } from 'react'
import { FaUser, FaFingerprint, FaIdCard, FaMicrophone, FaHandPaper, FaSearch, FaSync, FaSignature, FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { MdQrCodeScanner, MdVisibility } from 'react-icons/md'
import EquipmentModal from '../../../components/modals/EquipmentModal'
import AppointmentModal from '../../../components/modals/UserHasAppointmentModal'
import AppointmentsModal from '../../../components/modals/AppointmentsModal'
import { checkPermissions } from '../../../utils/helper'
import { useAuth } from '../../../hooks/useAuth'
import { CreateUser } from '../../../hooks/useUser'

const avatimage = '/images/avartImage.avif'
const mockRecentTaps = [
  { no: 1, names: 'NSHUTI Ngabo', documentType: 'Personal ID', phoneNumber: '+250782471145', entryTime: '2026-02-20 09:35:00', exitTime: '_', department: 'SAN TECH' },
  { no: 2, names: 'KEZA Shania', documentType: 'Personal ID', phoneNumber: '+250785490284', entryTime: '2026-02-20 09:18:02', exitTime: '_', department: 'SAN TECH' },
]

function ScanningPage() {
  const { currentUser } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState({
    selectedMode: '', isScanning: false, searchName: '', hasAppointment: false,
    searchType: 'name' as 'name' | 'phone' | 'voice', showSearchOptions: false, isRecording: false,
    showEquipmentModal: false, showAppointmentModal: false, showAppointmentsModal: false,
    rawScannedId: '', verificationStatus: 'idle' as 'idle' | 'verifying' | 'success' | 'error',
    selectedDocType: 'national-id' as 'driving-license' | 'national-id' | 'passport' | 'others',
    showCountryDropdown: false, appointments: 4, checkInCount: 2, checkOutCount: 3
  })
  const [equipmentList, setEquipmentList] = useState<any[]>([])
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null)
  const [selectedCountry, setSelectedCountry] = useState({ code: '+250', flag: '🇷🇼', name: 'Rwanda' })

  // Destructure state for easier access
  const { selectedMode, isScanning, searchName, hasAppointment, searchType, showSearchOptions, isRecording, showEquipmentModal, showAppointmentModal, showAppointmentsModal, rawScannedId, verificationStatus, selectedDocType, showCountryDropdown, appointments, checkInCount, checkOutCount } = state
  
  // Helper functions to update state
  const setRawScannedId = (value: string) => setState(s => ({ ...s, rawScannedId: value }))
  const setShowEquipmentModal = (value: boolean) => setState(s => ({ ...s, showEquipmentModal: value }))
  const setShowAppointmentsModal = (value: boolean) => setState(s => ({ ...s, showAppointmentsModal: value }))
  const setShowAppointmentModal = (value: boolean) => setState(s => ({ ...s, showAppointmentModal: value }))
  const setShowCountryDropdown = (value: boolean) => setState(s => ({ ...s, showCountryDropdown: value }))
  const setSelectedDocType = (value: string) => setState(s => ({ ...s, selectedDocType: value as any }))
  const setSearchName = (value: string) => setState(s => ({ ...s, searchName: value }))
  const setSearchType = (value: 'name' | 'phone' | 'voice') => setState(s => ({ ...s, searchType: value }))
  const setShowSearchOptions = (value: boolean) => setState(s => ({ ...s, showSearchOptions: value }))
  const setIsRecording = (value: boolean) => setState(s => ({ ...s, isRecording: value }))

  const countries = [
    { code: '+250', flag: '🇷🇼', name: 'Rwanda' }, { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' }, { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+1', flag: '🇺🇸', name: 'United States' }, { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+33', flag: '🇫🇷', name: 'France' }, { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+86', flag: '🇨🇳', name: 'China' }, { code: '+91', flag: '🇮🇳', name: 'India' }
  ]
  const [visitorForm, setVisitorForm] = useState({
    fullName: '',
    password: 'defaultPassword123',
    phoneNumber: '',
    status: 'active' as 'active' | 'inactive' | 'pending' | 'rejected',
    category: 'Employee',
    department: 'ICT',
    // Additional fields for internal use (not sent to backend)
    scannedId: '',
    badge: '',
    role: 'visitor',
    nationalId: '',
    profilePhoto: '',
    hasEquipment: false
  })
  
  const createUserMutation = CreateUser()

  const verificationModes = [
    { id: 'face', name: 'Face', icon: FaUser }, { id: 'fingerprint', name: 'Fingerprint', icon: FaFingerprint },
    { id: 'igipande', name: 'Igipande', icon: FaIdCard }, { id: 'id-passport', name: 'ID/Passport', icon: FaIdCard },
    { id: 'voice', name: 'Voice', icon: FaMicrophone }, { id: 'ocr', name: 'OCR', icon: MdQrCodeScanner },
    { id: 'gesture', name: 'Gesture', icon: FaHandPaper }, { id: 'signature', name: 'signature', icon: FaSignature },
    { id: 'pupil', name: 'Pupil', icon: MdVisibility }
  ]

  const isMethodVerified = (modeId: string) => 
    (modeId === 'face' && visitorForm.profilePhoto) ||
    ((modeId === 'id-passport' || modeId === 'igipande') && visitorForm.nationalId) ||
    (modeId === 'ocr' && visitorForm.fullName && visitorForm.phoneNumber)

  const handleModeSelect = (modeId: string) => {
    setState(s => ({ ...s, selectedMode: modeId, isScanning: true }))
    setTimeout(() => {
      setState(s => ({ ...s, isScanning: false }))
      setVisitorForm(prev => ({ ...prev, fullName: 'John Doe', phoneNumber: '788123456',
        company: 'Tech Solutions Ltd', nationalId: 'ID123456789' }))
      const hasAppt = Math.random() > 0.5
      setState(s => ({ ...s, hasAppointment: hasAppt }))
      if (hasAppt) {
        const isInCompany = Math.random() > 0.3
        setAppointmentDetails({
          visitorName: 'John Doe', hostName: 'Jane Smith', hostStatus: isInCompany ? 'in' : 'out',
          hostAvailability: isInCompany && Math.random() > 0.5 ? 'available' : 'not-available',
          appointmentTime: '2:00 PM - 3:00 PM', purpose: 'Business meeting to discuss project proposal',
          department: 'ICT Department'
        })
      }
    }, 2000)
  }

  const normalizeMobile = (mobile: string) => {
    const raw = mobile.trim()
    const country = selectedCountry.code.replace('+', '')
    if (!raw) return ''
    if (raw.startsWith(selectedCountry.code)) return raw.slice(selectedCountry.code.length).trim()
    if (raw.startsWith(country)) return raw.slice(country.length).trim()
    return raw
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'phoneNumber' && typeof value === 'string') value = normalizeMobile(value)
    setVisitorForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (visitorForm.hasEquipment) {
      setState(s => ({ ...s, showEquipmentModal: true }))
    } else {
      // Extract idnumber from rawScannedId if it's a card string
      let extractedScannedId = 'MANUAL_ENTRY'
      if (state.rawScannedId) {
        const parsedData = parseCardString(state.rawScannedId)
        extractedScannedId = parsedData.idnumber || state.rawScannedId
      }
      
      // Prepare data for backend - only include fields that match UserCreateRequest
      const userData = {
        fullName: visitorForm.fullName,
        email: '',
        password: visitorForm.password,
        scannedId: extractedScannedId,
        phoneNumber: `${selectedCountry.code}${visitorForm.phoneNumber}`,
        status: visitorForm.status,
        category: visitorForm.category,
        department: visitorForm.department
      }
      
      console.log('=== SUBMITTING USER DATA TO BACKEND ===')
      console.log('Backend payload:', JSON.stringify(userData, null, 2))
      console.log('Additional form data (not sent to backend):')
      console.log('- nationalId:', visitorForm.nationalId)
      console.log('- badge:', visitorForm.badge)
      console.log('- role:', visitorForm.role)
      console.log('- profilePhoto:', visitorForm.profilePhoto ? 'Present' : 'Not set')
      console.log('- rawScannedString:', state.rawScannedId)
      console.log('============================================')
      
      createUserMutation.mutate(userData, {
        onSuccess: () => {
          handleReset()
          console.log('Form reset after successful submission')
        }
      })
    }
  }

  const handleReset = () => {
    setVisitorForm({
      fullName: '',
      password: 'defaultPassword123',
      phoneNumber: '',
      status: 'active' as 'active' | 'inactive' | 'pending' | 'rejected',
      category: 'Employee',
      department: 'ICT',
      // Additional fields for internal use
      scannedId: '',
      badge: '',
      role: 'visitor',
      nationalId: '',
      profilePhoto: '',
      hasEquipment: false
    })
    setState(s => ({ ...s, rawScannedId: '', selectedMode: '', isScanning: false }))
  }

  const handleVoiceSearch = () => {
    setState(s => ({ ...s, searchType: 'voice', showSearchOptions: false, isRecording: true }))
    setTimeout(() => setState(s => ({ ...s, isRecording: false })), 3000)
  }

  const parseCardString = (cardString: string) => {
    const data: Record<string, string> = {}
    const trimmed = cardString.trim()
    const cleanString = trimmed.toLowerCase().startsWith('name:') ? trimmed.substring(5) : trimmed
    const parts = cleanString.split('/')
    if (parts[0]) data.name = parts[0].replace('.', '').trim()
    parts.slice(1).forEach((part: string) => {
      const colonIndex = part.indexOf(':')
      if (colonIndex !== -1) {
        const key = part.substring(0, colonIndex).toLowerCase().trim()
        const value = part.substring(colonIndex + 1).trim().replace(/'/g, '')
        data[key] = value
      }
    })
    return data
  }

  const handleIdVerification = (id:any) => {
    if (!id.trim()) return setState(s => ({ ...s, verificationStatus: 'idle' }))
    setState(s => ({ ...s, verificationStatus: 'verifying' }))
    
    const isCardString = id.includes('Name:') || id.includes('name:') || /\/idnumber:/i.test(id) || /\/tell:/i.test(id) || /\/department:/i.test(id)
    
    if (isCardString) {
      const parsedData = parseCardString(id)
      setState(s => ({ ...s, verificationStatus: 'success', rawScannedId: id.trim() }))
      const rawMobile = parsedData.tell || parsedData.tel || parsedData.phone || ''
      setVisitorForm(prev => ({ ...prev, fullName: parsedData.name || '', nationalId: parsedData.idnumber || '',
        phoneNumber: normalizeMobile(rawMobile) }))
      setTimeout(() => setState(s => ({ ...s, verificationStatus: 'idle' })), 3000)
      return
    }
    
    setTimeout(() => {
      const isValidId = id.length >= 8 && /^[A-Z0-9]+$/i.test(id)
      if (isValidId) {
        setState(s => ({ ...s, verificationStatus: 'success' }))
        setVisitorForm(prev => ({ ...prev, fullName: 'UWIMANA Jean Claude', phoneNumber: '788123456',
          nationalId: id, department: 'ICT', status: 'active' as 'active' | 'inactive' | 'pending' | 'rejected' }))
        const hasAppt = Math.random() > 0.4
        setState(s => ({ ...s, hasAppointment: hasAppt }))
        if (hasAppt) {
          setAppointmentDetails({ visitorName: 'UWIMANA Jean Claude', hostName: 'MUKAMANA Alice',
            hostStatus: 'in', hostAvailability: 'available', appointmentTime: '2:00 PM - 3:00 PM',
            purpose: 'Technical meeting for system upgrade', department: 'ICT Department' })
        }
      } else {
        setState(s => ({ ...s, verificationStatus: 'error' }))
      }
      setTimeout(() => setState(s => ({ ...s, verificationStatus: 'idle' })), 5000)
    }, 2000)
  }


  const filteredTaps = mockRecentTaps.filter(t => t.names.toLowerCase().includes(state.searchName.toLowerCase()))

  // Focus input on component mount and when returning to page
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
    // Focus immediately
    focusInput()

    // Focus when window regains focus (coming back from another tab/page)
    const handleFocus = () => focusInput()
    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Equipment Modal */}
      <EquipmentModal
        isOpen={showEquipmentModal}
        onClose={() => {
          setShowEquipmentModal(false)
          if (equipmentList.length === 0) {
            handleInputChange('hasEquipment', false)
          } else {
            // Extract idnumber from rawScannedId if it's a card string
            let extractedScannedId = 'MANUAL_ENTRY'
            if (state.rawScannedId) {
              const parsedData = parseCardString(state.rawScannedId)
              extractedScannedId = parsedData.idnumber || state.rawScannedId
            }
            
            // If equipment was added, proceed with submission
            const userData = {
              fullName: visitorForm.fullName,
              email: '',
              password: visitorForm.password,
              scannedId: extractedScannedId,
              phoneNumber: `${selectedCountry.code}${visitorForm.phoneNumber}`,
              status: visitorForm.status,
              category: visitorForm.category,
              department: visitorForm.department
            }
            
            console.log('=== SUBMITTING USER DATA WITH EQUIPMENT TO BACKEND ===')
            console.log('Backend payload:', JSON.stringify(userData, null, 2))
            console.log('Equipment list:', JSON.stringify(equipmentList, null, 2))
            console.log('Additional form data (not sent to backend):')
            console.log('- nationalId:', visitorForm.nationalId)
            console.log('- badge:', visitorForm.badge)
            console.log('- role:', visitorForm.role)
            console.log('- profilePhoto:', visitorForm.profilePhoto ? 'Present' : 'Not set')
            console.log('- rawScannedString:', state.rawScannedId)
            console.log('=======================================================')
            
            createUserMutation.mutate(userData, {
              onSuccess: () => {
                handleReset()
                setEquipmentList([])
                console.log('Form and equipment list reset after successful submission')
              }
            })
          }
        }}
        equipmentList={equipmentList}
        setEquipmentList={setEquipmentList}
      />

      {/* Appointments Modal */}
      <AppointmentsModal
        isOpen={showAppointmentsModal}
        onClose={() => setShowAppointmentsModal(false)}
      />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        appointment={appointmentDetails}
      />
      {/* Top Scanning Area Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Scanning Area</span>
        <div className="flex-1 max-w-xl relative">
          <input
            ref={inputRef}
            type="password"
            value={rawScannedId}
            onChange={(e) => {
              const inputValue = e.target.value
              setRawScannedId(inputValue)

              // If it's a card string, process immediately
              if (inputValue.includes('Name:') || inputValue.includes('name:') || /\/idnumber:/i.test(inputValue) || /\/tell:/i.test(inputValue) || /\/department:/i.test(inputValue)) {
                handleIdVerification(inputValue)
                return
              }

              // For regular input, trigger verification attempt
              if (!inputValue.match(/^\.*$/)) {
                handleIdVerification(inputValue)
              }
            }}
            className="w-full px-3 py-1.5 border-2 border-[#1A3263] rounded text-sm focus:outline-none focus:border-orange-500 text-black"
            placeholder="Scan or enter ID..."
          />
          {/* Verification Status Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {verificationStatus === 'verifying' && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-500 border-t-transparent"></div>
            )}
            {verificationStatus === 'success' && (
              <span className="text-green-500 text-lg">✓</span>
            )}
            {verificationStatus === 'error' && (
              <span className="text-red-500 text-lg">✗</span>
            )}
          </div>
        </div>
        {currentUser && checkPermissions(currentUser, 'appointment:read') && (
          <button
            onClick={() => setShowAppointmentsModal(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            Appointments
            <span className="bg-[#1A3263] text-white text-xs rounded-full px-1.5 py-0.5 font-bold">({appointments})</span>
          </button>)}

        {/* Equipment and Appointment Section */}
        <div className="ml-auto flex items-center gap-4">
          {/* Appointment Indicator - Only show when has appointment */}
          {hasAppointment && (
            <button
              onClick={() => setShowAppointmentModal(true)}
              className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-300 rounded hover:bg-green-100 transition-colors cursor-pointer"
            >
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-sm font-medium text-green-700">Has Appointment</span>
            </button>
          )}

          {/* Equipment Checkbox */}
          {currentUser && checkPermissions(currentUser, 'equipement:read') && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={visitorForm.hasEquipment}
                onChange={(e) => {
                  handleInputChange('hasEquipment', e.target.checked)
                }}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-600">Equipment</span>
            </label>
          )}
          {visitorForm.hasEquipment && equipmentList.length > 0 && (
            <button
              onClick={() => setShowEquipmentModal(true)}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              ({equipmentList.length} items)
            </button>
          )}
        </div>
      </div>


      {/* Main Content */}
      <div className="p-4">
        {/* Three Column Grid */}
        <div className="grid grid-cols-3 gap-4 bg-white rounded-lg shadow-sm p-4 mb-4">

          {/* Col 1: Form Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-4">
              {/* Personal Info Section */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={visitorForm.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">National ID</label>
                    <input
                      type="text"
                      value={visitorForm.nationalId}
                      onChange={(e) => handleInputChange('nationalId', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                      placeholder="Enter national ID number"
                    />
                  </div>
                </div>
              </div>

              {/* Department & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                  <div className="relative">
                    <select
                      value={visitorForm.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-black bg-white pr-8"
                    >
                      <option>ICT</option>
                      <option>HR</option>
                      <option>Finance</option>
                      <option>Operations</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="text-gray-400 text-sm">▼</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                  <div className="relative">
                    <select
                      value={visitorForm.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-black bg-white pr-8"
                    >
                      <option>Employee</option>
                      <option>Visitor</option>
                      <option>Securite</option>
                      <option>Contractor</option>
                      <option>VIP</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="text-gray-400 text-sm">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <span className="text-sm">{selectedCountry.flag}</span>
                      <span className="text-gray-400 text-xs">▼</span>
                    </button>

                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-48 max-h-48 overflow-y-auto">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(country)
                              setShowCountryDropdown(false)
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 transition-colors text-left"
                          >
                            <span>{country.flag}</span>
                            <span className="text-gray-700">{country.name}</span>
                            <span className="text-gray-500 ml-auto">{country.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-900 pointer-events-none">
                        {selectedCountry.code}
                      </span>
                      <input
                        type="tel"
                        value={visitorForm.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="7XX XXX XXX"
                        className="w-full pl-16 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        style={{ paddingLeft: `${selectedCountry.code.length * 8 + 16}px` }}
                      />
                    </div>
                    {visitorForm.phoneNumber && (
                      <span className="text-green-500 text-lg">✓</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex">
                <button
                  onClick={handleSubmit}
                  className="w-1/2 px-4 py-2.5 bg-[#1A3263] hover:bg-[#2A4273] text-white text-sm font-semibold rounded-md transition-colors shadow-sm"
                >
                  Submit
                </button>
                <button
                  onClick={handleReset}
                  className="ml-2 w-1/2 border px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-md transition-colors shadow-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Document Type Selection + Scanned Document Preview */}
          <div className="space-y-4">
            {/* Document Type Selection */}
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <div className="grid grid-cols-4 gap-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="docType"
                    value="national-id"
                    checked={selectedDocType === 'national-id'}
                    onChange={(e) => setSelectedDocType(e.target.value as any)}
                    className="w-3 h-3 text-blue-600"
                  />
                  <span className="text-xs text-gray-700">National ID</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="docType"
                    value="driving-license"
                    checked={selectedDocType === 'driving-license'}
                    onChange={(e) => setSelectedDocType(e.target.value as any)}
                    className="w-3 h-3 text-blue-600"
                  />
                  <span className="text-xs text-gray-700">D.License</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="docType"
                    value="passport"
                    checked={selectedDocType === 'passport'}
                    onChange={(e) => setSelectedDocType(e.target.value as any)}
                    className="w-3 h-3 text-blue-600"
                  />
                  <span className="text-xs text-gray-700">Passport</span>
                </label>
                <label htmlFor="others" className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="docType"
                    value="others"
                    checked={selectedDocType === 'others'}
                    onChange={(e) => setSelectedDocType(e.target.value as any)}
                    className="w-3 h-3 text-blue-600"
                  />
                  <span className="text-xs text-gray-700">Others</span>
                </label>
              </div>
            </div>

            {/* Scanned Document Preview */}
            <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded bg-gray-50 h-106 min-h-80">
              <div className="text-center">
                <span className="text-gray-400 text-sm">Scanned Document Preview</span>
                <p className="text-xs text-gray-500 mt-1">Document will appear here when scanned</p>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  Selected: {selectedDocType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Verification Methods (top) + Image (bottom) */}
          <div className="space-y-3">
            {/* Profile Image */}
            <div className="border-2 border-gray-300 rounded bg-gray-50 h-68 flex items-center justify-center overflow-hidden">
              {visitorForm.profilePhoto ? (
                <img src={visitorForm.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <img src={avatimage} alt='ProfileImage' className="w-full h-full object-cover" />
              )}
            </div>

            {/* Verification Methods */}
            <div>
              <h3 className="text-xs font-bold text-[#1A3263] uppercase mb-2 tracking-wide">Verification Methods</h3>
              <div className="grid grid-cols-3 gap-1.5">
                {verificationModes.map((mode) => {
                  const Icon = mode.icon
                  const isVerified = isMethodVerified(mode.id)
                  return (
                    <button
                      key={mode.id}
                      onClick={() => handleModeSelect(mode.id)}
                      disabled={isScanning}
                      className={`relative flex flex-col items-center justify-center gap-1 py-2 px-1 rounded border text-center transition-all ${selectedMode === mode.id
                        ? 'border-blue-500 bg-blue-50'
                        : isVerified
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        } ${isScanning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {isVerified && (
                        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">✓</span>
                      )}
                      {isScanning && selectedMode === mode.id && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-4 h-4 animate-pulse" />
                      )}
                      <Icon
                        size={18}
                        className={
                          selectedMode === mode.id ? 'text-blue-600' :
                            isVerified ? 'text-green-600' : 'text-gray-500'
                        }
                      />
                      <span className="text-xs text-gray-700 font-medium leading-tight">{mode.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className="flex items-center gap-3 mb-3">

        </div>

        {/* Recent Taps Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-visible">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <div className='flex gap-2'>
              <button className="px-4 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded">
                Recent Taps
              </button>
              <button
                onClick={handleReset}
                className="flex items-center hover:text-[#1A3263] gap-1.5 px-4 py-1.5 bg-[#1A3263] border border-gray-300 text-sm text-white rounded hover:bg-gray-50 transition-colors"
              >
                <FaSync size={12} /> Refresh
              </button>
              <div className='flex gap-5 ml-2'>
                <p className='text-green-500 flex text-2xl '>
                  <FaArrowDown size={20} className='mt-1' /> ({checkInCount})
                </p>
                <p className='text-red-500 flex text-2xl'>
                  <FaArrowUp size={20} className='mt-1' /> ({checkOutCount})
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative z-50">
                {/* Voice Recording Indicator */}
                {searchType === 'voice' && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-300 rounded-lg shadow-xl p-3 w-64 z-50">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                      >
                        <FaMicrophone size={16} className="text-white" />
                      </button>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">
                          {isRecording ? 'Recording...' : 'Click to record'}
                        </div>
                        <div className="flex gap-1 h-6 items-end">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-t transition-all ${isRecording
                                ? 'bg-red-500 animate-pulse'
                                : 'bg-gray-300'
                                }`}
                              style={{
                                height: isRecording ? `${Math.random() * 100}%` : '20%',
                                animationDelay: `${i * 50}ms`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder={`Search by ${searchType === 'name' ? 'Name' : searchType === 'phone' ? 'Phone' : 'Voice'}...`}
                  className="pl-3 pr-24 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-64 text-black"
                />
                <div className="absolute right-0 top-0 h-full flex items-center bg-gray-300 pl-1 transtion rounded-sm">
                  {showSearchOptions && (
                    <div className="flex gap-1 mr-1">
                      <button
                        onClick={() => { setSearchType('name'); setShowSearchOptions(false); }}
                        className={`p-1.5 rounded transition-colors ${searchType === 'name' ? 'bg-[#1A3263] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title="Search by Name"
                      >
                        <FaUser size={12} />
                      </button>
                      <button
                        onClick={() => { setSearchType('phone'); setShowSearchOptions(false); }}
                        className={`p-1.5 rounded transition-colors ${searchType === 'phone' ? 'bg-[#1A3263] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title="Search by Phone"
                      >
                        <FaIdCard size={12} />
                      </button>
                      <button
                        onClick={handleVoiceSearch}
                        className={`p-1.5 rounded transition-colors ${searchType === 'voice' ? 'bg-[#1A3263] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title="Search by Voice"
                      >
                        <FaMicrophone size={12} />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setShowSearchOptions(!showSearchOptions)}
                    className="h-full px-3 bg-[#1A3263] text-white rounded-r-lg hover:bg-[#1A3263]/90 transition-colors"
                  >
                    <FaSearch size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['No', 'Names', 'Phone Number', 'Entry Time', 'Exit Time'].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTaps.map((tap, idx) => (
                  <tr key={tap.no} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-gray-700">{tap.no}</td>
                    <td className="px-4 py-2 text-gray-800 font-medium">{tap.names}</td>
                    <td className="px-4 py-2 text-gray-600">{tap.phoneNumber}</td>
                    <td className="px-4 py-2 text-gray-600">{tap.entryTime}</td>
                    <td className="px-4 py-2 text-gray-600">{tap.exitTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScanningPage