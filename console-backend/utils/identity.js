/**
 * Email Identity Parsing Utility
 * Parses student identity from institutional email addresses
 * 
 * Supports formats:
 * - 2024ucp1566@mnit.ac.in (no dashes)
 * - 2024-UCP-1566@mnit.ac.in (with dashes)
 */

// Define branch codes for MNIT
export const BRANCH_CODES = {
  'uch': { name: 'Chemical Engineering', shortName: 'Chemical' },
  'ucs': { name: 'Computer Science Engineering', shortName: 'CSE' },
  'ucp': { name: 'Computer Science Engineering', shortName: 'CSE' }, // Alias
  'ume': { name: 'Mechanical Engineering', shortName: 'Mech' },
  'umt': { name: 'Metallurgical Engineering', shortName: 'Metallurgy' },
  'uce': { name: 'Civil Engineering', shortName: 'Civil' },
  'uec': { name: 'Electronics & Communication Engineering', shortName: 'ECE' },
  'uee': { name: 'Electrical Engineering', shortName: 'EE' },
  'uar': { name: 'Architecture', shortName: 'Arch' },
  'uei': { name: 'Electronics & Instrumentation', shortName: 'E&I' },
};

export const VALID_BRANCH_CODES = Object.keys(BRANCH_CODES);

/**
 * Parse student identity from institutional email
 * @param {string} email - Full email address
 * @returns {object|null} - Parsed identity or null if invalid
 */
export const parseIdentityFromEmail = (email) => {
  try {
    if (!email) return null;

    // STEP 1: Validate domain
    const allowedDomain = '@mnit.ac.in';
    if (!email.toLowerCase().endsWith(allowedDomain)) {
      return null;
    }

    // STEP 2: Extract local part (before @)
    const localPart = email.split('@')[0].toLowerCase();

    let admissionYear, branchCode, rollSuffix;

    // STEP 3: Parse based on format

    // Format 1: WITH dashes (2024-uch-1566)
    if (localPart.includes('-')) {
      const parts = localPart.split('-');
      if (parts.length !== 3) {
        return null;
      }
      admissionYear = parseInt(parts[0], 10);
      branchCode = parts[1].toLowerCase();
      rollSuffix = parts[2];
    }
    // Format 2: WITHOUT dashes (2024uch1566)
    else {
      // Regex: 4 digits (year) + 2-3 letters (branch) + digits (roll)
      const match = localPart.match(/^(\d{4})([a-z]{2,3})(\d+)$/i);
      if (!match) {
        return null;
      }
      admissionYear = parseInt(match[1], 10);
      branchCode = match[2].toLowerCase();
      rollSuffix = match[3];
    }

    // STEP 4: Validate admission year (reasonable range)
    if (admissionYear < 2000 || admissionYear > 2099) {
      return null;
    }

    // STEP 5: Get branch information
    const branchInfo = BRANCH_CODES[branchCode];

    // Handle unknown branch codes
    if (!branchInfo) {
      return {
        admissionYear,
        branchCode: branchCode,
        branchName: branchCode.toUpperCase(), // Use code as name if unknown
        rollNo: localPart,
        needsReview: true,
      };
    }

    // STEP 6: Return parsed identity
    return {
      admissionYear,
      branchCode: branchCode,
      branchName: branchInfo.name,
      shortName: branchInfo.shortName,
      rollNo: localPart,
    };
  } catch (error) {
    console.error('Email parsing error:', error.message);
    return null;
  }
};

/**
 * Validate if email follows student format (starts with year)
 */
export const isValidStudentEmail = (email) => {
  const allowedDomain = '@mnit.ac.in';
  if (!email.toLowerCase().endsWith(allowedDomain)) return false;

  const localPart = email.split('@')[0].toLowerCase();
  const studentPattern = /^\d{4}/; // Starts with 4-digit year
  return studentPattern.test(localPart);
};

/**
 * Calculate current academic state from admission year
 * @param {number} admissionYear - Year of admission (e.g., 2024)
 * @returns {object} - { year: 1-4, semester: 1-8 }
 */
export const calculateAcademicState = (admissionYear) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-11

  // Year of study = Current Year - Admission Year + 1
  // Adjust: If before July (month 6), we're still in previous academic year
  const academicYear = currentMonth >= 6 ? currentYear : currentYear - 1;
  let yearOfStudy = academicYear - admissionYear + 1;

  // Clamp to valid range (1-4 for undergraduate)
  if (yearOfStudy < 1) yearOfStudy = 1;
  if (yearOfStudy > 4) yearOfStudy = 4;

  // Semester based on month
  // Aug-Dec (months 7-11) = Odd semesters (1, 3, 5, 7)
  // Jan-Jul (months 0-6) = Even semesters (2, 4, 6, 8)
  let semester;
  if (currentMonth >= 7) {
    semester = (yearOfStudy * 2) - 1; // 1, 3, 5, 7
  } else {
    semester = yearOfStudy * 2; // 2, 4, 6, 8
  }

  // Clamp semester
  if (semester < 1) semester = 1;
  if (semester > 8) semester = 8;

  return {
    year: yearOfStudy,
    semester: semester,
  };
};

/**
 * Get year label from admission year
 * @param {number} admissionYear 
 * @returns {string} - "1st Year", "2nd Year", etc.
 */
export const getYearLabel = (admissionYear) => {
  const state = calculateAcademicState(admissionYear);
  const labels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  return labels[state.year - 1] || `${state.year}th Year`;
};
