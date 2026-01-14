# Improved User Verification System

This document explains the new user verification system that properly handles unverified users and prevents email blocking.

## Problem Solved

Previously:
- Users were saved to the main `users` collection immediately upon registration
- Unverified users blocked re-registration with the same email forever
- No way to resend OTP or clean up expired unverified accounts
- Users could get permanently locked out

## New Solution

### 1. Two-Stage Registration Process

1. **Registration** → Save to `pending_users` collection (temporary)
2. **Email Verification** → Move to `users` collection (permanent)

### 2. Automatic Cleanup

- Pending users expire automatically after 24 hours
- Periodic cleanup removes expired records every 6 hours
- Users with too many failed attempts are removed

### 3. Smart Email Handling

The system now follows this logic:

```
When registering:
    if email exists in verified_users:
        show "Email already in use"
    else if email exists in pending_verifications:
        if OTP still valid:
            show "Check your email to verify"
        else:
            delete old pending record
            create new pending record + send OTP
    else:
        create pending record + send OTP
```

## API Endpoints

### New V2 Auth Endpoints

All endpoints are available under `/api/auth/v2/`:

#### Public Routes

- `POST /register` - Start registration process
- `POST /login` - Login with improved unverified user handling
- `POST /verify-email` - Verify email with OTP
- `POST /resend-verification` - Resend OTP email
- `GET /pending-status` - Get status of pending registration

#### Admin/Maintenance

- `POST /cleanup` - Manual cleanup of expired records

### Registration Flow Examples

#### 1. New User Registration

**Request:**
```javascript
POST /api/auth/v2/register
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "branch": "Computer Science"
}
```

**Response:**
```javascript
{
  "message": "Registration initiated! Please check your email for verification code.",
  "data": {
    "pendingId": "...",
    "email": "john@example.com",
    "expiresAt": "2024-01-01T12:10:00.000Z",
    "canResend": true
  }
}
```

#### 2. Email Already in Use (Verified User)

**Request:**
```javascript
POST /api/auth/v2/register
{
  "name": "John Doe",
  "email": "existing@example.com",
  "password": "password123", 
  "branch": "Computer Science"
}
```

**Response:**
```javascript
{
  "error": "Email already in use by a verified account"
}
```

#### 3. Registration Pending (OTP Still Valid)

**Request:**
```javascript
POST /api/auth/v2/register
{
  "name": "John Doe",
  "email": "pending@example.com",
  "password": "password123",
  "branch": "Computer Science" 
}
```

**Response:**
```javascript
{
  "error": "Registration pending. Please check your email for the verification code.",
  "pendingId": "...",
  "canResend": true
}
```

#### 4. Email Verification

**Request:**
```javascript
POST /api/auth/v2/verify-email
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```javascript
{
  "message": "Email verified successfully! You can now login.",
  "data": {
    "userId": "...",
    "email": "john@example.com", 
    "name": "John Doe"
  }
}
```

### Login Flow Examples

#### 1. Verified User Login

**Request:**
```javascript
POST /api/auth/v2/login
{
  "email": "verified@example.com",
  "password": "password123"
}
```

**Response:**
```javascript
{
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "verified@example.com", 
      "branch": "Computer Science",
      "isEmailVerified": true
    }
  }
}
```

#### 2. Unverified User Login

**Request:**
```javascript
POST /api/auth/v2/login
{
  "email": "pending@example.com",
  "password": "password123" 
}
```

**Response:**
```javascript
{
  "error": "Please verify your email before logging in.",
  "needsVerification": true,
  "pendingId": "...",
  "email": "pending@example.com",
  "canResend": true
}
```

### Resend OTP

**Request:**
```javascript
POST /api/auth/v2/resend-verification
{
  "email": "pending@example.com"
}
```

**Response:**
```javascript
{
  "message": "New verification code sent successfully!",
  "data": {
    "pendingId": "...",
    "email": "pending@example.com",
    "expiresAt": "2024-01-01T12:20:00.000Z", 
    "remainingResends": 2
  }
}
```

## Database Collections

### PendingUser Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String, // unique
  password: String, // hashed  
  branch: String,
  otp: String,
  otpExpires: Date,
  expiresAt: Date, // TTL index - auto-delete after 24h
  otpAttempts: Number, // max 5
  resendCount: Number, // max 3
  lastResendAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### User Collection (unchanged)

Existing verified users remain in the main `users` collection.

## Key Features

### ✅ No More Email Blocking

- Expired unverified registrations are automatically cleaned up
- Users can re-register with the same email after expiration

### ✅ Smart Retry Logic

- Max 5 OTP attempts per registration
- Max 3 resends per registration  
- 1-minute cooldown between resends

### ✅ Automatic Cleanup

- Pending records expire after 24 hours
- Periodic cleanup runs every 6 hours
- Failed attempts are tracked and cleaned up

### ✅ Improved UX

- Clear error messages guide users
- Login tells users if they need to verify
- Status endpoint for checking registration state

## Migration from V1

The system is backward compatible:

1. V1 endpoints (`/api/auth/`) still work for existing verified users
2. V2 endpoints (`/api/auth/v2/`) provide the new functionality  
3. Gradually migrate frontend to use V2 endpoints
4. Eventually deprecate V1 endpoints

## Testing the System

1. Register with a new email → check pending status
2. Try to register again immediately → see "registration pending" message
3. Wait for OTP to expire → try registering again → works fine
4. Verify email → user moves to main collection
5. Try to register with same email → see "email already in use"

## Cleanup Commands

```javascript
// Manual cleanup
POST /api/auth/v2/cleanup

// Get statistics  
GET /api/auth/v2/pending-status?email=test@example.com
```

This system ensures users never get permanently locked out due to verification issues while maintaining security and preventing abuse.
