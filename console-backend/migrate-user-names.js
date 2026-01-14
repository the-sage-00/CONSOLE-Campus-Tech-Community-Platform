/**
 * Migration Script: Update User Names from Google Profile
 * 
 * This script provides options to:
 * 1. PREVIEW - Show all users and their current names (safe, no changes)
 * 2. BACKUP - Export all users to a JSON file before any changes
 * 3. UPDATE_ON_LOGIN - Modify googleAuthController to update names on login
 * 
 * IMPORTANT: The database is critical - we will NOT delete any users.
 * All changes are reversible.
 * 
 * Run with: node migrate-user-names.js [preview|backup|update-from-backup]
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const BACKUP_DIR = './backups';

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

/**
 * Preview all users and their names
 * This is READ-ONLY - no changes made
 */
const previewUsers = async () => {
    console.log('\n📋 USER NAME PREVIEW');
    console.log('='.repeat(80));
    console.log('This shows all users and their current names. No changes will be made.\n');

    const users = await User.find({}).sort({ createdAt: -1 });

    console.log(`Total Users: ${users.length}\n`);
    console.log('-'.repeat(80));
    console.log('| Email'.padEnd(45) + '| Name'.padEnd(35) + '|');
    console.log('-'.repeat(80));

    for (const user of users) {
        const email = (user.email || 'No email').substring(0, 42);
        const name = (user.name || 'No name').substring(0, 32);
        console.log(`| ${email.padEnd(43)}| ${name.padEnd(33)}|`);
    }

    console.log('-'.repeat(80));

    // Show stats
    const usersWithGoogleId = users.filter(u => u.googleId);
    const usersWithProfilePic = users.filter(u => u.profilePicture);

    console.log('\n📊 Statistics:');
    console.log(`   Total users: ${users.length}`);
    console.log(`   Users with Google ID: ${usersWithGoogleId.length}`);
    console.log(`   Users with profile picture: ${usersWithProfilePic.length}`);
    console.log(`   Users without Google ID: ${users.length - usersWithGoogleId.length}`);
};

/**
 * Backup all users to a JSON file
 * Creates a timestamped backup file
 */
const backupUsers = async () => {
    console.log('\n💾 BACKING UP ALL USERS');
    console.log('='.repeat(60));

    const users = await User.find({}).lean();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `users-backup-${timestamp}.json`);

    // Create backup with metadata
    const backup = {
        createdAt: new Date().toISOString(),
        totalUsers: users.length,
        users: users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            branch: user.branch,
            branchCode: user.branchCode,
            admissionYear: user.admissionYear,
            rollNo: user.rollNo,
            googleId: user.googleId,
            profilePicture: user.profilePicture,
            isEmailVerified: user.isEmailVerified,
            cfHandle: user.cfHandle,
            lcHandle: user.lcHandle,
            cfRating: user.cfRating,
            lcRating: user.lcRating,
            totalScore: user.totalScore,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }))
    };

    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));

    console.log(`✅ Backup created: ${backupFile}`);
    console.log(`   Total users backed up: ${users.length}`);
    console.log('\n📁 Use this backup to restore names if needed.');

    return backupFile;
};

/**
 * Restore names from a backup file
 * This can be used if you have the correct names in a backup
 */
const restoreNamesFromBackup = async (backupFilePath) => {
    console.log('\n🔄 RESTORING NAMES FROM BACKUP');
    console.log('='.repeat(60));

    if (!fs.existsSync(backupFilePath)) {
        console.error(`❌ Backup file not found: ${backupFilePath}`);
        process.exit(1);
    }

    const backup = JSON.parse(fs.readFileSync(backupFilePath, 'utf-8'));
    console.log(`📁 Reading backup from: ${backupFilePath}`);
    console.log(`   Backup date: ${backup.createdAt}`);
    console.log(`   Users in backup: ${backup.totalUsers}\n`);

    let updated = 0;
    let skipped = 0;
    let notFound = 0;

    for (const backupUser of backup.users) {
        const currentUser = await User.findById(backupUser._id);

        if (!currentUser) {
            console.log(`⚠️  User not found in DB: ${backupUser.email}`);
            notFound++;
            continue;
        }

        if (currentUser.name !== backupUser.name) {
            console.log(`✏️  Updating: ${currentUser.email}`);
            console.log(`   Old name: "${currentUser.name}"`);
            console.log(`   New name: "${backupUser.name}"`);

            currentUser.name = backupUser.name;
            await currentUser.save();
            updated++;
        } else {
            skipped++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RESTORE SUMMARY');
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ⏭️  Skipped (no change): ${skipped}`);
    console.log(`   ⚠️  Not found: ${notFound}`);
};

/**
 * Show help with available commands
 */
const showHelp = () => {
    console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                     USER NAME MIGRATION TOOL                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  This tool helps you manage user names safely.                             ║
║  Your database will NOT be modified unless you explicitly request it.      ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  COMMANDS:                                                                 ║
║                                                                            ║
║  preview                    - Show all users and their current names       ║
║                               (READ-ONLY, no changes made)                 ║
║                                                                            ║
║  backup                     - Create a JSON backup of all users            ║
║                               (Highly recommended before any changes)      ║
║                                                                            ║
║  restore <backup-file>      - Restore names from a backup file             ║
║                               (Use if you need to revert changes)          ║
║                                                                            ║
║  help                       - Show this help message                       ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  EXAMPLES:                                                                 ║
║                                                                            ║
║  node migrate-user-names.js preview                                        ║
║  node migrate-user-names.js backup                                         ║
║  node migrate-user-names.js restore ./backups/users-backup-2024.json       ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

💡 TIP: The best way to update names to match Google profiles is to 
   modify the login flow to update the name on each login.
   See the code comments for how to do this.
`);
};

const run = async () => {
    const command = process.argv[2];

    if (!command || command === 'help') {
        showHelp();
        process.exit(0);
    }

    try {
        console.log('📦 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        switch (command) {
            case 'preview':
                await previewUsers();
                break;
            case 'backup':
                await backupUsers();
                break;
            case 'restore':
                const backupFile = process.argv[3];
                if (!backupFile) {
                    console.error('❌ Please provide a backup file path');
                    console.log('   Usage: node migrate-user-names.js restore <backup-file>');
                    process.exit(1);
                }
                await restoreNamesFromBackup(backupFile);
                break;
            default:
                console.error(`❌ Unknown command: ${command}`);
                showHelp();
        }

        console.log('\n✅ Done!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

run();
