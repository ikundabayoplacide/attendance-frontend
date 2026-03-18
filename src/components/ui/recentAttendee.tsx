import { useState } from 'react'
import { FaUser, FaIdCard, FaMicrophone, FaSearch, FaSync, FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { AttendanceRecord } from '../../api/attendance'

interface RecentAttendeeProps {
  taps: AttendanceRecord[]
  onRefresh: () => void
  checkInCount: number
  checkOutCount: number
  isLoading?: boolean
  isError?: boolean
}

function RecentAttendee({ taps, onRefresh, checkInCount, checkOutCount, isLoading, isError }: RecentAttendeeProps) {
  const [searchName, setSearchName] = useState('')
  const [searchType, setSearchType] = useState<'name' | 'phone' | 'voice'>('name')
  const [showSearchOptions, setShowSearchOptions] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleVoiceSearch = () => {
    setSearchType('voice')
    setShowSearchOptions(false)
    setIsRecording(true)
    setTimeout(() => setIsRecording(false), 3000)
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '_'
    const d = new Date(date)
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const filteredTaps = taps.filter(t => 
    t.user?.fullName?.toLowerCase().includes(searchName.toLowerCase()) ||
    t.user?.scannedId?.includes(searchName)
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredTaps.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTaps = filteredTaps.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchName(value)
    setCurrentPage(1)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-visible">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <div className='flex gap-2'>
          <p className="px-4 py-1.5 bg-white border border-gray-200 text-sm text-gray-700 ">
            Recent Taps
          </p>
          <button
            onClick={onRefresh}
            className="flex items-center  cursor:pointer gap-1.5 px-4 py-1.5 bg-[#1A3263] border border-[#1A3263] text-sm text-white rounded hover:bg-white hover:text-[#1A3263] transition-colors"
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
            {searchType === 'voice' && (
              <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-300 rounded-lg shadow-xl p-3 w-64 z-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}
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
                          className={`flex-1 rounded-t transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}
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
              onChange={(e) => handleSearchChange(e.target.value)}
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
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#1A3263] border-t-transparent"></div>
            <span className="ml-2 text-gray-600">Loading attendance records...</span>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center py-8">
            <span className="text-red-500">Error loading attendance records</span>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['No', 'Names', 'Scanned ID', 'Entry Time', 'Exit Time'].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTaps.map((tap, idx) => (
                <tr key={tap.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2 text-gray-700">{startIndex + idx + 1}</td>
                  <td className="px-4 py-2 text-gray-800 font-medium">{tap.user?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2 text-gray-600">{tap.user?.scannedId || 'N/A'}</td>
                  <td className="px-4 py-2 text-gray-600">{formatDate(tap.checkIn)}</td>
                  <td className="px-4 py-2 text-gray-600">{formatDate(tap.checkOut)}</td>
                </tr>
              ))}
              {currentTaps.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredTaps.length)} of {filteredTaps.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-black border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-black text-sm border rounded ${
                    currentPage === page
                      ? 'bg-[#1A3263] text-white border-[#1A3263]'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecentAttendee