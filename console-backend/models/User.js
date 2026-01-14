import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: false  // Not required for Google OAuth users
  },
  branch: {
    type: String,
    required: false,  // Parsed from email or user-entered
    trim: true
  },

  // Student Identity (parsed from email)
  admissionYear: {
    type: Number,
    default: null
    // Example: 2024
  },
  rollNo: {
    type: String,
    default: null,
    trim: true,
    lowercase: true
    // Example: "2024ucp1566"
  },
  branchCode: {
    type: String,
    default: null,
    trim: true,
    lowercase: true
    // Example: "ucp", "ece", "me"
  },

  // Google OAuth
  googleId: {
    type: String,
    default: null
  },
  profilePicture: {
    type: String,
    default: null
  },

  // Email verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String
  },
  emailVerificationExpires: {
    type: Date
  },

  // Platform handles with verification status
  cfHandle: {
    type: String,
    trim: true
  },
  lcHandle: {
    type: String,
    trim: true
  },


  // Platform verification status with comprehensive data
  platformVerification: {
    codeforces: {
      handle: { type: String, default: '' },
      isVerified: { type: Boolean, default: false },
      verificationCode: { type: String, default: '' },
      verificationExpires: { type: Date, default: null },
      submittedAt: { type: Date, default: null },
      verifiedAt: { type: Date, default: null },
      platformData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
      },
      lastFetched: { type: Date, default: null },
      contestStats: {
        totalContests: { type: Number, default: 0 },
        contestHistory: [
          {
            contestName: { type: String },
            rating: { type: Number },
            // Add other relevant fields like rank, problems solved, etc. if needed later
          }
        ],
        lastContestParticipation: { type: Date, default: null },
      }
    },
    leetcode: {
      handle: { type: String, default: '' },
      isVerified: { type: Boolean, default: false },
      // Align fields with controller usage (store code and lifecycle timestamps)
      verificationCode: { type: String, default: '' },
      verificationExpires: { type: Date, default: null },
      submittedAt: { type: Date, default: null },
      verifiedAt: { type: Date, default: null },
      lastFetched: { type: Date, default: null },
      // Keep attempts and platform-specific metadata
      verificationAttempts: { type: Number, default: 0 },
      platformId: { type: String },
      lastSync: { type: Date, default: null },
      platformData: {
        easySolved: { type: Number, default: 0 },
        mediumSolved: { type: Number, default: 0 },
        hardSolved: { type: Number, default: 0 },
        totalSolved: { type: Number, default: 0 },
        ranking: { type: Number, default: 0 },
        contributionPoint: { type: Number, default: 0 },
        reputation: { type: Number, default: 0 },
      },
      contestStats: {
        totalContests: { type: Number, default: 0 },
        recentContests: [
          {
            contestName: { type: String },
            contestSlug: { type: String },
            date: { type: Date },
            participated: { type: Boolean, default: false },
            rank: { type: Number, default: null },
            rating: { type: Number, default: null }
          }
        ],
        lastContestFetch: { type: Date, default: null },
        lastContestName: { type: String, default: '' },
        lastContestParticipated: { type: Boolean, default: false }
      }
    },

  },

  // Platform ratings/scores
  cfRating: {
    type: Number,
    default: 0
  },
  lcRating: {
    type: Number,
    default: 0
  },


  // Platform ranks
  cfRank: {
    type: String,
    default: ''
  },

  // Status fields
  isActive: {
    type: Boolean,
    default: true
  },

  // Legacy platforms field for backward compatibility
  platforms: {
    codeforces: {
      handle: String,
      rating: { type: Number, default: 0 },
      rank: String,
      maxRating: { type: Number, default: 0 },
      contestsParticipated: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },
    leetcode: {
      handle: String,
      rating: { type: Number, default: 0 },
      ranking: { type: Number, default: 0 },
      totalSolved: { type: Number, default: 0 },
      easySolved: { type: Number, default: 0 },
      mediumSolved: { type: Number, default: 0 },
      hardSolved: { type: Number, default: 0 },
      acceptanceRate: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },

  },
  lastGlobalUpdate: {
    type: Date,
    default: Date.now
  },
  // Aggregated leaderboard score on LC scale
  totalScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving (only when password changes and is provided)
userSchema.pre('save', async function (next) {
  // Skip password hashing if password is not modified or is empty (for Google OAuth users)
  if (!this.isModified('password') || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Ensure nested defaults exist before saving (prevents Cast to Object on undefined)
userSchema.pre('save', function (next) {
  try {
    // Ensure platformVerification root exists
    if (!this.platformVerification) {
      this.platformVerification = {};
    }

    // Helper function to ensure contestStats is valid
    const ensureContestStats = (platform, defaultStats) => {
      if (!this.platformVerification[platform]) {
        this.platformVerification[platform] = {};
      }

      const platformData = this.platformVerification[platform];

      // Check if contestStats exists and is a valid object (not null, not array, not undefined)
      if (!platformData.contestStats ||
        typeof platformData.contestStats !== 'object' ||
        Array.isArray(platformData.contestStats)) {
        // Initialize with defaults - create a new object with default values
        const newStats = {};
        for (const [key, value] of Object.entries(defaultStats)) {
          if (Array.isArray(value)) {
            newStats[key] = []; // Initialize as empty array
          } else {
            newStats[key] = value;
          }
        }
        platformData.contestStats = newStats;
      } else {
        // Ensure all required fields exist in contestStats
        const stats = platformData.contestStats;
        for (const [key, defaultValue] of Object.entries(defaultStats)) {
          // Only set if the field is missing, null, or undefined
          if (stats[key] === undefined || stats[key] === null) {
            if (Array.isArray(defaultValue)) {
              stats[key] = []; // Initialize as empty array
            } else {
              stats[key] = defaultValue;
            }
          } else if (Array.isArray(defaultValue) && !Array.isArray(stats[key])) {
            // If default expects an array but stats[key] is not an array, initialize it
            stats[key] = [];
          }
        }
      }
    };

    // Ensure LeetCode contestStats defaults
    ensureContestStats('leetcode', {
      totalContests: 0,
      recentContests: [],
      lastContestFetch: null,
      lastContestName: '',
      lastContestParticipated: false
    });

    // Ensure Codeforces contestStats defaults
    ensureContestStats('codeforces', {
      totalContests: 0,
      contestHistory: [],
      lastContestParticipation: null
    });

    // Ensure LeetCode platformData structure if it exists but is incomplete
    if (this.platformVerification.leetcode && this.platformVerification.leetcode.platformData) {
      const pd = this.platformVerification.leetcode.platformData;
      if (typeof pd !== 'object' || Array.isArray(pd)) {
        this.platformVerification.leetcode.platformData = {
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          totalSolved: 0,
          ranking: 0,
          contributionPoint: 0,
          reputation: 0,
        };
      } else {
        // Ensure all required fields exist
        const defaults = {
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          totalSolved: 0,
          ranking: 0,
          contributionPoint: 0,
          reputation: 0,
        };
        for (const [key, value] of Object.entries(defaults)) {
          if (pd[key] === undefined || pd[key] === null) {
            pd[key] = value;
          }
        }
      }
    }

    next();
  } catch (err) {
    console.error('Error in pre-save hook:', err);
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate verification code for platform (legacy method - not used in new flow)
userSchema.methods.generateVerificationCode = function (platform) {
  // Initialize platform verification if it doesn't exist
  if (!this.platformVerification) {
    this.platformVerification = {};
  }
  if (!this.platformVerification[platform]) {
    // Initialize with proper structure based on platform
    if (platform === 'leetcode') {
      this.platformVerification[platform] = {
        handle: '',
        isVerified: false,
        verificationCode: '',
        verificationExpires: null,
        submittedAt: null,
        verifiedAt: null,
        verificationAttempts: 0,
        platformId: '',
        lastSync: null,
        platformData: {
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          totalSolved: 0,
          ranking: 0,
          contributionPoint: 0,
          reputation: 0,
        },
        lastFetched: null,
        contestStats: {
          totalContests: 0,
          recentContests: [],
          lastContestFetch: null,
          lastContestName: '',
          lastContestParticipated: false
        }
      };
    } else {
      this.platformVerification[platform] = {
        handle: '',
        isVerified: false,
        verificationCode: '',
        verificationExpires: null,
        submittedAt: null,
        verifiedAt: null,
        platformData: {},
        lastFetched: null,
        contestStats: {
          totalContests: 0,
          contestHistory: [],
          lastContestParticipation: null
        }
      };
    }
  }

  // Generate a unique 8-character alphanumeric code
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Preserve existing data and only update verification fields
  // Ensure contestStats is preserved
  const existingContestStats = this.platformVerification[platform].contestStats ||
    (platform === 'leetcode' ? {
      totalContests: 0,
      recentContests: [],
      lastContestFetch: null,
      lastContestName: '',
      lastContestParticipated: false
    } : {
      totalContests: 0,
      contestHistory: [],
      lastContestParticipation: null
    });

  this.platformVerification[platform] = {
    ...this.platformVerification[platform],
    verificationCode: code,
    verificationExpires: expires,
    submittedAt: new Date(),
    contestStats: existingContestStats // Preserve contest stats
  };

  return code;
};

// Check if verification code is valid
userSchema.methods.isVerificationCodeValid = function (platform) {
  const verification = this.platformVerification[platform];
  if (!verification || !verification.verificationCode) return false;

  return new Date() < verification.verificationExpires;
};

// Mark platform as verified
userSchema.methods.markPlatformVerified = function (platform) {
  this.platformVerification[platform].isVerified = true;
  this.platformVerification[platform].verifiedAt = new Date();

  // Update legacy platform handle
  switch (platform) {
    case 'codeforces':
      this.cfHandle = this.platformVerification[platform].handle;
      break;
    case 'leetcode':
      this.lcHandle = this.platformVerification[platform].handle;
      break;

  }
};

// Calculate total score based on platform ratings
userSchema.methods.calculateTotalScore = function () {
  // New rule:
  // If CF rating exists: score = CF rating
  // Else: score = (LC contest ranking - 1350) * 3

  const cfRating = Number(this.platforms?.codeforces?.rating) || 0;

  let lcRanking = Number(this.platforms?.leetcode?.ranking) || 0;
  if (!lcRanking && this.platformVerification?.leetcode?.platformData?.ranking) {
    lcRanking = Number(this.platformVerification.leetcode.platformData.ranking) || 0;
  }

  let finalScore = 0;
  if (cfRating > 0) {
    finalScore = cfRating;
  } else if (lcRanking > 0) {
    finalScore = Math.round((lcRanking - 1350) * 3);
  }

  this.totalScore = Math.max(finalScore, 0);
  console.log(`📊 CF rating=${cfRating}, LC ranking=${lcRanking} => totalScore=${this.totalScore}`);
  return this.totalScore;
};

// Get best platform
userSchema.methods.getBestPlatform = function () {
  const cfRating = Number(this.platforms?.codeforces?.rating) || 0;
  if (cfRating > 0) return 'codeforces';

  let lcRanking = Number(this.platforms?.leetcode?.ranking) || 0;
  if (!lcRanking && this.platformVerification?.leetcode?.platformData?.ranking) {
    lcRanking = Number(this.platformVerification.leetcode.platformData.ranking) || 0;
  }
  return lcRanking > 0 ? 'leetcode' : 'codeforces';
};

// Normalized scores for UI tabs (All/CF/LC)
userSchema.methods.getNormalizedScores = function () {
  const cfRating = Number(this.platforms?.codeforces?.rating) || 0;
  let lcRanking = Number(this.platforms?.leetcode?.ranking) || 0;
  if (!lcRanking && this.platformVerification?.leetcode?.platformData?.ranking) {
    lcRanking = Number(this.platformVerification.leetcode.platformData.ranking) || 0;
  }

  const lcScoreFromContest = lcRanking > 0 ? Math.round((lcRanking - 1350) * 3) : 0;
  const finalScore = cfRating > 0 ? cfRating : lcScoreFromContest;

  return {
    finalScore,
    lcScoreFromContest,
    rawCfRating: cfRating,
    rawLcRanking: lcRanking,
  };
};


export default mongoose.model('User', userSchema);