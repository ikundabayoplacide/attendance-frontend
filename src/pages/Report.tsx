import { useState } from 'react'
import { FaChartLine, FaUsers, FaBuilding, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io'

function ReportPage() {
  const [timeRange, setTimeRange] = useState('30d')

  // Mock analytics data
  const kpiMetrics = [
    { title: 'Total Revenue', value: '$574,200', change: '+18.5%', trend: 'up', color: 'bg-green-500' },
    { title: 'Customer Growth', value: '156', change: '+12.3%', trend: 'up', color: 'bg-blue-500' },
    { title: 'Churn Rate', value: '2.1%', change: '-0.8%', trend: 'down', color: 'bg-red-500' },
    { title: 'Avg Revenue Per User', value: '$337', change: '+5.2%', trend: 'up', color: 'bg-purple-500' }
  ]

  const revenueByPlan = [
    { plan: 'Enterprise', revenue: 345600, customers: 33, percentage: 60.2 },
    { plan: 'Professional', revenue: 187200, customers: 78, percentage: 32.6 },
    { plan: 'Basic', revenue: 41400, customers: 45, percentage: 7.2 }
  ]

  const topCustomers = [
    { company: 'TechCorp Solutions', revenue: 10800, plan: 'Enterprise', growth: '+15%' },
    { company: 'Global Industries', revenue: 8400, plan: 'Enterprise', growth: '+8%' },
    { company: 'StartupHub Inc', revenue: 2400, plan: 'Professional', growth: '+22%' },
    { company: 'Digital Dynamics', revenue: 2400, plan: 'Professional', growth: '+5%' },
    { company: 'Innovation Labs', revenue: 1800, plan: 'Professional', growth: '+12%' }
  ]

  const customerGrowth = [
    { month: 'Jan', customers: 120, revenue: 48000 },
    { month: 'Feb', customers: 135, revenue: 52000 },
    { month: 'Mar', customers: 142, revenue: 55000 },
    { month: 'Apr', customers: 148, revenue: 57000 },
    { month: 'May', customers: 156, revenue: 62000 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="!text-2xl font-bold text-gray-900">Business Analytics</h1>
          <p className="text-gray-600">Track your SaaS platform performance and growth metrics</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {metric.trend === 'up' ? (
                    <FaArrowUp className="text-green-500" size={12} />
                  ) : (
                    <FaArrowDown className="text-red-500" size={12} />
                  )}
                  <p className={`text-sm ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change} from last period
                  </p>
                </div>
              </div>
              <div className={`${metric.color} p-3 rounded-lg`}>
                <FaChartLine className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Plan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Subscription Plan</h2>
          <div className="space-y-4">
            {revenueByPlan.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    plan.plan === 'Enterprise' ? 'bg-blue-500' :
                    plan.plan === 'Professional' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{plan.plan}</p>
                    <p className="text-sm text-gray-500">{plan.customers} customers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${plan.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{plan.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Revenue Customers</h2>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{customer.company}</p>
                  <p className="text-sm text-gray-500">{customer.plan} Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${customer.revenue}/mo</p>
                  <p className="text-sm text-green-600">{customer.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Growth Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer & Revenue Growth</h2>
        <div className="grid grid-cols-5 gap-4">
          {customerGrowth.map((data, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 mb-2">
                <div className="text-2xl font-bold text-blue-600">{data.customers}</div>
                <div className="text-sm text-gray-600">Customers</div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 mb-2">
                <div className="text-lg font-semibold text-green-600">${data.revenue/1000}k</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
              <div className="text-sm font-medium text-gray-700">{data.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Business Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <IoMdTrendingUp  className="text-green-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Revenue Growth Accelerating</p>
                <p className="text-sm text-gray-600">18.5% increase in monthly recurring revenue</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <FaUsers className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Customer Acquisition Strong</p>
                <p className="text-sm text-gray-600">12 new customers added this month</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <FaBuilding className="text-purple-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Enterprise Segment Leading</p>
                <p className="text-sm text-gray-600">60% of total revenue from Enterprise plans</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <IoMdTrendingDown className="text-yellow-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Churn Rate Improving</p>
                <p className="text-sm text-gray-600">Down to 2.1% from 2.9% last quarter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReportPage;