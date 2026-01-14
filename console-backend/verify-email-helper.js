import dotenv from 'dotenv';
import fetch from 'node-fetch';
import readlineSync from 'readline-sync';

// Load environment variables
dotenv.config();

const BASE_URL = 'http://localhost:5000/api';

console.log('📧 Email Verification Helper\n');

const verifyUserEmail = async () => {
  try {
    // Get user ID and OTP from user input
    console.log('🔍 Please provide the following information:');
    const userId = readlineSync.question('User ID (from registration): ');
    console.log('\n💡 Check your email (sainirishi2023@gmail.com) for the 6-digit verification code');
    const otp = readlineSync.question('Enter OTP from email: ');
    
    console.log('\n📤 Submitting verification...');
    
    const response = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, otp })
    });

    const data = await response.json();
    
    if (response.status === 200) {
      console.log('✅ Email verified successfully!');
      console.log('🔐 You can now login to your account');
      
      // Try login
      const loginData = {
        email: 'sainirishi2023@gmail.com',
        password: 'testpassword123'
      };

      const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const loginResult = await loginResponse.json();
      
      if (loginResponse.status === 200) {
        console.log('✅ Login successful!');
        console.log('🎯 Your JWT token:', loginResult.data.token.substring(0, 50) + '...');
        console.log('\n🚀 You can now test platform submissions');
        
        return loginResult.data.token;
      } else {
        console.log('❌ Login failed:', loginResult);
      }
    } else {
      console.log('❌ Email verification failed:', data);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

// Test platform submission with real token
const testPlatformWithRealToken = async (token) => {
  console.log('\n🧪 Testing platform submission with verified account...');
  
  const platforms = [
    { name: 'leetcode', handle: 'binarydosa' },
    { name: 'codeforces', handle: 'binarydosa' }
  ];
  
  for (const platform of platforms) {
    console.log(`\n🔍 Testing ${platform.name}...`);
    
    try {
      const response = await fetch(`${BASE_URL}/auth/platform/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          platform: platform.name,
          handle: platform.handle
        })
      });

      const data = await response.json();
      
      if (response.status === 200) {
        console.log(`✅ ${platform.name} submission successful!`);
        console.log(`   Verification code: ${data.data.verificationCode}`);
        console.log(`   Profile data received: ${JSON.stringify(data.data.platformData, null, 2)}`);
      } else {
        console.log(`❌ ${platform.name} submission failed:`, data);
      }
    } catch (error) {
      console.error(`❌ ${platform.name} test error:`, error.message);
    }
  }
};

// Main function
const main = async () => {
  const token = await verifyUserEmail();
  
  if (token) {
    const testPlatforms = readlineSync.keyInYNStrict('\nWould you like to test platform submissions now?');
    if (testPlatforms) {
      await testPlatformWithRealToken(token);
    }
  }
  
  console.log('\n🏁 Done!');
};

main();
