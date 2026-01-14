import mongoose from 'mongoose';

const contestParticipantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  ranking: {
    type: Number,
    required: true
  },
  problemsSolved: {
    type: Number,
    default: 0
  },
  oldRating: {
    type: Number,
    default: 0
  },
  newRating: {
    type: Number,
    default: 0
  }
}, { _id: false });

const contestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['leetcode', 'codeforces'],
    required: true,
    default: 'leetcode'
  },
  contestId: {
    type: Number, // For Codeforces contest ID
    default: null
  },
  date: {
    type: Date,
    required: true
  },
  participants: [contestParticipantSchema],
  syncedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure uniqueness per platform
contestSchema.index({ name: 1, platform: 1 }, { unique: true });

const Contest = mongoose.model('Contest', contestSchema);

export default Contest;
