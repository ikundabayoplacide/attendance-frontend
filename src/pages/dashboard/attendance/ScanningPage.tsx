import { useState } from 'react'
import { FaUser, FaFingerprint, FaIdCard, FaMicrophone, FaHandPaper, FaRunning, FaCamera, FaSearch, FaSync } from 'react-icons/fa'
import { MdQrCodeScanner, MdVisibility } from 'react-icons/md'
import avatimage from '/src/assets/images/avartImage.avif'
import EquipmentModal from '../../../components/modals/EquipmentModal'
import AppointmentModal from '../../../components/modals/AppointmentModal'

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
  status: string
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
  const [appointments] = useState(0)
  const [hasAppointment, setHasAppointment] = useState(false)
  const [searchType, setSearchType] = useState<'name' | 'phone' | 'voice'>('name')
  const [showSearchOptions, setShowSearchOptions] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showEquipmentModal, setShowEquipmentModal] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null)
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
    status: 'Employee',
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
    { id: 'motion', name: 'Motion', icon: FaRunning },
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

  const handleInputChange = (field: keyof VisitorForm, value: string) => {
    setVisitorForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log('Submitting visitor:', visitorForm)
  }

  const handleReset = () => {
    setVisitorForm({
      mobile: '', email: '', fullName: '', passType: 'Visitor', visitorCompany: '',
      purpose: '', badgeId: '', whenToMeet: '', date: '', time: '', department: 'ICT',
      duration: '', hostName: '', profilePhoto: '', idProofType: 'National ID', idNumber: '',
      status: 'Employee', docType: 'Personal ID', hasEquipment: false
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
            handleInputChange('hasEquipment', 'false')
          }
        }}
        equipmentList={equipmentList}
        setEquipmentList={setEquipmentList}
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
        <input
          type="text"
          className="flex-1 max-w-xl px-3 py-1.5 border-2 border-[#1A3263] rounded text-sm focus:outline-none focus:border-orange-500 text-black"
          placeholder="Scan or enter ID..."
        />
        {/* adding appointment indicator. */}
        {/* adding equipement option */}
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
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={visitorForm.hasEquipment}
              onChange={(e) => {
                handleInputChange('hasEquipment', e.target.checked.toString())
                if (e.target.checked) setShowEquipmentModal(true)
              }}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm text-gray-600">Equipment</span>
          </label>
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
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-gray-600 text-right shrink-0">Names</label>
              <input
                type="text"
                value={visitorForm.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-gray-600 text-right shrink-0">Id No</label>
              <input
                type="text"
                value={visitorForm.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-gray-600 text-right shrink-0">Department</label>
              <div className="flex-1 relative">
                <select
                  value={visitorForm.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none appearance-none text-black bg-white pr-8"
                >
                  <option>ICT</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Operations</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-5 h-5 bg-[#1A3263] rounded flex items-center justify-center">
                    <span className="text-white text-xs">▼</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-gray-600 text-right shrink-0">Status</label>
              <div className="flex-1 relative">
                <select
                  value={visitorForm.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none appearance-none text-black bg-white pr-8"
                >
                  <option>Employee</option>
                  <option>Visitor</option>
                  <option>Contractor</option>
                  <option>VIP</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-5 h-5 bg-[#1A3263] rounded flex items-center justify-center">
                    <span className="text-white text-xs">▼</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-gray-600 text-right shrink-0">Doc Type</label>
              <input
                type="text"
                value={visitorForm.docType}
                onChange={(e) => handleInputChange('docType', e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-gray-600 text-right shrink-0">Phone No</label>
              <div className="flex gap-2 flex-1">
                <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1.5">
                  <span className="text-sm text-black">Rwanda</span>
                  <div className="w-4 h-4 bg-[#1A3263] rounded flex items-center justify-center ml-1">
                    <span className="text-white text-xs leading-none">▼</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <input
                    type="tel"
                    value={visitorForm.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="+250"
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                  />
                  {visitorForm.mobile && (
                    <span className="text-green-500 text-lg">✔</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 justify-center">
              <button
                onClick={handleSubmit}
                className="px-8 py-1.5 bg-white hover:bg-gray-100 text-[#1A3263] text-sm font-bold cursor-pointer rounded border border-[#1A3263] transition-colors"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Col 2: Profile Photo + Capture */}
          <div className="flex flex-col items-center justify-start gap-3 border-gray-300 border rounded">
            {/* Avatar */}
            <div className="w-44 h-44 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden border-4 border-gray-200 shadow">
              {visitorForm.profilePhoto ? (
                <img src={visitorForm.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <img src={avatimage} alt='ProfileImage' className="w-full h-full object-cover"/>
              )}
            </div>
            {/* Capture / Retake */}
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded border border-gray-300 transition-colors">
                <FaCamera size={13} /> Start/Stop
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded border border-gray-300 transition-colors">
                <FaCamera size={13} /> Capture
              </button>
            </div>
          </div>

          {/* Col 3: Verification Methods (top) + ID Scan Preview (bottom) */}
          <div className="space-y-3">
        

            {/* Verification Methods Grid 3x3 */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">Verification Methods</h3>
              <div className="grid grid-cols-3 gap-1.5">
                {verificationModes.map((mode) => {
                  const Icon = mode.icon
                  const isVerified = isMethodVerified(mode.id)
                  return (
                    <button
                      key={mode.id}
                      onClick={() => handleModeSelect(mode.id)}
                      disabled={isScanning}
                      className={`relative flex flex-col items-center justify-center gap-1 py-2 px-1 rounded border text-center transition-all ${
                        selectedMode === mode.id
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

            {/* ID Scan Preview */}
            <div className="border-2 border-gray-300 rounded bg-gray-50 h-28 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Card Scan Preview</span>
            </div>
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className="flex items-center gap-3 mb-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-50 transition-colors">
            Appointments
            <span className="bg-[#1A3263] text-white text-xs rounded-full px-1.5 py-0.5 font-bold">({appointments})</span>
          </button>
          <button className="px-4 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-50 transition-colors">
            Non ID
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            <FaSync size={12} /> Refresh
          </button>
        </div>

        {/* Recent Taps Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-visible">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <button className="px-4 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded">
              Recent Taps
            </button>
            <div className="flex items-center gap-2">
              <div className="relative z-50">
                {/* Voice Recording Indicator */}
                {searchType === 'voice' && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-300 rounded-lg shadow-xl p-3 w-64 z-50">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-2 rounded-full transition-colors ${
                          isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
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
                              className={`flex-1 rounded-t transition-all ${
                                isRecording
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
                        className={`p-1.5 rounded transition-colors ${searchType === 'name' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title="Search by Name"
                      >
                        <FaUser size={12} />
                      </button>
                      <button
                        onClick={() => { setSearchType('phone'); setShowSearchOptions(false); }}
                        className={`p-1.5 rounded transition-colors ${searchType === 'phone' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title="Search by Phone"
                      >
                        <FaIdCard size={12} />
                      </button>
                      <button
                        onClick={handleVoiceSearch}
                        className={`p-1.5 rounded transition-colors ${searchType === 'voice' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title="Search by Voice"
                      >
                        <FaMicrophone size={12} />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setShowSearchOptions(!showSearchOptions)}
                    className="h-full px-3 bg-blue-700 text-white rounded-r-lg hover:bg-blue-800 transition-colors"
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
                  {['No', 'Names', 'Document Type', 'Phone Number', 'Entry Time', 'Exit Time', 'Department'].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTaps.map((tap, idx) => (
                  <tr key={tap.no} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-gray-700">{tap.no}</td>
                    <td className="px-4 py-2 text-gray-800 font-medium">{tap.names}</td>
                    <td className="px-4 py-2 text-gray-600">{tap.documentType}</td>
                    <td className="px-4 py-2 text-gray-600">{tap.phoneNumber}</td>
                    <td className="px-4 py-2 text-gray-600">{tap.entryTime}</td>
                    <td className="px-4 py-2 text-gray-600">{tap.exitTime}</td>
                    <td className="px-4 py-2 text-gray-600">{tap.department}</td>
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