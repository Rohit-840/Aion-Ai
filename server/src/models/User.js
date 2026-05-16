const mongoose = require('mongoose');

/**
 * User model.
 * NOTE: the raw password is never stored — only `passwordHash`.
 * Use `toSafeObject()` whenever sending a user to the frontend so the
 * password hash is never leaked.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // never returned by default queries
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    credits: {
      type: Number,
      default: 25,
      min: 0,
    },
    plan: {
      type: String,
      enum: ['free', 'creator', 'studio', 'enterprise'],
      default: 'free',
    },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

/**
 * Return a frontend-safe representation of the user.
 * Excludes the password hash and internal mongoose fields.
 */
userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    role: this.role,
    credits: this.credits,
    plan: this.plan,
    status: this.status,
    lastLoginAt: this.lastLoginAt,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model('User', userSchema);
