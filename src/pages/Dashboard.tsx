import { FaDollarSign, FaBuilding, FaChartLine, FaExclamationTriangle, FaCreditCard, FaServer, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useSearchParams, useNavigate } from 'react-router-dom'
import CustomerDashboard from './dashboard/accounts/CustomerDashboard'

function Dashboard() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // Get user role from URL parameters, default to owner
  const userRole = searchParams.get('role') === 'customer' ? 'customer' : 'owner'
  
  // If user is a customer, show customer dashboard
  if (userRole === 'customer') {
    return <CustomerDashboard />
  }

  // System Owner Dashboard
  // Primary Business Metrics
  const primaryStats = [
    {title:'Annual Revenue', value: '$574,200', icon: FaChartLine, color: 'bg-yellow-500', change: '+18.5%', trend: 'up' },
    { title: 'Monthly Recurring Revenue', value: '$47,850', icon: FaDollarSign, color: 'bg-green-500', change: '+15.3%', trend: 'up' },
    { title: 'Total Customers', value: '156', icon: FaBuilding, color: 'bg-blue-500', change: '+8.2%', trend: 'up' },
    { title: 'Active Subscriptions', value: '142', icon: FaCreditCard, color: 'bg-purple-500', change: '+12.1%', trend: 'up' },
    { title: 'System Uptime', value: '99.8%', icon: FaServer, color: 'bg-indigo-500', change: '+0.2%', trend: 'up' }
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

  // Customer recently registered
  const recentCustomers = [
    {
      id: 1,
      name: "TechCorp Solutions",
      plan: "Enterprise",
      signupDate: "2023-06-15",
      status: "Active",
      logo: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "StartupHub Inc",
      plan: "Professional",
      signupDate: "2023-06-14",
      status: "Active",
      logo: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Global Enterprises",
      plan: "Enterprise",
      signupDate: "2023-06-12",
      status: "Cancelled",
      logo: "/api/placeholder/40/40"
    }
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
      {/* Header - Fixed */}
      <div className='flex-shrink-0'>
        <h1 className="!text-3xl py-1 font-bold text-gray-900">Owner Dashboard</h1>
        <p className="text-gray-600">Monitor your E-Visitors SaaS platform performance and revenue</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 mt-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Primary KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {primaryStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} p-2.5 rounded-lg`}>
                  <Icon className="text-white" size={18} />
                </div>
               
              </div>
              <p className="text-sm text-gray-600 my-4">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
               <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <FaArrowUp className="text-green-500" size={10} />
                  ) : (
                    <FaArrowDown className="text-red-500" size={10} />
                  )}
                  <span className={`text-xs mt-2 font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
            </div>
          )
        })}
      </div>

      {/* Critical Business Alerts */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaExclamationTriangle className="text-orange-500" size={18} />
          <h2 className="text-lg font-semibold text-gray-900">Business Alerts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {criticalAlerts.map((alert) => (
            <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg border-l-4 ${
              alert.severity === 'high' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
            }`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm text-gray-700 flex-1">{alert.message}</span>
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap">
                {alert.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Plan</h2>
          <div className="space-y-3">
            {revenueBreakdown.map((plan, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${plan.color}`}></div>
                    <p className="font-medium text-gray-900 text-sm">{plan.plan}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                      {plan.growth}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{plan.revenue}/mo</p>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{plan.customers} customers</span>
                  <span>ARPU: {plan.arpu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Customers */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Customers</h2>
          <div className="space-y-3">
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {customer.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.plan} • {customer.signupDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {customer.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            onClick={()=>navigate("/dashboard/customers")}
            >
              <FaBuilding className="text-blue-600" size={18} />
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Customer Management</p>
                <p className="text-xs text-gray-500">View all customers</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            onClick={()=>navigate("/dashboard/billings")}
            >
              <FaCreditCard className="text-green-600" size={18} />
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Billing & Payments</p>
                <p className="text-xs text-gray-500">Manage subscriptions</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            onClick={()=>navigate("/dashboard/Analytics")}
            >
              <FaChartLine className="text-purple-600" size={18} />
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Business Analytics</p>
                <p className="text-xs text-gray-500">Revenue & growth</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            onClick={()=>navigate("/dashboard/forms")}
            >
              <FaServer className="text-indigo-600" size={18} />
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm"> Form Management</p>
                <p className="text-xs text-gray-500">Manage all forms</p>
              </div>
            </button>
          </div>
        </div>
      </div>

        {/* Recent Business Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Business Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {businessActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activity.color}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard