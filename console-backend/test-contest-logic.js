import { LeetCode } from 'leetcode-query';

const lc = new LeetCode();

// Get the last trackable weekend (Sat & Sun) whose results are declared
// ALWAYS skip the most recent Sunday because results are not declared yet
function getTrackableWeekend() {
  const today = new Date();
  const day = today.getDay(); // Sunday=0, Monday=1,...Saturday=6

  // Calculate last Sunday
  let lastSunday = new Date(today);
  const daysSinceLastSunday = day === 0 ? 7 : day; // If today is Sunday, go back 7 days
  lastSunday.setDate(today.getDate() - daysSinceLastSunday);
  
  // Skip that Sunday (results not declared) - go to previous weekend
  const trackableSunday = new Date(lastSunday);
  trackableSunday.setDate(lastSunday.getDate() - 7); // Previous Sunday
  trackableSunday.setHours(0, 0, 0, 0);
  
  const trackableSaturday = new Date(trackableSunday);
  trackableSaturday.setDate(trackableSunday.getDate() - 1); // Previous Saturday
  trackableSaturday.setHours(0, 0, 0, 0);
  
  const trackableSundayEnd = new Date(trackableSunday);
  trackableSundayEnd.setHours(23, 59, 59, 999);

  return { 
    lastSat: trackableSaturday, 
    lastSun: trackableSundayEnd 
  };
}

async function testUser(username) {
  try {
    console.log(`\n🔍 Testing user: ${username}`);
    
    const res = await lc.graphql({
      query: `
        query userContestRankingHistory($username: String!) {
          userContestRankingHistory(username: $username) {
            contest { title startTime }
            attended
            ranking
            rating
          }
        }
      `,
      variables: { username },
    });

    const history = res?.data?.userContestRankingHistory || [];
    
    if (history.length === 0) {
      console.log(`❌ No contest history found for ${username}`);
      return;
    }

    const { lastSat, lastSun } = getTrackableWeekend();
    console.log(`📅 Trackable weekend: ${lastSat.toDateString()} - ${lastSun.toDateString()}`);

    // Filter contests from the trackable weekend
    const weekendContests = history.filter((c) => {
      if (!c.contest || !c.attended) return false;
      const contestDate = new Date(c.contest.startTime * 1000);
      return (
        contestDate >= lastSat && contestDate <= lastSun
      );
    });

    console.log(`\n📊 All attended contests (last 10):`);
    history
      .filter(h => h.attended)
      .slice(0, 10)
      .forEach(h => {
        const date = new Date(h.contest.startTime * 1000);
        console.log(`  - ${h.contest.title} | ${date.toDateString()} | Rank: ${h.ranking} | Rating: ${h.rating}`);
      });

    console.log(`\n🎯 Trackable weekend contests:`);
    if (weekendContests.length > 0) {
      weekendContests.forEach(c => {
        const date = new Date(c.contest.startTime * 1000);
        console.log(`  ✅ ${c.contest.title} | ${date.toDateString()} | Rank: ${c.ranking} | Rating: ${c.rating}`);
      });
    } else {
      console.log(`  ❌ No contests in trackable weekend`);
    }

    console.log(`\n📈 Total contests attended: ${history.filter(h => h.attended).length}`);

  } catch (error) {
    console.error(`❌ Error testing ${username}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Testing Contest Logic\n');
  console.log('=' .repeat(60));
  
  // Test the users you mentioned
  await testUser('priyanshuGupta_mnit');
  await testUser('parthgandhi_22');
  
  // Test one more for comparison
  console.log('\n' + '='.repeat(60));
  await testUser('tourist'); // Known high-rated user for comparison
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Test complete!');
}

main();
