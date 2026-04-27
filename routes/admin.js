const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const { getUsers, saveUsers } = require('../config/db');

const router = express.Router();

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role (admin only)
// @access  Private (Admin only)
router.put('/users/:id/role', protect, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;

    // Validate role
    if (!['driver', 'manager', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex].role = role;
    await saveUsers(users);

    const userInstance = new User(users[userIndex]);

    res.json({
      success: true,
      user: userInstance.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
// @access  Private (Admin only)
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await getUsers();
    const usersWithoutPassword = users.map(u => new User(u).toJSON());
    
    res.json({
      success: true,
      count: users.length,
      users: usersWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
