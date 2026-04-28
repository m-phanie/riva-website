'use client'

import { motion } from 'framer-motion'
import { Truck, MapPin, Fuel, Users, TrendingUp, AlertCircle, MessageSquare, Send, X, Bell, Car, Phone, Mail, CreditCard, Upload, Edit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ChatWidget from '@/components/ChatWidget'

export default function ManagerDashboard() {
  const [user, setUser] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', message: 'Vehicle RWA-123 alcohol detection alert', time: '10:30 AM', read: false },
    { id: 2, type: 'info', message: 'Driver John Doe started trip', time: '09:15 AM', read: false },
    { id: 3, type: 'warning', message: 'Fuel level low in RWA-456', time: '08:45 AM', read: true }
  ])
  const [showAddDriverModal, setShowAddDriverModal] = useState(false)
  const [showEditDriverModal, setShowEditDriverModal] = useState(false)
  const [newDriver, setNewDriver] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    idNumber: '', 
    plate: '', 
    password: '', 
    confirmPassword: '',
    profilePicture: '' 
  })
  const [editDriver, setEditDriver] = useState({ 
    id: '',
    name: '', 
    email: '', 
    phone: '', 
    idNumber: '', 
    plate: '', 
    password: '', 
    confirmPassword: '',
    profilePicture: '' 
  })
  const [profilePictureFile, setProfilePictureFile] = useState(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState('')
  const [editProfilePictureFile, setEditProfilePictureFile] = useState(null)
  const [editProfilePicturePreview, setEditProfilePicturePreview] = useState('')
  const [drivers, setDrivers] = useState([])
  const [driverPositions, setDriverPositions] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    console.log('Manager Dashboard - Token:', token)
    console.log('Manager Dashboard - User data:', userData)

    if (!token || !userData) {
      console.log('No token or user data, redirecting to login')
      window.location.href = '/login'
      return
    }

    const parsedUser = JSON.parse(userData)
    console.log('Manager Dashboard - Parsed user:', parsedUser)
    console.log('Manager Dashboard - User role:', parsedUser.role)
    console.log('Manager Dashboard - Role comparison:', parsedUser.role.toLowerCase(), 'vs', 'manager')

    if (parsedUser.role.toLowerCase() !== 'manager') {
      console.log('Role mismatch, redirecting to access-denied')
      window.location.href = '/access-denied'
      return
    }

    setUser(parsedUser)

    // Fetch all users from backend
    fetchUsers()
    
    // Periodically refresh chat history
    const interval = setInterval(() => {
      if (selectedDriver) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
        const driverMessages = chatHistory.filter(msg => 
          (msg.sender === 'driver' && msg.senderId === selectedDriver.id) || 
          (msg.sender === 'manager' && msg.recipientId === selectedDriver.id)
        )
        setMessages(driverMessages)
      }
    }, 2000)
    
    return () => clearInterval(interval)
  }, [selectedDriver])

  // Simulate car movement and fuel consumption
  useEffect(() => {
    const movementInterval = setInterval(() => {
      setDrivers(prevDrivers => prevDrivers.map(driver => {
        if (driver.status === 'Active' && driver.fuel > 0) {
          // Simulate movement by updating position slightly
          const newFuel = Math.max(0, driver.fuel - 0.1) // Decrease fuel
          const newSpeed = Math.max(0, Math.min(120, driver.speed + (Math.random() - 0.5) * 10)) // Vary speed
          
          return {
            ...driver,
            fuel: Math.round(newFuel * 10) / 10,
            speed: Math.round(newSpeed)
          }
        }
        return driver
      }))
      
      // Update animated positions
      setDriverPositions(prev => {
        const newPositions = { ...prev }
        drivers.forEach((driver, index) => {
          const routes = [
            { start: { left: 50, top: 50 }, end: { left: 50, top: 30 } }, // Kigali to Musanze
            { start: { left: 50, top: 50 }, end: { left: 50, top: 70 } }, // Kigali to Butare
            { start: { left: 50, top: 50 }, end: { left: 20, top: 50 } }, // Kigali to Rubavu
            { start: { left: 50, top: 50 }, end: { left: 80, top: 50 } }, // Kigali to Rwamagana
            { start: { left: 50, top: 50 }, end: { left: 50, top: 40 } }, // Kigali to Byumba
          ]
          const route = routes[index % routes.length]
          
          if (!newPositions[driver.id]) {
            newPositions[driver.id] = { ...route.start, direction: 'forward', progress: 0 }
          } else {
            const pos = newPositions[driver.id]
            const speed = 0.5 // Movement speed
            
            if (pos.direction === 'forward') {
              pos.progress += speed
              if (pos.progress >= 100) {
                pos.direction = 'backward'
              }
            } else {
              pos.progress -= speed
              if (pos.progress <= 0) {
                pos.direction = 'forward'
              }
            }
            
            // Interpolate position
            pos.left = route.start.left + (route.end.left - route.start.left) * (pos.progress / 100)
            pos.top = route.start.top + (route.end.top - route.start.top) * (pos.progress / 100)
          }
        })
        return newPositions
      })
    }, 1000)

    return () => clearInterval(movementInterval)
  }, [drivers])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched users:', data)
        // Filter only drivers and use actual data, add defaults only for missing fields
        const driverUsers = data
          .filter(u => u.role === 'driver')
          .map(driver => ({
            id: driver.id,
            name: driver.name,
            phone: driver.phone || '+250 788 XXX XXX',
            email: driver.email,
            idNumber: driver.idNumber || 'N/A',
            profilePicture: driver.profilePicture || '',
            plate: driver.plate || 'RWA-XXX',
            status: 'Active',
            location: driver.location || 'Kigali',
            lat: driver.lat || -1.9443,
            lng: driver.lng || 30.0619,
            fuel: driver.fuel || 100,
            speed: driver.speed || 0
          }))
        setDrivers(driverUsers)
        console.log('Driver users:', driverUsers)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleSendMessage = () => {
    if (message.trim() && selectedDriver) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'manager',
        senderId: user.id,
        senderName: user.name,
        recipientId: selectedDriver.id,
        recipientName: selectedDriver.name,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      // Save to shared localStorage
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      chatHistory.push(newMessage)
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
      
      setMessages([...messages, newMessage])
      setMessage('')
      
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: 'driver',
          text: 'Received your message. I will respond shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        
        const updatedChatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
        updatedChatHistory.push(response)
        localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory))
        
        setMessages(prev => [...prev, response])
      }, 1500)
    }
  }

  const selectDriver = (driver) => {
    setSelectedDriver(driver)
    
    // Load chat history for this driver
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
    const driverMessages = chatHistory.filter(msg => 
      (msg.sender === 'driver' && msg.senderId === driver.id) || 
      (msg.sender === 'manager' && msg.recipientId === driver.id)
    )
    setMessages(driverMessages.length > 0 ? driverMessages : [])
  }

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePictureFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result)
        setNewDriver({ ...newDriver, profilePicture: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddDriver = async () => {
    if (newDriver.name && newDriver.email && newDriver.phone && newDriver.idNumber && newDriver.plate && newDriver.password) {
      if (newDriver.password !== newDriver.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newDriver.name,
            email: newDriver.email,
            phone: newDriver.phone,
            idNumber: newDriver.idNumber,
            plate: newDriver.plate,
            password: newDriver.password,
            profilePicture: newDriver.profilePicture,
            role: 'driver'
          })
        })

        if (response.ok) {
          alert('Driver added successfully! The driver can now login with their credentials.')
          setShowAddDriverModal(false)
          setNewDriver({ 
            name: '', 
            email: '', 
            phone: '', 
            idNumber: '', 
            plate: '', 
            password: '', 
            confirmPassword: '',
            profilePicture: '' 
          })
          setProfilePictureFile(null)
          setProfilePicturePreview('')
          // Refresh the drivers list
          fetchUsers()
        } else {
          const error = await response.json()
          alert(error.message || 'Failed to add driver')
        }
      } catch (error) {
        console.error('Error adding driver:', error)
        alert('Failed to add driver. Please try again.')
      }
    } else {
      alert('Please fill in all required fields')
    }
  }

  const openEditDriverModal = (driver) => {
    setEditDriver({
      id: driver.id,
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      idNumber: driver.idNumber,
      plate: driver.plate,
      password: '',
      confirmPassword: '',
      profilePicture: driver.profilePicture || ''
    })
    setEditProfilePicturePreview(driver.profilePicture || '')
    setEditProfilePictureFile(null)
    setShowEditDriverModal(true)
  }

  const handleEditProfilePictureUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditProfilePictureFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditProfilePicturePreview(reader.result)
        setEditDriver({ ...editDriver, profilePicture: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateDriver = async () => {
    if (editDriver.name && editDriver.email && editDriver.phone && editDriver.idNumber && editDriver.plate) {
      if (editDriver.password && editDriver.password !== editDriver.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      try {
        const token = localStorage.getItem('token')
        const updateData = {
          name: editDriver.name,
          email: editDriver.email,
          phone: editDriver.phone,
          idNumber: editDriver.idNumber,
          plate: editDriver.plate,
          profilePicture: editDriver.profilePicture
        }

        // Only include password if it's provided
        if (editDriver.password) {
          updateData.password = editDriver.password
        }

        const response = await fetch(`http://localhost:5000/api/auth/users/${editDriver.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updateData)
        })

        if (response.ok) {
          alert('Driver updated successfully!')
          setShowEditDriverModal(false)
          setEditDriver({ 
            id: '',
            name: '', 
            email: '', 
            phone: '', 
            idNumber: '', 
            plate: '', 
            password: '', 
            confirmPassword: '',
            profilePicture: '' 
          })
          setEditProfilePictureFile(null)
          setEditProfilePicturePreview('')
          // Refresh the drivers list
          fetchUsers()
          // Update selected driver if it's the same driver
          if (selectedDriver && selectedDriver.id === editDriver.id) {
            setSelectedDriver({ ...selectedDriver, ...updateData })
          }
        } else {
          const error = await response.json()
          alert(error.message || 'Failed to update driver')
        }
      } catch (error) {
        console.error('Error updating driver:', error)
        alert('Failed to update driver. Please try again.')
      }
    } else {
      alert('Please fill in all required fields')
    }
  }

  const handleDeleteDriver = async (driverId) => {
    if (!confirm('Are you sure you want to delete this driver? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/auth/users/${driverId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        alert('Driver deleted successfully!')
        // Refresh the drivers list
        fetchUsers()
        // Clear selected driver if it's the deleted driver
        if (selectedDriver && selectedDriver.id === driverId) {
          setSelectedDriver(null)
        }
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to delete driver')
      }
    } catch (error) {
      console.error('Error deleting driver:', error)
      alert('Failed to delete driver. Please try again.')
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] dark:from-[#0f172a] dark:to-[#1e293b]">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0f172a] dark:text-white">RIVA</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manager Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg relative flex items-center justify-center"
                  style={{ backgroundColor: '#22c55e' }}
                >
                  <MessageSquare className="w-5 h-5" />
                  {drivers.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
                      {drivers.length}
                    </span>
                  )}
                </button>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {user.name}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  window.location.href = '/login'
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Truck className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-2">{drivers.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Drivers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Car className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-2">{drivers.filter(d => d.status === 'Active').length}</h3>
            <p className="text-gray-600 dark:text-gray-300">On Road</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Fuel className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Avg</span>
            </div>
            <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-2">{Math.round(drivers.reduce((acc, d) => acc + d.fuel, 0) / drivers.length)}%</h3>
            <p className="text-gray-600 dark:text-gray-300">Fuel Level</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-2">{notifications.filter(n => !n.read).length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Alerts</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Driver List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#0f172a] dark:text-white">Drivers & Locations</h3>
              <button
                onClick={() => setShowAddDriverModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Add Driver</span>
              </button>
            </div>
            <div className="space-y-4">
              {drivers.map((driver) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  onClick={() => selectDriver(driver)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {driver.profilePicture ? (
                        <img 
                          src={driver.profilePicture} 
                          alt={driver.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-semibold">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-[#0f172a] dark:text-white">{driver.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{driver.plate} • {driver.location}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {driver.phone} • ID: {driver.idNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-[#0f172a] dark:text-white">{driver.speed}</span> km/h
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Fuel: <span className="font-medium text-[#0f172a] dark:text-white">{driver.fuel}%</span>
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        driver.status === 'Active' 
                          ? 'bg-green-500 text-white' 
                          : driver.status === 'In Transit'
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {driver.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-[#0f172a] dark:text-white mb-4">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markNotificationRead(notification.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    notification.read 
                      ? 'bg-gray-50 dark:bg-gray-700 opacity-60' 
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      notification.type === 'alert' ? 'text-red-500' : 
                      notification.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0f172a] dark:text-white">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* GPS Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#0f172a] dark:text-white">GPS Tracking - Live Driver Locations</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">In Transit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Low Fuel</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            {/* Google Maps Embed - Rwanda */}
            <iframe
              width="100%"
              height="500"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1596713.6970483258!2d28.861658999999996!3d-1.9403279999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19e3f8d3b1c4d7c9%3A0x8d6b8b8b8b8b8b8b!2sRwanda!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rwanda Map - Driver Locations"
            />
            
            {/* Driver Markers Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {drivers.map((driver, index) => {
                const pos = driverPositions[driver.id] || { left: 50, top: 50 }
                const locations = ['Musanze', 'Butare', 'Rubavu', 'Rwamagana', 'Byumba']
                const location = locations[index % locations.length]
                
                return (
                  <div
                    key={driver.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group transition-all duration-1000 ease-in-out"
                    style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                    onClick={() => selectDriver(driver)}
                  >
                    {/* Pulsing effect */}
                    <div className="absolute inset-0 rounded-full animate-ping bg-red-500" style={{ width: '32px', height: '32px' }} />
                    
                    {/* Driver marker */}
                    <div className="w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center relative z-10 bg-red-500">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Driver name tooltip */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow">
                      {driver.name}
                    </div>
                    
                    {/* Speed indicator */}
                    <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold text-white bg-red-600">
                      {Math.round(driver.speed)}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      <p className="text-sm font-semibold text-[#0f172a] dark:text-white">{driver.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{driver.plate} • {location}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-[#0f172a] dark:text-white">{Math.round(driver.speed)}</span> km/h
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Fuel: <span className={`font-medium ${driver.fuel < 30 ? 'text-red-500' : driver.fuel < 50 ? 'text-yellow-500' : 'text-green-500'}`}>{driver.fuel.toFixed(1)}%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Journey Info Panel */}
            <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl w-64">
              <h4 className="text-sm font-semibold text-[#0f172a] dark:text-white mb-3">Active Journeys</h4>
              <div className="space-y-3">
                {drivers.slice(0, 4).map((driver, index) => {
                  const destinations = ['Musanze', 'Butare', 'Rubavu', 'Rwamagana']
                  const dest = destinations[index % destinations.length]
                  return (
                    <div key={driver.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          driver.fuel < 30 ? 'bg-yellow-500' : driver.status === 'Active' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <span className="text-xs text-gray-600 dark:text-gray-300 truncate w-20">{driver.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">→ {dest}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Fuel Usage Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl">
              <h4 className="text-sm font-semibold text-[#0f172a] dark:text-white mb-2">Fuel Status (Live)</h4>
              {drivers.slice(0, 5).map((driver) => (
                <div key={driver.id} className="flex items-center space-x-2 mb-2">
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${driver.fuel < 30 ? 'bg-red-500' : driver.fuel < 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${driver.fuel}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium transition-colors duration-300 ${driver.fuel < 30 ? 'text-red-500' : driver.fuel < 50 ? 'text-yellow-500' : 'text-green-500'}`}>{driver.fuel.toFixed(1)}%</span>
                </div>
              ))}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">* Fuel decreasing as car moves</p>
            </div>
          </div>
        </motion.div>

        {/* Driver Details Panel */}
        {selectedDriver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex items-start space-x-6 mb-6">
              {selectedDriver.profilePicture ? (
                <img 
                  src={selectedDriver.profilePicture} 
                  alt={selectedDriver.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#2563EB]"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.style.display = 'none'
                    e.target.nextElementSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <div className={`w-24 h-24 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold text-3xl border-4 border-[#2563EB] ${selectedDriver.profilePicture ? 'hidden' : ''}`}>
                {selectedDriver.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0f172a] dark:text-white">{selectedDriver.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedDriver.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Status: <span className={`font-semibold ${selectedDriver.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>{selectedDriver.status}</span></p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Contact Information</h4>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{selectedDriver.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{selectedDriver.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">ID: {selectedDriver.idNumber}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Vehicle Information</h4>
                <div className="flex items-center space-x-3">
                  <Car className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{selectedDriver.plate}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{selectedDriver.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">Fuel: {selectedDriver.fuel}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">Speed: {selectedDriver.speed} km/h</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <button
                onClick={() => selectDriver(selectedDriver)}
                className="px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat with Driver</span>
              </button>
              <button
                onClick={() => openEditDriverModal(selectedDriver)}
                className="px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Driver</span>
              </button>
              <button
                onClick={() => handleDeleteDriver(selectedDriver.id)}
                className="px-6 py-3 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Driver</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Add Driver Modal */}
      {showAddDriverModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-[#0f172a] dark:text-white mb-6">Add New Driver</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Full Name</label>
                <input
                  type="text"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Email Address</label>
                <input
                  type="email"
                  value={newDriver.email}
                  onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="driver@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="+250 788 XXX XXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">National ID Number</label>
                <input
                  type="text"
                  value={newDriver.idNumber}
                  onChange={(e) => setNewDriver({ ...newDriver, idNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="11998800XXXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Vehicle Plate Number</label>
                <input
                  type="text"
                  value={newDriver.plate}
                  onChange={(e) => setNewDriver({ ...newDriver, plate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="RWA-XXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Password</label>
                <input
                  type="password"
                  value={newDriver.password}
                  onChange={(e) => setNewDriver({ ...newDriver, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Create password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={newDriver.confirmPassword}
                  onChange={(e) => setNewDriver({ ...newDriver, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {profilePicturePreview ? (
                      <img 
                        src={profilePicturePreview} 
                        alt="Profile preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-300">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose a photo from your device</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowAddDriverModal(false)
                  setNewDriver({ 
                    name: '', 
                    email: '', 
                    phone: '', 
                    idNumber: '', 
                    plate: '', 
                    password: '', 
                    confirmPassword: '',
                    profilePicture: '' 
                  })
                  setProfilePictureFile(null)
                  setProfilePicturePreview('')
                }}
                className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDriver}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Add Driver
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Driver Modal */}
      {showEditDriverModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-[#0f172a] dark:text-white">Edit Driver Profile</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Update driver information</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Full Name</label>
                <input
                  type="text"
                  value={editDriver.name}
                  onChange={(e) => setEditDriver({ ...editDriver, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Email</label>
                <input
                  type="email"
                  value={editDriver.email}
                  onChange={(e) => setEditDriver({ ...editDriver, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={editDriver.phone}
                  onChange={(e) => setEditDriver({ ...editDriver, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">ID Number</label>
                <input
                  type="text"
                  value={editDriver.idNumber}
                  onChange={(e) => setEditDriver({ ...editDriver, idNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter ID number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">License Plate</label>
                <input
                  type="text"
                  value={editDriver.plate}
                  onChange={(e) => setEditDriver({ ...editDriver, plate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter license plate"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">New Password (optional)</label>
                <input
                  type="password"
                  value={editDriver.password}
                  onChange={(e) => setEditDriver({ ...editDriver, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={editDriver.confirmPassword}
                  onChange={(e) => setEditDriver({ ...editDriver, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Confirm new password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {editProfilePicturePreview ? (
                      <img 
                        src={editProfilePicturePreview} 
                        alt="Profile preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-300">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditProfilePictureUpload}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose a new photo from your device</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-6 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setShowEditDriverModal(false)
                  setEditDriver({ 
                    id: '',
                    name: '', 
                    email: '', 
                    phone: '', 
                    idNumber: '', 
                    plate: '', 
                    password: '', 
                    confirmPassword: '',
                    profilePicture: '' 
                  })
                  setEditProfilePictureFile(null)
                  setEditProfilePicturePreview('')
                }}
                className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDriver}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Update Driver
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Chat Widget */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50 w-[800px] h-[600px]"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex h-full">
            {/* Sidebar - Driver List */}
            <div className="w-1/3 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-4 flex items-center justify-between">
                <h3 className="text-white font-semibold">Messages</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              {/* Driver List */}
              <div className="overflow-y-auto h-[calc(100%-60px)]">
                {drivers.map((driver) => {
                  const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
                  const driverMessages = chatHistory.filter(msg => 
                    (msg.sender === 'driver' && msg.senderId === driver.id) || 
                    (msg.sender === 'manager' && msg.recipientId === driver.id)
                  )
                  const lastMessage = driverMessages[driverMessages.length - 1]
                  
                  return (
                    <div
                      key={driver.id}
                      onClick={() => selectDriver(driver)}
                      className={`p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                        selectedDriver?.id === driver.id ? 'bg-gray-200 dark:bg-gray-700' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {driver.profilePicture ? (
                          <img 
                            src={driver.profilePicture} 
                            alt={driver.name}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.style.display = 'none'
                              e.target.nextElementSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div className={`w-12 h-12 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-semibold ${driver.profilePicture ? 'hidden' : ''}`}>
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-[#0f172a] dark:text-white truncate">{driver.name}</h4>
                            {lastMessage && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">{lastMessage.time}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {lastMessage ? lastMessage.text : 'No messages yet'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-4 flex items-center space-x-3">
                {selectedDriver && (
                  <>
                    {selectedDriver.profilePicture ? (
                      <img 
                        src={selectedDriver.profilePicture} 
                        alt={selectedDriver.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.style.display = 'none'
                          e.target.nextElementSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className={`w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold ${selectedDriver.profilePicture ? 'hidden' : ''}`}>
                      {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{selectedDriver.name}</h3>
                      <p className="text-white/80 text-sm">Online</p>
                    </div>
                  </>
                )}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#ECE5DD] dark:bg-gray-800">
                {selectedDriver ? (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'manager' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender === 'manager'
                            ? 'bg-[#DCF8C6] text-[#0f172a]'
                            : 'bg-white text-[#0f172a] dark:bg-gray-700 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 text-gray-500`}>{msg.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select a driver to start chatting
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10B981] text-[#0f172a] dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!selectedDriver}
                    className="p-3 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full hover:from-[#059669] hover:to-[#047857] transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <ChatWidget drivers={drivers} />
    </div>
  )
}
