const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function updateUserLeetCode() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find the user by email
    const userEmail = '2024ucp1786@mnit.ac.in'; // Replace with actual email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log('❌ User not found with email:', userEmail);
      return;
    }

    console.log(`📊 Found user: ${user.name} (${user.email})`);
    console.log(`📊 Current LeetCode handle: ${user.platforms?.leetcode?.handle || 'None'}`);

    // Update the LeetCode handle
    const correctHandle = 'sujalmaurya25';
    
    if (!user.platforms) {
      user.platforms = {};
    }
    
    if (!user.platforms.leetcode) {
      user.platforms.leetcode = {};
    }

    user.platforms.leetcode.handle = correctHandle;
    
    // Save the user
    await user.save();
    console.log(`✅ Updated LeetCode handle to: ${correctHandle}`);

    // Now fetch the LeetCode data
    const PlatformService = require('./services/platformService');
    console.log('🔄 Fetching LeetCode data...');
    
    const leetcodeData = await PlatformService.fetchLeetCodeData(correctHandle);
    
    if (leetcodeData) {
      // Update user with LeetCode data
      user.platforms.leetcode = {
        ...user.platforms.leetcode,
        ...leetcodeData
      };
      
      // Recalculate total score
      const totalScore = user.calculateTotalScore();
      const bestPlatform = user.getBestPlatform();
      
      user.totalScore = totalScore;
      user.bestPlatform = bestPlatform;
      user.lastUpdated = new Date();
      user.lastGlobalUpdate = new Date();
      
      await user.save();
      
      console.log('✅ LeetCode data updated successfully!');
      console.log(`📊 New total score: ${totalScore}`);
      console.log(`📊 Best platform: ${bestPlatform}`);
      console.log(`📊 LeetCode ranking: ${leetcodeData.ranking}`);
      console.log(`📊 Problems solved: ${leetcodeData.totalSolved}`);
    } else {
      console.log('❌ Failed to fetch LeetCode data');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

// Run the update
updateUserLeetCode(); 