// Unit tests for syncLeetcodeContests with skip-latest logic and rolling user history

import { jest } from '@jest/globals';

// Mock leetcode-query
jest.unstable_mockModule('leetcode-query', () => {
  class LeetCodeMock {
    // eslint-disable-next-line no-unused-vars
    graphql({ variables }) {
      const now = new Date();
      const lastThursday = new Date(now);
      lastThursday.setDate(now.getDate() - ((now.getDay() + 3) % 7));
      const lastSat = new Date(lastThursday);
      lastSat.setDate(lastThursday.getDate() - 5);
      
      const t3000 = Math.floor(now.getTime() / 1000); 
      lastSat.setHours(12, 0, 0, 0);
      const t2000 = Math.floor(lastSat.getTime() / 1000);
      const t1000 = t2000 - 7 * 24 * 3600; 
      
      return Promise.resolve({
        data: {
          userContestRankingHistory: [
            { contest: { title: 'Weekly Contest 403', startTime: t3000 }, attended: true, ranking: 500, rating: 1700 },
            { contest: { title: 'Weekly Contest 402', startTime: t2000 }, attended: true, ranking: 400, rating: 1680 },
            { contest: { title: 'Weekly Contest 401', startTime: t1000 }, attended: false, ranking: null, rating: null },
            { contest: { title: 'Weekly Contest 400', startTime: t1000 - 1000 }, attended: true, ranking: 1, rating: 2000 },
            { contest: { title: 'Weekly Contest 399', startTime: t1000 - 2000 }, attended: true, ranking: 1, rating: 2000 },
            { contest: { title: 'Weekly Contest 398', startTime: t1000 - 3000 }, attended: true, ranking: 1, rating: 2000 },
            { contest: { title: 'Weekly Contest 397', startTime: t1000 - 4000 }, attended: true, ranking: 1, rating: 2000 },
            { contest: { title: 'Weekly Contest 396', startTime: t1000 - 5000 }, attended: true, ranking: 1, rating: 2000 },
          ]
        }
      });
    }
  }
  return { LeetCode: LeetCodeMock };
});

// Mocks for Mongo models
const userDocs = [];
const savedUsers = [];

const makeUserDoc = (id, name, handle, existingHistory = []) => {
  const doc = {
    _id: id,
    name,
    platformVerification: {
      leetcode: {
        handle,
        isVerified: true,
        contestStats: {
          totalContests: existingHistory.filter(h => h.participated).length,
          contestHistory: existingHistory,
          lastContestFetch: null,
          lastContestName: '',
          lastContestParticipated: false,
        },
      },
    },
  };
  doc.save = () => { savedUsers.push(doc); return Promise.resolve(doc); };
  return doc;
};

// Mock User model
jest.unstable_mockModule('../models/User.js', () => ({
  default: {
    // Used in controller: User.find, User.findById
    // eslint-disable-next-line no-unused-vars
    find: jest.fn((query) => ({
      select: () => Promise.resolve(userDocs),
    })),
    findById: jest.fn((id) => ({
      select: () => {
        const base = userDocs.find(u => u._id === id);
        const doc = JSON.parse(JSON.stringify(base));
        doc.save = () => { savedUsers.push(doc); return Promise.resolve(doc); };
        return doc;
      },
    })),
  },
}));

// Mock Contest model
let contestParticipants = [];
const contestUpserts = [];

jest.unstable_mockModule('../models/Contest.js', () => {
  const ContestMock = function(data) {
    Object.assign(this, data);
    this.save = async () => {
      contestUpserts.push({ filter: { name: this.name }, update: this });
      contestParticipants.length = 0;
      if (this.participants) {
        contestParticipants.push(...this.participants);
      }
    };
  };
  ContestMock.findOne = jest.fn(() => Promise.resolve(null));
  
  return { default: ContestMock };
});

// Now import after setting up mocks
/* eslint-env jest */
let syncLeetcodeContests;

beforeAll(async () => {
  const ControllerModule = await import('../controller/contestController.js');


  syncLeetcodeContests = ControllerModule.syncLeetcodeContests;
});

describe('syncLeetcodeContests', () => {
  jest.setTimeout(20000);
  beforeEach(() => {
    userDocs.length = 0;
    contestParticipants = [];
    contestUpserts.length = 0;
    savedUsers.length = 0;
  });

  const makeReqRes = () => {
    const req = { user: { role: 'admin' } };
    const res = {
      statusCode: 200,
      status(code) { this.statusCode = code; return this; },
      jsonPayload: null,
      json(payload) { this.jsonPayload = payload; return this; },
    };
    return { req, res };
  };

  test('skips latest contest and uses the previous finalized one', async () => {
    // Two verified users
    userDocs.push(
      makeUserDoc('u1', 'Alice', 'alice_lc'),
      makeUserDoc('u2', 'Bob', 'bob_lc'),
    );

    const { req, res } = makeReqRes();
    await syncLeetcodeContests(req, res);

    // Should upsert only for finalized contest 402
    expect(contestUpserts.length).toBe(1);
    expect(contestUpserts[0].filter).toEqual({ name: 'Weekly Contest 402' });

    // Participants should be added once per attending user
    expect(contestParticipants.length).toBe(2);
    expect(res.statusCode).toBe(200);
    expect(res.jsonPayload.finalizedContest).toBe('Weekly Contest 402');
    expect(res.jsonPayload.participants).toBe(2);
  });

  test('limits user contest history to max 5 entries and updates stats', async () => {
    const existing = [
      { contestName: 'C1', participated: true },
      { contestName: 'C2', participated: true },
      { contestName: 'C3', participated: false },
      { contestName: 'C4', participated: true },
      { contestName: 'C5', participated: true },
    ];
    userDocs.push(makeUserDoc('u1', 'Alice', 'alice_lc', existing));

    const { req, res } = makeReqRes();
    await syncLeetcodeContests(req, res);

    // Saved user should have newest contest as first, trimmed to 5
    expect(savedUsers.length).toBeGreaterThan(0);
    const saved = savedUsers.find(u => u._id === 'u1');
    expect(saved.platformVerification.leetcode.contestStats.recentContests.length).toBe(5);
    expect(saved.platformVerification.leetcode.contestStats.recentContests[0].contestName).toBe('Weekly Contest 403');
    // totalContests counts ALL participated entries from full history
    expect(saved.platformVerification.leetcode.contestStats.totalContests).toBe(7);
  });
});


