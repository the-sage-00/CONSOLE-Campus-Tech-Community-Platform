import cron from "node-cron";
import { syncLeetcodeContests, syncCodeforcesContests } from "../controller/contestController.js";
import { refreshAllUsersData } from "../controller/adminController.js";

export const startContestScheduler = (app) => {
  // Every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      // Create mock req/res for internal trigger with admin role
      const req = { user: { role: "admin" } };
      const res = { status: () => res, json: () => null };
      
      console.log("Running scheduled tasks...");
      
      await syncLeetcodeContests(req, res);
      console.log("LeetCode sync complete.");
      
      await syncCodeforcesContests(req, res);
      console.log("Codeforces sync complete.");
      
      await refreshAllUsersData(req, res);
      console.log("All users data refresh complete.");
      
      console.log("All scheduled tasks complete.");
    } catch (err) {
      console.error("Contest scheduler error:", err);
    }
  });
};
