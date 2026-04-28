const bcrypt = require('bcryptjs');

class User {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.name = data.name;
    this.email = data.email.toLowerCase();
    this.password = data.password;
    this.role = data.role || 'driver';
    this.phone = data.phone || '';
    this.idNumber = data.idNumber || '';
    this.profilePicture = data.profilePicture || '';
    this.plate = data.plate || '';
    this.location = data.location || 'Kigali';
    this.lat = data.lat || -1.9443;
    this.lng = data.lng || 30.0619;
    this.fuel = data.fuel || 100;
    this.speed = data.speed || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      phone: this.phone,
      idNumber: this.idNumber,
      profilePicture: this.profilePicture,
      plate: this.plate,
      location: this.location,
      lat: this.lat,
      lng: this.lng,
      fuel: this.fuel,
      speed: this.speed,
      createdAt: this.createdAt
    };
  }

  toDB() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      phone: this.phone,
      idNumber: this.idNumber,
      profilePicture: this.profilePicture,
      plate: this.plate,
      location: this.location,
      lat: this.lat,
      lng: this.lng,
      fuel: this.fuel,
      speed: this.speed,
      createdAt: this.createdAt
    };
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async matchPassword(enteredPassword) {
    if (!this.password) {
      console.error('User.matchPassword - Password is undefined for user:', this.email);
      return false;
    }
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

module.exports = User;
