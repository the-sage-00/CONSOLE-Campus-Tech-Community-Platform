import NodeCache from 'node-cache';

class CacheService {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: 300, // 5 minutes default TTL
      checkperiod: 60, // Check for expired keys every minute
      useClones: false
    });
  }

  // Get value from cache
  get(key) {
    return this.cache.get(key);
  }

  // Set value in cache
  set(key, value, ttl = 300) {
    return this.cache.set(key, value, ttl);
  }

  // Delete value from cache
  del(key) {
    return this.cache.del(key);
  }

  // Clear all cache
  flush() {
    return this.cache.flushAll();
  }

  // Get cache stats
  getStats() {
    return this.cache.getStats();
  }

  // Check if key exists
  has(key) {
    return this.cache.has(key);
  }

  // Get multiple keys
  mget(keys) {
    return this.cache.mget(keys);
  }

  // Set multiple keys
  mset(keyValuePairs, ttl = 300) {
    return this.cache.mset(keyValuePairs.map(([key, value]) => ({ key, val: value, ttl })));
  }
}

export default new CacheService(); 