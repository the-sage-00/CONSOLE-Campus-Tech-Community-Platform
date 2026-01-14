/**
 * Migration Script: Clean up and update users
 * 
 * This script:
 * 1. REMOVES all users who don't have @mnit.ac.in email
 * 2. Parses remaining users' emails to extract admissionYear, branchCode, rollNo
 * 3. Updates user records with these fields
 * 
 * Run with: node migrate-users.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import { parseIdentityFromEmail } from './utils/identity.js';

// Load environment variables
dotenv.config();

const ALLOWED_DOMAIN = 'mnit.ac.in';

const migrateUsers = async () => {
    try {
        console.log('🚀 Starting user migration and cleanup...');
        console.log('📦 Connecting to MongoDB...');

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // ==========================================
        // STEP 1: Remove non-MNIT users
        // ==========================================
        console.log('🧹 STEP 1: Removing non-MNIT users...');
        console.log('='.repeat(50));

        // Find all non-MNIT users first (to show what will be deleted)
        const nonMnitUsers = await User.find({
            email: { $not: { $regex: `@${ALLOWED_DOMAIN}$`, $options: 'i' } }
        });

        if (nonMnitUsers.length > 0) {
            console.log(`\n⚠️  Found ${nonMnitUsers.length} non-MNIT users to remove:\n`);

            for (const user of nonMnitUsers) {
                console.log(`   ❌ ${user.email} (${user.name || 'No name'})`);
            }

            // Delete them
            const deleteResult = await User.deleteMany({
                email: { $not: { $regex: `@${ALLOWED_DOMAIN}$`, $options: 'i' } }
            });

            console.log(`\n✅ Removed ${deleteResult.deletedCount} non-MNIT users\n`);
        } else {
            console.log('✅ No non-MNIT users found. All users are from MNIT!\n');
        }

        // ==========================================
        // STEP 2: Update remaining MNIT users with parsed fields
        // ==========================================
        console.log('='.repeat(50));
        console.log('📝 STEP 2: Updating MNIT users with parsed email fields...');
        console.log('='.repeat(50) + '\n');

        // Find all remaining users (all should be MNIT now)
        const users = await User.find({});
        console.log(`📊 Found ${users.length} MNIT users to process\n`);

        let updated = 0;
        let skipped = 0;
        let failed = 0;
        let needsReview = 0;

        for (const user of users) {
            try {
                // Skip if already has all parsed fields
                if (user.admissionYear && user.rollNo && user.branchCode) {
                    console.log(`⏭️  Skipping ${user.email} - already has parsed fields`);
                    skipped++;
                    continue;
                }

                // Parse email
                const identity = parseIdentityFromEmail(user.email);

                if (identity) {
                    // Update user with parsed fields
                    const updateData = {};

                    if (!user.admissionYear && identity.admissionYear) {
                        updateData.admissionYear = identity.admissionYear;
                    }
                    if (!user.rollNo && identity.rollNo) {
                        updateData.rollNo = identity.rollNo;
                    }
                    if (!user.branchCode && identity.branchCode) {
                        updateData.branchCode = identity.branchCode;
                    }
                    // Update branch name to standardized version if available
                    if (identity.branchName && (!user.branch || user.branch !== identity.branchName)) {
                        updateData.branch = identity.branchName;
                    }

                    if (Object.keys(updateData).length > 0) {
                        await User.findByIdAndUpdate(user._id, updateData);
                        console.log(`✅ Updated ${user.email}:`);
                        console.log(`   → Admission Year: ${identity.admissionYear}`);
                        console.log(`   → Branch: ${identity.branchName} (${identity.branchCode})`);
                        console.log(`   → Roll No: ${identity.rollNo}`);
                        updated++;

                        if (identity.needsReview) {
                            needsReview++;
                            console.log(`   ⚠️  Non-standard branch code - needs review`);
                        }
                    } else {
                        console.log(`⏭️  Skipping ${user.email} - no fields to update`);
                        skipped++;
                    }
                } else {
                    // Email is @mnit.ac.in but doesn't match student format (e.g., professor email)
                    console.log(`⚠️  Could not parse ${user.email} - non-student format (kept in DB)`);
                    failed++;
                }
            } catch (error) {
                console.error(`❌ Error processing ${user.email}:`, error.message);
                failed++;
            }
        }

        // ==========================================
        // Summary
        // ==========================================
        console.log('\n' + '='.repeat(50));
        console.log('📊 MIGRATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`\n🧹 Cleanup:`);
        console.log(`   ❌ Non-MNIT users removed: ${nonMnitUsers.length}`);
        console.log(`\n📝 Update:`);
        console.log(`   ✅ Users updated: ${updated}`);
        console.log(`   ⏭️  Users skipped: ${skipped}`);
        console.log(`   ⚠️  Non-student emails (kept): ${failed}`);
        console.log(`   🔍 Needs review: ${needsReview}`);
        console.log(`\n📊 Final user count: ${await User.countDocuments()}`);
        console.log('='.repeat(50));

        console.log('\n✅ Migration complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

// Run the migration
migrateUsers();
