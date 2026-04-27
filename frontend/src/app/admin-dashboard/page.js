'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Truck, AlertTriangle, TrendingUp, Settings, UserCheck, MapPin, Fuel, Activity, FileText, Bell, Lock, Home, ChevronRight, LayoutDashboard, BarChart3, Car, Clock, ShieldCheck, Zap, Eye, Menu, X, Calendar, Building2, Gavel } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      window.location.href = '/login'
      return
    }

    const parsedUser = JSON.parse(userData)

    if (parsedUser.role !== 'admin') {
      window.location.href = '/access-denied'
      return
    }

    setUser(parsedUser)
  }, [])

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'livemap', label: 'Live Map', icon: MapPin },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'violations', label: 'Violations', icon: AlertTriangle },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'fleets', label: 'Fleets / Companies', icon: Building2 },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: 12 },
    { id: 'law', label: 'Law Enforcement', icon: Gavel },
    { id: 'fuel', label: 'Fuel Monitoring', icon: Fuel },
    { id: 'ai', label: 'AI Insights', icon: Activity, isNew: true },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'audit', label: 'Audit Logs', icon: FileText }
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Dark Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0f172a] fixed left-0 top-0 bottom-0 z-50 transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-white">RIVA</h1>
                <p className="text-xs text-gray-400">Government Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
                    )}
                    {item.isNew && (
                      <span className="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                    )}
                  </>
                )}
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer - Admin Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Admin Government</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-1/2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg"
        >
          {sidebarOpen ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left - Government Label */}
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">Government of Rwanda</h2>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-600">Vehicle Monitoring System</span>
              </div>

              {/* Right - Date Range & Notifications */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">May 18 – May 24</span>
                </div>
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">12</span>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    window.location.href = '/login'
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard 
                  icon={Car} 
                  title="Total Vehicles" 
                  value="12,456" 
                  change="+8.2%" 
                  changeColor="blue"
                  iconColor="blue"
                />
                <StatCard 
                  icon={Eye} 
                  title="Active Vehicles" 
                  value="8,234" 
                  change="+12.5%" 
                  changeColor="blue"
                  iconColor="blue"
                />
                <StatCard 
                  icon={AlertTriangle} 
                  title="Violations" 
                  value="234" 
                  change="-15.3%" 
                  changeColor="red"
                  iconColor="red"
                />
                <StatCard 
                  icon={Users} 
                  title="Active Drivers" 
                  value="5,678" 
                  change="+5.8%" 
                  changeColor="blue"
                  iconColor="purple"
                />
                <StatCard 
                  icon={Building2} 
                  title="Registered Fleets" 
                  value="456" 
                  change="+3.2%" 
                  changeColor="blue"
                  iconColor="orange"
                />
              </div>

              {/* Middle Section - Live Map + Violations Trend + Recent Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live Map Section */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Live Vehicle Tracking</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      View Full Map
                    </button>
                  </div>
                  <div className="h-[400px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl relative overflow-hidden">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-900">Rwanda Map</p>
                        <p className="text-sm text-gray-600">Showing all active vehicles</p>
                      </div>
                    </div>
                    {/* Vehicle Markers */}
                    {[
                      { x: 20, y: 30, status: 'active' },
                      { x: 40, y: 50, status: 'alert' },
                      { x: 60, y: 25, status: 'active' },
                      { x: 30, y: 70, status: 'active' },
                      { x: 70, y: 60, status: 'active' },
                      { x: 50, y: 40, status: 'alert' },
                      { x: 25, y: 45, status: 'active' },
                      { x: 55, y: 75, status: 'active' }
                    ].map((marker, index) => (
                      <div
                        key={index}
                        className="absolute w-4 h-4 rounded-full cursor-pointer transform hover:scale-125 transition-transform"
                        style={{
                          left: `${marker.x}%`,
                          top: `${marker.y}%`,
                          backgroundColor: marker.status === 'alert' ? '#ef4444' : '#3b82f6',
                          boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Violations Trend */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Violations Trend</h3>
                    <div className="h-[180px] flex items-end justify-between space-x-2">
                      {[
                        { week: 'Week 1', value: 45 },
                        { week: 'Week 2', value: 38 },
                        { week: 'Week 3', value: 52 },
                        { week: 'Week 4', value: 35 },
                        { week: 'Week 5', value: 28 },
                        { week: 'Week 6', value: 42 }
                      ].map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                            style={{ height: `${(data.value / 60) * 100}%` }}
                          />
                          <p className="text-xs text-gray-500 mt-2">{data.week.split(' ')[1]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Alerts */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
                    <div className="space-y-3">
                      {[
                        { type: 'Drunk Driving', location: 'Kigali', time: '2 min ago', icon: AlertTriangle, color: 'red' },
                        { type: 'Overspeeding', location: 'Musanze', time: '15 min ago', icon: TrendingUp, color: 'yellow' },
                        { type: 'Accident', location: 'Butare', time: '30 min ago', icon: AlertTriangle, color: 'red' },
                        { type: 'Fuel Theft', location: 'Gisenyi', time: '1 hour ago', icon: Fuel, color: 'orange' }
                      ].map((alert, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            alert.color === 'red' ? 'bg-red-100' :
                            alert.color === 'yellow' ? 'bg-yellow-100' :
                            'bg-orange-100'
                          }`}>
                            <alert.icon className={`w-4 h-4 ${
                              alert.color === 'red' ? 'text-red-500' :
                              alert.color === 'yellow' ? 'text-yellow-500' :
                              'text-orange-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                            <p className="text-xs text-gray-500">{alert.location}</p>
                          </div>
                          <span className="text-xs text-gray-400">{alert.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Violations by Type */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Violations by Type</h3>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="100 151" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="60 191" strokeDashoffset="-100" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="40 211" strokeDashoffset="-160" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">234</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Overspeeding</span>
                      <span className="text-gray-600">40%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Drunk Driving</span>
                      <span className="text-gray-600">35%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Other</span>
                      <span className="text-gray-600">25%</span>
                    </div>
                  </div>
                </div>

                {/* Top High-Risk Areas */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top High-Risk Areas</h3>
                  <div className="space-y-3">
                    {[
                      { area: 'Kigali City Center', risk: 'High', incidents: 45 },
                      { area: 'Kigali-Musanze Rd', risk: 'High', incidents: 32 },
                      { area: 'Kigali-Butare Hwy', risk: 'Medium', incidents: 28 },
                      { area: 'Gisenyi-Rubavu Rd', risk: 'Medium', incidents: 24 },
                      { area: 'Rwamagana-Kigali', risk: 'Low', incidents: 19 }
                    ].map((area, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{area.area}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          area.risk === 'High' ? 'bg-red-100 text-red-700' :
                          area.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {area.risk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicle Status */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Status</h3>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="126 125" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="20" strokeDasharray="63 188" strokeDashoffset="-126" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="38 213" strokeDashoffset="-189" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#6b7280" strokeWidth="20" strokeDasharray="25 226" strokeDashoffset="-227" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">8,234</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Moving</span>
                      <span className="text-gray-600">50%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>Idle</span>
                      <span className="text-gray-600">25%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Stopped</span>
                      <span className="text-gray-600">15%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>Offline</span>
                      <span className="text-gray-600">10%</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View All Vehicles
                    </button>
                    <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Generate Report
                    </button>
                    <button className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
                      Send Law Enforcement Alert
                    </button>
                    <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {activeSection !== 'overview' && (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Section Coming Soon</h3>
              <p className="text-gray-600">The {activeSection} section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon: Icon, title, value, change, changeColor, iconColor }) {
  const iconColors = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColors[iconColor]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-sm font-medium ${changeColor === 'blue' ? 'text-blue-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}
