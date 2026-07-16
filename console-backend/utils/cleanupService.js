import PendingUser from '../models/PendingUser.js';
import PasswordReset from '../models/PasswordReset.js';

/**
 * Clean up expired pending user registrations
 * This service can be called periodically to remove expired pending users
 */
class CleanupService {
  
  /**
   * Remove expired pending users
   * @returns {Promise<{deletedCount: number}>}
   */
  static async cleanupExpiredPending() {
    try {
      const result = await PendingUser.deleteMany({
        otpExpires: { $lt: new Date() },
      });
      
      if (result.deletedCount > 0) {
        console.log(`✅ Cleaned up ${result.deletedCount} expired pending users`);
      }
      
      return { deletedCount: result.deletedCount };
    } catch (error) {
      console.error('❌ Error cleaning up expired pending users:', error);
      throw error;
    }
  }

  /**
   * Remove pending users that have exceeded maximum attempts
   * @returns {Promise<{deletedCount: number}>}
   */
  static async cleanupExceededAttempts() {
    try {
      const result = await PendingUser.deleteMany({
        otpAttempts: { $gte: 5 },
      });
      
      if (result.deletedCount > 0) {
        console.log(`✅ Cleaned up ${result.deletedCount} pending users with exceeded attempts`);
      }
      
      return { deletedCount: result.deletedCount };
    } catch (error) {
      console.error('❌ Error cleaning up exceeded attempts:', error);
      throw error;
    }
  }

  /**
   * Clean up expired password reset requests
   * @returns {Promise<{deletedCount: number}>}
   */
  static async cleanupExpiredPasswordResets() {
    try {
      const result = await PasswordReset.deleteMany({
        otpExpires: { $lt: new Date() },
      });
      
      if (result.deletedCount > 0) {
        console.log(`✅ Cleaned up ${result.deletedCount} expired password reset requests`);
      }
      
      return { deletedCount: result.deletedCount };
    } catch (error) {
      console.error('❌ Error cleaning up expired password resets:', error);
      throw error;
    }
  }

  /**
   * Full cleanup - pending users and password resets
   * @returns {Promise<{expiredPendingCount: number, exceededPendingCount: number, expiredResetCount: number, totalCount: number}>}
   */
  static async fullCleanup() {
    try {
      // console.log("🧹 Starting full cleanup of pending users and password resets...");
      
      const [expiredResult, exceededResult, resetResult] = await Promise.all([
        this.cleanupExpiredPending(),
        this.cleanupExceededAttempts(),
        this.cleanupExpiredPasswordResets(),
      ]);
      
      const totalCount = expiredResult.deletedCount + exceededResult.deletedCount + resetResult.deletedCount;
      
      // console.log(`✅ Full cleanup completed. Removed ${totalCount} total records`);
      
      return {
        expiredPendingCount: expiredResult.deletedCount,
        exceededPendingCount: exceededResult.deletedCount,
        expiredResetCount: resetResult.deletedCount,
        totalCount,
      };
    } catch (error) {
      console.error('❌ Error during full cleanup:', error);
      throw error;
    }
  }

  /**
   * Get statistics about pending users
   * @returns {Promise<Object>}
   */
  static async getStats() {
    try {
      const [
        totalPending,
        expiredCount,
        exceededCount,
        validCount,
      ] = await Promise.all([
        PendingUser.countDocuments(),
        PendingUser.countDocuments({ otpExpires: { $lt: new Date() } }),
        PendingUser.countDocuments({ otpAttempts: { $gte: 5 } }),
        PendingUser.countDocuments({ 
          otpExpires: { $gte: new Date() }, 
          otpAttempts: { $lt: 5 }, 
        }),
      ]);

      return {
        total: totalPending,
        expired: expiredCount,
        exceeded: exceededCount,
        valid: validCount,
        needsCleanup: expiredCount + exceededCount,
      };
    } catch (error) {
      console.error('❌ Error getting pending user stats:', error);
      throw error;
    }
  }

  /**
   * Start periodic cleanup (every 2 minutes for 5-minute pending expiry)
   * Call this from your server startup
   */
  static startPeriodicCleanup() {
    // console.log("🔄 Starting periodic cleanup service (every 2 minutes)");
    
    // Run immediately
    this.fullCleanup().catch(console.error);
    
    // Then every 2 minutes (to handle 5-minute pending user expiry)
    setInterval(async () => {
      try {
        await this.fullCleanup();
      } catch (error) {
        console.error('❌ Periodic cleanup failed:', error);
      }
    }, 2 * 60 * 1000); // 2 minutes
  }
}

export default CleanupService;
