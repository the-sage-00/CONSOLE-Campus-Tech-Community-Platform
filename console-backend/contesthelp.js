import { LeetCode } from "leetcode-query";
import chalk from "chalk";

const lc = new LeetCode();

// Campus students' LeetCode usernames
const users = [
  "Cheris",
  "divyanshpokharna",
  "ShreejaMahesh",
  "Prarthana_Singla",
  "anshi",
  "manan_19",
  "nezuko27",
  "stormr",
  "2025uec1449",
  "kanakgupta_123",
  "Sam_0212",
  "devanshibhatt",
  "priyanshu10082",
  "ISHAAN_7806",
  "JAI_CODES",
  "Kanak",
  "Lokesh1849",
  "varun_chowhan",
  "cranky_piston",
  "suhit_29",
  "DevKartik",
  "meetvan200607",
  "Suraj_pathak12",
  "Purti00",
  "akshat_6935",
  "himanshu-celestial",
  "Kamal_Prajapat",
  "MayanKUMAWAT",
  "_PALLVI",
  "nikhil_0725",
  "FDlHKPou4U",
  "saarvikxcode",
  "Codenplay",
  "9sr2QiTwSu",
  "simran_123456",
  "Kush_mnit",
  "maahirtaneja",
  "JMM7LerFHR",
  "nikhil3537",
  "_Mahek_patel",
  "Y21y40i3cH",
  "umeshchandrasingh1998",
  "mzRpijozjy",
  "RaghunandanJ",
  "shubknight",
  "amit6217",
  "binarydosa",
  "goodcodes11",
  "priyanshuGupta_mnit",
  "parthgandhi_22",
  "sujalmaurya25",
  "the_sage_mp33",
];

// Format timestamp to readable date
function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString("en-IN");
}

// Get the last weekend (Sat & Sun) whose results are declared
function getTrackableWeekend() {
  const today = new Date();
  const day = today.getDay(); // Sunday=0, Monday=1,...Saturday=6

  const lastThu = new Date(today);
  lastThu.setDate(today.getDate() - ((day + 3) % 7)); // last Thursday

  // Last Saturday & Sunday whose results are declared
  const lastSat = new Date(lastThu);
  lastSat.setDate(lastThu.getDate() - 5); // Saturday
  const lastSun = new Date(lastThu);
  lastSun.setDate(lastThu.getDate() - 4); // Sunday

  return { lastSat, lastSun };
}

// Main tracker function
async function campusContestReport() {
  console.log(
    chalk.blueBright("\n🚀 Campus LeetCode Weekend Contest Tracker\n")
  );

  const { lastSat, lastSun } = getTrackableWeekend();
  console.log(
    chalk.white(
      `📅 Tracking contests from: ${lastSat.toDateString()} (Sat) & ${lastSun.toDateString()} (Sun)\n`
    )
  );

  const summary = [];

  for (const username of users) {
    try {
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

      const history = res.data.userContestRankingHistory || [];

      // Filter contests that were held on the trackable weekend
      const latestWeekendContest = history
        .filter((c) => {
          if (!c.contest || !c.attended) return false;
          const contestDate = new Date(c.contest.startTime * 1000);
          return (
            contestDate.toDateString() === lastSat.toDateString() ||
            contestDate.toDateString() === lastSun.toDateString()
          );
        })
        .sort((a, b) => b.contest.startTime - a.contest.startTime)[0];

      if (latestWeekendContest) {
        console.log(
          chalk.greenBright(
            `✅ ${username} participated: ${latestWeekendContest.contest.title}`
          )
        );
        console.log(
          chalk.white(
            `🏆 Rank: ${latestWeekendContest.ranking}, ⭐ Rating: ${
              latestWeekendContest.rating
            }, 📅 Date: ${formatDate(latestWeekendContest.contest.startTime)}\n`
          )
        );
        summary.push({
          username,
          status: "Participated",
          rank: latestWeekendContest.ranking,
          rating: latestWeekendContest.rating,
          date: formatDate(latestWeekendContest.contest.startTime),
        });
      } else {
        console.log(chalk.redBright(`❌ ${username} did NOT participate.\n`));
        summary.push({
          username,
          status: "Missed",
          rank: "-",
          rating: "-",
          date: "-",
        });
      }
    } catch (err) {
      console.error(
        chalk.red(`⚠️ Error fetching data for ${username}: ${err.message}\n`)
      );
      summary.push({
        username,
        status: "Error",
        rank: "-",
        rating: "-",
        date: "-",
      });
    }
  }

  // Display summary table
  console.log(chalk.blueBright("\n📊 Campus Contest Summary\n"));
  console.table(summary);
}

// Run tracker
campusContestReport();
