// Unit tests for syncLeetcodeContests with skip-latest logic and rolling user history

import { jest } from '@jest/globals';

// Mock leetcode-query
jest.unstable_mockModule('leetcode-query', () => {
  class LeetCodeMock {
    // eslint-disable-next-line no-unused-vars
    userContestRankingHistory(username) {
      // Sorted newest -> oldest (by startTime)
      return Promise.resolve([
        { title: 'Weekly Contest 403', startTime: 3000, finishTime: 3001, attended: true, ranking: 500, rating: 1700 }, // latest (should be skipped)
        { title: 'Weekly Contest 402', startTime: 2000, finishTime: 2001, attended: true, ranking: 400, rating: 1680 }, // finalized target
        { title: 'Weekly Contest 401', startTime: 1000, finishTime: 1001, attended: false, ranking: null, rating: null },
      ]);
    }
  }
  return { LeetCode: LeetCodeMock };
});

// Mocks for Mongo models
const userDocs = [];
const savedUsers = [];

const makeUserDoc = (id, name, handle, existingHistory = []) => ({
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
});

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

jest.unstable_mockModule('../models/Contest.js', () => ({
  default: {
    findOneAndUpdate: jest.fn((filter, update) => {
      contestUpserts.push({ filter, update });
      const doc = {
        participants: contestParticipants,
        save: async () => {},
      };
      // ensure participants entries have .user.equals
      doc.participants.forEach(p => {
        if (p && p.user && typeof p.user.equals !== 'function') {
          const id = p.user;
          p.user = { _id: id, equals: (other) => String(id) === String(other) };
        }
      });
      const origPush = contestParticipants.push.bind(contestParticipants);
      doc.participants.push = (obj) => {
        const id = obj.user;
        obj.user = { _id: id, equals: (other) => String(id) === String(other) };
        origPush(obj);
        return contestParticipants.length;
      };
      return doc;
    }),
  },
}));

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
    expect(saved.platformVerification.leetcode.contestStats.contestHistory.length).toBe(5);
    expect(saved.platformVerification.leetcode.contestStats.contestHistory[0].contestName).toBe('Weekly Contest 402');
    // totalContests counts only participated entries
    expect(saved.platformVerification.leetcode.contestStats.totalContests).toBe(
      saved.platformVerification.leetcode.contestStats.contestHistory.filter(h => h.participated).length,
    );
  });
});


