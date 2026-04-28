const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { getUsers, saveUsers } = require('../config/db');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[AUTH] ${req.method} ${req.originalUrl}`);
  next();
});

// @route   POST /api/auth/register
// @desc    Register new user (default role: driver)
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, idNumber, profilePicture, plate, location, lat, lng, fuel, speed } = req.body;

    console.log('Backend - Registration request received');
    console.log('Backend - Request body:', { name, email, role, phone, idNumber, plate });

    // Check if user already exists
    const users = await getUsers();
    const userExists = users.find(u => u.email === email.toLowerCase());
    if (userExists) {
      console.log('Backend - User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with specified role or default to 'driver'
    const userRole = role || 'driver';
    console.log('Backend - Creating user with role:', userRole);
    
    const newUser = new User({ 
      name, 
      email, 
      password, 
      role: userRole,
      phone,
      idNumber,
      profilePicture,
      plate,
      location: location || 'Kigali',
      lat: lat || -1.9443,
      lng: lng || 30.0619,
      fuel: fuel || 100,
      speed: speed || 0
    });
    await newUser.hashPassword();

    users.push(newUser.toDB());
    await saveUsers(users);

    console.log('Backend - User created with role:', newUser.role);

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '30d' }
    );

    console.log('Backend - Sending response with user:', newUser.toJSON());

    res.status(201).json({
      success: true,
      token,
      user: newUser.toJSON()
    });
  } catch (error) {
    console.error('Backend - Registration error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    console.log('Backend - Login request received');
    console.log('Backend - Request body:', { email: req.body.email });
    
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      console.log('Backend - Missing email or password');
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const users = await getUsers();
    console.log('Backend - Total users:', users.length);
    
    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) {
      console.log('Backend - User not found for email:', email.toLowerCase());
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Backend - User found:', { id: user.id, email: user.email, role: user.role });

    // Create user instance to use matchPassword method
    const userInstance = new User(user);
    
    // Check if password matches
    const isMatch = await userInstance.matchPassword(password);
    if (!isMatch) {
      console.log('Backend - Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Backend - Password matched');

    // Generate token
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    console.log('Backend - Generating token with secret:', secret);
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: '30d' }
    );

    console.log('Backend - Token generated successfully');

    res.json({
      success: true,
      token,
      user: userInstance.toJSON()
    });
  } catch (error) {
    console.error('Backend - Login error:', error);
    console.error('Backend - Error stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const users = await getUsers();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userInstance = new User(user);
    res.json({
      success: true,
      user: userInstance.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users
// @desc    Get all users
// @access  Private
router.get('/users', protect, async (req, res) => {
  try {
    const users = await getUsers();
    // Return users without passwords
    const usersWithoutPasswords = users.map(user => {
      const userInstance = new User(user);
      return userInstance.toJSON();
    });
    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/users/:id', protect, async (req, res) => {
  try {
    console.log('Backend - Update driver request received');
    console.log('Backend - User ID:', req.params.id);
    
    const { name, email, phone, idNumber, profilePicture, plate, password } = req.body;
    const userId = req.params.id;

    console.log('Backend - Request body:', { name, email, phone, idNumber, plate, hasPassword: !!password });

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      console.log('Backend - User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Backend - User found at index:', userIndex);

    // Update user fields
    const updatedUser = { ...users[userIndex] };
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (phone) updatedUser.phone = phone;
    if (idNumber) updatedUser.idNumber = idNumber;
    if (profilePicture) updatedUser.profilePicture = profilePicture;
    if (plate) updatedUser.plate = plate;
    
    // If password is provided, hash it
    if (password) {
      const userInstance = new User(updatedUser);
      userInstance.password = password;
      await userInstance.hashPassword();
      updatedUser.password = userInstance.password;
    }

    users[userIndex] = updatedUser;
    await saveUsers(users);

    console.log('Backend - User updated successfully');
    
    const userInstance = new User(updatedUser);
    res.json({
      success: true,
      user: userInstance.toJSON()
    });
  } catch (error) {
    console.error('Backend - Update driver error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private
router.delete('/users/:id', protect, async (req, res) => {
  try {
    const userId = req.params.id;

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    await saveUsers(users);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
