import { useState } from 'react'
import { FaUsers, FaDollarSign, FaSearch, FaEye, FaDownload, FaBan, FaCheck, FaExclamationTriangle, FaChartLine } from 'react-icons/fa'
import MonthlyApexChart from '../../../components/ui/MontlyApexChart'

function SubBillingsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')

  const stats = [
    { title: 'Total Revenue', value: '$45,280', change: '+12.5%', icon: FaDollarSign, color: 'bg-green-500' },
    { title: 'Active Subscriptions', value: '156', change: '+8.2%', icon: FaUsers, color: 'bg-blue-500' },
    { title: 'Monthly Recurring Revenue', value: '$12,450', change: '+15.3%', icon: FaChartLine, color: 'bg-purple-500' },
    { title: 'Overdue Payments', value: '8', change: '-2.1%', icon: FaExclamationTriangle, color: 'bg-red-500' }
  ]

  const subscriptions = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      email: 'admin@techcorp.com',
      plan: 'Enterprise',
      price: '$299/month',
      status: 'Active',
      nextBilling: '2024-02-15',
      users: 50,
      paymentMethod: '**** 4532'
    },
    {
      id: 2,
      company: 'StartupHub Inc',
      email: 'billing@startuphub.com',
      plan: 'Professional',
      price: '$99/month',
      status: 'Active',
      nextBilling: '2024-02-18',
      users: 25,
      paymentMethod: '**** 8765'
    },
    {
      id: 3,
      company: 'Global Enterprises',
      email: 'finance@global.com',
      plan: 'Enterprise',
      price: '$299/month',
      status: 'Overdue',
      nextBilling: '2024-01-28',
      users: 75,
      paymentMethod: '**** 1234'
    }
  ]

  const invoices = [
    {
      id: 'INV-2024-001',
      company: 'TechCorp Solutions',
      amount: '$299.00',
      date: '2024-01-15',
      status: 'Paid',
      dueDate: '2024-01-30'
    },
    {
      id: 'INV-2024-002',
      company: 'StartupHub Inc',
      amount: '$99.00',
      date: '2024-01-18',
      status: 'Paid',
      dueDate: '2024-02-02'
    },
    {
      id: 'INV-2024-003',
      company: 'Global Enterprises',
      amount: '$299.00',
      date: '2024-01-28',
      status: 'Overdue',
      dueDate: '2024-02-12'
    }
  ]

  const plans = [
    {
      name: 'Basic',
      price: '$29',
      users: '5 users',
      features: ['Basic visitor management', 'Email notifications', 'Basic reports'],
      subscribers: 45
    },
    {
      name: 'Professional',
      price: '$99',
      users: '25 users',
      features: ['Advanced visitor management', 'SMS notifications', 'Advanced reports', 'API access'],
      subscribers: 78
    },
    {
      name: 'Enterprise',
      price: '$299',
      users: 'Unlimited users',
      features: ['Full feature access', 'Priority support', 'Custom integrations', 'White-label options'],
      subscribers: 33
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
      
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="!text-2xl py-1 font-bold text-gray-900">Billing & Subscription Management</h1>
        <p className="text-gray-600">Monitor revenue, manage subscriptions, and control customer payments</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 mt-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'subscriptions', 'invoices', 'plans'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab
                      ? 'border-[#1A3263] text-[#1A3263]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab === 'overview' ? 'Revenue Overview' : tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart Placeholder */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="h-auto w-full flex items-center justify-center text-gray-500">
                  <MonthlyApexChart data={[100, 150, 200, 180, 220, 250, 300, 280, 320, 350, 400, 450]} />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="bg-green-100 p-2 rounded-full">
                        <FaCheck className="text-green-600" size={12} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Payment received from TechCorp</p>
                        <p className="text-xs text-gray-500">$299.00 • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FaUsers className="text-blue-600" size={12} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New subscription: StartupHub Inc</p>
                        <p className="text-xs text-gray-500">Professional Plan • 5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="bg-red-100 p-2 rounded-full">
                        <FaExclamationTriangle className="text-red-600" size={12} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Payment failed: Global Enterprises</p>
                        <p className="text-xs text-gray-500">$299.00 • 1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === 'subscriptions' && (
            <div className="p-6">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                >
                  <option value="all">All Plans</option>
                  <option value="basic">Basic</option>
                  <option value="professional">Professional</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              {/* Subscriptions Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className='bg-[#1A3263] rounded'>
                    <tr className="border-b border-gray-200 rounded">
                      <th className="text-left py-3 px-4 font-medium text-white">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Plan</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Users</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Next Billing</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{sub.company}</p>
                            <p className="text-sm text-gray-500">{sub.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{sub.plan}</p>
                            <p className="text-sm text-gray-500">{sub.price}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{sub.users}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            sub.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{sub.nextBilling}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600" title="View Details">
                              <FaEye size={14} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600" title="Suspend">
                              <FaBan size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className='bg-[#1A3263] rounded'>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-white">Invoice ID</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Due Date</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{invoice.id}</td>
                        <td className="py-4 px-4 text-gray-700">{invoice.company}</td>
                        <td className="py-4 px-4 font-medium text-gray-900">{invoice.amount}</td>
                        <td className="py-4 px-4 text-gray-700">{invoice.date}</td>
                        <td className="py-4 px-4 text-gray-700">{invoice.dueDate}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600" title="View Invoice">
                              <FaEye size={14} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600" title="Download">
                              <FaDownload size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Plans Tab */}
          {activeTab === 'plans' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-[#1A3263]">{plan.price}</span>
                        <span className="text-gray-500">/month</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{plan.users}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                      <ul className="space-y-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <FaCheck className="text-green-500" size={10} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-center pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-[#1A3263]">{plan.subscribers}</span> active subscribers
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubBillingsPage