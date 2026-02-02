import { FaDollarSign, FaBuilding, FaChartLine, FaExclamationTriangle, FaCreditCard, FaServer, FaArrowUp, FaArrowDown, FaGlobe } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import CustomerDashboard from './customers/CustomerDashboard'

function Dashboard() {
  const [searchParams] = useSearchParams()
  
  // Get user role from URL parameters, default to owner
  const userRole = searchParams.get('role') === 'customer' ? 'customer' : 'owner'
  
  // If user is a customer, show customer dashboard
  if (userRole === 'customer') {
    return <CustomerDashboard />
  }

  // System Owner Dashboard
  // Primary Business Metrics
  const primaryStats = [
    { title: 'Monthly Recurring Revenue', value: '$47,850', icon: FaDollarSign, color: 'bg-green-500', change: '+15.3%', trend: 'up' },
    { title: 'Total Customers', value: '156', icon: FaBuilding, color: 'bg-blue-500', change: '+8.2%', trend: 'up' },
    { title: 'Active Subscriptions', value: '142', icon: FaCreditCard, color: 'bg-purple-500', change: '+12.1%', trend: 'up' },
    { title: 'System Uptime', value: '99.8%', icon: FaServer, color: 'bg-indigo-500', change: '+0.2%', trend: 'up' }
  ]

  // Secondary Business Metrics
  const secondaryStats = [
    { title: 'Annual Recurring Revenue', value: '$574,200', change: '+18.5%', trend: 'up' },
    { title: 'Customer Churn Rate', value: '2.1%', change: '-0.8%', trend: 'down' },
    { title: 'Average Revenue Per User', value: '$337', change: '+5.2%', trend: 'up' },
    { title: 'Total End Users', value: '3,247', change: '+22.4%', trend: 'up' }
  ]

  // Critical Business Alerts
  const criticalAlerts = [
    { id: 1, type: 'payment', message: '8 failed payments require immediate attention', severity: 'high', action: 'Retry Payments' },
    { id: 2, type: 'churn', message: '3 customers cancelled subscriptions this week', severity: 'high', action: 'Review Feedback' },
    { id: 3, type: 'system', message: 'Server response time increased by 15%', severity: 'medium', action: 'Check Performance' },
    { id: 4, type: 'billing', message: '12 subscriptions expiring in next 7 days', severity: 'medium', action: 'Send Reminders' }
  ]

  // Revenue by Subscription Plan
  const revenueBreakdown = [
    { plan: 'Enterprise', customers: 33, revenue: '$29,700', arpu: '$900', color: 'bg-blue-500', growth: '+12%' },
    { plan: 'Professional', customers: 78, revenue: '$15,600', arpu: '$200', color: 'bg-green-500', growth: '+18%' },
    { plan: 'Basic', customers: 31, revenue: '$2,550', arpu: '$82', color: 'bg-yellow-500', growth: '+5%' }
  ]

  // Recent Business Activity
  const businessActivity = [
    {
      id: 1,
      type: 'revenue',
      message: 'Payment received: TechCorp Solutions - $900 (Enterprise)',
      time: '2 hours ago',
      color: 'bg-green-500'
    },
    {
      id: 2,
      type: 'customer',
      message: 'New customer: StartupHub Inc signed up for Professional plan',
      time: '4 hours ago',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      type: 'churn',
      message: 'Customer cancelled: Global Enterprises (reason: budget cuts)',
      time: '6 hours ago',
      color: 'bg-red-500'
    },
    {
      id: 4,
      type: 'growth',
      message: '47 new end-users registered across all customer accounts',
      time: '8 hours ago',
      color: 'bg-purple-500'
    },
    {
      id: 5,
      type: 'system',
      message: 'System maintenance completed - 99.9% uptime maintained',
      time: '12 hours ago',
      color: 'bg-indigo-500'
    }
  ]

  // Customer Geographic Distribution
  const geoDistribution = [
    { region: 'North America', customers: 89, percentage: '57%', color: 'bg-blue-500' },
    { region: 'Europe', customers: 42, percentage: '27%', color: 'bg-green-500' },
    { region: 'Asia Pacific', customers: 19, percentage: '12%', color: 'bg-purple-500' },
    { region: 'Others', customers: 6, percentage: '4%', color: 'bg-gray-500' }
  ]

  return (
    <div className="flex flex-col h-full">
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="!text-4xl py-1 font-bold text-gray-900">Business Dashboard</h1>
        <p className="text-gray-600">Monitor your E-Visitors SaaS platform performance and revenue</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 mt-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Primary KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {primaryStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === 'up' ? (
                        <FaArrowUp className="text-green-500" size={12} />
                      ) : (
                        <FaArrowDown className="text-red-500" size={12} />
                      )}
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Secondary Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Business Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {stat.trend === 'up' ? (
                    <FaArrowUp className="text-green-500" size={10} />
                  ) : (
                    <FaArrowDown className="text-red-500" size={10} />
                  )}
                  <p className={`text-xs ${stat.change.startsWith('+') || stat.change.startsWith('-') && stat.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Business Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaExclamationTriangle className="text-orange-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Business Alerts</h2>
          </div>
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center gap-3 p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-sm text-gray-700 flex-1">{alert.message}</span>
                <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Breakdown by Plan */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Subscription Plan</h2>
            <div className="space-y-4">
              {revenueBreakdown.map((plan, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${plan.color}`}></div>
                      <p className="font-medium text-gray-900">{plan.plan}</p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {plan.growth}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900">{plan.revenue}/mo</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{plan.customers} customers</span>
                    <span>ARPU: {plan.arpu}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaGlobe className="text-blue-500" size={18} />
              <h2 className="text-lg font-semibold text-gray-900">Customer Distribution</h2>
            </div>
            <div className="space-y-3">
              {geoDistribution.map((geo, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${geo.color}`}></div>
                    <span className="font-medium text-gray-900">{geo.region}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{geo.customers}</p>
                    <p className="text-sm text-gray-500">{geo.percentage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Business Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Business Activity</h2>
          <div className="space-y-3">
            {businessActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Business Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <FaBuilding className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="font-medium text-gray-900">Customer Management</p>
                <p className="text-sm text-gray-500">View all customers</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <FaCreditCard className="text-green-600" size={20} />
              <div className="text-left">
                <p className="font-medium text-gray-900">Billing & Payments</p>
                <p className="text-sm text-gray-500">Manage subscriptions</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <FaChartLine className="text-purple-600" size={20} />
              <div className="text-left">
                <p className="font-medium text-gray-900">Business Analytics</p>
                <p className="text-sm text-gray-500">Revenue & growth</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <FaServer className="text-indigo-600" size={20} />
              <div className="text-left">
                <p className="font-medium text-gray-900">Platform Health</p>
                <p className="text-sm text-gray-500">System monitoring</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard