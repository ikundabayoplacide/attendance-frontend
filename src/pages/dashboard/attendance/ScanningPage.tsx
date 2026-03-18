import { useState } from 'react'
import { FaUser, FaFingerprint, FaIdCard, FaMicrophone, FaHandPaper, FaSearch, FaSync, FaSignature, FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { MdQrCodeScanner, MdVisibility } from 'react-icons/md'
const avatimage = '/images/avartImage.avif'
import EquipmentModal from '../../../components/modals/EquipmentModal'
import AppointmentModal from '../../../components/modals/UserHasAppointmentModal'
import AppointmentsModal from '../../../components/modals/AppointmentsModal'
import { checkPermissions } from '../../../utils/helper'
import { useAuth } from '../../../hooks/useAuth'

interface Equipment {
  type: string
  id: string
}

interface VerificationMode {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

interface VisitorForm {
  mobile: string
  email: string
  fullName: string
  passType: string
  visitorCompany: string
  purpose: string
  badgeId: string
  whenToMeet: string
  date: string
  time: string
  department: string
  duration: string
  hostName: string
  profilePhoto: string
  idProofType: string
  idNumber: string
  category: string
  docType: string
  hasEquipment: boolean
}

interface RecentTap {
  no: number
  names: string
  documentType: string
  phoneNumber: string
  entryTime: string
  exitTime: string
  department: string
}

const mockRecentTaps: RecentTap[] = [
  { no: 1, names: 'NSHUTI Ngabo', documentType: 'Personal ID', phoneNumber: '+250782471145', entryTime: '2026-02-20 09:35:00', exitTime: '_', department: 'SAN TECH' },
  { no: 2, names: 'KEZA Shania', documentType: 'Personal ID', phoneNumber: '+250785490284', entryTime: '2026-02-20 09:18:02', exitTime: '_', department: 'SAN TECH' },
]

function ScanningPage() {
  const [selectedMode, setSelectedMode] = useState<string>('')
  const [isScanning, setIsScanning] = useState(false)
  const [searchName, setSearchName] = useState('')
  const { currentUser } = useAuth()
  const [appointments] = useState(4)
  const [hasAppointment, setHasAppointment] = useState(false)
  const [searchType, setSearchType] = useState<'name' | 'phone' | 'voice'>('name')
  const [showSearchOptions, setShowSearchOptions] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showEquipmentModal, setShowEquipmentModal] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false)
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null)
  const [scannedId, setScannedId] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle')
  const [selectedDocType, setSelectedDocType] = useState<'driving-license' | 'national-id' | 'passport' | 'others'>('national-id')
  const [selectedCountry, setSelectedCountry] = useState({ code: '+250', flag: '🇷🇼', name: 'Rwanda' })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [checkInCount] = useState(2)
  const [checkOutCount] = useState(3)

  const countries = [
    { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+91', flag: '🇮🇳', name: 'India' }
  ]
  const [visitorForm, setVisitorForm] = useState<VisitorForm>({
    mobile: '',
    email: '',
    fullName: '',
    passType: 'Visitor',
    visitorCompany: '',
    purpose: '',
    badgeId: '',
    whenToMeet: '',
    date: '',
    time: '',
    department: 'ICT',
    duration: '',
    hostName: '',
    profilePhoto: '',
    idProofType: 'National ID',
    idNumber: '',
    category: 'Employee',
    docType: 'Personal ID',
    hasEquipment: false
  })

  const verificationModes: VerificationMode[] = [
    { id: 'face', name: 'Face', icon: FaUser },
    { id: 'fingerprint', name: 'Fingerprint', icon: FaFingerprint },
    { id: 'igipande', name: 'Igipande', icon: FaIdCard },
    { id: 'id-passport', name: 'ID/Passport', icon: FaIdCard },
    { id: 'voice', name: 'Voice', icon: FaMicrophone },
    { id: 'ocr', name: 'OCR', icon: MdQrCodeScanner },
    { id: 'gesture', name: 'Gesture', icon: FaHandPaper },
    { id: 'signature', name: 'signature', icon: FaSignature },
    { id: 'pupil', name: 'Pupil', icon: MdVisibility }
  ]

  const isMethodVerified = (modeId: string) => {
    if (modeId === 'face' && visitorForm.profilePhoto) return true
    if ((modeId === 'id-passport' || modeId === 'igipande') && visitorForm.idNumber) return true
    if (modeId === 'ocr' && visitorForm.fullName && visitorForm.mobile) return true
    return false
  }

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId)
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setVisitorForm(prev => ({
        ...prev,
        fullName: 'John Doe',
        mobile: '+250788123456',
        email: 'john.doe@techsolutions.com',
        visitorCompany: 'Tech Solutions Ltd',
        idNumber: 'ID123456789'
      }))
      // Simulate appointment check
      const hasAppt = Math.random() > 0.5
      setHasAppointment(hasAppt)
      if (hasAppt) {
        const isInCompany = Math.random() > 0.3
        const isInOffice = isInCompany ? Math.random() > 0.5 : false
        setAppointmentDetails({
          visitorName: 'John Doe',
          hostName: 'Jane Smith',
          hostStatus: isInCompany ? 'in' : 'out',
          hostAvailability: isInOffice ? 'available' : 'not-available',
          appointmentTime: '2:00 PM - 3:00 PM',
          purpose: 'Business meeting to discuss project proposal',
          department: 'ICT Department'
        })
      }
    }, 2000)
  }

  const handleInputChange = (field: keyof VisitorForm, value: string | boolean) => {
    setVisitorForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (visitorForm.hasEquipment) {
      setShowEquipmentModal(true)
    } else {
      console.log('Submitting visitor:', visitorForm)
      // Add your actual submission logic here
    }
  }

  const handleReset = () => {
    setVisitorForm({
      mobile: '', email: '', fullName: '', passType: 'Visitor', visitorCompany: '',
      purpose: '', badgeId: '', whenToMeet: '', date: '', time: '', department: 'ICT',
      duration: '', hostName: '', profilePhoto: '', idProofType: 'National ID', idNumber: '',
      category: 'Employee', docType: 'Personal ID', hasEquipment: false
    })
    setSelectedMode('')
    setIsScanning(false)
  }

  const handleVoiceSearch = () => {
    setSearchType('voice')
    setShowSearchOptions(false)
    setIsRecording(true)
    setTimeout(() => setIsRecording(false), 3000)
  }

  const handleIdVerification = (id: string) => {
    if (!id.trim()) {
      setVerificationStatus('idle')
      return
    }

    setVerificationStatus('verifying')

    // Simulate API call for ID verification
    setTimeout(() => {
      const isValidId = id.length >= 8 && /^[A-Z0-9]+$/i.test(id)

      if (isValidId) {
        // Simulate successful verification with mock data
        setVerificationStatus('success')
        setVisitorForm(prev => ({
          ...prev,
          fullName: 'UWIMANA Jean Claude',
          mobile: '+250788123456',
          email: 'jean.uwimana@example.com',
          idNumber: id,
          docType: 'National ID',
          department: 'ICT',
          status: 'Employee'
        }))

        // Check for appointment
        const hasAppt = Math.random() > 0.4
        setHasAppointment(hasAppt)
        if (hasAppt) {
          setAppointmentDetails({
            visitorName: 'UWIMANA Jean Claude',
            hostName: 'MUKAMANA Alice',
            hostStatus: 'in',
            hostAvailability: 'available',
            appointmentTime: '2:00 PM - 3:00 PM',
            purpose: 'Technical meeting for system upgrade',
            department: 'ICT Department'
          })
        }
      } else {
        setVerificationStatus('error')
      }

      // Clear status after 5 seconds
      setTimeout(() => {
        setVerificationStatus('idle')
      }, 5000)
    }, 2000)
  }


  const filteredTaps = mockRecentTaps.filter(t =>
    t.names.toLowerCase().includes(searchName.toLowerCase())
  )

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
            // If equipment was added, proceed with submission
            console.log('Submitting visitor:', visitorForm)
            // Add your actual submission logic here
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
            type="text"
            value={scannedId}
            onChange={(e) => {
              setScannedId(e.target.value)
              handleIdVerification(e.target.value)
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
                    <label className="block text-xs font-medium text-gray-600 mb-1">ID Number</label>
                    <input
                      type="text"
                      value={visitorForm.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                      placeholder="Enter ID number"
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

              {/* Document Type */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Document Type</label>
                <input
                  type="text"
                  value={visitorForm.docType}
                  onChange={(e) => handleInputChange('docType', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                  placeholder="e.g., National ID, Passport"
                />
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
                        value={visitorForm.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        placeholder="7XX XXX XXX"
                        className="w-full pl-16 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        style={{ paddingLeft: `${selectedCountry.code.length * 8 + 16}px` }}
                      />
                    </div>
                    {visitorForm.mobile && (
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
                <FaArrowDown size={20}  className='mt-1'/> ({checkInCount})
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