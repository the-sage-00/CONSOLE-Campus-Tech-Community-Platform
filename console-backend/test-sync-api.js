import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000';

async function testSync() {
  console.log('🧪 Testing Contest Sync API\n');
  console.log('=' .repeat(60));
  
  // First, we need an admin token
  // You'll need to replace these with your actual admin credentials
  const adminEmail = 'admin@example.com'; // CHANGE THIS
  const adminPassword = 'admin123'; // CHANGE THIS
  
  try {
    // Step 1: Admin Login
    console.log('\n📝 Step 1: Admin Login...');
    const loginRes = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: adminPassword })
    });
    
    if (!loginRes.ok) {
      console.error('❌ Login failed. Please update admin credentials in test-sync-api.js');
      console.error('   Status:', loginRes.status);
      return;
    }
    
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('✅ Admin logged in successfully');
    
    // Step 2: Trigger Contest Sync
    console.log('\n🔄 Step 2: Triggering Contest Sync...');
    console.log('   This may take 30-60 seconds depending on number of users...\n');
    
    const syncRes = await fetch(`${API_URL}/api/contest/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const syncData = await syncRes.json();
    
    if (syncRes.ok) {
      console.log('✅ Contest Sync Completed!\n');
      console.log('📊 Results:');
      console.log('   Message:', syncData.message);
      console.log('   Contest:', syncData.finalizedContest);
      console.log('   Weekend:', syncData.weekendTracked);
      console.log('   Participants:', syncData.participants);
      
      if (syncData.errors && syncData.errors.length > 0) {
        console.log('\n⚠️  Errors:');
        syncData.errors.forEach(err => {
          console.log(`   - ${err.user} (${err.handle}): ${err.error}`);
        });
      }
    } else {
      console.error('❌ Sync failed:', syncData.error || syncData.message);
    }
    
    // Step 3: Get Recent Contest
    console.log('\n📋 Step 3: Fetching Recent Contest...');
    const recentRes = await fetch(`${API_URL}/api/contest/recent`);
    const recentData = await recentRes.json();
    
    if (recentRes.ok) {
      console.log('✅ Recent Contest Data:');
      console.log('   Name:', recentData.contestName || 'None');
      console.log('   Date:', recentData.date ? new Date(recentData.date).toDateString() : 'N/A');
      console.log('   Participants:', recentData.participantsCount || 0);
      
      if (recentData.participants && recentData.participants.length > 0) {
        console.log('\n👥 Top Participants:');
        recentData.participants.slice(0, 5).forEach((p, i) => {
          console.log(`   ${i + 1}. ${p.name} (${p.handle}) - Rank: ${p.ranking}, Rating: ${p.rating}`);
        });
      }
    } else {
      console.error('❌ Failed to fetch recent contest');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Test Complete!\n');
    
  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
}

// Check if node-fetch is available
try {
  testSync();
} catch (error) {
  console.error('❌ Error: node-fetch not available');
  console.log('💡 Install it with: npm install node-fetch@2');
}
