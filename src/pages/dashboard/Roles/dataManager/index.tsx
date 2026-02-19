import { FaDatabase, FaUsers, FaCalendarCheck, FaFileExport, FaChartBar, FaSync, FaDownload, FaUpload } from 'react-icons/fa'
import { useEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

function DataManagerDashboard() {
    const chartRef = useRef<HTMLDivElement>(null)

    const stats = [
        { title: 'Total Records', value: '45,678', icon: FaDatabase, color: 'bg-blue-500' },
        { title: 'Today\'s Attendance', value: '1,234', icon: FaCalendarCheck, color: 'bg-green-500' },
        { title: 'Active Users', value: '2,847', icon: FaUsers, color: 'bg-purple-500' },
        { title: 'Data Exports', value: '156', icon: FaFileExport, color: 'bg-orange-500' }
    ]

    const recentActivities = [
        { id: 1, action: 'Attendance data exported', user: 'System Admin', time: '10 mins ago', type: 'export' },
        { id: 2, action: 'Bulk user data imported', user: 'HR Manager', time: '25 mins ago', type: 'import' },
        { id: 3, action: 'Monthly report generated', user: 'Data Manager', time: '1 hour ago', type: 'report' },
        { id: 4, action: 'Database backup completed', user: 'System', time: '2 hours ago', type: 'backup' }
    ]

    useEffect(() => {
        if (!chartRef.current) return

        const root = am5.Root.new(chartRef.current)
        root.setThemes([am5themes_Animated.new(root)])

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'none',
                wheelY: 'none'
            })
        )

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'day',
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 1
                })
            })
        )

        xAxis.get('renderer').labels.template.setAll({
            oversizedBehavior: 'wrap',
            textAlign: 'center'
        })

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        )

        const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: 'Attendance',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
                categoryXField: 'day',
                fill: am5.color(0x1A3263),
                stroke: am5.color(0x1A3263)
            })
        )

        const data = [
            { day: 'Mon', value: 1150 },
            { day: 'Tue', value: 1200 },
            { day: 'Wed', value: 1180 },
            { day: 'Thu', value: 1220 },
            { day: 'Fri', value: 1190 },
            { day: 'Sat', value: 850 },
            { day: 'Sun', value: 650 }
        ]

        xAxis.data.setAll(data)
        series.data.setAll(data)
        series.appear(1000)
        chart.appear(1000, 100)

        return () => {
            root.dispose()
        }
    }, [])

    return (
        <div className="flex flex-col h-full">
            <style dangerouslySetInnerHTML={{
                __html: `
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `
            }} />

            {/* Header - Fixed */}
            <div className='flex-shrink-0'>
                <h1 className="!text-lg font-bold text-gray-900">Data Manager Dashboard</h1>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto space-y-6 mt-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-1 rounded-lg`}>
                                        <Icon className="text-white"/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Main Layout: Chart (Left) and Quick Actions + Recent Activity (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Chart Section */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Overview</h2>
                        <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
                    </div>

                    {/* Right: Quick Actions and Recent Activity */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <FaDownload className="text-blue-600" size={18} />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Export Data</p>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <FaUpload className="text-green-600" size={18} />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Import Data</p>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                    <FaChartBar className="text-purple-600" size={18} />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Generate Report</p>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                    <FaSync className="text-orange-600" size={18} />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Sync Database</p>
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
                                                activity.type === 'export' ? 'bg-blue-100 text-blue-800' :
                                                activity.type === 'import' ? 'bg-green-100 text-green-800' :
                                                activity.type === 'report' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'
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
    )
}

export default DataManagerDashboard;