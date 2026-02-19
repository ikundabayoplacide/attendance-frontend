import TeamPieChart from "../../../../components/ui/TeamPieChart";
import { FaUsers, FaUserCheck, FaUserClock, FaChartLine, FaCalendarCheck, FaEye, FaClipboardList } from 'react-icons/fa'

function TeamLeader() {
    const stats = {
        total: 156,
        checkIn: 98,
        checkOut: 58
    }

    const recentActivities = [
        { id: 1, action: 'John Smith checked in', user: 'Team Member', time: '10 mins ago', type: 'checkin' },
        { id: 2, action: 'Sarah Johnson checked out', user: 'Team Member', time: '25 mins ago', type: 'checkout' },
        { id: 3, action: 'Mike Davis marked present', user: 'Team Member', time: '1 hour ago', type: 'present' },
        { id: 4, action: 'Emma Wilson checked in', user: 'Team Member', time: '2 hours ago', type: 'checkin' }
    ]

    return (
        <div className="flex flex-col h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `
            }} />

            {/* Header - Fixed */}
            <div className='flex-shrink-0'>
                <h1 className="!text-2xl font-bold text-gray-900">Team Leader Dashboard</h1>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto space-y-2 mt-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Team Members</p>
                                <p className="text-lg font-bold text-gray-900">12</p>
                            </div>
                            <div className="bg-blue-500 p-1 rounded-lg">
                                <FaUsers className="text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Attendance</p>
                                <p className="text-lg font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="bg-purple-500 p-1 rounded-lg">
                                <FaChartLine className="text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Checked In</p>
                                <p className="text-lg font-bold text-green-600">{stats.checkIn}</p>
                            </div>
                            <div className="bg-green-500 p-1 rounded-lg">
                                <FaUserCheck className="text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Checked Out</p>
                                <p className="text-lg font-bold text-red-600">{stats.checkOut}</p>
                            </div>
                            <div className="bg-red-500 p-1 rounded-lg">
                                <FaUserClock className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Layout: Chart (Left) and Quick Actions + Recent Activity (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Chart Section */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Attendance Distribution</h2>
                        <TeamPieChart total={stats.total} checkIn={stats.checkIn} checkOut={stats.checkOut} />
                    </div>

                    {/* Right: Quick Actions and Recent Activity */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <FaUserCheck className="text-blue-600" size={18} />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Mark Attendance</p>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <FaCalendarCheck className="text-green-600" size={18} />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">View Schedule</p>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                    <FaClipboardList className="text-purple-600" size={18} />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Team Report</p>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                    <FaEye className="text-orange-600" size={18} />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">View Analytics</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                            <div className="space-y-3">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.user}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-gray-400">{activity.time}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                activity.type === 'checkin' ? 'bg-green-100 text-green-800' :
                                                activity.type === 'checkout' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {activity.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamLeader;